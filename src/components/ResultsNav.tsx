'use client';

import Link from 'next/link';
import { ChromeButton } from './ChromeButton';

interface ResultsNavProps {
  username: string;
}

export function ResultsNav({ username }: ResultsNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-darker)]/80 backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-orbitron text-xl font-bold">
            <span className="text-[var(--neon-cyan)]">Git</span>
            <span className="text-[var(--neon-magenta)]">Wrapped</span>
          </span>
          <span className="text-[var(--neon-yellow)] text-sm font-mono">.exe</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href={`/${username}`}>
            <ChromeButton glowColor="cyan" className="text-sm py-2 px-4">
              🔄 Refresh
            </ChromeButton>
          </Link>
          <Link href="/">
            <ChromeButton glowColor="magenta" className="text-sm py-2 px-4">
              🏠 New Search
            </ChromeButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
