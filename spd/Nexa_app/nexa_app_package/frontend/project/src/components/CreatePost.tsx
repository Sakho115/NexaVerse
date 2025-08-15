import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const { createPost } = useApp();

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    createPost(content, imageUrl || undefined);
    setContent('');
    setImageUrl('');
    setShowImageInput(false);
  };

  return (
    <div className="border-b border-[#1a1a1a] p-4">
      <div className="flex space-x-4">
        <img 
          src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex-1">
          <textarea 
            placeholder="What's happening? #NEXA"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none h-24"
          />
          
          {showImageInput && (
            <div className="mb-3">
              <input 
                type="text" 
                placeholder="Paste image URL (e.g., from Pexels)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#121212] border border-[#1a1a1a] rounded-lg px-3 py-2 text-white placeholder-gray-500"
              />
            </div>
          )}
          
          <div className="flex justify-between items-center mt-2">
            <button 
              onClick={() => setShowImageInput(!showImageInput)}
              className="p-2 text-[#00f0ff] rounded-full hover:bg-[#00f0ff]/10 transition-colors"
            >
              <Image className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                content.trim() 
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#bf00ff] text-black hover:shadow-[0_0_12px_rgba(0,240,255,0.4)]' 
                  : 'bg-[#1a1a1a] text-gray-400 cursor-not-allowed'
              }`}
            >
              Post ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;