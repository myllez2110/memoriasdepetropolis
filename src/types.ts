export type View = 'home' | 'news' | 'events' | 'gallery' | 'admin';

export type NewsItem = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

export type EventItem = {
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  place: string;
  description: string;
};

export type GalleryItem = {
  image: string;
  title: string;
};
