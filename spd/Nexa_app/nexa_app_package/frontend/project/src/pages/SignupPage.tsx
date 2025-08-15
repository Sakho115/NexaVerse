import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const { setActivePage } = useApp();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !displayName || !walletAddress || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = await signup(username, password, displayName, walletAddress);
    if (success) {
      setActivePage('home');
    } else {
      setError('Failed to create account');
    }
  };
  
  const handleLogin = () => {
    setActivePage('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b]">
      <div className="max-w-md w-full p-6 bg-[#121212] rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.1)]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
            NEXA ⚡
          </h1>
          <p className="text-gray-400 mt-2">Create Your Decentralized Identity</p>
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
              placeholder="Choose a unique ID"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-400 mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="Your public name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="walletAddress" className="block text-gray-400 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="Enter your wallet address"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="Choose a strong password"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_8px_rgba(0,240,255,0.3)] transition-all"
              placeholder="Confirm your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] text-black font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Create Identity ⚡
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have a Decentralized ID?{" "}
            <button 
              onClick={handleLogin}
              className="text-[#00f0ff] hover:text-[#00ffea] transition-colors"
            >
              Connect
            </button>
          </p>
        </div>
        
        <div className="mt-8 border-t border-[#2a2a2a] pt-6 text-center text-gray-500 text-sm">
          <p>Your identity is encrypted and stored on the decentralized network.</p>
          <p className="mt-1">Only you control access to your data.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
