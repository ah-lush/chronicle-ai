export type UserRole = 'visitor' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  articlesCount: number;
  joinedAt: Date;
  updatedAt: Date;
}

export interface AuthUser extends User {
  email: string;
}
