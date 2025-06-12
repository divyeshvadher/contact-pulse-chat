
import { Contact } from '../types/chat';

export const contacts: Contact[] = [
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
