import React from 'react';
import { useApp } from '../context/AppContext';

const TrendingSidebar: React.FC = () => {
  const { trends, users } = useApp();

  return (
    <div className="h-screen sticky top-0 overflow-y-auto py-4 px-2 hidden lg:block">
      <div className="bg-[#121212] rounded-xl p-4 mb-4">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
          Trending Topics
        </h2>
        <div className="space-y-4">
          {trends.map(trend => (
            <div key={trend.id} className="cursor-pointer transition-all duration-200 hover:bg-[#1a1a1a] p-2 rounded-lg">
              <p className="text-[#00f0ff] font-medium">{trend.topic}</p>
              <p className="text-gray-400 text-sm">{trend.category}</p>
              <p className="text-gray-500 text-sm">{trend.postCount.toLocaleString()} posts</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#121212] rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
          Who to Follow
        </h2>
        <div className="space-y-4">
          {users.slice(0, 3).map(user => (
            <div key={user.id} className="flex items-center space-x-2">
              <img 
                src={user.avatar} 
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover border border-[#00f0ff]/30"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.displayName}</p>
                <p className="text-gray-400 text-sm truncate">@{user.username}</p>
              </div>
              <button className="text-xs px-3 py-1 rounded-full bg-[#1a1a1a] text-[#00f0ff] font-medium border border-[#00f0ff]/30 transition-all hover:bg-[#00f0ff]/10">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSidebar;