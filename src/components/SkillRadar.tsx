'use client';

import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface SkillRadarProps {
  stats: {
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    totalStars: number;
    totalRepos: number;
    totalForks: number;
  };
}

export function SkillRadar({ stats }: SkillRadarProps) {
  const maxValues = {
    commits: Math.max(stats.totalCommits, 1000),
    prs: Math.max(stats.totalPRs, 100),
    issues: Math.max(stats.totalIssues, 50),
    stars: Math.max(stats.totalStars, 100),
    repos: Math.max(stats.totalRepos, 20),
    forks: Math.max(stats.totalForks, 20),
  };

  const skills = [
    { name: 'Commits', value: stats.totalCommits, max: maxValues.commits, color: '#00ffff' },
    { name: 'PRs', value: stats.totalPRs, max: maxValues.prs, color: '#ff00ff' },
    { name: 'Issues', value: stats.totalIssues, max: maxValues.issues, color: '#ffff00' },
    { name: 'Stars', value: stats.totalStars, max: maxValues.stars, color: '#ff6b9d' },
    { name: 'Repos', value: stats.totalRepos, max: maxValues.repos, color: '#00ff88' },
    { name: 'Forks', value: stats.totalForks, max: maxValues.forks, color: '#00d4ff' },
  ];

  const size = 200;
  const center = size / 2;
  const radius = 80;
  const angleStep = (Math.PI * 2) / skills.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const normalizedValue = Math.min(value / skills[index].max, 1);
    return {
      x: center + Math.cos(angle) * radius * normalizedValue,
      y: center + Math.sin(angle) * radius * normalizedValue,
    };
  };

  const polygonPoints = skills
    .map((skill, i) => getPoint(i, skill.value))
    .map(p => `${p.x},${p.y}`)
    .join(' ');

  const getGridPoints = (level: number) => {
    return skills
      .map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return `${center + Math.cos(angle) * radius * level},${center + Math.sin(angle) * radius * level}`;
      })
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassPanel glowColor="cyan" className="p-6">
        <h3 className="font-orbitron text-xl font-bold text-white mb-6 text-center">
          🎯 Skill Radar
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Radar Chart */}
          <div className="relative">
            <svg width={size} height={size} className="overflow-visible">
              {/* Grid circles */}
              {[0.25, 0.5, 0.75, 1].map((level, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={radius * level}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Grid lines */}
              {skills.map((_, i) => {
                const angle = angleStep * i - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={center + Math.cos(angle) * radius}
                    y2={center + Math.sin(angle) * radius}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon */}
              <motion.polygon
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                points={polygonPoints}
                fill="url(#radarGradient)"
                stroke="#00ffff"
                strokeWidth="2"
              />

              {/* Data points */}
              {skills.map((skill, i) => {
                const point = getPoint(i, skill.value);
                return (
                  <motion.circle
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill={skill.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Labels */}
              {skills.map((skill, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const labelRadius = radius + 25;
                const x = center + Math.cos(angle) * labelRadius;
                const y = center + Math.sin(angle) * labelRadius;
                
                return (
                  <text
                    key={skill.name}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={skill.color}
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    {skill.name}
                  </text>
                );
              })}

              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Skill bars */}
          <div className="space-y-3 min-w-[200px]">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-xs text-gray-400">{skill.name}</span>
                  <span className="font-mono text-xs" style={{ color: skill.color }}>
                    {skill.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((skill.value / skill.max) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
