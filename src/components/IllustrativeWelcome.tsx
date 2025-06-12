
import React from 'react';
import { MessageCircleHeart, Sparkles, Zap } from 'lucide-react';

const IllustrativeWelcome: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg animate-bounce"></div>
      </div>

      <div className="text-center z-10 max-w-md px-6">
        {/* Main illustration */}
        <div className="relative mb-8 group cursor-pointer">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <MessageCircleHeart className="w-16 h-16 text-white animate-pulse" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2 animate-bounce delay-300">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce delay-700">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        {/* Welcome text with gradient */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          Welcome to ChatApp
        </h2>
        
        <p className="text-muted-foreground text-lg mb-6 animate-fade-in delay-300">
          Start a conversation and connect with friends in a whole new way
        </p>

        {/* Interactive floating cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="group p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/10">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-sm font-medium text-foreground/80">Quick Chat</p>
          </div>
          
          <div className="group p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/70 dark:hover:bg-white/10">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm font-medium text-foreground/80">Smart AI</p>
          </div>
        </div>

        {/* Subtle call-to-action */}
        <div className="mt-8 text-xs text-muted-foreground/60 animate-fade-in delay-700">
          Select a conversation to start chatting →
        </div>
      </div>
    </div>
  );
};

export default IllustrativeWelcome;
