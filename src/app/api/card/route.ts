import { NextRequest, NextResponse } from 'next/server';
import { getGitHubUser, calculateStats, analyzePersonality, calculateLevel } from '@/lib/github';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    const user = await getGitHubUser(username);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stats = calculateStats(user);
    const personality = analyzePersonality(user, stats);
    const level = calculateLevel(stats);

    const svg = generateCardSVG({
      username: user.login,
      avatar: user.avatarUrl,
      stats,
      personality,
      level,
    });

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating card:', error);
    return NextResponse.json(
      { error: 'Failed to generate card' },
      { status: 500 }
    );
  }
}

interface CardData {
  username: string;
  avatar: string;
  stats: ReturnType<typeof calculateStats>;
  personality: ReturnType<typeof analyzePersonality>;
  level: ReturnType<typeof calculateLevel>;
}

function generateCardSVG(data: CardData): string {
  const { username, avatar, stats, personality, level } = data;
  
  return `
<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a1a"/>
      <stop offset="100%" style="stop-color:#1a0a2a"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.5"/>
      <stop offset="50%" style="stop-color:#ff00ff;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0.5"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="avatarClip">
      <circle cx="100" cy="100" r="45"/>
    </clipPath>
  </defs>
  
  <rect width="600" height="200" rx="16" fill="url(#bgGrad)"/>
  <rect x="2" y="2" width="596" height="196" rx="14" fill="none" stroke="url(#glowGrad)" stroke-width="2" filter="url(#glow)"/>
  
  <circle cx="100" cy="100" r="48" fill="none" stroke="${personality.color}" stroke-width="3" filter="url(#glow)" opacity="0.8"/>
  <circle cx="100" cy="100" r="45" fill="#0a0a1a"/>
  <image x="55" y="55" width="90" height="90" xlink:href="${avatar}" clip-path="url(#avatarClip)"/>
  
  <text x="170" y="60" font-family="monospace" font-size="24" font-weight="bold" fill="#fff">@${username}</text>
  <text x="170" y="85" font-family="monospace" font-size="12" fill="${personality.color}">${personality.type}</text>
  
  <rect x="170" y="100" width="100" height="20" rx="4" fill="rgba(255,255,255,0.1)"/>
  <rect x="170" y="100" width="${level.progress}" height="20" rx="4" fill="url(#glowGrad)"/>
  <text x="180" y="114" font-family="monospace" font-size="10" fill="#fff">Lv.${level.level} ${level.title}</text>
  
  <g transform="translate(300, 50)">
    <text x="0" y="0" font-family="monospace" font-size="11" fill="#888">REPOS</text>
    <text x="0" y="20" font-family="monospace" font-size="18" font-weight="bold" fill="#00ffff">${stats.totalRepos}</text>
  </g>
  <g transform="translate(300, 100)">
    <text x="0" y="0" font-family="monospace" font-size="11" fill="#888">STARS</text>
    <text x="0" y="20" font-family="monospace" font-size="18" font-weight="bold" fill="#ffff00">${stats.totalStars}</text>
  </g>
  <g transform="translate(420, 50)">
    <text x="0" y="0" font-family="monospace" font-size="11" fill="#888">COMMITS</text>
    <text x="0" y="20" font-family="monospace" font-size="18" font-weight="bold" fill="#ff00ff">${stats.totalCommits}</text>
  </g>
  <g transform="translate(420, 100)">
    <text x="0" y="0" font-family="monospace" font-size="11" fill="#888">FOLLOWERS</text>
    <text x="0" y="20" font-family="monospace" font-size="18" font-weight="bold" fill="#ff6b9d">${stats.followers}</text>
  </g>
  
  <text x="580" y="190" font-family="monospace" font-size="10" fill="#666" text-anchor="end">GitWrapped.exe</text>
</svg>
  `.trim();
}
