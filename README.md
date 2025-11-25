# Chronicle AI

An AI-powered news intelligence platform that delivers personalized, curated content with advanced search, analytics, and intelligent recommendations.

## Overview

Chronicle AI is a modern, full-stack web application built with Next.js, TypeScript, and tRPC. It provides users with a sophisticated platform to discover, read, and engage with news articles through an intuitive interface enhanced with real-time search, trending topics, and personalized recommendations.

## Tech Stack

### Frontend
- **Framework**: [Next.js 16.0.4](https://nextjs.org) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion)
- **State Management**: [React Query](https://tanstack.com/query)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) with dark mode support

### Backend & API
- **RPC Framework**: [tRPC](https://trpc.io) for end-to-end type-safe APIs
- **Runtime Validation**: [Zod](https://zod.dev)
- **Serialization**: [SuperJSON](https://github.com/blitz-js/superjson)

### Development Tools
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm
- **Version Control**: Git

## Project Structure

```
chronicle-ai/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   └── admin/
│   │   ├── api/
│   │   │   └── trpc/                 # tRPC API endpoint
│   │   ├── article/[slug]/           # Dynamic article pages
│   │   ├── category/[slug]/          # Category pages
│   │   ├── search/                   # Search page
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles
│   │   └── providers.tsx             # Client providers
│   ├── components/
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── common/                   # Reusable components
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── CategoryChip.tsx
│   │   │   └── TrendingTopics.tsx
│   │   ├── home/                     # Home page components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedArticles.tsx
│   │   │   └── LatestArticles.tsx
│   │   ├── article/                  # Article components
│   │   │   ├── ArticleContent.tsx
│   │   │   └── RelatedArticles.tsx
│   │   ├── search/                   # Search components
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── dashboard/                # Dashboard components
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── StatsCard.tsx
│   │   └── ui/                       # shadcn/ui components
│   ├── server/
│   │   └── api/
│   │       ├── trpc.ts               # tRPC configuration
│   │       ├── root.ts               # Router aggregation
│   │       └── routers/
│   │           ├── article.ts        # Article operations
│   │           ├── user.ts           # User operations
│   │           ├── search.ts         # Search operations
│   │           └── admin.ts          # Admin operations
│   ├── lib/
│   │   ├── trpc/
│   │   │   ├── client.ts             # tRPC client setup
│   │   │   └── server.ts             # tRPC server caller
│   │   ├── mock-data.ts              # Mock data for development
│   │   ├── constants.ts              # App constants
│   │   └── animation-variants.ts     # Framer Motion variants
│   └── types/
│       ├── article.ts                # Article types
│       ├── user.ts                   # User types
│       ├── category.ts               # Category types
│       └── api.ts                    # API response types
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── components.json                   # shadcn/ui configuration
```

## Features

### Core Features
- **Home Page**: Featured articles, latest content, and trending topics
- **Article Reading**: Rich article pages with metadata, author info, and related articles
- **Search**: Real-time article search with suggestions
- **Categories**: Browse articles by category (Technology, Business, Health, etc.)
- **User Dashboard**: Personalized reading history and preferences
- **Admin Dashboard**: Content management and analytics

### Design Features
- **Dark Theme**: Professional dark navy (#0a0e27) with cyan accents (#06b6d4)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and interactive elements
- **Icon System**: 100% Lucide React icons for consistency
- **Image Overlays**: Magazine-style article pages with gradient overlays

### Technical Features
- **Type Safety**: Full TypeScript support with strict mode
- **End-to-End Type Safety**: tRPC for type-safe API calls
- **Server/Client Components**: Optimized Next.js App Router usage
- **Mock Data**: Development-ready mock data for all API calls
- **Error Handling**: Comprehensive error boundaries and fallbacks

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chronicle-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run type-check

# Run linter
npm run lint
```

## Design System

### Color Palette
- **Background**: `#0a0e27` (dark navy)
- **Foreground**: `#f0f4ff` (light blue-white)
- **Card**: `#141829` (darker navy)
- **Primary**: `#06b6d4` (cyan)
- **Secondary**: `#1e293b` (slate)
- **Border**: `#1e293b` (slate)

### Typography
- **Headings**: Bold weights (600-700) for emphasis
- **Body**: Regular (400) for readability
- **Small Text**: 400 weight at 12-14px for metadata

### Components
All UI components are built with shadcn/ui and can be found in `src/components/ui/`. Custom components extend these base components with Chronicle AI styling.

## API Routes

### Articles
- `article.getFeatured()` - Get featured articles
- `article.getTrending()` - Get trending articles
- `article.getBySlug(slug)` - Get article by slug
- `article.getByCategory(category)` - Get articles by category
- `article.search(query)` - Search articles

### Users
- `user.getProfile()` - Get user profile
- `user.updateProfile(data)` - Update user profile
- `user.getReadingHistory()` - Get user reading history

### Search
- `search.articles(query)` - Search articles
- `search.suggestions(query)` - Get search suggestions

### Admin
- `admin.getStats()` - Get platform statistics
- `admin.getAllArticles(options)` - Get all articles with filters
- `admin.updateArticleStatus(id, status)` - Update article status

## Authentication

Currently using mock authentication. Production implementation requires:
- OAuth 2.0 or JWT-based authentication
- Secure session management
- Password hashing with bcrypt
- Rate limiting for API endpoints

## Development Notes

### Mock Data
All API calls currently return mock data from `src/lib/mock-data.ts`. To integrate a real backend:

1. Replace mock data with actual API calls
2. Update tRPC routers in `src/server/api/routers/`
3. Implement database models and queries
4. Add authentication middleware

### Component Architecture
- **Layout Components**: Provide structure (Header, Footer, Sidebar)
- **Page Components**: Top-level route components
- **Feature Components**: Domain-specific components (ArticleCard, SearchBar)
- **UI Components**: Reusable shadcn/ui components with styling

### Type System
All types are centralized in `src/types/`:
- `Article`: Article content and metadata
- `User`: User profile and authentication
- `Category`: Category definitions and slugs
- `Api`: Common API response types

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically detects Next.js and deploys

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Performance Optimizations

- **Image Optimization**: Next.js Image component for responsive images
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: React Query for smart data caching
- **CSS Optimization**: Tailwind CSS purging unused styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please create an issue in the GitHub repository.

## Roadmap

- [ ] Backend integration with real database
- [ ] User authentication system
- [ ] User preferences and personalization
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Comment system
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] API documentation (OpenAPI/Swagger)
