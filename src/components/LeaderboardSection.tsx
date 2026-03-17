'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface LeaderboardEntry {
  rank: number;
  username: string;
  commits: number;
  stars: number;
  level: number;
  rankTitle: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
}

const rarityColors: Record<string, string> = {
  Divine: '#ffff00',
  Transcendent: '#ff00ff',
  Mythic: '#00ffff',
  Legend: '#ff6b6b',
  Grandmaster: '#00ff88',
};

export function LeaderboardSection({ leaderboard }: LeaderboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="yellow" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-orbitron text-xl font-bold text-white">🏆 Leaderboard</h3>
          <div className="flex gap-2">
            <span className="font-mono text-xs text-gray-400">Top Contributors</span>
          </div>
        </div>

        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((user, index) => (
            <motion.a
              key={user.username}
              href={`/${user.username}`}
              className="flex items-center gap-4 p-3 rounded-lg bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(255,255,255,0.1)] transition-all group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-orbitron text-sm font-bold
                  ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' : ''}
                  ${index === 1 ? 'bg-gray-400/20 text-gray-300' : ''}
                  ${index === 2 ? 'bg-amber-600/20 text-amber-500' : ''}
                  ${index > 2 ? 'bg-gray-700/20 text-gray-500' : ''}
                `}
              >
                {user.rank}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white group-hover:text-[var(--neon-cyan)] transition-colors">
                    @{user.username}
                  </span>
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono"
                    style={{ 
                      backgroundColor: `${rarityColors[user.rankTitle]}20`,
                      color: rarityColors[user.rankTitle],
                      border: `1px solid ${rarityColors[user.rankTitle]}`
                    }}
                  >
                    {user.rankTitle}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="font-orbitron text-[var(--neon-magenta)]">{user.commits.toLocaleString()}</div>
                  <div className="font-mono text-[10px] text-gray-500">commits</div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron text-[var(--neon-yellow)]">{user.stars.toLocaleString()}</div>
                  <div className="font-mono text-[10px] text-gray-500">stars</div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
