// Local storage management for NEXA app

// Auth
export const setCurrentUser = (user: any) => {
  localStorage.setItem('nexa_current_user', JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('nexa_current_user');
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem('nexa_current_user');
};

// Theme
export const getTheme = () => {
  return localStorage.getItem('nexa_theme') || 'dark';
};

export const setTheme = (theme: string) => {
  localStorage.setItem('nexa_theme', theme);
};

// Nexa Coin
export const getNexaCoin = () => {
  const coin = localStorage.getItem('nexa_coin');
  return coin ? JSON.parse(coin) : {
    balance: 0,
    earned: 0,
    spent: 0,
    history: []
  };
};

export const setNexaCoin = (coin: any) => {
  localStorage.setItem('nexa_coin', JSON.stringify(coin));
};

// Posts
export const getPosts = () => {
  const posts = localStorage.getItem('nexa_posts');
  return posts ? JSON.parse(posts) : [];
};

export const setPosts = (posts: any[]) => {
  localStorage.setItem('nexa_posts', JSON.stringify(posts));
};

export const addPost = (post: any) => {
  const posts = getPosts();
  posts.unshift(post);
  setPosts(posts);
};