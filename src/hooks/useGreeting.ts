import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/context/VoiceContext';

export const useGreeting = () => {
  const { translate, language } = useLanguage();
  const { speak } = useVoice();
  const [hasGreeted, setHasGreeted] = useState(false);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return translate('goodMorning');
    } else if (hour < 17) {
      return translate('goodAfternoon');
    } else {
      return translate('goodEvening');
    }
  };

  const getWelcomeMessage = () => {
    const timeGreeting = getTimeBasedGreeting();
    return `${timeGreeting}! ${translate('welcomeToKrishiMitra')}`;
  };

  const speakWelcome = () => {
    if (!hasGreeted) {
      const welcomeMessage = getWelcomeMessage();
      speak(welcomeMessage, language);
      setHasGreeted(true);
    }
  };

  useEffect(() => {
    // Auto-greet after a short delay when component mounts
    const timer = setTimeout(() => {
      speakWelcome();
    }, 1000);

    return () => clearTimeout(timer);
  }, [language]);

  return {
    getTimeBasedGreeting,
    getWelcomeMessage,
    speakWelcome,
    hasGreeted
  };
};