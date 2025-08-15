import React from 'react';
import { Shield, Lock, Database, KeyRound, Share2, Unlock } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Privacy & Security</h1>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div className="flex items-center mb-6">
            <div className="rounded-full p-3 bg-[#1a1a1a] text-[#00f0ff] mr-4">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
                Decentralized Security
              </h2>
              <p className="text-gray-400">Why NEXA is fundamentally different</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">
            NEXA is built on the principles of decentralization, giving you full control over your data and privacy. 
            Unlike traditional social media platforms, NEXA stores your data on a distributed network rather than centralized servers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
              <div className="flex items-center mb-3">
                <Lock className="w-5 h-5 text-[#00f0ff] mr-2" />
                <h3 className="font-semibold">End-to-End Encryption</h3>
              </div>
              <p className="text-gray-400 text-sm">
                All messages and private content are encrypted end-to-end, meaning only you and your intended recipients can read them.
              </p>
            </div>
            
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a]">
              <div className="flex items-center mb-3">
                <Database className="w-5 h-5 text-[#bf00ff] mr-2" />
                <h3 className="font-semibold">IPFS Storage</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your content is stored on the InterPlanetary File System (IPFS), a peer-to-peer network that eliminates central points of control.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold mb-4">How NEXA Protects You</h2>
          
          <div className="space-y-4">
            <div className="flex">
              <div className="rounded-full p-2 bg-[#1a1a1a] text-[#00f0ff] mr-3 h-min mt-1">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Your Keys, Your Control</h3>
                <p className="text-gray-400 text-sm mt-1">
                  You alone hold the cryptographic keys to your data. Without your authorization, no one—not even NEXA developers—can access your private information.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="rounded-full p-2 bg-[#1a1a1a] text-[#bf00ff] mr-3 h-min mt-1">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">No Central Authority</h3>
                <p className="text-gray-400 text-sm mt-1">
                  NEXA operates on a distributed network of nodes, eliminating the risk of censorship, single-point failures, and unauthorized data harvesting.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="rounded-full p-2 bg-[#1a1a1a] text-[#00ffea] mr-3 h-min mt-1">
                <Unlock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Open Source</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Our code is transparent and available for anyone to inspect, ensuring there are no hidden vulnerabilities or backdoors.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#121212] rounded-xl p-6 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold mb-4">Your Control Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Public Profile Visibility</span>
              <select className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff]">
                <option value="public">Public</option>
                <option value="followers">Followers Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Content Encryption Level</span>
              <select className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f0ff]">
                <option value="standard">Standard (Default)</option>
                <option value="enhanced">Enhanced</option>
                <option value="maximum">Maximum</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Data Backup</span>
              <button className="px-3 py-1 text-sm rounded-lg bg-[#1a1a1a] text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff]/10 transition-colors">
                Create Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;