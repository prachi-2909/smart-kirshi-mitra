import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { useVoice } from '@/context/VoiceContext';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  MessageCircle, 
  Camera, 
  Users, 
  Leaf,
  MapPin,
  Mic
} from 'lucide-react';

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    condition: string;
    icon: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    rainfall: number;
  }>;
}

const Home = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const { speak } = useVoice();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [marketPrices] = useState([
    { crop: 'Rice', price: 2100, change: '+5%', trend: 'up' },
    { crop: 'Wheat', price: 2250, change: '-2%', trend: 'down' },
    { crop: 'Cotton', price: 6800, change: '+8%', trend: 'up' },
  ]);

  useEffect(() => {
    // Simulated weather data - in real app, fetch from weather API
    const mockWeather: WeatherData = {
      location: "Pune, Maharashtra",
      current: {
        temperature: 28,
        humidity: 65,
        condition: "Partly Cloudy",
        icon: "partly-cloudy"
      },
      forecast: [
        { day: "Today", high: 32, low: 24, condition: "Sunny", icon: "sunny", rainfall: 0 },
        { day: "Tomorrow", high: 29, low: 22, condition: "Rainy", icon: "rainy", rainfall: 15 },
        { day: "Day 3", high: 31, low: 25, condition: "Cloudy", icon: "cloudy", rainfall: 5 },
        { day: "Day 4", high: 33, low: 26, condition: "Sunny", icon: "sunny", rainfall: 0 },
      ]
    };
    setWeather(mockWeather);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'cloudy':
      case 'partly-cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const advisoryMessage = "Consider delaying irrigation today. Rain expected tomorrow will provide sufficient moisture for your crops.";

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 shadow-3d">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">KrishiMitra</h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>{weather?.location}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => speak("Welcome to your farming dashboard. Check weather, get crop advice, and connect with the community.")}
            className="glow-effect"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Weather Forecast */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-6 h-6 text-primary" />
              {translate('weather')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weather && (
              <>
                <div className="flex items-center justify-between mb-4 p-4 bg-gradient-soft rounded-lg">
                  <div>
                    <div className="text-3xl font-bold">{weather.current.temperature}°C</div>
                    <div className="text-muted-foreground">{weather.current.condition}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(weather.current.condition)}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs bg-white/20 border-white/30 text-white hover:bg-white/30"
                      onClick={() => navigate('/weather-details')}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-gradient-card">
                      <div className="text-sm font-medium mb-1">{day.day === 'Today' ? translate('today') : day.day === 'Tomorrow' ? translate('tomorrow') : day.day}</div>
                      <div className="flex justify-center mb-2">
                        {getWeatherIcon(day.icon)}
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold">{day.high}°</div>
                        <div className="text-muted-foreground">{day.low}°</div>
                      </div>
                      {day.rainfall > 0 && (
                        <div className="flex items-center justify-center gap-1 text-xs text-blue-600 mt-1">
                          <Droplets className="w-3 h-3" />
                          {day.rainfall}mm
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Crop Advisory */}
        <Card className="card-3d animate-slide-up border-l-4 border-l-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-success" />
              {translate('cropAdvisory')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-success-light p-4 rounded-lg">
              <p className="text-success-foreground font-medium">{advisoryMessage}</p>
            </div>
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              {translate('marketPrices')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-card rounded-lg">
                  <span className="font-medium">{item.crop}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{item.price}/quintal</span>
                    <Badge 
                      variant={item.trend === 'up' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs"
                onClick={() => navigate('/market-prices')}
              >
                View All Prices
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Soil Health Status */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              {translate('soilHealth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
              <div>
                <div className="font-semibold text-lg">{translate('good')}</div>
                <div className="text-sm text-muted-foreground">pH: 6.8 | N-P-K: Balanced</div>
              </div>
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="default"
            size="lg"
            className="flex-col h-20 glow-effect transition-bounce"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className="w-6 h-6 mb-2" />
            <span className="text-sm">{translate('chat')}</span>
          </Button>
          
          <Button
            variant="default"
            size="lg"
            className="flex-col h-20 glow-effect transition-bounce"
            onClick={() => navigate('/pest-detection')}
          >
            <Camera className="w-6 h-6 mb-2" />
            <span className="text-sm">{translate('pestDetection')}</span>
          </Button>
          
          <Button
            variant="default"
            size="lg"
            className="flex-col h-20 glow-effect transition-bounce"
            onClick={() => navigate('/community')}
          >
            <Users className="w-6 h-6 mb-2" />
            <span className="text-sm">{translate('community')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;