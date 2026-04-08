export type ReadmeTemplate = 'compact' | 'full';

export interface ReadmeStats {
  totalRepos: number;
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalForks: number;
  followers: number;
  streak: number;
  peakDay: string;
  codingPattern: 'morning' | 'afternoon' | 'evening' | 'night';
  yearlyContributions: number;
  topLanguages: Array<{ name: string; color?: string; count?: number; bytes?: number }>;
}

export interface ReadmePersonality {
  type: string;
  badge: string;
  icon: string;
  idealRole?: string;
  strengths?: string[];
}

export interface ReadmeOptions {
  template: ReadmeTemplate;
  includeBadges: boolean;
  includeActivity: boolean;
  includeLanguages: boolean;
  includePersonality: boolean;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function generateReadmeMarkdown(params: {
  username: string;
  cardUrl: string;
  domain: string;
  stats: ReadmeStats;
  personality: ReadmePersonality;
  options: ReadmeOptions;
}): string {
  const { username, cardUrl, domain, stats, personality, options } = params;
  const profileUrl = `${domain}/${username}`;
  const repoUrl = `https://github.com/${username}`;
  const topLanguageList = stats.topLanguages.slice(0, 5).map((lang) => lang.name).join(', ') || 'N/A';

  const compactMarkdown = `
[![GitWrapped Card](${cardUrl})](${profileUrl})

### ${username}'s GitHub Snapshot

- Repositories: ${formatNumber(stats.totalRepos)}
- Stars: ${formatNumber(stats.totalStars)}
- Commits: ${formatNumber(stats.totalCommits)}
- PRs: ${formatNumber(stats.totalPRs)}

Generated with [GitWrapped](${domain})
`.trim();

  const fullMarkdown = `
[![GitWrapped Card](${cardUrl})](${profileUrl})

# ${username}'s Y2K GitHub Wrap

${options.includeBadges ? `![Repos](https://img.shields.io/badge/Repos-${stats.totalRepos}-00ffff?style=for-the-badge&logo=github)
![Stars](https://img.shields.io/badge/Stars-${stats.totalStars}-ff00ff?style=for-the-badge&logo=starship)
![Commits](https://img.shields.io/badge/Commits-${stats.totalCommits}-00ff88?style=for-the-badge&logo=git)
` : ''}

## Core Stats

| Metric | Value |
|--------|-------|
| Repositories | ${formatNumber(stats.totalRepos)} |
| Total Stars | ${formatNumber(stats.totalStars)} |
| Total Commits | ${formatNumber(stats.totalCommits)} |
| Pull Requests | ${formatNumber(stats.totalPRs)} |
| Forks | ${formatNumber(stats.totalForks)} |
| Followers | ${formatNumber(stats.followers)} |

${options.includeActivity ? `## Activity Pulse

- Current streak: ${stats.streak} days
- Yearly contributions: ${formatNumber(stats.yearlyContributions)}
- Peak day: ${stats.peakDay}
- Coding rhythm: ${titleCase(stats.codingPattern)}
` : ''}

${options.includeLanguages ? `## Top Languages

${topLanguageList}
` : ''}

${options.includePersonality ? `## Dev Personality

- Type: ${personality.type}
- Badge: ${personality.icon} ${personality.badge}
- Ideal role: ${personality.idealRole || 'Full-stack Builder'}
- Strengths: ${personality.strengths?.slice(0, 3).join(', ') || 'Problem solving, consistency, curiosity'}
` : ''}

## Links

- GitHub: ${repoUrl}
- Full interactive report: ${profileUrl}

---

Generated with GitWrapped ${domain}
`.replace(/\n{3,}/g, '\n\n').trim();

  return options.template === 'compact' ? compactMarkdown : fullMarkdown;
}

export function generateReadmeSnippet(params: { username: string; theme?: string }): string {
  const { username, theme = 'cyberpunk' } = params;
  return `![GitWrapped](https://gitwrapped.vercel.app/api/card?username=${username}&theme=${theme})`;
}
