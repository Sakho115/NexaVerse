import React from 'react';
import { DollarSign, TrendingUp, Clock, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NexaCoinPage: React.FC = () => {
  const { nexaCoin } = useApp();
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Nexa Coin</h1>
      </div>
      
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bf00ff]">
                Your NEXA Balance
              </h2>
              <p className="text-gray-400 text-sm">Decentralized Social Economy</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-4xl font-bold text-white">
                {nexaCoin.balance} ⚡
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a] flex items-center">
              <div className="rounded-full p-2 bg-green-900/20 text-green-400 mr-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Earned</p>
                <p className="text-xl font-semibold text-white">{nexaCoin.earned} ⚡</p>
              </div>
            </div>
            
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a] flex items-center">
              <div className="rounded-full p-2 bg-red-900/20 text-red-400 mr-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Spent</p>
                <p className="text-xl font-semibold text-white">{nexaCoin.spent} ⚡</p>
              </div>
            </div>
            
            <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a] flex items-center">
              <div className="rounded-full p-2 bg-blue-900/20 text-blue-400 mr-3">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Current Rate</p>
                <p className="text-xl font-semibold text-white">5 ⚡ / post</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            
            <div className="space-y-3">
              {(nexaCoin.history && nexaCoin.history.length > 0) ? (
                nexaCoin.history.map(tx => (
                  <div key={tx.id} className="bg-[#0f0f0f] p-3 rounded-lg border border-[#2a2a2a] flex items-center">
                    <div className={`rounded-full p-2 ${
                      tx.type === 'earned' 
                        ? 'bg-green-900/20 text-green-400' 
                        : 'bg-red-900/20 text-red-400'
                    } mr-3`}>
                      {tx.type === 'earned' ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-gray-400 text-sm">{formatDate(tx.timestamp)}</p>
                    </div>
                    <div className={`text-lg font-semibold ${
                      tx.type === 'earned' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.type === 'earned' ? '+' : '-'}{tx.amount} ⚡
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-gray-400">
                  <p>No transactions yet</p>
                  <p className="text-sm mt-1">Start posting to earn NEXA coins!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexaCoinPage;