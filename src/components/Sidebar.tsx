import React, { useState, useMemo } from 'react';
import { Archive, Pin } from 'lucide-react';
import { Contact } from '../types/chat';
import ContactItem from './ContactItem';
import SearchBar from './SearchBar';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showArchived) {
      filtered = filtered.filter(contact => contact.isArchived);
    } else {
      filtered = filtered.filter(contact => !contact.isArchived);
    }

    // Sort by pinned first, then by timestamp
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [contacts, searchTerm, showArchived]);

  const pinnedCount = contacts.filter(c => c.isPinned && !c.isArchived).length;
  const archivedCount = contacts.filter(c => c.isArchived).length;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}

      <div
        className={`
          fixed md:relative top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border z-40
          transition-all duration-300 ease-in-out flex flex-col
          ${collapsed ? '-translate-x-full md:w-0' : 'translate-x-0 w-80 md:w-80'}
          ${isMobile ? 'shadow-xl' : ''}
        `}
      >
        {/* All content is now collapsible */}
        <div
          className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
              collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Header + Filter Buttons */}
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground mb-3">Chats</h2>

              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setShowArchived(false)}
                  className={`px-3 py-1 rounded-full transition-colors ${
                    !showArchived
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground hover:bg-accent/80'
                  }`}
                >
                  All ({contacts.filter(c => !c.isArchived).length})
                </button>
                {archivedCount > 0 && (
                  <button
                    onClick={() => setShowArchived(true)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                      showArchived
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    <Archive className="h-3 w-3" />
                    Archived ({archivedCount})
                  </button>
                )}
              </div>
            </div>

            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={showArchived ? 'Search archived chats...' : 'Search chats...'}
            />

            {pinnedCount > 0 && !showArchived && (
              <div className="px-4 py-2 border-b border-border bg-accent/30">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Pin className="h-3 w-3" />
                  Pinned ({pinnedCount})
                </div>
              </div>
            )}

            {/* Scrollable Contact List with Padding at Bottom */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-6">
              {filteredContacts.map(contact => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  isSelected={selectedContact?.id === contact.id}
                  onClick={() => onContactSelect(contact)}
                />
              ))}

              {filteredContacts.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  <div className="text-sm">
                    {searchTerm
                      ? 'No chats found'
                      : showArchived
                      ? 'No archived chats'
                      : 'No chats yet'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default Sidebar;
