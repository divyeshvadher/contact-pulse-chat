
import React, { useState } from 'react';
import { Menu, Search, Settings, Sun, Moon, Bell, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface EnhancedNavbarProps {
  onToggleSidebar: () => void;
  unreadCount?: number;
}

const EnhancedNavbar: React.FC<EnhancedNavbarProps> = ({ onToggleSidebar, unreadCount = 0 }) => {
  const { theme, toggleTheme } = useTheme();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Divyesh Vadher',
    bio: 'Frontend Developer',
    initials: 'DV'
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border/50 h-16 flex items-center px-4 shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 group"
        >
          <Menu className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
        </Button>
        
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-white font-bold text-sm">💬</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChatApp
            </h1>
            <p className="text-xs text-muted-foreground">Connect & Chat</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 group"
        >
          <Search className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 relative group"
        >
          <Bell className="h-5 w-5 group-hover:animate-bounce" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1 shadow-lg animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 group"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300 text-blue-500" />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 group"
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
        </Button>
        
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setIsProfileModalOpen(true)}
          className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 relative group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md transform transition-all duration-300 group-hover:scale-110">
            {userProfile.initials}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedNavbar;
