import React, { useState } from 'react';
import { Search, TrendingUp as Trending, Zap, Users, Image as ImageIcon } from 'lucide-react';
import Post from '../components/Post';
import { useApp } from '../context/AppContext';
const ExplorePage: React.FC = () => {
  const { posts, trends } = useApp();
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const safeSearchQuery = searchQuery?.toLowerCase() || '';

  const filteredPosts = searchQuery
    ? posts.filter(post => 
        (post.content?.toLowerCase() || '').includes(safeSearchQuery) ||
        (post.username?.toLowerCase() || '').includes(safeSearchQuery) ||
        (post.displayName?.toLowerCase() || '').includes(safeSearchQuery)
      )
    : posts;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold mb-3">Explore</h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts, people, or topics"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
        </div>
      </div>
      
      <div className="border-b border-[#1a1a1a]">
        <div className="flex">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 transition-colors ${
              activeTab === 'trending'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:bg-[#121212]'
            }`}
          >
            <Trending className="w-5 h-5" />
            <span>Trending</span>
          </button>
          
          <button
            onClick={() => setActiveTab('latest')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 transition-colors ${
              activeTab === 'latest'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:bg-[#121212]'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span>Latest</span>
          </button>
          
          <button
            onClick={() => setActiveTab('people')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 transition-colors ${
              activeTab === 'people'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:bg-[#121212]'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>People</span>
          </button>
          
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 transition-colors ${
              activeTab === 'media'
                ? 'text-[#00f0ff] border-b-2 border-[#00f0ff]'
                : 'text-gray-400 hover:bg-[#121212]'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Media</span>
          </button>
        </div>
      </div>
      
      {activeTab === 'trending' && searchQuery === '' && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map(trend => (
            <div 
              key={trend.id} 
              className="bg-[#121212] p-4 rounded-xl border border-[#2a2a2a] hover:border-[#00f0ff]/30 transition-colors cursor-pointer"
            >
              <p className="text-[#00f0ff] font-medium text-lg">{trend.topic}</p>
              <p className="text-gray-400 text-sm">{trend.category}</p>
              <p className="text-gray-500 text-sm mt-1">{trend.postCount.toLocaleString()} posts</p>
            </div>
          ))}
        </div>
      )}
      
      {(activeTab !== 'trending' || searchQuery !== '') && (
        <div>
          {filteredPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;