import React, { useState } from 'react';
import { Moon, Sun, Shield, Bell, Eye, Lock, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center mb-6">
            <div className="rounded-full p-2 bg-[#1a1a1a] text-[#00f0ff] mr-3">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-gray-400 text-sm">Customize how NEXA looks</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="theme" className="text-gray-300">Theme</label>
              <select 
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff]"
              >
                <option value="dark">Neon Dark (Default)</option>
                <option value="light">Light Theme</option>
                <option value="system">System Preference</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Font Size</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-[#1a1a1a] rounded-lg text-gray-400">A-</button>
                <button className="px-3 py-1 bg-[#1a1a1a] rounded-lg text-[#00f0ff]">A</button>
                <button className="px-3 py-1 bg-[#1a1a1a] rounded-lg text-gray-400">A+</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center mb-6">
            <div className="rounded-full p-2 bg-[#1a1a1a] text-[#bf00ff] mr-3">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-gray-400 text-sm">Manage how you're notified</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00f0ff] peer-checked:to-[#bf00ff]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">New Followers</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={true} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00f0ff] peer-checked:to-[#bf00ff]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Mentions</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={true} className="sr-only peer" />
                <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00f0ff] peer-checked:to-[#bf00ff]"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2a]">
          <div className="flex items-center mb-6">
            <div className="rounded-full p-2 bg-[#1a1a1a] text-[#00f0ff] mr-3">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Privacy & Security</h2>
              <p className="text-gray-400 text-sm">Control your data and security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enhanced Privacy</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={privacy}
                  onChange={() => setPrivacy(!privacy)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#2a2a2a] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#00f0ff] peer-checked:to-[#bf00ff]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-300">Two-Factor Authentication</span>
                <p className="text-gray-500 text-xs">Secure your account with 2FA</p>
              </div>
              <button className="px-3 py-1 text-sm rounded-lg bg-[#1a1a1a] text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/10 transition-colors">
                Setup
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-300">Account Recovery</span>
                <p className="text-gray-500 text-xs">Backup and restore options</p>
              </div>
              <button className="px-3 py-1 text-sm rounded-lg bg-[#1a1a1a] text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/10 transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-900/20 transition-colors"
          >
            Logout
          </button>
          
          <button className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/10 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;