
import React from 'react';
import { Menu, Search, Settings, MoreVertical, Sun, Moon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onToggleSidebar: () => void;
  unreadCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, unreadCount = 0 }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 flex items-center px-4 shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">WhatsApp Web</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Search className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-accent relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-accent"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
