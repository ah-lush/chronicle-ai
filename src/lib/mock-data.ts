import { Article, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Tech journalist and AI enthusiast",
    role: "user",
    articlesCount: 12,
    joinedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-11-20"),
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "Political analyst and news reporter",
    role: "user",
    articlesCount: 8,
    joinedAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-11-18"),
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    bio: "Platform administrator",
    role: "admin",
    articlesCount: 5,
    joinedAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-11-26"),
  },
];

const articleContent = `
Chronicle AI brings you groundbreaking insights into the latest developments. Our advanced AI systems analyze multiple sources to provide you with the most comprehensive and accurate information available.

This article explores the key developments, implications, and future outlook for this important topic. We combine real-time data analysis with expert perspectives to create content that matters.

Our platform leverages cutting-edge natural language processing and semantic understanding to extract meaningful patterns from vast amounts of data. Every article is carefully curated to ensure accuracy and relevance.

Whether you're interested in technology, politics, business, or science, Chronicle AI delivers intelligent news coverage that goes beyond headlines to explore the deeper stories shaping our world.
`;

export const mockArticles: Article[] = [];
