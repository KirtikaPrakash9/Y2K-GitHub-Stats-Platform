# GitWrapped.exe 🎮

A Y2K-inspired GitHub analytics platform that transforms your GitHub profile into an interactive, nostalgic, visually rich experience. Think Windows XP meets Cyberpunk meets GitHub stats.

![GitWrapped Preview](https://img.shields.io/badge/Next.js-14-black) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6)

## ✨ Features

### Core Features
- **🌈 Y2K Aesthetic**: Neon gradients, glassmorphism panels, chrome buttons, pixel fonts
- **📊 Visual Stats**: Animated counters, glowing cards, interactive dashboards
- **🧬 AI Personality**: Advanced dev personality analysis with 10+ personality types
- **🎬 GitHub Wrapped**: Slideshow format showing your top stats
- **🧪 Deep Insights**: Consistency scores, language distribution, project completion
- **🧾 Shareable Cards**: Generate SVG cards for your README with 5 themes
- **⚡ No Login Required**: Just enter a username

### Advanced Features
- **📅 Contribution Heatmap**: Year-round contribution calendar with hover tooltips
- **🏆 Achievement System**: 12+ unlockable badges with progress tracking
- **😂 Roast My GitHub**: Funny roasts based on your coding habits
- **📈 Language Charts**: Bar and circular visualizations of your tech stack
- **⏰ Coding Patterns**: Visualize when you're most productive
- **⭐ Top Repositories**: Showcase your best work with star counts
- **📊 Activity Timeline**: Monthly contribution trends with peak detection
- **🔗 Social Sharing**: Share your stats to Twitter/X

### API Endpoints
- `GET /api/user?username=` - User profile + repo data
- `GET /api/personality?username=` - Dev personality analysis
- `GET /api/card?username=&theme=` - SVG card generation (5 themes)
- `GET /api/full?username=` - Complete user data with achievements
- `GET /api/featured` - Featured developers list
- `GET /api/leaderboard` - Top contributors leaderboard

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Manavarya09/Y2K-GitHub-Stats-Platform.git
cd Y2K-GitHub-Stats-Platform

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your GitHub token to .env.local

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_DOMAIN=https://your-domain.com

# Optional: Upstash Redis for caching
KV_REST_API_URL=your_upstash_url
KV_REST_API_TOKEN=your_upstash_token
```

## 📋 GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with these scopes:
   - `read:user`
   - `public_repo`

## 🎨 Design System

### Colors

- Primary: `#00ffff` (Cyan neon)
- Secondary: `#ff00ff` (Magenta neon)
- Accent: `#ffff00` (Yellow)
- Background: `#0a0a1a` (Dark)

### Fonts

- Headings: Orbitron
- Body: Space Mono
- Badges: Press Start 2P

### Card Themes

- Cyberpunk (cyan + magenta)
- Sunset Vibes (red + yellow)
- Forest (green + cyan)
- Ocean (blue + cyan)
- Purple Haze (magenta + green)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── user/         # GitHub user data
│   │   ├── personality/   # Dev personality analysis
│   │   ├── card/          # SVG card generation
│   │   ├── full/          # Complete user data
│   │   ├── featured/      # Featured developers
│   │   └── leaderboard/   # Top contributors
│   ├── [username]/       # Results page
│   ├── globals.css       # Y2K theme styles
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── AchievementSection.tsx
│   ├── ActivityTimeline.tsx
│   ├── ChromeButton.tsx
│   ├── CodingPatternViz.tsx
│   ├── ContributionHeatmap.tsx
│   ├── DeepInsights.tsx
│   ├── GitHubWrapped.tsx
│   ├── GlassPanel.tsx
│   ├── LanguageChart.tsx
│   ├── LandingPage.tsx
│   ├── PersonalitySection.tsx
│   ├── ProfileCard.tsx
│   ├── ReadmeGenerator.tsx
│   ├── RoastCard.tsx
│   ├── StatCard.tsx
│   ├── StatsDashboard.tsx
│   ├── TopReposSection.tsx
│   └── ...
└── lib/                   # GitHub API & utilities
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Upstash Redis (optional caching)
- **API**: GitHub GraphQL API
- **Deployment**: Vercel

## 📱 Pages

### Landing Page (/)

- Animated title "GitWrapped.exe"
- Username input with blinking cursor
- Fake "system scanning" loading sequence
- Featured developers showcase

### Results Page (/[username])

1. Profile Card - Avatar, name, bio, followers
2. Stats Dashboard - Repos, stars, commits, PRs
3. Dev Personality - Type, badge, description, level
4. GitHub Wrapped - Slideshow with navigation
5. Contribution Heatmap - Year-round calendar
6. Language Distribution - Bar + circular charts
7. Activity Timeline - Monthly trends
8. Coding Pattern - When you code most
9. Top Repositories - Best projects showcase
10. Deep Insights - Consistency, completion, languages
11. Achievements - Unlockable badges
12. Roast My GitHub - Funny roasts
13. README Generator - Copy markdown, download, share

## 🎮 Gamification

- **Levels**: 1-50 based on XP (commits + stars + repos + PRs)
- **Ranks**: Novice → Divine (10 tiers)
- **Badges**: 12+ achievements with progress tracking
- **XP Calculation**: 1 commit = 1 XP, 1 star = 10 XP, 1 repo = 5 XP, 1 PR = 3 XP

## 🤖 Personality Types (10+ Types)

- 🌙 Late Night Frontend Hacker
- 🤖 AI Explorer  
- 🎨 Frontend Artisan
- 🏗️ Backend Architect
- 🛠️ Weekend Builder
- ⭐ Open Source Grinder
- 🔮 Full Stack Phenom
- ⚓ DevOps Dynamo
- 🦀 Rust Evangelist
- 📱 Mobile Maven

## 🏆 Achievements

| Badge | Name | Rarity |
|-------|------|--------|
| 👶 | Hello World | Common |
| 💯 | Century Club | Common |
| 🏆 | Thousand Commits | Rare |
| 👑 | Legendary | Legendary |
| ⭐ | Star Collector | Rare |
| 🌟 | Popular Kid | Epic |
| 🌍 | Polyglot | Rare |
| 🦉 | Night Owl | Common |
| 🔥 | Streak Master | Rare |
| ⚡ | Unstoppable | Legendary |

## 📦 API Examples

```bash
# Get user data
curl "https://gitwrapped.vercel.app/api/user?username=torvalds"

# Get personality
curl "https://gitwrapped.vercel.app/api/personality?username=torvalds"

# Generate card with theme
curl "https://gitwrapped.vercel.app/api/card?username=torvalds&theme=sunset"

# Get full data
curl "https://gitwrapped.vercel.app/api/full?username=torvalds"

# Featured developers
curl "https://gitwrapped.vercel.app/api/featured"

# Leaderboard
curl "https://gitwrapped.vercel.app/api/leaderboard?type=stars"
```

## 🚀 Deployment

Deploy to Vercel:

```bash
npm i -g vercel
vercel
```

Or push to GitHub and connect to Vercel.

## 📄 License

MIT

---

Made with 💖 using Next.js & GitHub GraphQL API
