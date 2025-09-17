import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/context/VoiceContext';
import { useLocation } from '@/context/LocationContext';
import Voice3DButton from '@/components/Voice3DButton';
import { ArrowLeft, Mic, Send, Bot, User, Volume2, MessageCircle, MapPin } from 'lucide-react';
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
  const { location } = useLocation();
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
    const userLocation = location ? `${location.city}, ${location.state}` : 'your area';
    
    if (message.includes('weather') || message.includes('rain') || message.includes('temperature')) {
      return `Based on current weather data for ${userLocation}, expect partly cloudy conditions with 28°C temperature. Light rain is forecasted for tomorrow, which is perfect for your crops. Consider delaying irrigation today.`;
    }
    if (message.includes('crop') || message.includes('farming') || message.includes('plant')) {
      return `For optimal crop growth in ${userLocation}, ensure proper irrigation, use organic fertilizers, and monitor for pests. This season is ideal for tomatoes, cotton, and rice in your region. The local climate conditions are favorable.`;
    }
    if (message.includes('pest') || message.includes('insect') || message.includes('bug')) {
      return `Common pests in ${userLocation} this season include aphids and whiteflies. Use neem oil spray or introduce beneficial insects like ladybugs. Regular monitoring is key for early detection.`;
    }
    if (message.includes('market') || message.includes('price') || message.includes('sell')) {
      return `Current market prices in ${userLocation} mandis: Rice ₹2,100/quintal (+5%), Wheat ₹2,250/quintal (-2%), Cotton ₹6,800/quintal (+8%). Local demand is strong this week.`;
    }
    if (message.includes('fertilizer') || message.includes('nutrient') || message.includes('soil')) {
      return `Your soil analysis for ${userLocation} shows good pH levels. Consider organic compost and NPK fertilizers suitable for local soil conditions. Avoid over-fertilization which can harm beneficial microorganisms.`;
    }
    if (message.includes('hello') || message.includes('hi') || message.includes('namaste')) {
      return `Hello! Welcome to KrishiMitra AI Assistant. I'm here to help farmers in ${userLocation} with personalized farming advice, weather updates, and market information. How can I assist you today?`;
    }
    
    return `I'm your AI farming assistant for ${userLocation}. I can help with weather updates, crop management, pest control, market prices, and local farming advice. What specific farming question can I assist you with?`;
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
            <Bot className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">KrishiMitra AI</h1>
              <div className="flex items-center gap-1 text-sm text-white/80">
                <MapPin className="w-3 h-3" />
                <span>Farming assistant for {location?.city || 'your area'}</span>
              </div>
            </div>
          </div>
          <Voice3DButton
            text={`AI Assistant is ready to help farmers in ${location?.city || 'your area'}. Ask me anything about farming, weather, or markets.`}
            variant="speak"
            className="ml-auto"
          />
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
          
          <Voice3DButton
            text=""
            variant="listen"
            onListenResult={(result) => {
              setInputText(result);
              setTimeout(() => handleSendMessage(), 500);
            }}
          />
          
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