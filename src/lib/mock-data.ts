import { Article, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Tech journalist and AI enthusiast',
    role: 'user',
    articlesCount: 12,
    joinedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    bio: 'Political analyst and news reporter',
    role: 'user',
    articlesCount: 8,
    joinedAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-11-18'),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    bio: 'Platform administrator',
    role: 'admin',
    articlesCount: 5,
    joinedAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-11-26'),
  },
];

const articleContent = `
Chronicle AI brings you groundbreaking insights into the latest developments. Our advanced AI systems analyze multiple sources to provide you with the most comprehensive and accurate information available.

This article explores the key developments, implications, and future outlook for this important topic. We combine real-time data analysis with expert perspectives to create content that matters.

Our platform leverages cutting-edge natural language processing and semantic understanding to extract meaningful patterns from vast amounts of data. Every article is carefully curated to ensure accuracy and relevance.

Whether you're interested in technology, politics, business, or science, Chronicle AI delivers intelligent news coverage that goes beyond headlines to explore the deeper stories shaping our world.
`;

export const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'breakthrough-ai-development-2024',
    title: 'Major Breakthrough in AI Development: What It Means for the Future',
    excerpt:
      'Researchers announce a groundbreaking advancement in artificial intelligence that could revolutionize multiple industries. The breakthrough addresses long-standing challenges in neural networks.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1677442d019cecf3d4f3d4c6c1f6c6c7?w=1200&h=600&fit=crop',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    category: 'technology',
    tags: ['AI', 'machine-learning', 'innovation', 'future'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'TechCrunch', url: 'https://techcrunch.com' },
      { title: 'MIT News', url: 'https://news.mit.edu' },
    ],
    publishedAt: new Date('2024-11-26'),
    updatedAt: new Date('2024-11-26'),
    views: 4521,
    readTime: 5,
    featured: true,
    status: 'published',
  },
  {
    id: '2',
    slug: 'global-climate-summit-reaches-historic-agreement',
    title: 'Global Climate Summit Reaches Historic Agreement on Emissions',
    excerpt:
      'World leaders come together to sign the most comprehensive climate agreement in decades. The accord targets net-zero emissions by 2050 and commits $500 billion to green initiatives.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=1200&h=600&fit=crop',
    author: {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    category: 'world-news',
    tags: ['climate', 'environment', 'sustainability', 'global-affairs'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'BBC News', url: 'https://bbc.com' },
      { title: 'Reuters', url: 'https://reuters.com' },
    ],
    publishedAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-11-25'),
    views: 3842,
    readTime: 6,
    featured: true,
    status: 'published',
  },
  {
    id: '3',
    slug: 'quantum-computing-milestone-achieved',
    title: 'Quantum Computing Reaches New Milestone in Error Correction',
    excerpt:
      'Scientists demonstrate significant progress in quantum error correction, bringing practical quantum computers closer to reality. The achievement could accelerate development of quantum applications.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1635437386620-3ce90a43a30c?w=1200&h=600&fit=crop',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    category: 'technology',
    tags: ['quantum-computing', 'physics', 'technology', 'innovation'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'Nature', url: 'https://nature.com' },
      { title: 'Science Daily', url: 'https://sciencedaily.com' },
    ],
    publishedAt: new Date('2024-11-24'),
    updatedAt: new Date('2024-11-24'),
    views: 2956,
    readTime: 7,
    featured: true,
    status: 'published',
  },
  {
    id: '4',
    slug: 'biotech-company-announces-new-cancer-treatment',
    title: 'Biotech Company Announces Breakthrough Cancer Treatment',
    excerpt:
      'A leading biotechnology firm reveals a new immunotherapy approach that shows promising results in clinical trials. Early data suggests significantly improved survival rates for specific cancer types.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1576091160550-112173e7f1bd?w=1200&h=600&fit=crop',
    author: {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    category: 'health',
    tags: ['healthcare', 'medical-research', 'biotech', 'innovation'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'Medical News Today', url: 'https://medicalnewstoday.com' },
      { title: 'The Lancet', url: 'https://thelancet.com' },
    ],
    publishedAt: new Date('2024-11-23'),
    updatedAt: new Date('2024-11-23'),
    views: 2187,
    readTime: 5,
    featured: true,
    status: 'published',
  },
  {
    id: '5',
    slug: 'major-sports-event-record-breaking-performance',
    title: 'Historic Record Set at International Sports Championship',
    excerpt:
      'An athlete achieves an unprecedented performance at the world championship, breaking a record that stood for 15 years. The feat marks a new era in the sport.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    category: 'sports',
    tags: ['sports', 'record', 'championship', 'athletics'],
    sourceType: 'user-posted',
    publishedAt: new Date('2024-11-22'),
    updatedAt: new Date('2024-11-22'),
    views: 5123,
    readTime: 4,
    featured: false,
    status: 'published',
  },
  {
    id: '6',
    slug: 'tech-giants-announce-new-partnership',
    title: 'Two Tech Giants Announce Strategic Partnership on AI Research',
    excerpt:
      'Major technology companies team up to accelerate AI research and development. The partnership aims to tackle fundamental challenges in artificial intelligence.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    author: {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    category: 'business',
    tags: ['business', 'partnership', 'technology', 'corporate'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'Bloomberg', url: 'https://bloomberg.com' },
      { title: 'Wall Street Journal', url: 'https://wsj.com' },
    ],
    publishedAt: new Date('2024-11-21'),
    updatedAt: new Date('2024-11-21'),
    views: 1923,
    readTime: 5,
    featured: false,
    status: 'published',
  },
  {
    id: '7',
    slug: 'new-space-mission-launches-successfully',
    title: 'International Space Mission Launches with Historic Crew',
    excerpt:
      'A groundbreaking space mission launches with an international crew of astronauts. The mission aims to conduct unprecedented research on the effects of long-duration spaceflight.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=600&fit=crop',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    category: 'science',
    tags: ['space', 'science', 'exploration', 'astronomy'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'NASA', url: 'https://nasa.gov' },
      { title: 'ESA', url: 'https://esa.int' },
    ],
    publishedAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-20'),
    views: 3456,
    readTime: 6,
    featured: false,
    status: 'published',
  },
  {
    id: '8',
    slug: 'entertainment-industry-announces-new-productions',
    title: 'Major Entertainment Studio Announces Slate of New Productions',
    excerpt:
      'Leading entertainment company unveils ambitious plans for upcoming productions. The slate includes highly anticipated films, series, and documentaries from world-renowned creators.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1489599849228-eb342edd94c0?w=1200&h=600&fit=crop',
    author: {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    category: 'entertainment',
    tags: ['entertainment', 'movies', 'streaming', 'production'],
    sourceType: 'user-posted',
    publishedAt: new Date('2024-11-19'),
    updatedAt: new Date('2024-11-19'),
    views: 2341,
    readTime: 4,
    featured: false,
    status: 'published',
  },
  {
    id: '9',
    slug: 'political-developments-reshape-legislation',
    title: 'New Political Developments Lead to Major Legislative Shift',
    excerpt:
      'Recent political developments have triggered significant changes in legislative priorities. Key initiatives are expected to shape policy for the coming years.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop',
    author: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    category: 'politics',
    tags: ['politics', 'legislation', 'government', 'policy'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'The Guardian', url: 'https://theguardian.com' },
      { title: 'AP News', url: 'https://apnews.com' },
    ],
    publishedAt: new Date('2024-11-18'),
    updatedAt: new Date('2024-11-18'),
    views: 1654,
    readTime: 6,
    featured: false,
    status: 'published',
  },
  {
    id: '10',
    slug: 'renewable-energy-investment-breaks-records',
    title: 'Global Renewable Energy Investment Breaks Records in 2024',
    excerpt:
      'Investment in renewable energy reached unprecedented levels, driven by corporate commitments and government incentives. Solar and wind energy dominate the investment landscape.',
    content: articleContent,
    coverImage:
      'https://images.unsplash.com/photo-1509391366360-2e938634521c?w=1200&h=600&fit=crop',
    author: {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    },
    category: 'business',
    tags: ['energy', 'renewable', 'investment', 'sustainability'],
    sourceType: 'ai-generated',
    sources: [
      { title: 'IEA', url: 'https://iea.org' },
      { title: 'Bloomberg NEF', url: 'https://bloomberg.com/nef' },
    ],
    publishedAt: new Date('2024-11-17'),
    updatedAt: new Date('2024-11-17'),
    views: 2087,
    readTime: 7,
    featured: false,
    status: 'published',
  },
];
