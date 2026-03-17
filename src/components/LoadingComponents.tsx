'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-gray-800 rounded ${className}`}
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-20 rounded" />
        <Skeleton className="h-20 rounded" />
        <Skeleton className="h-20 rounded" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-panel p-6">
          <Skeleton className="w-12 h-12 mb-3 rounded" />
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function LoadingAnimation() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center">
        {/* Main spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 border-4 border-t-transparent rounded-full" style={{ borderColor: 'var(--neon-cyan)', borderTopColor: 'transparent' }} />
          <div className="absolute inset-2 border-4 border-t-transparent rounded-full animate-reverse" style={{ borderColor: 'var(--neon-magenta)', borderTopColor: 'transparent', animationDirection: 'reverse' }} />
          <div className="absolute inset-4 border-4 border-t-transparent rounded-full" style={{ borderColor: 'var(--neon-yellow)', borderTopColor: 'transparent' }} />
        </motion.div>

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="font-orbitron text-2xl text-[var(--neon-cyan)] mb-4"
        >
          Analyzing GitHub Profile
        </motion.div>

        {/* Progress steps */}
        <div className="space-y-2 mb-8">
          {['Fetching repositories...', 'Analyzing commits...', 'Computing personality...', 'Generating insights...'].map((text, i) => (
            <motion.div
              key={text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.3 }}
              className="font-mono text-sm text-gray-400"
            >
              <span className="text-[var(--neon-cyan)]">▸</span> {text}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <motion.div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))' }}
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

export function PulseLoader() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--neon-cyan)' }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
