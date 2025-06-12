
import React from 'react';

interface MessageReactionsProps {
  reactions: { [emoji: string]: string[] };
  onReact: (emoji: string) => void;
}

const MessageReactions: React.FC<MessageReactionsProps> = ({ reactions, onReact }) => {
  const popularEmojis = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  if (Object.keys(reactions).length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {Object.entries(reactions).map(([emoji, users]) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/50 hover:bg-accent text-xs transition-colors"
        >
          <span>{emoji}</span>
          <span className="text-muted-foreground">{users.length}</span>
        </button>
      ))}
    </div>
  );
};

export default MessageReactions;
