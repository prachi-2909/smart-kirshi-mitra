import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Cloud, Droplets, Wind, Eye, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WeatherDetails = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const weatherHistory = [
    { date: '2024-01-05', temp: '28°C', humidity: '65%', rainfall: '12mm', condition: 'Light Rain' },
    { date: '2024-01-04', temp: '32°C', humidity: '58%', rainfall: '0mm', condition: 'Sunny' },
    { date: '2024-01-03', temp: '29°C', humidity: '72%', rainfall: '5mm', condition: 'Cloudy' },
    { date: '2024-01-02', temp: '30°C', humidity: '60%', rainfall: '0mm', condition: 'Partly Cloudy' },
    { date: '2024-01-01', temp: '31°C', humidity: '55%', rainfall: '0mm', condition: 'Clear' },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
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
            <Cloud className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">{translate('weather')} Details</h1>
              <p className="text-sm text-white/80">7-day forecast & history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Weather */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-6 h-6 text-primary" />
              Current Weather - Pune, Maharashtra
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">28°C</div>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">65%</div>
                <p className="text-sm text-muted-foreground">Humidity</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">12mm</div>
                <p className="text-sm text-muted-foreground">Rainfall</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">15km/h</div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Cloud className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-medium">{day}</p>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 ? 'Light Rain' : index === 1 ? 'Sunny' : 'Partly Cloudy'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{28 + index}°C</p>
                    <p className="text-sm text-muted-foreground">
                      {index < 2 ? `${12 - index * 2}mm` : '0mm'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weather History */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-6 h-6 text-primary" />
              Weather History (Last 5 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weatherHistory.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{day.date}</p>
                    <p className="text-sm text-muted-foreground">{day.condition}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-4 h-4" />
                      {day.temp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Droplets className="w-4 h-4" />
                      {day.humidity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Cloud className="w-4 h-4" />
                      {day.rainfall}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agricultural Advisory */}
        <Card className="card-3d animate-slide-up border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="text-warning">Weather Advisory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-warning/10 rounded-lg">
                <p className="font-medium">Rain Expected Tomorrow</p>
                <p className="text-sm text-muted-foreground">Delay irrigation for cotton and sugarcane fields. Good time for sowing kharif crops.</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="font-medium">Optimal Growing Conditions</p>
                <p className="text-sm text-muted-foreground">Temperature and humidity levels are ideal for vegetable crops this week.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherDetails;