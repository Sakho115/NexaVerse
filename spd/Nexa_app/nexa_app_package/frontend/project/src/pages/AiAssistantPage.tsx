import React from 'react';
import { Bot, Sparkles, Brain, Zap, Code, MessageSquare } from 'lucide-react';

const AiAssistantPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">AI Assistant</h1>
      </div>
      
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div className="text-center mb-10">
            <div className="inline-flex rounded-full p-3 bg-[#1a1a1a] text-[#00f0ff] mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] mb-2">
              NEXA AI Assistant
            </h2>
            <p className="text-gray-400">
              Powered by Decentralized AI Workers — Coming Soon
            </p>
          </div>
          
          <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-5 mb-6">
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-[#bf00ff] mr-2" />
              <h3 className="font-semibold">Decentralized AI Architecture</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Unlike traditional AI assistants that run on centralized servers, NEXA AI will operate across our decentralized network. This means enhanced privacy, fault tolerance, and resistance to censorship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-[#00f0ff] mr-2" />
                <h3 className="font-semibold">Privacy-Preserving</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your conversations stay private, processed locally when possible and never stored permanently.
              </p>
            </div>
            
            <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4">
              <div className="flex items-center mb-3">
                <Zap className="w-5 h-5 text-[#00ffea] mr-2" />
                <h3 className="font-semibold">Earn While Contributing</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Share your computing resources to help run the AI network and earn NEXA coins in return.
              </p>
            </div>
            
            <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4">
              <div className="flex items-center mb-3">
                <Code className="w-5 h-5 text-[#bf00ff] mr-2" />
                <h3 className="font-semibold">Open Source Models</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Completely transparent AI algorithms that anyone can audit and improve.
              </p>
            </div>
            
            <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4">
              <div className="flex items-center mb-3">
                <MessageSquare className="w-5 h-5 text-[#00f0ff] mr-2" />
                <h3 className="font-semibold">Personalized Experience</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Train your personal AI assistant locally without sharing your preferences with a central server.
              </p>
            </div>
          </div>
          
          <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] p-4">
            <h3 className="font-semibold mb-2">Join the Waitlist</h3>
            <p className="text-gray-400 text-sm mb-4">
              Be among the first to experience truly decentralized AI assistance.
            </p>
            
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-l-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]"
              />
              <button className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] text-black font-medium hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                Join Waitlist
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Estimated launch: Q1 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;