'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { AnimatedCounter } from './AnimatedCounter';

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
  delay?: number;
}

export function StatCard({ icon, label, value, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <GlassPanel glowColor={color as any} className="p-6 group hover:scale-105 transition-transform">
        <div className="text-4xl mb-3">{icon}</div>
        <div 
          className="text-3xl font-orbitron font-bold mb-1"
          style={{ color, textShadow: `0 0 20px ${color}` }}
        >
          <AnimatedCounter value={value} />
        </div>
        <div className="text-gray-400 font-mono text-sm uppercase tracking-wider">{label}</div>
      </GlassPanel>
    </motion.div>
  );
}
