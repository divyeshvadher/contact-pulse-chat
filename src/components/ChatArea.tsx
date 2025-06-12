
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Contact, Message } from '../types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatAreaProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (content: string, replyTo?: Message) => void;
  onReaction?: (messageId: number, emoji: string) => void;
  onStarMessage?: (messageId: number) => void;
  sidebarCollapsed: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
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

  if (!contact) {
    return (
      <div className={`
        flex-1 flex items-center justify-center bg-background
        transition-all duration-300
        ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-80'}
      `}>
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Welcome to WhatsApp Web</h2>
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`
      flex-1 flex flex-col bg-background
      transition-all duration-300
      ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-80'}
    `}>
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between mt-16">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {contact.avatar}
            </div>
            {contact.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">
              {contact.online ? 'Online' : 'Last seen recently'}
              {contact.status && ` • ${contact.status}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

      {/* Reply Preview */}
      {replyingTo && (
        <div className="bg-accent/50 border-t border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs font-medium text-primary">
                Replying to {replyingTo.sender === 'user' ? 'yourself' : contact.name}
              </div>
              <div className="text-sm text-muted-foreground truncate">
                {replyingTo.content}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setReplyingTo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-10 bg-background border-border focus:border-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-accent"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
