# GitWrapped - Y2K GitHub Analytics Platform

## Project Overview
- **Name**: GitWrapped
- **Type**: Full-stack web application
- **Core Functionality**: Transform GitHub profiles into an interactive Y2K-styled analytics experience
- **Target Users**: Developers who want fun, shareable GitHub stats

## Tech Stack
- Next.js 14 (App Router)
- TailwindCSS
- Framer Motion
- GitHub GraphQL API
- Satori (SVG rendering)
- Vercel KV (caching)

## UI/UX Specification

### Design System (Y2K Theme)

**Color Palette**:
- Primary: `#00ffff` (Cyan neon)
- Secondary: `#ff00ff` (Magenta neon)
- Accent: `#ffff00` (Yellow)
- Background Dark: `#0a0a1a`
- Background Glass: `rgba(255,255,255,0.05)`
- Border Glow: `#00ffff`

**Typography**:
- Headings: 'Orbitron', monospace
- Body: 'Space Mono', monospace
- Pixel: 'Press Start 2P' (for badges)

**Effects**:
- Glassmorphism: blur(10px) + rgba backgrounds
- Chrome buttons: gradient backgrounds with shine
- Neon glow: box-shadow with color spread
- CRT scanlines: optional overlay
- Glitch effects on transitions

### Pages

#### 1. Landing Page (/)
- Animated title "GitWrapped.exe"
- Subtitle "Analyze your GitHub like it's 2003"
- Username input with blinking cursor
- CTA button "Analyze Profile"
- Loading animation with fake "system scanning"
- Floating badges

#### 2. Results Page (/[username])
- Profile Card (avatar, username, stats)
- Stats Dashboard (total repos, stars, followers, following)
- Dev Personality (AI-generated type + description)
- GitHub Wrapped (slideshow format)
- Deep Insights (charts, scores)
- README Generator (preview + copy + download)

## Functionality

### API Endpoints
1. `/api/user?username=` - Basic profile + repos
2. `/api/stats?username=` - Processed stats
3. `/api/personality?username=` - Dev type + description
4. `/api/card?username=` - SVG card image

### Personality Engine
Types:
- Late Night Frontend Hacker
- Backend Architect
- AI Explorer
- Open Source Grinder
- Weekend Builder

### Gamification
- Levels: 1-50 based on XP
- Badges: Night Owl, Consistent Dev, Polyglot

## Acceptance Criteria
- [ ] Landing page loads with Y2K aesthetic
- [ ] Username input works and redirects to results
- [ ] Results page shows all 6 sections
- [ ] GitHub API integration works
- [ ] SVG card generates correctly
- [ ] Mobile responsive
- [ ] No login required
- [ ] Fast load times
