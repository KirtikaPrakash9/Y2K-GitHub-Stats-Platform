'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GlassPanel } from './GlassPanel';
import { ChromeButton } from './ChromeButton';

export function LandingPage() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const router = useRouter();

  const loadingMessages = [
    'Initializing system...',
    'Scanning repositories...',
    'Analyzing commit history...',
    'Computing personality matrix...',
    'Generating insights...',
    'Finalizing results...',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    
    for (const text of loadingMessages) {
      setLoadingText(text);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    router.push(`/${username.trim()}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 star-field opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-dark)]" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <GlassPanel glowColor="cyan" className="p-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 mx-auto mb-6 border-4 border-t-transparent rounded-full"
                  style={{ borderColor: 'var(--neon-cyan)', borderTopColor: 'transparent' }}
                />
                <div className="font-orbitron text-xl text-[var(--neon-cyan)] mb-4">
                  {loadingText}
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.4, ease: 'easeInOut' }}
                    className="h-full gradient-animate"
                    style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))' }}
                  />
                </div>
              </GlassPanel>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Title */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="inline-block pixel-badge mb-4">v1.0 BETA</div>
                <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-4 glitch cursor-default">
                  <span className="neon-text text-[var(--neon-cyan)]">Git</span>
                  <span className="neon-text text-[var(--neon-magenta)]">Wrapped</span>
                  <span className="text-[var(--neon-yellow)] text-4xl ml-2">.exe</span>
                </h1>
                <p className="font-mono text-xl text-gray-400">
                  Analyze your GitHub like it&apos;s 2003
                </p>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-4 mb-8 flex-wrap"
              >
                {['✨ AI Powered', '🔒 No Login', '⚡ Instant'].map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]"
                  >
                    {badge}
                  </motion.span>
                ))}
              </motion.div>

              {/* Input form */}
              <motion.form
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
              >
                <GlassPanel glowColor="cyan" className="p-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-cyan)] font-mono">
                        @
                      </span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="enter username..."
                        className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] rounded-lg py-4 pl-10 pr-4 font-mono text-lg text-white placeholder-gray-500 input-glow transition-all"
                        autoFocus
                      />
                    </div>
                    <ChromeButton type="submit" glowColor="cyan" className="md:w-auto w-full">
                      Analyze Profile
                    </ChromeButton>
                  </div>
                </GlassPanel>
              </motion.form>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-500 text-sm font-mono">
                  Powered by GitHub GraphQL API
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scanlines effect */}
      <div className="fixed inset-0 pointer-events-none crt-overlay z-50 opacity-30" />
    </div>
  );
}
