
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const StatusIcon = () => {
    if (message.status === 'sent') {
      return <Check className="h-3 w-3 text-muted-foreground" />;
    }
    if (message.status === 'delivered') {
      return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    }
    if (message.status === 'read') {
      return <CheckCheck className="h-3 w-3 text-blue-500" />;
    }
    return null;
  };

  return (
    <div 
      className={`
        flex items-end gap-2 animate-fade-in
        ${isUser ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold mb-1">
          🤖
        </div>
      )}
      
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm
          ${isUser 
            ? 'bg-primary text-primary-foreground rounded-br-md' 
            : 'bg-card border border-border rounded-bl-md'
          }
        `}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className={`
          flex items-center gap-1 mt-1
          ${isUser ? 'justify-end' : 'justify-start'}
        `}>
          <span className={`
            text-xs
            ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}
          `}>
            {formatTime(message.timestamp)}
          </span>
          {isUser && <StatusIcon />}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
