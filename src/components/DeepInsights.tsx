'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface DeepInsightsProps {
  stats: {
    topLanguages: { name: string; color: string; count: number }[];
    totalRepos: number;
    totalCommits: number;
    totalStars: number;
    streak: number;
  };
}

export function DeepInsights({ stats }: DeepInsightsProps) {
  const totalLangRepos = stats.topLanguages.reduce((sum, l) => sum + l.count, 0);
  
  const consistencyScore = Math.min(
    Math.round((stats.streak / 30) * 100 + (stats.totalCommits / 1000) * 50),
    100
  );

  const completionRate = Math.min(
    Math.round(100 - (stats.totalRepos > 20 ? (stats.totalRepos - 10) * 2 : 0)),
    100
  );

  const getConsistencyLabel = (score: number) => {
    if (score >= 80) return 'Elite';
    if (score >= 60) return 'Great';
    if (score >= 40) return 'Good';
    if (score >= 20) return 'Average';
    return 'Learning';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <GlassPanel glowColor="blue" className="p-8">
        <h3 className="font-orbitron text-2xl font-bold text-white mb-6">🧪 Deep Insights</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Consistency Score */}
          <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-gray-400 text-sm">Consistency Score</span>
              <span 
                className="font-orbitron font-bold"
                style={{ 
                  color: consistencyScore >= 60 ? 'var(--neon-cyan)' : 'var(--neon-yellow)',
                  textShadow: `0 0 10px ${consistencyScore >= 60 ? 'var(--neon-cyan)' : 'var(--neon-yellow)'}`
                }}
              >
                {getConsistencyLabel(consistencyScore)}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${consistencyScore}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full"
                style={{ 
                  background: `linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))`,
                  boxShadow: '0 0 10px var(--neon-cyan)'
                }}
              />
            </div>
            <div className="font-mono text-xs text-gray-500 mt-2">
              Based on streak & commit frequency
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-gray-400 text-sm">Project Completion</span>
              <span 
                className="font-orbitron font-bold"
                style={{ 
                  color: completionRate >= 70 ? 'var(--neon-green)' : 'var(--neon-yellow)',
                  textShadow: `0 0 10px ${completionRate >= 70 ? '#00ff88' : 'var(--neon-yellow)'}`
                }}
              >
                {completionRate}%
              </span>
            </div>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full"
                style={{ 
                  background: `linear-gradient(90deg, #00ff88, var(--neon-cyan))`,
                  boxShadow: '0 0 10px #00ff88'
                }}
              />
            </div>
            <div className="font-mono text-xs text-gray-500 mt-2">
              Estimated based on repo count
            </div>
          </div>

          {/* Language Distribution */}
          <div className="md:col-span-2 bg-[rgba(0,0,0,0.3)] rounded-lg p-4">
            <span className="font-mono text-gray-400 text-sm block mb-4">Language Distribution</span>
            <div className="flex flex-wrap gap-3">
              {stats.topLanguages.map((lang, index) => {
                const percentage = Math.round((lang.count / totalLangRepos) * 100);
                return (
                  <motion.div
                    key={lang.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div 
                      className="px-3 py-2 rounded-lg font-mono text-sm flex items-center gap-2"
                      style={{ 
                        backgroundColor: `${lang.color}20`,
                        border: `1px solid ${lang.color}`,
                        color: lang.color
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                      <span className="opacity-60">{percentage}%</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
