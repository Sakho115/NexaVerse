export interface User {
  did: string;
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  joinedDate: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface Trend {
  id: string;
  topic: string;
  category: string;
  postCount: number;
}

import { Transaction } from './type';

export interface NexaCoin {
  balance: number;
  earned: number;
  spent: number;
  history: Transaction[];
}

export type { Transaction } from './type';
