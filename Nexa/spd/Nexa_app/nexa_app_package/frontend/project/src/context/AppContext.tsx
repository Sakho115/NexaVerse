import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Trend, NexaCoin, Transaction } from '../types/index';
//import { mockPosts, mockTrends, mockUsers } from '../data/mockData';
import { getNexaCoin, setNexaCoin } from '../utils/storage';
import { useAuth } from './AuthContext';

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  trends: Trend[];
  users: User[];
  nexaCoin: NexaCoin;
  createPost: (content: string, image?: File) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  tipUser: (userDid: string, amount: number) => Promise<boolean>;
  fetchPosts: () => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<User | null>;
}

const AppContext = createContext<AppContextType>({
  activePage: 'home',
  setActivePage: () => {},
  posts: [],
  setPosts: () => {},
  trends: [],
  users: [],
  nexaCoin: { balance: 0, earned: 0, spent: 0, history: [] },
  createPost: async () => {},
  likePost: async () => {},
  tipUser: async () => false,
  fetchPosts: async () => {},
  fetchUserProfile: async () => null,
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('home');
  const [posts, setPosts] = useState<Post[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [nexaCoin, setNexaCoinState] = useState<NexaCoin>(() => {
    const storedCoin = getNexaCoin();
    return storedCoin || { balance: 0, earned: 0, spent: 0, history: [] };
  });

  // Fetch initial posts and nexa coin when component mounts
  useEffect(() => {
    fetchPosts();
    if (user?.did) {
      fetchNexaCoin();
    }
  }, [user?.did]);

  const fetchNexaCoin = async () => {
    if (!user?.did) return;
    try {
      const response = await fetch(`/api/coins/${user.did}`);
      if (!response.ok) throw new Error('Failed to fetch nexa coin');
      const data = await response.json();
      
      const updatedCoin: NexaCoin = {
        balance: data.balance || 0,
        earned: nexaCoin.earned,
        spent: nexaCoin.spent,
        history: (data.history && Array.isArray(data.history) ? data.history.map((item: any, index: number) => ({
          id: item.id || index.toString(),
          amount: item.amount,
          type: item.type || 'transaction',
          description: item.description || '',
          timestamp: item.timestamp || new Date().toISOString(),
        })) : []),
      };
      
      setNexaCoinState(updatedCoin);
      setNexaCoin(updatedCoin);
    } catch (error) {
      console.error('Fetch nexa coin error:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Fetch posts error:', error);
      setPosts([]);
    }
  };

  const fetchUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      
      return {
        id: userId,
        did: userId,
        username: data.username || '',
        displayName: data.username || '',
        bio: data.bio || '',
        avatar: '',
        followers: 0,
        following: 0,
        posts: 0,
        joinedDate: new Date().toISOString().split('T')[0],
      };
    } catch (error) {
      console.error('Fetch user profile error:', error);
      return null;
    }
  };

  const createPost = async (content: string, image?: File) => {
    if (!content || !user?.token) return;
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('file', image);

      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create post');
      
      const data = await response.json();
      setPosts([data.post, ...posts]);
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'earned' as 'earned' | 'spent' | 'sent',
        amount: 2,
        description: 'Post creation reward',
        timestamp: new Date().toISOString(),
      };

      const updatedCoin: NexaCoin = {
        ...nexaCoin,
        balance: data.coins || nexaCoin.balance + 2,
        earned: nexaCoin.earned + 2,
        history: [newTransaction, ...nexaCoin.history],
      };
      
      setNexaCoinState(updatedCoin);
      setNexaCoin(updatedCoin);
      
      await fetchPosts();
    } catch (error) {
      console.error('Create post error:', error);
    }
  };

  const likePost = async (postId: string) => {
    if (!user?.token) return;
    try {
      const response = await fetch(`/api/like/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to like post');
      
      const data = await response.json();
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: data.likes } : post
      ));

      const likedPost = posts.find(post => post.id === postId);
      if (likedPost && likedPost.userId === user?.did) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'earned' as 'earned' | 'spent' | 'sent',
        amount: 1,
        description: 'Post like reward',
        timestamp: new Date().toISOString(),
      };

        const updatedCoin: NexaCoin = {
          ...nexaCoin,
          balance: data.coins || nexaCoin.balance + 1,
          earned: nexaCoin.earned + 1,
          history: [newTransaction, ...nexaCoin.history],
        };
        
        setNexaCoinState(updatedCoin);
        setNexaCoin(updatedCoin);
      }
    } catch (error) {
      console.error('Like post error:', error);
    }
  };

  const tipUser = async (userDid: string, amount: number): Promise<boolean> => {
    if (!user?.token || amount <= 0) return false;
    try {
      const response = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ to_did: userDid, amount }),
      });

      if (!response.ok) throw new Error('Failed to tip user');
      
      const data = await response.json();
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'sent' as 'earned' | 'spent' | 'sent',
        amount: amount,
        description: `Tip to ${userDid}`,
        timestamp: new Date().toISOString(),
      };

      const updatedCoin: NexaCoin = {
        ...nexaCoin,
        balance: data.from_balance || nexaCoin.balance - amount,
        spent: nexaCoin.spent + amount,
        history: [newTransaction, ...nexaCoin.history],
      };
      
      setNexaCoinState(updatedCoin);
      setNexaCoin(updatedCoin);
      
      return true;
    } catch (error) {
      console.error('Tip user error:', error);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      posts,
      setPosts,
      trends,
      users,
      nexaCoin,
      createPost,
      likePost,
      tipUser,
      fetchPosts,
      fetchUserProfile,
    }}>
      {children}
    </AppContext.Provider>
  );
};