'use client';

import { StatCard } from './StatCard';

interface StatsDashboardProps {
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    followers: number;
    following: number;
    totalForks: number;
  };
}

export function StatsDashboard({ stats }: StatsDashboardProps) {
  const statItems = [
    { icon: '📚', label: 'Repositories', value: stats.totalRepos, color: 'cyan' },
    { icon: '⭐', label: 'Total Stars', value: stats.totalStars, color: 'yellow' },
    { icon: '🎯', label: 'Commits', value: stats.totalCommits, color: 'magenta' },
    { icon: '🔀', label: 'Pull Requests', value: stats.totalPRs, color: 'blue' },
    { icon: '🍴', label: 'Forks', value: stats.totalForks, color: 'pink' },
    { icon: '👥', label: 'Followers', value: stats.followers, color: 'cyan' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {statItems.map((stat, index) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
