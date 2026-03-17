# GitWrapped.exe 🎮

A Y2K-inspired GitHub analytics platform that transforms your GitHub profile into an interactive, nostalgic, visually rich experience. Think Windows XP meets Cyberpunk meets GitHub stats.

![GitWrapped Preview](https://img.shields.io/badge/Next.js-14-black) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple)

## ✨ Features

- **🌈 Y2K Aesthetic**: Neon gradients, glassmorphism panels, chrome buttons, pixel fonts
- **📊 Visual Stats**: Animated counters, glowing cards, interactive dashboards
- **🧬 AI Personality**: Rule-based dev personality analysis based on your coding patterns
- **🎬 GitHub Wrapped**: Slideshow format showing your top stats
- **🧪 Deep Insights**: Consistency scores, language distribution, project completion
- **🧾 Shareable Cards**: Generate SVG cards for your README
- **⚡ No Login Required**: Just enter a username

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

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── user/         # GitHub user data
│   │   ├── personality/   # Dev personality analysis
│   │   └── card/          # SVG card generation
│   ├── [username]/       # Results page
│   ├── globals.css       # Y2K theme styles
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── components/            # React components
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

### Results Page (/[username])

1. Profile Card - Avatar, name, bio, followers
2. Stats Dashboard - Repos, stars, commits, PRs
3. Dev Personality - Type, badge, description, level
4. GitHub Wrapped - Slideshow with navigation
5. Deep Insights - Consistency, completion, languages
6. README Generator - Copy markdown, download image

## 🎮 Gamification

- **Levels**: 1-50 based on XP (commits + stars + repos)
- **Badges**: Night Owl, Consistent Dev, Polyglot
- **XP Calculation**: 1 commit = 1 XP, 1 star = 10 XP, 1 repo = 5 XP

## 🤖 Personality Types

- 🌙 Late Night Frontend Hacker
- 🤖 AI Explorer  
- 🎨 Frontend Artisan
- 🏗️ Backend Architect
- 🛠️ Weekend Builder
- ⭐ Open Source Grinder
- ⚖️ Balanced Developer

## 📦 API Endpoints

- `GET /api/user?username=` - User profile + repos
- `GET /api/stats?username=` - Processed stats
- `GET /api/personality?username=` - Dev personality
- `GET /api/card?username=` - SVG card image

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
