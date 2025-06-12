
import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import EnhancedNavbar from '../components/EnhancedNavbar';
import Sidebar from '../components/Sidebar';
import ModernChatArea from '../components/ModernChatArea';
import { Contact, Message } from '../types/chat';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Enhanced dummy contacts data with new features
  const contacts: Contact[] = [
    { 
      id: 1, 
      name: 'Sarah Wilson', 
      avatar: '👩‍💼', 
      lastMessage: 'Hey, how are you?', 
      timestamp: '2 min ago', 
      online: true,
      isPinned: true,
      unreadCount: 3,
      status: 'Available'
    },
    { 
      id: 2, 
      name: 'Tech Team', 
      avatar: '👨‍💻', 
      lastMessage: 'Thanks for the update!', 
      timestamp: '1 hour ago', 
      online: false,
      isGroup: true,
      unreadCount: 12,
      members: [
        { id: 21, name: 'John', avatar: '👨‍💻', lastMessage: '', timestamp: '', online: true },
        { id: 22, name: 'Emma', avatar: '👩‍💻', lastMessage: '', timestamp: '', online: false }
      ]
    },
    { 
      id: 3, 
      name: 'Emily Chen', 
      avatar: '👩‍🎨', 
      lastMessage: 'Looking forward to meeting', 
      timestamp: '3 hours ago', 
      online: true,
      isMuted: true,
      status: 'In a meeting'
    },
    { 
      id: 4, 
      name: 'Michael Brown', 
      avatar: '👨‍🔬', 
      lastMessage: 'Perfect! See you then', 
      timestamp: '1 day ago', 
      online: false,
      isPinned: true
    },
    { 
      id: 5, 
      name: 'Lisa Garcia', 
      avatar: '👩‍🏫', 
      lastMessage: 'That sounds great!', 
      timestamp: '2 days ago', 
      online: true,
      isArchived: true
    },
  ];

  const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({});

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarCollapsed(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  const handleSendMessage = (content: string, replyTo?: Message) => {
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

  const handleReaction = (messageId: number, emoji: string) => {
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

  const handleStarMessage = (messageId: number) => {
    if (!selectedContact) return;
    
    setChatMessages(prev => ({
      ...prev,
      [selectedContact.id]: (prev[selectedContact.id] || []).map(msg => 
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const totalUnreadCount = contacts.reduce((sum, contact) => sum + (contact.unreadCount || 0), 0);

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <EnhancedNavbar onToggleSidebar={toggleSidebar} unreadCount={totalUnreadCount} />
        <div className="flex flex-1 overflow-hidden relative z-10">
          <Sidebar
            contacts={contacts}
            selectedContact={selectedContact}
            onContactSelect={handleContactSelect}
            collapsed={sidebarCollapsed}
            isMobile={isMobile}
          />
          <ModernChatArea
            contact={selectedContact}
            messages={chatMessages[selectedContact?.id || 0] || []}
            onSendMessage={handleSendMessage}
            onReaction={handleReaction}
            onStarMessage={handleStarMessage}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
