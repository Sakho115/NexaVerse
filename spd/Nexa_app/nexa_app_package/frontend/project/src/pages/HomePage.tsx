import React from 'react';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { posts } = useApp();

  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      
      <CreatePost />
      
      <div>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;