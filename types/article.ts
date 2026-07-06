export interface Media {
  id: string;
  url: string;
  alt: string;
}

export interface Author {
  id: string;
  displayName: string;
  slug: string;

  avatar?: {
    url: string;
    alt?: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bio?: any;

  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: Category | string | null;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  readTime: number;
  publishedAt: string;

  featuredImage: Media;

  author: Author;

  categories: Category[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
}

export interface ArticlesResponse {
  docs: Article[];
}