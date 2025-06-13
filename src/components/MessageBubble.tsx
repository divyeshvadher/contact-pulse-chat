
import React, { useState } from 'react';
import { Check, CheckCheck, Star, Reply, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from '../types/chat';
import MessageReactions from './MessageReactions';
import VoiceMessage from './VoiceMessage';

interface MessageBubbleProps {
  message: Message;
  onReact?: (messageId: number, emoji: string) => void;
  onStar?: (messageId: number) => void;
  onReply?: (message: Message) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onReact, 
  onStar, 
  onReply 
}) => {
  const [showActions, setShowActions] = useState(false);
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

  const handleReact = (emoji: string) => {
    onReact?.(message.id, emoji);
  };

  return (
    <div 
      className={`
        flex items-end gap-2 animate-fade-in group relative
        ${isUser ? 'flex-row-reverse' : 'flex-row'}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold mb-1">
          🤖
        </div>
      )}
      
      <div className="flex flex-col max-w-xs lg:max-w-md">
        {message.replyTo && (
          <div className={`
            px-3 py-2 mb-1 rounded-lg border-l-4 bg-accent/50 text-xs
            ${isUser ? 'border-l-primary-foreground/50' : 'border-l-primary'}
          `}>
            <div className="font-medium text-muted-foreground">
              Replying to {message.replyTo.sender === 'user' ? 'You' : 'Bot'}
            </div>
            <div className="truncate">{message.replyTo.content}</div>
          </div>
        )}
        
        {message.isForwarded && (
          <div className="text-xs text-muted-foreground mb-1 px-1">
            ↪ Forwarded
          </div>
        )}
        
        <div
          className={`
            px-4 py-2.5 rounded-2xl shadow-sm relative
            ${isUser 
              ? 'bg-primary text-primary-foreground rounded-br-none ml-auto' 
              : 'bg-muted/50 hover:bg-muted/60 transition-colors rounded-bl-none mr-auto'
            }
            hover:shadow-md transition-shadow duration-200
          `}
        >
          {message.type === 'voice' ? (
            <VoiceMessage duration={message.duration || 30} isUser={isUser} />
          ) : message.type === 'image' ? (
            <div className="space-y-2">
              <img 
                src={message.mediaUrl || '/placeholder.svg'} 
                alt="Shared image" 
                className="rounded-lg max-w-full h-auto"
              />
              {message.content && (
                <p className="text-sm leading-relaxed">{message.content}</p>
              )}
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
          
          <div className={`
            flex items-center gap-1 mt-1
            ${isUser ? 'justify-end' : 'justify-start'}
          `}>
            {message.isStarred && (
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
            )}
            <span className={`
              text-xs
              ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}
            `}>
              {formatTime(message.timestamp)}
            </span>
            {isUser && <StatusIcon />}
          </div>
          
          {/* Quick Actions */}
          {showActions && (
            <div className={`
              static top-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity
              ${isUser ? '-left-16' : '-right-16'}
            `}>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 hover:bg-background"
                onClick={() => onReply?.(message)}
              >
                <Reply className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 hover:bg-background"
                onClick={() => onStar?.(message.id)}
              >
                <Star className={`h-3 w-3 ${message.isStarred ? 'text-yellow-400 fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-background/80 hover:bg-background"
              >
                <MoreVertical className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <MessageReactions reactions={message.reactions} onReact={handleReact} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
