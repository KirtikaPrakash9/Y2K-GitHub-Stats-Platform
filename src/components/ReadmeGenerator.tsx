'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import { ChromeButton } from './ChromeButton';
import { generateReadmeMarkdown, generateReadmeSnippet } from '@/lib/readme';

interface ReadmeGeneratorProps {
  username: string;
  stats: {
    totalRepos: number;
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    totalForks: number;
    followers: number;
    streak: number;
    peakDay: string;
    codingPattern: 'morning' | 'afternoon' | 'evening' | 'night';
    yearlyContributions: number;
    topLanguages: Array<{ name: string; color: string; count: number; bytes: number }>;
  };
  personality: {
    type: string;
    badge: string;
    icon: string;
    idealRole?: string;
    strengths?: string[];
  };
}

const THEMES = [
  { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#00ffff', '#ff00ff'] },
  { id: 'sunset', name: 'Sunset Vibes', colors: ['#ff6b6b', '#ffd93d'] },
  { id: 'forest', name: 'Forest', colors: ['#00ff88', '#00ffff'] },
  { id: 'ocean', name: 'Ocean', colors: ['#0066ff', '#00ffff'] },
  { id: 'purple', name: 'Purple Haze', colors: ['#ff00ff', '#00ff88'] },
];

export function ReadmeGenerator({ username, stats, personality }: ReadmeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('cyberpunk');
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [template, setTemplate] = useState<'compact' | 'full'>('full');
  const [includeLanguages, setIncludeLanguages] = useState(true);
  const [includePersonality, setIncludePersonality] = useState(true);
  const [includeActivity, setIncludeActivity] = useState(true);
  const [includeBadges, setIncludeBadges] = useState(true);

  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://gitwrapped.vercel.app';
  const cardUrl = `${domain}/api/card?username=${username}&theme=${selectedTheme}`;
  const markdown = generateReadmeMarkdown({
    username,
    cardUrl,
    domain,
    stats,
    personality,
    options: {
      template,
      includeBadges,
      includeActivity,
      includeLanguages,
      includePersonality,
    },
  });
  const singleLineSnippet = generateReadmeSnippet({ username, theme: selectedTheme });

  const copyMarkdownToClipboard = async (content: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;

    if (typeof ClipboardItem !== 'undefined' && typeof navigator.clipboard.write === 'function') {
      const plain = new Blob([content], { type: 'text/plain' });
      const markdownBlob = new Blob([content], { type: 'text/markdown' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': plain,
          'text/markdown': markdownBlob,
        }),
      ]);
      return;
    }

    await navigator.clipboard.writeText(content);
  };

  const copyToClipboard = async () => {
    await copyMarkdownToClipboard(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copySnippet = async () => {
    await copyMarkdownToClipboard(singleLineSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const copyImageUrl = async () => {
    await navigator.clipboard.writeText(cardUrl);
    setCopiedImage(true);
    setTimeout(() => setCopiedImage(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${username}-gitwrapped-${template}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(cardUrl);
      const svg = await response.text();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gitwrapped-${username}-${selectedTheme}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `Check out my GitWrapped! 🔥\n\n📚 ${stats.totalRepos} repos\n⭐ ${stats.totalStars} stars\n🎯 ${stats.totalCommits} commits\n\nGenerate yours at gitwrapped.vercel.app #GitWrapped #Developer`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <GlassPanel glowColor="pink" className="p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)' }} />
        <div className="relative z-10">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-2">🧾 README Generator</h3>
          <p className="font-mono text-xs text-gray-400 mb-6">Build polished markdown without object leaks. Export, copy, and share in one click.</p>

          {/* Theme selector */}
          <div className="mb-6">
            <span className="font-mono text-sm text-gray-400 block mb-3">Choose Card Theme:</span>
            <div className="flex flex-wrap gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    selectedTheme === theme.id
                      ? 'ring-2 ring-white'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}30, ${theme.colors[1]}30)`,
                    border: `1px solid ${selectedTheme === theme.id ? '#fff' : theme.colors[0]}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: theme.colors[0] }}
                    />
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: theme.colors[1] }}
                    />
                    <span className="text-white">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[rgba(0,0,0,0.3)] rounded-lg border border-white/10">
              <p className="font-mono text-xs text-gray-400 mb-2">Template</p>
              <div className="flex gap-2">
                <button onClick={() => setTemplate('full')} className={`px-3 py-2 rounded-md font-mono text-xs ${template === 'full' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
                  Full Profile
                </button>
                <button onClick={() => setTemplate('compact')} className={`px-3 py-2 rounded-md font-mono text-xs ${template === 'compact' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
                  Compact
                </button>
              </div>
            </div>

            <div className="p-4 bg-[rgba(0,0,0,0.3)] rounded-lg border border-white/10">
              <p className="font-mono text-xs text-gray-400 mb-2">Sections</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeBadges} onChange={(e) => setIncludeBadges(e.target.checked)} /> Badges</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeActivity} onChange={(e) => setIncludeActivity(e.target.checked)} /> Activity</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={includeLanguages} onChange={(e) => setIncludeLanguages(e.target.checked)} /> Languages</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={includePersonality} onChange={(e) => setIncludePersonality(e.target.checked)} /> Personality</label>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="mb-6 p-4 bg-[rgba(0,0,0,0.3)] rounded-lg overflow-hidden border border-white/10">
            <img
              src={cardUrl}
              alt="GitWrapped Card"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-4">
            <ChromeButton onClick={copyToClipboard} glowColor="cyan">
              {copied ? '✓ Copied Markdown!' : '📋 Copy Markdown'}
            </ChromeButton>
            <ChromeButton onClick={copySnippet} glowColor="blue">
              {copiedSnippet ? '✓ Copied Snippet!' : '🧩 Copy One-Line Snippet'}
            </ChromeButton>
            <ChromeButton onClick={copyImageUrl} glowColor="blue">
              {copiedImage ? '✓ Copied URL!' : '🔗 Copy Image URL'}
            </ChromeButton>
            <ChromeButton onClick={downloadImage} glowColor="magenta">
              💾 Download Image
            </ChromeButton>
            <ChromeButton onClick={downloadMarkdown} glowColor="magenta">
              {downloaded ? '✓ Downloaded .md' : '⬇ Download .md'}
            </ChromeButton>
          </div>

          {/* Social Share */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(29,161,242,0.1)] hover:bg-[rgba(29,161,242,0.2)] transition-colors text-[#1DA1F2] font-mono text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share on X
            </button>
          </div>

          {/* Markdown Preview */}
          <details className="mt-6">
            <summary className="font-mono text-sm text-gray-300 cursor-pointer hover:text-white">
              Open Terminal Preview
            </summary>
            <pre className="mt-4 p-4 bg-[rgba(0,0,0,0.7)] rounded-lg overflow-x-auto text-xs font-mono text-gray-200 max-h-72 border border-cyan-500/30">
{`C:\\Users\\${username}> run gitwrapped --export ${template}
===========================================
${markdown}
===========================================`}
            </pre>
          </details>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
