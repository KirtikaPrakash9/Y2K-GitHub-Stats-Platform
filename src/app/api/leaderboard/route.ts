import { NextRequest, NextResponse } from 'next/server';

interface LeaderboardEntry {
  rank: number;
  username: string;
  commits: number;
  stars: number;
  level: number;
  rankTitle: string;
}

const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'torvalds', commits: 50000, stars: 150000, level: 50, rankTitle: 'Divine' },
  { rank: 2, username: 'yyx990803', commits: 45000, stars: 120000, level: 49, rankTitle: 'Transcendent' },
  { rank: 3, username: 'gaearon', commits: 40000, stars: 100000, level: 48, rankTitle: 'Transcendent' },
  { rank: 4, username: 'taylorotwell', commits: 35000, stars: 95000, level: 47, rankTitle: 'Mythic' },
  { rank: 5, username: 'dhh', commits: 30000, stars: 90000, level: 46, rankTitle: 'Mythic' },
  { rank: 6, username: 'kentcdodds', commits: 28000, stars: 85000, level: 45, rankTitle: 'Mythic' },
  { rank: 7, username: 'sindresorhus', commits: 25000, stars: 80000, level: 44, rankTitle: 'Legend' },
  { rank: 8, username: 'brendaneich', commits: 22000, stars: 75000, level: 43, rankTitle: 'Legend' },
  { rank: 9, username: 'addyosmani', commits: 20000, stars: 70000, level: 42, rankTitle: 'Legend' },
  { rank: 10, username: 'tj', commits: 18000, stars: 65000, level: 41, rankTitle: 'Grandmaster' },
];

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'commits';

  let sorted = [...DEMO_LEADERBOARD];
  
  if (type === 'stars') {
    sorted = DEMO_LEADERBOARD.sort((a, b) => b.stars - a.stars);
  } else if (type === 'level') {
    sorted = DEMO_LEADERBOARD.sort((a, b) => b.level - a.level);
  } else {
    sorted = DEMO_LEADERBOARD.sort((a, b) => b.commits - a.commits);
  }

  return NextResponse.json(
    { 
      leaderboard: sorted.map((u, i) => ({ ...u, rank: i + 1 })),
      type,
    },
    {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    }
  );
}
