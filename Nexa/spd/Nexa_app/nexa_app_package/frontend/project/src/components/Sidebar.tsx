import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, User, Hash, Bell, MessageCircle, Settings, Coins, Bot } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home className="w-6 h-6" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
    { id: 'explore', label: 'Explore', icon: <Hash className="w-6 h-6" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-6 h-6" /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-6 h-6" /> },
    { id: 'nexa-coin', label: 'Nexa Coin', icon: <Coins className="w-6 h-6" /> },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot className="w-6 h-6" /> }
  ];

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between py-4 pr-2">
      <div>
        <div className="px-4 py-2 mb-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
            NEXA ⚡
          </h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-full flex items-center space-x-4 transition-all duration-200 ${
                activePage === item.id
                  ? 'text-[#00f0ff] bg-[#1a1a1a] font-medium shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                  : 'text-gray-300 hover:bg-[#1a1a1a] hover:text-[#00ffea]'
              }`}
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <button
        onClick={() => setActivePage('post')}
        className="mx-auto md:mx-4 px-4 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] text-black font-bold flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] hover:from-[#00ffea] hover:to-[#d400ff]"
      >
        <span className="hidden md:block">Post ⚡</span>
        <span className="block md:hidden">⚡</span>
      </button>
    </div>
  );
};

export default Sidebar;