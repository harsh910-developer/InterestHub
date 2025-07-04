// Database types for the community blog platform

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  category: string;
  tags: string[];
  author_id: string;
  author?: User;
  status: "draft" | "published" | "archived";
  views_count: number;
  likes_count: number;
  comments_count: number;
  read_time: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  post_id: string;
  author_id: string;
  author?: User;
  parent_id?: string;
  replies?: Comment[];
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "newsletter";
  title: string;
  message: string;
  user_id: string;
  actor_id?: string;
  actor?: User;
  post_id?: string;
  post?: Post;
  read: boolean;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  user_id?: string;
  categories: string[];
  frequency: "daily" | "weekly" | "monthly";
  active: boolean;
  confirmed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  post_id: string;
  user_id?: string;
  event_type: "view" | "like" | "comment" | "share";
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  created_at: string;
}
