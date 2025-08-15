import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { clearCurrentUser, getCurrentUser, setCurrentUser } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string, displayName: string, walletAddress: string) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from storage on initial load
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Refresh user data from backend
  const refreshUserData = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/profile/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedUser = {
          ...user,
          username: data.username,
          bio: data.bio,
          coins: data.coins,
          followersCount: data.followers_count,
          followingCount: data.following_count,
        };
        setUser(updatedUser);
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const newUser: User = {
        id: data.did,
        did: data.did,
        username: data.username,
        displayName: data.username,
        bio: '',
        token: data.token,
        coins: data.coins || 0,
        followersCount: 0,
        followingCount: 0,
        avatar: '',
      };

      setUser(newUser);
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (username: string, password: string, displayName: string, walletAddress: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, wallet_address: walletAddress }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const newUser: User = {
        id: data.did,
        did: data.did,
        username: data.username,
        displayName: data.username,
        bio: '',
        token: data.token,
        coins: data.coins || 10, // Default starting coins
        followersCount: 0,
        followingCount: 0,
        avatar: '',
      };

      setUser(newUser);
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    clearCurrentUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      signup, 
      logout,
      refreshUserData,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
