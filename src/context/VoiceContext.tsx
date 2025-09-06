import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

interface VoiceContextType {
  isListening: boolean;
  isSupported: boolean;
  startListening: (onResult: (text: string) => void) => void;
  stopListening: () => void;
  speak: (text: string, language?: string) => void;
  isSpeaking: boolean;
  setCurrentLanguage: (language: string) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const isSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const languageMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'mr': 'mr-IN',
    'bn': 'bn-IN'
  };

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!isSupported || typeof window === 'undefined') return;

    const SpeechRecognitionConstructor = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognitionConstructor) return;

    const newRecognition = new SpeechRecognitionConstructor();
    
    newRecognition.continuous = false;
    newRecognition.interimResults = false;
    newRecognition.lang = languageMap[currentLanguage] || 'en-US';

    newRecognition.onstart = () => setIsListening(true);
    newRecognition.onend = () => setIsListening(false);
    
    newRecognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      onResult(result);
    };

    newRecognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    setRecognition(newRecognition);
    newRecognition.start();
  }, [isSupported, currentLanguage, languageMap]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const speak = useCallback((text: string, language?: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const langCode = language || currentLanguage;
      utterance.lang = languageMap[langCode] || 'en-US';
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  }, [currentLanguage, languageMap]);

  const setLanguageCallback = useCallback((language: string) => {
    setCurrentLanguage(language as any);
  }, []);

  return (
    <VoiceContext.Provider value={{
      isListening,
      isSupported,
      startListening,
      stopListening,
      speak,
      isSpeaking,
      setCurrentLanguage: setLanguageCallback
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};