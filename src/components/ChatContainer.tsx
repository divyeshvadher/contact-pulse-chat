
import React from 'react';
import EnhancedNavbar from './EnhancedNavbar';
import Sidebar from './Sidebar';
import ModernChatArea from './ModernChatArea';
import { contacts } from '../data/contactsData';
import { useSidebarState } from '../hooks/useSidebarState';
import { useMessageHandler } from '../hooks/useMessageHandler';

const ChatContainer: React.FC = () => {
  const {
    sidebarCollapsed,
    selectedContact,
    isMobile,
    handleContactSelect,
    toggleSidebar
  } = useSidebarState();

  const {
    chatMessages,
    handleSendMessage,
    handleReaction,
    handleStarMessage
  } = useMessageHandler();

  const totalUnreadCount = contacts.reduce((sum, contact) => sum + (contact.unreadCount || 0), 0);

  return (
    <>
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
          onSendMessage={(content, replyTo) => handleSendMessage(selectedContact, content, replyTo)}
          onReaction={(messageId, emoji) => handleReaction(selectedContact, messageId, emoji)}
          onStarMessage={(messageId) => handleStarMessage(selectedContact, messageId)}
          sidebarCollapsed={sidebarCollapsed}
        />
      </div>
    </>
  );
};

export default ChatContainer;
