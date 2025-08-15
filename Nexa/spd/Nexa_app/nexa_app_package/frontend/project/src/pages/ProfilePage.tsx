import React, { useState } from 'react';
import { Calendar, Link, MapPin } from 'lucide-react';
import Post from '../components/Post';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { posts } = useApp();
  const { user, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  // Filter posts to show only user's posts
  const userPosts = posts.filter(post => post.userId === user?.id);

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to upload avatar");
      return;
    }
    
    setUploading(true);

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    
    try {
      const res = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && (data.success || data.url) ){
        // Update avatar in state
        setUser((prev: any) => ({ ...prev, avatar: data.url }));
      } else {
         console.error("Upload failed:", data.error);
         alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-10 bg-[#0b0b0b]/80 backdrop-blur-md p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="relative">
        <div className="h-40 bg-gradient-to-r from-[#00f0ff]/30 to-[#bf00ff]/30"></div>

        <div className="px-4">
          <div className="relative flex justify-between">
            <div className="absolute -top-16">
              <label className="cursor-pointer relative group">
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg"}
                  alt="Choose a profile picture"
                  className="w-32 h-32 rounded-full border-4 border-[#0b0b0b] object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <div className="absolute bottom-0 w-full text-center bg-black/50 text-white text-xs py-1 rounded-b-full opacity-0 group-hover:opacity-100 transition">
                  {uploading ? "Uploading..." : "Change"}
                </div>
              </label>
            </div>

            <div className="flex-1"></div>

            <div className="pt-4">
              <button className="px-4 py-1.5 rounded-full border border-[#00f0ff] text-[#00f0ff] font-medium hover:bg-[#00f0ff]/10 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-xl font-bold">{user?.displayName || "Guest User"}</h2>
            <p className="text-gray-400">@{user?.username || "guest_user"}</p>

            <p className="mt-3 text-white">{user?.bio || "NEXA user exploring decentralized social media."}</p>

            <div className="flex flex-wrap mt-3 text-gray-400 gap-y-2">
              <div className="flex items-center mr-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Decentraland</span>
              </div>
              <div className="flex items-center mr-4">
                <Link className="w-4 h-4 mr-1" />
                <span>nexa.network</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Joined {user?.joinedDate || new Date().toISOString().split('T')[0]}</span>
              </div>
            </div>

            <div className="flex mt-3">
              <div className="mr-4">
                <span className="font-bold">{user?.following || 0}</span>{" "}
                <span className="text-gray-400">Following</span>
              </div>
              <div>
                <span className="font-bold">{user?.followers || 0}</span>{" "}
                <span className="text-gray-400">Followers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[#1a1a1a]">
          <div className="flex border-b border-[#1a1a1a]">
            <button className="flex-1 py-4 font-medium text-[#00f0ff] border-b-2 border-[#00f0ff]">
              Posts
            </button>
            <button className="flex-1 py-4 text-gray-400 hover:bg-[#121212] transition-colors">
              Replies
            </button>
            <button className="flex-1 py-4 text-gray-400 hover:bg-[#121212] transition-colors">
              Media
            </button>
            <button className="flex-1 py-4 text-gray-400 hover:bg-[#121212] transition-colors">
              Likes
            </button>
          </div>

          <div>
            {userPosts.length > 0 ? (
              userPosts.map(post => <Post key={post.id} post={post} />)
            ) : (
              <div className="p-8 text-center text-gray-400">
                <p className="text-lg mb-2">No posts yet</p>
                <p>When you post, it will show up here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
