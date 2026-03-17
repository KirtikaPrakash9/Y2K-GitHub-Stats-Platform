'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface PersonalitySectionProps {
  personality: {
    type: string;
    badge: string;
    description: string;
    color: string;
  };
  level: {
    level: number;
    title: string;
    xp: number;
    xpToNext: number;
    progress: number;
  };
}

export function PersonalitySection({ personality, level }: PersonalitySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <GlassPanel glowColor="magenta" className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Your Dev Identity</h3>
            <div className="pixel-badge inline-block" style={{ borderColor: personality.color, color: personality.color }}>
              {personality.badge}
            </div>
          </div>
          <div className="flex-1">
            <h4 
              className="font-orbitron text-xl font-bold"
              style={{ color: personality.color, textShadow: `0 0 20px ${personality.color}` }}
            >
              {personality.type}
            </h4>
          </div>
        </div>

        <p className="font-mono text-gray-300 leading-relaxed mb-8">
          {personality.description}
        </p>

        {/* Level Progress */}
        <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-orbitron text-sm text-gray-400">Level Progress</span>
            <span className="font-mono text-xs text-[var(--neon-cyan)]">
              {level.xp} / {level.xp + level.xpToNext} XP
            </span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${level.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full gradient-animate"
              style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-orbitron text-lg font-bold text-[var(--neon-yellow)]">Lv.{level.level}</span>
            <span className="font-mono text-sm text-gray-500">{level.title}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          {level.level >= 5 && (
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(255,0,255,0.1)] border border-[var(--neon-magenta)] text-[var(--neon-magenta)]">
              🌙 Night Owl
            </span>
          )}
          {level.progress > 80 && (
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(0,255,255,0.1)] border border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
              ⚡ Consistent Dev
            </span>
          )}
          {level.level >= 10 && (
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(255,255,0,0.1)] border border-[var(--neon-yellow)] text-[var(--neon-yellow)]">
              🌍 Polyglot
            </span>
          )}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
