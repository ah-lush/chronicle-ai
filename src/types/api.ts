export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export interface SearchParams {
  query: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sourceType?: 'ai-generated' | 'user-posted';
  limit?: number;
  offset?: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
