'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface TimelineEvent {
  type: 'commit' | 'star' | 'pr' | 'fork' | 'issue' | 'repo';
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface TimelineSectionProps {
  events?: TimelineEvent[];
  repoCreated?: string;
}

export function TimelineSection({ events, repoCreated }: TimelineSectionProps) {
  const mockTimeline: TimelineEvent[] = [
    {
      type: 'repo',
      title: 'First Repository Created',
      description: 'Started your coding journey',
      date: repoCreated || '2020-01-01',
      icon: '📦',
    },
    {
      type: 'commit',
      title: 'First Commit',
      description: 'Made your initial commit',
      date: repoCreated || '2020-01-15',
      icon: '🎯',
    },
    {
      type: 'star',
      title: 'First Star Earned',
      description: 'Someone starred your repo!',
      date: '2020-06-01',
      icon: '⭐',
    },
    {
      type: 'pr',
      title: 'First Pull Request',
      description: 'Contributed to open source',
      date: '2021-01-01',
      icon: '🔀',
    },
    {
      type: 'fork',
      title: '10 Forks',
      description: 'Your project is being forked',
      date: '2021-06-01',
      icon: '🍴',
    },
    {
      type: 'issue',
      title: 'Issue Hunter',
      description: 'Started reporting issues',
      date: '2022-01-01',
      icon: '🐛',
    },
  ];

  const typeColors: Record<string, string> = {
    commit: 'var(--neon-cyan)',
    star: 'var(--neon-yellow)',
    pr: 'var(--neon-magenta)',
    fork: 'var(--neon-pink)',
    issue: 'var(--neon-blue)',
    repo: 'var(--neon-green)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="cyan" className="p-6">
        <h3 className="font-orbitron text-xl font-bold text-white mb-6">
          📜 Your Coding Journey
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-magenta)] to-[var(--neon-yellow)]" />

          <div className="space-y-6">
            {mockTimeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="absolute left-2 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: typeColors[event.type],
                    boxShadow: `0 0 10px ${typeColors[event.type]}`,
                  }}
                >
                  {event.icon}
                </motion.div>

                {/* Event card */}
                <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(0,0,0,0.5)] transition-colors group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 
                        className="font-orbitron text-sm font-bold"
                        style={{ color: typeColors[event.type] }}
                      >
                        {event.title}
                      </h4>
                      <p className="font-mono text-xs text-gray-400 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-gray-500">
                      {event.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
