
import { useState, useEffect } from 'react';
import { Contact } from '../types/chat';

export const useSidebarState = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return {
    sidebarCollapsed,
    selectedContact,
    isMobile,
    handleContactSelect,
    toggleSidebar
  };
};
