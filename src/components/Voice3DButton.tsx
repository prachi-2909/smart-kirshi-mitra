import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Volume2 } from 'lucide-react';
import { useVoice } from '@/context/VoiceContext';

interface Voice3DButtonProps {
  text: string;
  variant?: 'speak' | 'listen';
  onListenResult?: (text: string) => void;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const Voice3DButton: React.FC<Voice3DButtonProps> = ({
  text,
  variant = 'speak',
  onListenResult,
  className = '',
  size = 'sm'
}) => {
  const { speak, startListening, stopListening, isListening, isSpeaking } = useVoice();

  const handleClick = () => {
    if (variant === 'speak') {
      speak(text);
    } else if (variant === 'listen' && onListenResult) {
      if (isListening) {
        stopListening();
      } else {
        startListening(onListenResult);
      }
    }
  };

  const isActive = variant === 'speak' ? isSpeaking : isListening;

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={handleClick}
      className={`
        glow-effect transition-all duration-300 relative overflow-hidden
        ${isActive ? 'voice-pulse bg-primary/20 border-primary shadow-glow' : ''}
        ${className}
      `}
      disabled={variant === 'speak' ? isSpeaking : false}
    >
      <div className={`transition-transform duration-200 ${isActive ? 'animate-grow' : ''}`}>
        {variant === 'speak' ? (
          <Volume2 className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
        ) : (
          <Mic className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
        )}
      </div>
      
      {/* Animated background for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-shimmer opacity-50" />
      )}
    </Button>
  );
};

export default Voice3DButton;