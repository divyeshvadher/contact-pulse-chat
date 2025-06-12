
import React from 'react';
import { Pin, Archive, VolumeX, Users } from 'lucide-react';
import { Contact } from '../types/chat';
import StatusIndicator from './StatusIndicator';

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
        hover:bg-accent/50 active:bg-accent relative
        ${isSelected ? 'bg-accent border-l-4 border-l-primary' : ''}
        ${contact.isPinned ? 'bg-accent/30' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
            {contact.isGroup ? <Users className="h-6 w-6" /> : contact.avatar}
          </div>
          {contact.online && !contact.isGroup && (
            <div className="absolute -bottom-0.5 -right-0.5">
              <StatusIndicator status="online" size="md" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
              <div className="flex items-center gap-1">
                {contact.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                {contact.isMuted && <VolumeX className="h-3 w-3 text-muted-foreground" />}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
              {contact.unreadCount && contact.unreadCount > 0 && (
                <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                  {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
          {contact.status && (
            <p className="text-xs text-muted-foreground/70 truncate mt-1">{contact.status}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
