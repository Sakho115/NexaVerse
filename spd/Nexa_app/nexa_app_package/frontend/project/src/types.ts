export interface User {
  id: string;
  did: string;
  username: string;
  displayName: string;
  bio?: string;
  token?: string;
  coins?: number;
  followersCount?: number;
  followingCount?: number;
  avatar?: string;
}

export interface Post {
  id: string;
  did: string;
  userId?: string;
  username: string;
  content: string;
  cid: string;
  preview: string;
  timestamp: string;
  likes: number;
  parent_id?: string;
  replies_count?: number;
  liked_by?: string[];
  repost?: boolean;
  original_post_id?: string;
  original_post_cid?: string;
}

export interface Trend {
  id: string;
  topic: string;
  category: string;
  postCount: number;
}

export interface NexaCoin {
  balance: number;
  earned: number;
  spent: number;
  history: Array<{
    id: string;
    amount: number;
    type: 'earned' | 'spent';
    description: string;
    timestamp: string;
  }>;
}

export interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'sent' | string;
  amount: number;
  description: string;
  timestamp: string;
}
