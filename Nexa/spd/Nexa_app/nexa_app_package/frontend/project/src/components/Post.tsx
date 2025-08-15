import React from 'react';
import { Heart, MessageCircle, RefreshCw, Share } from 'lucide-react';
import { Post as PostType } from '../types';
import { useApp } from '../context/AppContext';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { likePost, tipUser } = useApp();
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleTip = () => {
    const amount = 5; // Default tip amount
    const success = tipUser(post.userId, amount);
    
    if (success) {
      alert(`You tipped ${post.displayName} 5 NEXA coins!`);
    } else {
      alert('Not enough NEXA coins. Earn more by posting content!');
    }
  };

  return (
    <div className="border-b border-[#1a1a1a] p-4 hover:bg-[#0f0f0f] transition-colors duration-200">
      <div className="flex space-x-3">
        <img 
          src={post.avatar} 
          alt={post.displayName}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline">
            <span className="font-bold mr-2 truncate">{post.displayName}</span>
            <span className="text-gray-400 text-sm truncate">@{post.username}</span>
            <span className="mx-1 text-gray-400">·</span>
            <span className="text-gray-400 text-sm">{formatTimestamp(post.timestamp)}</span>
          </div>
          
          <p className="mt-2 text-white">{post.content}</p>
          
          {post.image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          )}
          
          <div className="mt-3 flex justify-between items-center text-gray-400">
            <button 
              className="flex items-center space-x-1 hover:text-[#00f0ff] transition-colors"
              onClick={() => {}}
            >
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            
            <button 
              className="flex items-center space-x-1 hover:text-green-400 transition-colors"
              onClick={() => {}}
            >
              <RefreshCw className="w-5 h-5" />
              <span>{post.reposts}</span>
            </button>
            
            <button 
              className={`flex items-center space-x-1 transition-colors ${
                post.isLiked ? 'text-pink-500' : 'hover:text-pink-500'
              }`}
              onClick={() => likePost(post.id)}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-pink-500' : ''}`} />
              <span>{post.likes}</span>
            </button>
            
            <button 
              className="flex items-center space-x-1 hover:text-[#bf00ff] transition-colors"
              onClick={handleTip}
            >
              <span>Tip</span>
              <span className="text-xs">⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;