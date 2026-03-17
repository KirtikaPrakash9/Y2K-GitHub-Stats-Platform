'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface GitHubWrappedProps {
  stats: {
    totalCommits: number;
    totalStars: number;
    totalRepos: number;
    projectsAbandoned: number;
    streak: number;
    peakDay: string;
    topLanguages: { name: string; color: string; count: number }[];
  };
}

const slides = [
  {
    icon: '🎯',
    title: 'Total Commits',
    getValue: (stats: GitHubWrappedProps['stats']) => stats.totalCommits.toLocaleString(),
    color: 'var(--neon-cyan)',
  },
  {
    icon: '⭐',
    title: 'Stars Earned',
    getValue: (stats: GitHubWrappedProps['stats']) => stats.totalStars.toLocaleString(),
    color: 'var(--neon-yellow)',
  },
  {
    icon: '🔥',
    title: 'Current Streak',
    getValue: (stats: GitHubWrappedProps['stats']) => `${stats.streak} days`,
    color: 'var(--neon-magenta)',
  },
  {
    icon: '📅',
    title: 'Peak Day',
    getValue: (stats: GitHubWrappedProps['stats']) => stats.peakDay,
    color: 'var(--neon-pink)',
  },
  {
    icon: '💻',
    topLanguage: true,
    title: 'Top Language',
    getValue: (stats: GitHubWrappedProps['stats']) => stats.topLanguages[0]?.name || 'None',
    getSubtext: (stats: GitHubWrappedProps['stats']) => `${stats.topLanguages[0]?.count || 0} repos`,
    color: 'var(--neon-blue)',
  },
  {
    icon: '💀',
    title: 'Projects Abandoned',
    getValue: (stats: GitHubWrappedProps['stats']) => stats.projectsAbandoned.toString(),
    getSubtext: (stats: GitHubWrappedProps['stats']) => 
      stats.projectsAbandoned > 10 ? 'Project hopper much? 😅' :
      stats.projectsAbandoned > 5 ? 'Join the club!' :
      'Pretty focused!',
    color: 'var(--neon-pink)',
    isRoast: true,
  },
];

export function GitHubWrapped({ stats }: GitHubWrappedProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <GlassPanel glowColor="yellow" className="p-8">
        <h3 className="font-orbitron text-2xl font-bold text-white mb-6 text-center">
          📊 Your GitHub Wrapped
        </h3>

        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">{slide.icon}</div>
              <div 
                className="font-orbitron text-sm uppercase tracking-wider mb-2"
                style={{ color: slide.color }}
              >
                {slide.title}
              </div>
              <div 
                className="font-orbitron text-5xl font-bold"
                style={{ color: slide.color, textShadow: `0 0 30px ${slide.color}` }}
              >
                {slide.getValue(stats)}
              </div>
              {slide.getSubtext && (
                <div className="font-mono text-gray-400 mt-2 text-sm">
                  {slide.getSubtext(stats)}
                </div>
              )}
              {slide.topLanguage && stats.topLanguages[0] && (
                <div 
                  className="mt-4 px-4 py-2 rounded-full text-sm font-mono"
                  style={{ 
                    backgroundColor: `${stats.topLanguages[0].color}20`,
                    border: `1px solid ${stats.topLanguages[0].color}`,
                    color: stats.topLanguages[0].color 
                  }}
                >
                  {stats.topLanguages[0].color}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors flex items-center justify-center"
          >
            ←
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-6 bg-[var(--neon-cyan)]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>

        <div className="text-center mt-4 font-mono text-xs text-gray-500">
          {currentSlide + 1} / {slides.length}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
