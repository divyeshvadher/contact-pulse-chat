
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import { Contact, Message } from '../types/chat';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Dummy contacts data
  const contacts: Contact[] = [
    { id: 1, name: 'Sarah Wilson', avatar: '👩‍💼', lastMessage: 'Hey, how are you?', timestamp: '2 min ago', online: true },
    { id: 2, name: 'John Doe', avatar: '👨‍💻', lastMessage: 'Thanks for the update!', timestamp: '1 hour ago', online: false },
    { id: 3, name: 'Emily Chen', avatar: '👩‍🎨', lastMessage: 'Looking forward to meeting', timestamp: '3 hours ago', online: true },
    { id: 4, name: 'Michael Brown', avatar: '👨‍🔬', lastMessage: 'Perfect! See you then', timestamp: '1 day ago', online: false },
    { id: 5, name: 'Lisa Garcia', avatar: '👩‍🏫', lastMessage: 'That sounds great!', timestamp: '2 days ago', online: true },
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

  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));

    // Update message status to delivered after a short delay
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedContact.id]: prev[selectedContact.id]?.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ) || []
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          contacts={contacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
        />
        <ChatArea
          contact={selectedContact}
          messages={chatMessages[selectedContact?.id || 0] || []}
          onSendMessage={handleSendMessage}
          sidebarCollapsed={sidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default Index;
