
import { Contact } from '../types/chat';

export const contacts: Contact[] = [
  { 
    id: 1, 
    name: 'Emma Weber', 
    avatar: 'EW',
    lastMessage: 'Looking forward to our meeting!', 
    timestamp: '2 min ago', 
    online: true,
    isPinned: true,
    unreadCount: 3
  },
  { 
    id: 2, 
    name: 'Lisa Hayden', 
    avatar: 'LH',
    lastMessage: 'The project looks great!', 
    timestamp: '30 min ago', 
    online: true,
    unreadCount: 1
  },
  { 
    id: 3, 
    name: 'Alex Martin', 
    avatar: 'AM',
    lastMessage: 'Can we discuss this tomorrow?', 
    timestamp: '1 hour ago', 
    online: false
  },
  { 
    id: 4, 
    name: 'Grace Thomas', 
    avatar: 'GT',
    lastMessage: 'Thanks for your help!', 
    timestamp: '2 hours ago', 
    online: true,
    isPinned: true
  },
  { 
    id: 5, 
    name: 'Jake Cooper', 
    avatar: 'JC',
    lastMessage: 'The meeting is confirmed', 
    timestamp: '3 hours ago', 
    online: false
  },
  { 
    id: 6, 
    name: 'Tech Support', 
    avatar: '🛠️',
    lastMessage: 'Your ticket has been updated', 
    timestamp: '4 hours ago', 
    online: true,
    isGroup: true
  },
  { 
    id: 7, 
    name: 'Marketing Team', 
    avatar: '📈',
    lastMessage: 'Campaign stats are ready', 
    timestamp: '5 hours ago', 
    online: true,
    isGroup: true
  },
  { 
    id: 8, 
    name: 'HR Department', 
    avatar: '👥',
    lastMessage: 'New policy update', 
    timestamp: '1 day ago', 
    online: false,
    isGroup: true
  },
  { 
    id: 9, 
    name: 'System Notifications', 
    avatar: '🔔',
    lastMessage: 'Server maintenance scheduled', 
    timestamp: '1 day ago', 
    online: true
  },
  { 
    id: 10, 
    name: 'Guest Support', 
    avatar: '❓',
    lastMessage: 'How can we help you today?', 
    timestamp: '2 days ago', 
    online: false
  }
];
