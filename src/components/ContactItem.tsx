
import React from 'react';
import { Contact } from '../types/chat';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 border-b border-border cursor-pointer transition-all duration-200
        hover:bg-accent/50 active:bg-accent
        ${isSelected ? 'bg-accent border-l-4 border-l-primary' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
            {contact.avatar}
          </div>
          {contact.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
            <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
