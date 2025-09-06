import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketPrices = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();

  const marketData = [
    { crop: 'Wheat', currentPrice: '₹2,100/quintal', change: '+5%', trend: 'up', lastWeek: '₹2,000' },
    { crop: 'Rice', currentPrice: '₹1,800/quintal', change: '-2%', trend: 'down', lastWeek: '₹1,840' },
    { crop: 'Cotton', currentPrice: '₹6,500/quintal', change: '+8%', trend: 'up', lastWeek: '₹6,020' },
    { crop: 'Sugarcane', currentPrice: '₹320/quintal', change: '+3%', trend: 'up', lastWeek: '₹310' },
    { crop: 'Soybean', currentPrice: '₹4,200/quintal', change: '-1%', trend: 'down', lastWeek: '₹4,242' },
    { crop: 'Onion', currentPrice: '₹2,500/quintal', change: '+12%', trend: 'up', lastWeek: '₹2,232' },
  ];

  const nearbyMandis = [
    { name: 'Pune Main Mandi', distance: '5 km', status: 'Open' },
    { name: 'Hadapsar Mandi', distance: '12 km', status: 'Open' },
    { name: 'Khadki Mandi', distance: '18 km', status: 'Closed' },
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
            <DollarSign className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">{translate('marketPrices')}</h1>
              <p className="text-sm text-white/80">Live mandi rates & trends</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Location */}
        <Card className="card-3d animate-slide-up">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">Current Location: Pune, Maharashtra</span>
            </div>
          </CardContent>
        </Card>

        {/* Current Market Prices */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              Today's Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.map((item, index) => (
                <div key={item.crop} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-semibold">{item.crop}</h3>
                    <p className="text-2xl font-bold text-primary">{item.currentPrice}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-medium">{item.change}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Last week: {item.lastWeek}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Mandis */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              Nearby Mandis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nearbyMandis.map((mandi, index) => (
                <div key={mandi.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-medium">{mandi.name}</h3>
                    <p className="text-sm text-muted-foreground">{mandi.distance} away</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mandi.status === 'Open' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {mandi.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Alerts */}
        <Card className="card-3d animate-slide-up border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="text-warning">Price Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <p className="font-medium text-green-800 dark:text-green-400">Cotton Price Surge</p>
                <p className="text-sm text-muted-foreground">Cotton prices up 8% - Good time to sell your harvest!</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <p className="font-medium text-orange-800 dark:text-orange-400">Onion Demand High</p>
                <p className="text-sm text-muted-foreground">Onion prices rising due to festival season. Consider harvesting early.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historical Trends */}
        <Card className="card-3d animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              7-Day Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketData.slice(0, 3).map((item) => (
                <div key={item.crop} className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">{item.crop}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span>Jan 1: ₹{(parseInt(item.lastWeek.replace('₹', '').replace(',', '')) - 100).toLocaleString()}</span>
                    <span>Jan 3: {item.lastWeek}</span>
                    <span className="font-bold">Today: {item.currentPrice}</span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.abs(parseInt(item.change))}0%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;