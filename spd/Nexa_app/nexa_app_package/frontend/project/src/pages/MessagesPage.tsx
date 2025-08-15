import React from 'react';
import { Search, Edit, Phone, Video } from 'lucide-react';

const MessagesPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-full sm:w-80 border-r border-[#1a1a1a] overflow-y-auto">
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-full py-2 pl-9 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-gray-400 text-center mt-4">No conversations available.</p>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="hidden sm:flex flex-1 flex-col bg-[#0e0e0e]">
          <div className="border-b border-[#1a1a1a] p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="ml-3">
                <h3 className="font-medium">Select a conversation</h3>
                <p className="text-xs text-green-500">Offline</p>
              </div>
            </div>
            
            <div className="flex space-x-3 text-gray-400">
              <button className="p-2 rounded-full hover:bg-[#1a1a1a] transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#1a1a1a] transition-colors">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-gray-400 text-center mt-4">No messages to display.</div>
          </div>
          
          <div className="p-3 border-t border-[#1a1a1a]">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-full py-3 px-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)]"
              />
              <button className="absolute right-3 top-3 text-[#00f0ff]">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Empty state for mobile */}
        <div className="flex-1 flex items-center justify-center bg-[#0e0e0e] sm:hidden">
          <div className="text-center p-6">
            <p className="text-lg text-gray-300">Select a conversation</p>
            <p className="text-sm text-gray-500 mt-1">Choose from your existing conversations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;


