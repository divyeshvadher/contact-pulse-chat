
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Contact, Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import IllustrativeWelcome from './IllustrativeWelcome';

interface ModernChatAreaProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (content: string, replyTo?: Message) => void;
  onReaction?: (messageId: number, emoji: string) => void;
  onStarMessage?: (messageId: number) => void;
  sidebarCollapsed: boolean;
}

const ModernChatArea: React.FC<ModernChatAreaProps> = ({ 
  contact, 
  messages, 
  onSendMessage,
  onReaction,
  onStarMessage,
  sidebarCollapsed 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate typing indicator for bot
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000 + Math.random() * 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && contact) {
      onSendMessage(inputValue.trim(), replyingTo || undefined);
      setInputValue('');
      setReplyingTo(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const quickEmojis = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '🎉'];

  if (!contact) {
    return <IllustrativeWelcome />;
  }

  return (
    <div className={`
      flex-1 flex flex-col bg-gradient-to-b from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm
      transition-all duration-300
      ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-80'}
    `}>
      {/* Enhanced Chat Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-border/50 p-4 flex items-center justify-between mt-16 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg shadow-lg transform transition-all duration-300 group-hover:scale-110">
              {contact.avatar}
            </div>
            {contact.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              {contact.name}
              {contact.isGroup && <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">Group</span>}
            </h3>
            <p className="text-sm text-muted-foreground">
              {contact.online ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              ) : 'Last seen recently'}
              {contact.status && ` • ${contact.status}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-all duration-200 hover:scale-105">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-all duration-200 hover:scale-105">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-all duration-200 hover:scale-105">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area with enhanced styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-white/20 dark:to-black/20">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            onReact={onReaction}
            onStar={onStarMessage}
            onReply={handleReply}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview with modern styling */}
      {replyingTo && (
        <div className="bg-blue-50/80 dark:bg-blue-900/30 border-t border-blue-200/50 dark:border-blue-700/50 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                Replying to {replyingTo.sender === 'user' ? 'yourself' : contact.name}
              </div>
              <div className="text-sm text-muted-foreground truncate bg-white/50 dark:bg-white/5 rounded-lg px-3 py-1">
                {replyingTo.content}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/50 dark:hover:bg-white/10"
              onClick={() => setReplyingTo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Message Input */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-border/50 p-4">
        {/* Quick emoji reactions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              className="flex-shrink-0 text-lg hover:scale-125 transition-transform duration-200 bg-gray-100/50 dark:bg-gray-700/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
              onClick={() => setInputValue(prev => prev + emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-all duration-200 hover:scale-105 group">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-600/50 focus:border-blue-400 dark:focus:border-blue-500 rounded-full transition-all duration-200 focus:shadow-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-accent/50 transition-all duration-200 hover:scale-105"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:scale-100"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernChatArea;
