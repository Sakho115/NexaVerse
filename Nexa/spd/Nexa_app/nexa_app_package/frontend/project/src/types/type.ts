// types.ts
export interface User {
    id: string;
    did: string;              // Add this
    username: string;
    displayName: string;
    wallet_address: string;   // Add this
    bio?: string;
    avatar?: string;
    followersCount?: number;
    followingCount?: number;
    coins?: number;
    created_at?: string;
    postsCount?: number;
  }
  
  export interface Post {
    id: string;
    did: string;             // Author's DID
    userId: string;          // Add this to match your usage
    username: string;
    content: string;
    cid?: string;
    preview?: string;
    timestamp: string;
    likes: number;
    liked_by?: string[];
    parent_id?: string;
    replies_count?: number;
    media?: {
      type: 'image'|'video';
      url: string;
      thumbnail?: string;
    }[];
  }
  
  export interface Transaction {  // Add this interface
    id: string;
    type: 'earned' | 'spent' | 'sent';
    amount: number;
    description: string;
    timestamp: string;
    from?: string;
    to?: string;
  }
  
  export interface NexaCoin {
    balance: number;
    earned: number;
    spent: number;
    history: Transaction[];
  }
  
  // ... keep other existing types ...