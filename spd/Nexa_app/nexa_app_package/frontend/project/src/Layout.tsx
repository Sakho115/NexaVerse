import React from 'react';
import Sidebar from './components/Sidebar';
import TrendingSidebar from './components/TrendingSidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SettingsPage from './pages/SettingsPage';
import NexaCoinPage from './pages/NexaCoinPage';
import PrivacyPage from './pages/PrivacyPage';
import MessagesPage from './pages/MessagesPage';
import AiAssistantPage from './pages/AiAssistantPage';
import ExplorePage from './pages/ExplorePage';
import { useApp } from './context/AppContext';
import { useAuth } from './context/AuthContext';

const Layout: React.FC = () => {
  const { activePage } = useApp();
  const { isAuthenticated } = useAuth();
  
  // If not authenticated, show login or signup pages
  if (!isAuthenticated) {
    return activePage === 'signup' ? <SignupPage /> : <LoginPage />;
  }
  
  // Helper function to render the correct page component
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'nexa-coin':
        return <NexaCoinPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'messages':
        return <MessagesPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'explore':
        return <ExplorePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="container mx-auto">
        <div className="flex">
          {/* Left sidebar */}
          <div className="w-16 md:w-64 shrink-0">
            <Sidebar />
          </div>
          
          {/* Main content */}
          <div className="flex-1 min-w-0 border-x border-[#1a1a1a]">
            {renderPage()}
          </div>
          
          {/* Right sidebar */}
          <div className="w-80 shrink-0">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;