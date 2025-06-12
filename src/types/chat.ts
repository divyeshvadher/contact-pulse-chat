
export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  online: boolean;
  isGroup?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
  unreadCount?: number;
  status?: string;
  members?: Contact[];
}

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  isForwarded?: boolean;
  replyTo?: Message;
  reactions?: { [emoji: string]: string[] };
  isStarred?: boolean;
  type?: 'text' | 'image' | 'voice' | 'file';
  mediaUrl?: string;
  duration?: number; // for voice messages
}

export interface ChatSettings {
  theme: 'light' | 'dark';
  background: string;
  notifications: boolean;
}
