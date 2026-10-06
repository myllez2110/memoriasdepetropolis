export type View = 'home' | 'memoria' | 'artigos' | 'gallery' | 'equipe';

export type NewsItem = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export type MemoryItem = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
};

export type GalleryItem = {
  image: string;
  title: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};
