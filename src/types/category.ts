export type CategorySlug =
  | 'politics'
  | 'technology'
  | 'sports'
  | 'business'
  | 'science'
  | 'entertainment'
  | 'health'
  | 'world-news';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  color: string;
}
