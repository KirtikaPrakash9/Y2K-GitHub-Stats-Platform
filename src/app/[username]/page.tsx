'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProfileCard } from '@/components/ProfileCard';
import { StatsDashboard } from '@/components/StatsDashboard';
import { PersonalitySection } from '@/components/PersonalitySection';
import { GitHubWrapped } from '@/components/GitHubWrapped';
import { DeepInsights } from '@/components/DeepInsights';
import { ReadmeGenerator } from '@/components/ReadmeGenerator';
import { ResultsNav } from '@/components/ResultsNav';
import { GlassPanel } from '@/components/GlassPanel';

interface UserData {
  user: {
    login: string;
    avatarUrl: string;
    name: string;
    bio: string;
    followers: { totalCount: number };
    following: { totalCount: number };
  };
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    totalCommits: number;
    totalPRs: number;
    followers: number;
    following: number;
    languages: Record<string, number>;
    topLanguages: { name: string; color: string; count: number }[];
    peakHour: number;
    peakDay: string;
    streak: number;
    projectsAbandoned: number;
  };
  personality: {
    type: string;
    badge: string;
    description: string;
    color: string;
  };
  level: {
    level: number;
    title: string;
    xp: number;
    xpToNext: number;
    progress: number;
  };
}

export default function ResultsPage() {
  const params = useParams();
  const username = params.username as string;
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [userRes, personalityRes] = await Promise.all([
          fetch(`/api/user?username=${username}`),
          fetch(`/api/personality?username=${username}`),
        ]);

        if (!userRes.ok) {
          if (userRes.status === 404) {
            throw new Error('User not found');
          }
          throw new Error('Failed to fetch user data');
        }

        const userData = await userRes.json();
        const personalityData = await personalityRes.json();

        const xp = userData.stats.totalCommits + (userData.stats.totalStars * 10) + (userData.stats.totalRepos * 5);
        const level = Math.floor(xp / 100) + 1;
        const titles = ['Beginner', 'Learner', 'Builder', 'Creator', 'Contributor', 'Hacker', 'Expert', 'Master', 'Legend', 'Grandmaster'];
        const titleIndex = Math.min(Math.floor((level - 1) / 5), titles.length - 1);
        const xpForLevel = (lvl: number) => lvl * 100;
        const xpToNext = xpForLevel(level + 1) - xp;
        const prevLevelXp = xpForLevel(level);
        const progress = Math.min(((xp - prevLevelXp) / 100) * 100, 100);

        setData({
          ...userData,
          personality: personalityData.personality,
          level: {
            level,
            title: titles[titleIndex],
            xp,
            xpToNext,
            progress,
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 star-field opacity-50" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center"
        >
          <GlassPanel glowColor="cyan" className="p-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6 border-4 border-t-transparent rounded-full"
              style={{ borderColor: 'var(--neon-cyan)', borderTopColor: 'transparent' }}
            />
            <div className="font-orbitron text-xl text-[var(--neon-cyan)]">
              Analyzing @{username}...
            </div>
            <div className="font-mono text-sm text-gray-400 mt-2">
              Fetching repositories & computing personality
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 star-field opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md"
        >
          <GlassPanel glowColor="magenta" className="p-8">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="font-orbitron text-2xl font-bold text-[var(--neon-magenta)] mb-2">
              Oops!
            </h2>
            <p className="font-mono text-gray-400 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block chrome-button px-6 py-3 font-orbitron text-sm uppercase tracking-wider text-[var(--neon-cyan)]"
            >
              ← Try Again
            </a>
          </GlassPanel>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <div className="fixed inset-0 star-field opacity-30" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(var(--neon-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      <ResultsNav username={username} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block pixel-badge mb-4">✨ ANALYSIS COMPLETE</div>
          <h1 className="font-orbitron text-4xl md:text-5xl font-black">
            <span className="text-[var(--neon-cyan)]">@</span>
            <span className="text-white">{username}</span>
          </h1>
        </motion.div>

        {/* Profile Card */}
        <div className="mb-8">
          <ProfileCard
            avatar={data.user.avatarUrl}
            username={data.user.login}
            name={data.user.name}
            bio={data.user.bio}
            followers={data.user.followers.totalCount}
            following={data.user.following.totalCount}
          />
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white mb-4 flex items-center gap-2">
            📊 <span className="text-[var(--neon-cyan)]">Stats Dashboard</span>
          </h2>
          <StatsDashboard stats={data.stats} />
        </div>

        {/* Dev Personality */}
        <div className="mb-8">
          <PersonalitySection personality={data.personality} level={data.level} />
        </div>

        {/* GitHub Wrapped */}
        <div className="mb-8">
          <GitHubWrapped stats={data.stats} />
        </div>

        {/* Deep Insights */}
        <div className="mb-8">
          <DeepInsights stats={data.stats} />
        </div>

        {/* README Generator */}
        <div className="mb-8">
          <ReadmeGenerator
            username={username}
            stats={data.stats}
            personality={data.personality}
          />
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-8 border-t border-[rgba(255,255,255,0.1)]"
        >
          <p className="font-mono text-sm text-gray-500">
            Made with 💖 using Next.js & GitHub GraphQL
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
