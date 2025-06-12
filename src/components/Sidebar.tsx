
import React from 'react';
import { Contact } from '../types/chat';
import ContactItem from './ContactItem';

interface SidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onContactSelect: (contact: Contact) => void;
  collapsed: boolean;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  contacts,
  selectedContact,
  onContactSelect,
  collapsed,
  isMobile
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}
      
      <div 
        className={`
          fixed md:relative top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border z-40
          transition-all duration-300 ease-in-out
          ${collapsed 
            ? '-translate-x-full md:w-0' 
            : 'translate-x-0 w-80 md:w-80'
          }
          ${isMobile ? 'shadow-xl' : ''}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Messages</h2>
            <p className="text-sm text-muted-foreground">{contacts.length} conversations</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                isSelected={selectedContact?.id === contact.id}
                onClick={() => onContactSelect(contact)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
