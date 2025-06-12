
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold mb-1">
        🤖
      </div>
      
      <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">typing...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
