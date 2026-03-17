'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface MobileViewProps {
  username: string;
  avatar: string;
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
    followers: number;
  };
  personality: {
    type: string;
    badge: string;
    color: string;
  };
}

export function MobileView({ username, avatar, stats, personality }: MobileViewProps) {
  const statCards = [
    { label: 'Repos', value: stats.totalRepos, icon: '📚', color: '#00ffff' },
    { label: 'Stars', value: stats.totalStars, icon: '⭐', color: '#ffff00' },
    { label: 'Commits', value: stats.totalCommits, icon: '🎯', color: '#ff00ff' },
    { label: 'Followers', value: stats.followers, icon: '👥', color: '#ff6b6b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden"
    >
      <GlassPanel glowColor="cyan" className="p-4">
        {/* Phone frame */}
        <div className="bg-black rounded-[30px] p-3 border-4 border-gray-800">
          {/* Notch */}
          <div className="bg-gray-800 rounded-full w-32 h-6 mx-auto mb-2" />
          
          {/* Content */}
          <div className="space-y-4">
            {/* Profile */}
            <div className="text-center">
              <img
                src={avatar}
                alt={username}
                className="w-20 h-20 rounded-full mx-auto border-2"
                style={{ borderColor: personality.color }}
              />
              <h3 className="font-orbitron font-bold text-white mt-2">@{username}</h3>
              <span 
                className="inline-block px-2 py-0.5 rounded text-xs font-mono"
                style={{ 
                  backgroundColor: `${personality.color}20`,
                  color: personality.color 
                }}
              >
                {personality.badge}
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2">
              {statCards.map((stat) => (
                <div 
                  key={stat.label}
                  className="bg-gray-900 rounded-lg p-3 text-center"
                >
                  <div className="text-xl">{stat.icon}</div>
                  <div className="font-orbitron text-lg font-bold" style={{ color: stat.color }}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="font-mono text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              <button 
                className="flex-1 py-2 rounded-lg font-mono text-xs"
                style={{ 
                  background: `linear-gradient(135deg, ${personality.color}30, ${personality.color}10)`,
                  border: `1px solid ${personality.color}`,
                  color: personality.color
                }}
              >
                📋 Share
              </button>
              <button 
                className="flex-1 py-2 rounded-lg font-mono text-xs bg-gray-800 text-gray-300"
              >
                🔗 Copy Link
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-600 text-xs font-mono">
              GitWrapped.exe
            </p>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center text-gray-500 text-xs font-mono mt-4">
          📱 View on mobile - Scan QR code
        </p>
      </GlassPanel>
    </motion.div>
  );
}
