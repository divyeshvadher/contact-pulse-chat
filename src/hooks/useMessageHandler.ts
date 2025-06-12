
import { useState } from 'react';
import { Message, Contact } from '../types/chat';

export const useMessageHandler = () => {
  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({});

  const handleSendMessage = (selectedContact: Contact | null, content: string, replyTo?: Message) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
      replyTo
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));

    // Update message status to delivered after a short delay
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedContact.id]: (prev[selectedContact.id] || []).map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }));
    }, 1000);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's interesting! Tell me more.",
        "I see what you mean.",
        "Thanks for sharing that with me.",
        "How has your day been?",
        "That sounds really cool!",
        "I'm here if you need anything else.",
        "What do you think about that?",
        "That's a great point!",
      ];

      const botMessage: Message = {
        id: Date.now() + 1,
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered'
      };

      setChatMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), botMessage]
      }));
    }, 2000 + Math.random() * 3000);
  };

  const handleReaction = (selectedContact: Contact | null, messageId: number, emoji: string) => {
    if (!selectedContact) return;
    
    setChatMessages(prev => ({
      ...prev,
      [selectedContact.id]: (prev[selectedContact.id] || []).map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions ? { ...msg.reactions } : {};
          if (!reactions[emoji]) {
            reactions[emoji] = [];
          }
          
          // Toggle user reaction
          const userIndex = reactions[emoji].indexOf('user');
          if (userIndex > -1) {
            reactions[emoji].splice(userIndex, 1);
            if (reactions[emoji].length === 0) {
              delete reactions[emoji];
            }
          } else {
            reactions[emoji].push('user');
          }
          
          return { ...msg, reactions };
        }
        return msg;
      })
    }));
  };

  const handleStarMessage = (selectedContact: Contact | null, messageId: number) => {
    if (!selectedContact) return;
    
    setChatMessages(prev => ({
      ...prev,
      [selectedContact.id]: (prev[selectedContact.id] || []).map(msg => 
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    }));
  };

  return {
    chatMessages,
    handleSendMessage,
    handleReaction,
    handleStarMessage
  };
};
