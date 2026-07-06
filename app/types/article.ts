export interface Article {
  id: string;
  title: string;
  slug: string;
  content: unknown;
  readTime: number;
  publishedAt: string;

  featuredImage: {
    id: string;
    url: string;
    alt?: string;
  };

  author: {
    id: string;
    displayName: string;
  };

  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface ArticlesResponse {
  docs: Article[];
}