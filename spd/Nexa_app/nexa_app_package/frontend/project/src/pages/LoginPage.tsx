import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { setActivePage } = useApp();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      setActivePage('home');
    } else {
      setError('Invalid credentials');
    }
  };
  
  const handleSignup = () => {
    setActivePage('signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
      <div className="max-w-md w-full p-6 bg-[#121212] rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.1)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
            NEXA ⚡
          </h1>
          <p className="text-gray-400 mt-2">The Future of Decentralized Social</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-900 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-400 mb-2">
              Decentralized ID
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="Enter your ID"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] text-black font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Connect ⚡
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have a Decentralized ID?{" "}
            <button 
              onClick={handleSignup}
              className="text-[#00f0ff] hover:text-[#00ffea] transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
        
        <div className="mt-8 border-t border-[#2a2a2a] pt-6 text-center text-gray-500 text-sm">
          <p>By connecting, you agree to the decentralized nature of NEXA.</p>
          <p className="mt-1">All data is stored on IPFS and controlled by you.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;