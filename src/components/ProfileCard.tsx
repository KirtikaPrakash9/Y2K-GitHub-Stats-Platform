'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface ProfileCardProps {
  avatar: string;
  username: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
}

export function ProfileCard({ avatar, username, name, bio, followers, following }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="cyan" className="p-8 text-center group hover:scale-[1.02] transition-transform">
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"
            style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta))' }}
          />
          <img
            src={avatar}
            alt={username}
            className="relative w-32 h-32 rounded-full border-4 border-[var(--neon-cyan)]"
            style={{ boxShadow: '0 0 30px var(--neon-cyan)50' }}
          />
        </motion.div>
        
        <h2 className="font-orbitron text-3xl font-bold mt-6 text-white">{name || username}</h2>
        <p className="font-mono text-[var(--neon-cyan)] text-lg">@{username}</p>
        
        {bio && (
          <p className="font-mono text-gray-400 mt-4 max-w-md mx-auto">{bio}</p>
        )}
        
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="font-orbitron text-2xl font-bold text-[var(--neon-magenta)]">{followers}</div>
            <div className="font-mono text-xs text-gray-500 uppercase">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-orbitron text-2xl font-bold text-[var(--neon-yellow)]">{following}</div>
            <div className="font-mono text-xs text-gray-500 uppercase">Following</div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
