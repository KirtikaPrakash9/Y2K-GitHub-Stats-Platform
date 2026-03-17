import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export interface GitHubUser {
  login: string;
  avatarUrl: string;
  name: string;
  bio: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: GitHubRepo[];
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    totalRepositoriesWithContributedCommits: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: {
        contributionDays: {
          date: string;
          contributionCount: number;
          color: string;
        }[];
      }[];
    };
  };
  topRepositories: {
    nodes: GitHubRepo[];
  };
  repositoriesContributedTo: {
    totalCount: number;
  };
}

export interface GitHubRepo {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
  isArchived: boolean;
  isTemplate: boolean;
}

const USER_QUERY = `
  query($username: String!) {
    user(login: $username) {
      login
      avatarUrl
      name
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          updatedAt
          isArchived
          isTemplate
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      topRepositories(first: 10, orderBy: {field: STARGAZER_COUNT, direction: DESC}) {
        nodes {
          name
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
      repositoriesContributedTo(first: 1) {
        totalCount
      }
    }
  }
`;

async function fetchGitHubGraphQL(query: string, variables: Record<string, string>) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data;
}

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  const cacheKey = `github:${username}`;
  
  try {
    const cached = await kv.get<GitHubUser>(cacheKey);
    if (cached) {
      return cached;
    }
  } catch {
    // KV not configured, skip caching
  }

  const data = await fetchGitHubGraphQL(USER_QUERY, { username });
  
  if (!data.user) {
    return null;
  }

  try {
    await kv.set(cacheKey, data.user, { ex: 3600 });
  } catch {
    // KV not configured, skip caching
  }

  return data.user;
}

export interface UserStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalPRs: number;
  followers: number;
  following: number;
  languages: Record<string, number>;
  topLanguages: { name: string; color: string; count: number }[];
  peakHour: number;
  peakDay: string;
  streak: number;
  projectsAbandoned: number;
}

export function calculateStats(user: GitHubUser): UserStats {
  const repos = user.repositories.nodes.filter(r => !r.isTemplate);
  const totalStars = repos.reduce((sum, r) => sum + r.stargazerCount, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forkCount, 0);
  
  const languages: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.primaryLanguage) {
      const lang = repo.primaryLanguage.name;
      languages[lang] = (languages[lang] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languages)
    .map(([name, count]) => {
      const repo = repos.find(r => r.primaryLanguage?.name === name);
      return {
        name,
        color: repo?.primaryLanguage?.color || '#888',
        count,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const calendar = user.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks;
  
  let peakHour = 0;
  const hourCounts: number[] = new Array(24).fill(0);
  let peakDay = 'Sunday';
  const dayCounts: Record<string, number> = {};
  let streak = 0;
  let currentStreak = 0;

  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      dayCounts[dayName] = (dayCounts[dayName] || 0) + day.contributionCount;
      
      if (day.contributionCount > 0) {
        currentStreak++;
        if (currentStreak > streak) streak = currentStreak;
      } else {
        currentStreak = 0;
      }
    });
  });

  peakDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Sunday';
  
  const archivedRepos = repos.filter(r => r.isArchived).length;
  const oldRepos = repos.filter(r => {
    const updated = new Date(r.updatedAt);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return !r.isArchived && updated < sixMonthsAgo && r.stargazerCount === 0 && r.forkCount === 0;
  }).length;

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    totalCommits: user.contributionsCollection.totalCommitContributions,
    totalPRs: user.contributionsCollection.totalPullRequestContributions,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    languages,
    topLanguages,
    peakHour,
    peakDay,
    streak,
    projectsAbandoned: archivedRepos + oldRepos,
  };
}

export type DevPersonality = {
  type: string;
  badge: string;
  description: string;
  color: string;
};

export function analyzePersonality(user: GitHubUser, stats: UserStats): DevPersonality {
  const languages = Object.keys(stats.languages);
  const hasFrontend = languages.some(l => ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vue', 'Svelte'].includes(l));
  const hasBackend = languages.some(l => ['Python', 'Go', 'Rust', 'Java', 'Ruby', 'PHP', 'C#'].includes(l));
  const hasAI = languages.some(l => ['Python', 'Jupyter Notebook'].includes(l));
  const hasManyRepos = stats.totalRepos > 20;
  const hasManyStars = stats.totalStars > 50;
  const hasHighCommits = stats.totalCommits > 500;

  if (stats.peakHour >= 22 || stats.peakHour <= 4) {
    return {
      type: 'Late Night Frontend Hacker',
      badge: '🌙 Night Owl',
      description: `You do your best coding when the world sleeps. With ${stats.totalCommits} commits and a ${stats.streak}-day streak, you're most productive between midnight and 4 AM. Your love for ${stats.topLanguages[0]?.name || 'code'} shows you care about building things that last.`,
      color: '#ff00ff',
    };
  }

  if (hasAI && hasManyRepos) {
    return {
      type: 'AI Explorer',
      badge: '🤖 AI Pioneer',
      description: `You're riding the cutting edge of technology. With projects in ${languages.slice(0, 3).join(', ')}, you're not afraid to experiment with the latest tools. Your ${stats.totalRepos} repositories show a curious mind that's always learning.`,
      color: '#00ffff',
    };
  }

  if (hasFrontend && !hasBackend) {
    return {
      type: 'Frontend Artisan',
      badge: '🎨 Pixel Perfect',
      description: `You believe in beautiful user experiences. Your ${stats.topLanguages[0]?.name || 'JavaScript'}-focused repos show a passion for visual excellence. ${stats.totalStars} stars across your work proves users love what you build.`,
      color: '#ff6b9d',
    };
  }

  if (hasBackend && !hasFrontend) {
    return {
      type: 'Backend Architect',
      badge: '🏗️ System Builder',
      description: `You prefer building robust foundations. Your ${stats.totalRepos} repositories with ${stats.topLanguages[0]?.name || 'Python'} show you value clean architecture over flashy UIs. You're the backbone of every team.`,
      color: '#00d4ff',
    };
  }

  if (hasManyRepos && stats.totalStars < 10) {
    return {
      type: 'Weekend Builder',
      badge: '🛠️ Weekend Warrior',
      description: `You have ${stats.totalRepos} repositories but haven\'t quite finished them all. You're a serial project starter! Maybe it's time to polish a few gems instead of starting new ones?`,
      color: '#ffff00',
    };
  }

  if (hasManyStars && hasHighCommits) {
    return {
      type: 'Open Source Grinder',
      badge: '⭐ Maintainer',
      description: `You've earned ${stats.totalStars} stars and made ${stats.totalCommits} contributions. You're the backbone of the open source community, grinding daily to make software better for everyone.`,
      color: '#00ff88',
    };
  }

  return {
    type: 'Balanced Developer',
    badge: '⚖️ Full Stack',
    description: `You play both sides of the stack! With ${languages.length} languages and ${stats.totalRepos} projects, you bring versatility to every challenge. Your ${stats.streak}-day streak shows real dedication.`,
    color: '#ff9500',
  };
}

export function calculateLevel(stats: UserStats): { level: number; title: string; xp: number; xpToNext: number; progress: number } {
  const xp = stats.totalCommits + (stats.totalStars * 10) + (stats.totalRepos * 5);
  const level = Math.floor(xp / 100) + 1;
  
  const titles = [
    'Beginner', 'Learner', 'Builder', 'Creator', 'Contributor',
    'Hacker', 'Expert', 'Master', 'Legend', 'Grandmaster'
  ];
  const titleIndex = Math.min(Math.floor((level - 1) / 5), titles.length - 1);
  
  const xpForLevel = (level: number) => level * 100;
  const xpToNext = xpForLevel(level + 1) - xp;
  const prevLevelXp = xpForLevel(level);
  const progress = ((xp - prevLevelXp) / 100) * 100;

  return {
    level,
    title: titles[titleIndex],
    xp,
    xpToNext,
    progress: Math.min(progress, 100),
  };
}
