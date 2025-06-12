
export interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  online: boolean;
}

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}
