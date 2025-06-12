
import React, { useState } from 'react';
import { Play, Pause, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceMessageProps {
  duration: number;
  isUser: boolean;
  onPlay?: () => void;
}

const VoiceMessage: React.FC<VoiceMessageProps> = ({ duration, isUser, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlay?.();
  };

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8"
        onClick={handlePlayPause}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      
      <div className="flex-1">
        <div className="h-8 flex items-center">
          <Mic className="h-4 w-4 mr-2" />
          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                isUser ? 'bg-primary-foreground/70' : 'bg-primary'
              }`}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <span className={`text-xs ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default VoiceMessage;
