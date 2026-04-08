'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface HypeReelProps {
  username: string;
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    streak: number;
    topLanguages: Array<{ name: string }>;
  };
  personality: {
    type: string;
    icon: string;
  };
  level: {
    level: number;
    rank: string;
  };
}

export function HypeReel({ username, stats, personality, level }: HypeReelProps) {
  const [copied, setCopied] = useState(false);

  const highlights = useMemo(
    () => [
      `${personality.icon} ${personality.type}`,
      `${stats.totalCommits.toLocaleString()} commits`,
      `${stats.totalStars.toLocaleString()} stars`,
      `${stats.totalPRs.toLocaleString()} PRs`,
      `${stats.streak}-day streak`,
      `Level ${level.level} ${level.rank}`,
      `${stats.totalRepos} repositories`,
      `${stats.topLanguages.slice(0, 3).map((lang) => lang.name).join(' · ') || 'polyglot mode'}`,
    ],
    [level.level, level.rank, personality.icon, personality.type, stats.totalCommits, stats.totalPRs, stats.totalRepos, stats.totalStars, stats.streak, stats.topLanguages]
  );

  const headline = useMemo(() => {
    if (stats.totalStars > 500) return 'Open Source Gravity Field';
    if (stats.totalCommits > 2000) return 'Commit Engine Overclocked';
    if (stats.streak > 50) return 'Streak Reactor Stable';
    return 'Builder Mode: Active';
  }, [stats.totalCommits, stats.totalStars, stats.streak]);

  const copySharePack = async () => {
    const share = [
      `🚀 ${headline}`,
      `@${username} | ${personality.type}`,
      `• ${stats.totalCommits.toLocaleString()} commits`,
      `• ${stats.totalStars.toLocaleString()} stars`,
      `• ${stats.totalPRs.toLocaleString()} pull requests`,
      `• ${stats.streak}-day streak`,
      `Explore full report: https://gitwrapped.vercel.app/${username}`,
      '#GitWrapped #BuildInPublic #DevStats',
    ].join('\n');

    await navigator.clipboard.writeText(share);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <GlassPanel glowColor="magenta" className="p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h3 className="font-orbitron text-xl font-bold text-white">Hype Reel</h3>
            <p className="font-mono text-sm text-gray-400">Auto-generated launch copy + live stat ticker for social drops.</p>
          </div>
          <button
            onClick={copySharePack}
            className="px-4 py-2 rounded-lg border border-[var(--neon-magenta)] text-[var(--neon-magenta)] font-mono text-sm hover:bg-[rgba(255,0,255,0.1)] transition-colors"
          >
            {copied ? 'Share Pack Copied' : 'Copy Share Pack'}
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/30 p-4 mb-4">
          <div className="font-pixel text-[10px] text-[var(--neon-yellow)] mb-3">HEADLINE.BIN</div>
          <div className="font-orbitron text-2xl md:text-3xl font-black text-white leading-tight">{headline}</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/35 p-3">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...highlights, ...highlights].map((item, idx) => (
              <span key={`${item}-${idx}`} className="font-mono text-sm text-gray-200 inline-flex items-center gap-2">
                <span className="text-[var(--neon-cyan)]">●</span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
