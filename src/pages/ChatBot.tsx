import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/context/VoiceContext';
import { ArrowLeft, Mic, Send, Bot, User, Volume2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const navigate = useNavigate();
  const { translate, language } = useLanguage();
  const { isListening, startListening, stopListening, speak, isSupported } = useVoice();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am your AI farming assistant. How can I help you today with your crops?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pest') || message.includes('insect') || message.includes('bug')) {
      return "For pest control, I recommend organic neem oil spray. Mix 2-3 ml neem oil per liter of water and spray in the evening. Also consider introducing beneficial insects like ladybugs.";
    } else if (message.includes('fertilizer') || message.includes('nutrient')) {
      return "For healthy crop growth, use a balanced NPK fertilizer (10:26:26) at the time of sowing, followed by urea application 30-40 days after germination. Organic compost is always beneficial.";
    } else if (message.includes('water') || message.includes('irrigation')) {
      return "Based on current weather conditions, I recommend irrigating every 3-4 days. Avoid overwatering as it can lead to root rot. Drip irrigation is most efficient for water conservation.";
    } else if (message.includes('disease') || message.includes('fungus')) {
      return "Common plant diseases can be prevented with proper spacing, good drainage, and fungicide application. If you see yellow or brown spots on leaves, it might be fungal - use copper-based fungicides.";
    } else if (message.includes('yield') || message.includes('production')) {
      return "To increase yield, focus on: 1) Proper soil testing and fertilization 2) Timely pest control 3) Adequate irrigation 4) Good quality seeds 5) Crop rotation practices.";
    } else {
      return "I understand your concern. For specific agricultural advice, I recommend consulting with local agricultural extension officers. Meanwhile, ensure proper crop care with timely watering, fertilization, and pest monitoring.";
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Speak bot response in user's language
      setTimeout(() => {
        speak(botResponse.text, language);
      }, 1200);
    }, 1000);

    setInputText('');
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        setInputText(text);
        handleSendMessage();
      });
    }
  };

  const handleSpeak = (text: string) => {
    speak(text, language);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 shadow-3d">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">{translate('chat')}</h1>
              <p className="text-sm text-white/80">AI-powered farming assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 pb-24 space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            } animate-slide-up`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-success text-white'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>
            
            <Card className={`max-w-[80%] card-3d ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.text}</p>
                {message.sender === 'bot' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 p-1 h-auto"
                    onClick={() => handleSpeak(message.text)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-3d">
        <div className="flex items-center gap-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={translate('askQuestion')}
            className="flex-1 text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          {isSupported && (
            <Button
              variant={isListening ? 'destructive' : 'default'}
              size="lg"
              onClick={handleVoiceInput}
              className={`glow-effect transition-bounce ${isListening ? 'voice-pulse' : ''}`}
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}
          
          <Button
            size="lg"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="glow-effect transition-bounce"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center text-sm text-muted-foreground animate-voice-pulse">
            {translate('listening')}...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;