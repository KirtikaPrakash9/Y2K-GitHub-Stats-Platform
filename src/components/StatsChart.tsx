'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface StatsChartProps {
  stats: {
    totalCommits: number;
    totalStars: number;
    totalPRs: number;
    totalIssues: number;
    totalForks: number;
    totalRepos: number;
  };
}

export function StatsChart({ stats }: StatsChartProps) {
  const data = [
    { label: 'Commits', value: stats.totalCommits, color: '#00ffff', icon: '🎯' },
    { label: 'Stars', value: stats.totalStars, color: '#ffff00', icon: '⭐' },
    { label: 'PRs', value: stats.totalPRs, color: '#ff00ff', icon: '🔀' },
    { label: 'Issues', value: stats.totalIssues, color: '#ff6b6b', icon: '🐛' },
    { label: 'Forks', value: stats.totalForks, color: '#00ff88', icon: '🍴' },
    { label: 'Repos', value: stats.totalRepos, color: '#00d4ff', icon: '📚' },
  ];

  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="cyan" className="p-6">
        <h3 className="font-orbitron text-xl font-bold text-white mb-6">
          📊 Activity Chart
        </h3>

        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            
            return (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-mono text-sm text-gray-400 w-16">{item.label}</span>
                  <span 
                    className="font-orbitron text-sm font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value.toLocaleString()}
                  </span>
                </div>
                
                <div className="h-6 bg-gray-800 rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.3 + index * 0.1,
                      ease: 'easeOut'
                    }}
                    className="h-full rounded-lg relative"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                      boxShadow: `0 0 15px ${item.color}`,
                    }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: 1 + index * 0.2,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                  
                  {/* Percentage label */}
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-400">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <span className="font-mono text-gray-400">Total Activity</span>
            <span className="font-orbitron text-xl font-bold text-white">
              {Object.values(stats).reduce((a, b) => a + b, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
