'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { ChromeButton } from './ChromeButton';

interface BadgeGeneratorProps {
  username: string;
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
  };
  personality: {
    type: string;
    icon: string;
    color: string;
  };
  level: {
    level: number;
    title: string;
  };
}

const BADGE_STYLES = [
  { id: 'default', name: 'Default', bg: '#0a0a1a', border: '#00ffff', text: '#00ffff' },
  { id: 'cyber', name: 'Cyber', bg: '#1a0a2a', border: '#ff00ff', text: '#ff00ff' },
  { id: 'sunset', name: 'Sunset', bg: '#2a1a0a', border: '#ff6b6b', text: '#ff6b6b' },
  { id: 'forest', name: 'Forest', bg: '#0a1a0a', border: '#00ff88', text: '#00ff88' },
  { id: 'ocean', name: 'Ocean', bg: '#0a1a2a', border: '#0066ff', text: '#0066ff' },
  { id: 'gold', name: 'Gold', bg: '#1a1a0a', border: '#ffff00', text: '#ffff00' },
];

export function BadgeGenerator({ username, stats, personality, level }: BadgeGeneratorProps) {
  const [selectedStyle, setSelectedStyle] = useState(BADGE_STYLES[0]);
  const [copied, setCopied] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const badgeUrl = `${process.env.NEXT_PUBLIC_DOMAIN || 'https://gitwrapped.vercel.app'}/api/card?username=${username}&theme=${selectedStyle.id === 'default' ? 'cyberpunk' : selectedStyle.id}`;

  const markdown = `[![GitHub Stats](${badgeUrl})](https://gitwrapped.vercel.app/${username})`;
  const html = `<a href="https://gitwrapped.vercel.app/${username}"><img src="${badgeUrl}" alt="GitHub Stats for ${username}"/></a>`;

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="cyan" className="p-6">
        <h3 className="font-orbitron text-xl font-bold text-white mb-6">
          🎖️ Profile Badge
        </h3>

        {/* Style selector */}
        <div className="mb-6">
          <span className="font-mono text-sm text-gray-400 block mb-3">Badge Style:</span>
          <div className="flex flex-wrap gap-2">
            {BADGE_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                  selectedStyle.id === style.id
                    ? 'ring-2 ring-white'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  color: style.text,
                }}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {/* Badge preview */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{
            background: selectedStyle.bg,
            border: `2px solid ${selectedStyle.border}`,
          }}
        >
          <img
            src={badgeUrl}
            alt="Profile Badge"
            className="w-full max-w-md mx-auto rounded"
          />
        </div>

        {/* Copy buttons */}
        <div className="flex flex-wrap gap-3">
          <ChromeButton onClick={copyMarkdown} glowColor="cyan">
            {copiedMarkdown ? '✓ Copied!' : '📋 Copy Markdown'}
          </ChromeButton>
          <ChromeButton onClick={copyHtml} glowColor="magenta">
            {copied ? '✓ Copied!' : '📄 Copy HTML'}
          </ChromeButton>
        </div>

        {/* Preview in context */}
        <div className="mt-6 p-4 bg-black/50 rounded-lg">
          <p className="font-mono text-xs text-gray-400 mb-2">Preview:</p>
          <div className="flex items-center gap-2">
            <img src={badgeUrl} alt="Badge" className="h-8 rounded" />
            <span className="font-mono text-sm text-gray-400">
              Click badge to view full stats →
            </span>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
