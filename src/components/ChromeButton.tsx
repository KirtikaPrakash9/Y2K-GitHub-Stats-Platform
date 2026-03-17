'use client';

import { motion } from 'framer-motion';

interface ChromeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  glowColor?: string;
}

export function ChromeButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  glowColor = 'cyan',
}: ChromeButtonProps) {
  const glowColors: Record<string, string> = {
    cyan: 'var(--neon-cyan)',
    magenta: 'var(--neon-magenta)',
    yellow: 'var(--neon-yellow)',
    pink: 'var(--neon-pink)',
    blue: 'var(--neon-blue)',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`chrome-button px-6 py-3 font-orbitron text-sm uppercase tracking-wider ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{
        color: glowColors[glowColor],
        textShadow: `0 0 10px ${glowColors[glowColor]}`,
      }}
    >
      {children}
    </motion.button>
  );
}
