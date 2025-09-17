import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  Droplets, 
  Sun, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface CropData {
  id: string;
  name: string;
  stage: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  daysPlanted: number;
  expectedHarvest: number;
  waterLevel: number;
  sunlight: number;
  lastWatered: string;
}

const CropMonitoringCard = () => {
  const [crops] = useState<CropData[]>([
    {
      id: '1',
      name: 'Tomato Field A',
      stage: 'Flowering',
      health: 'excellent',
      daysPlanted: 45,
      expectedHarvest: 35,
      waterLevel: 85,
      sunlight: 92,
      lastWatered: '2 hours ago'
    },
    {
      id: '2',
      name: 'Rice Paddy B',
      stage: 'Vegetative',
      health: 'good',
      daysPlanted: 60,
      expectedHarvest: 60,
      waterLevel: 95,
      sunlight: 88,
      lastWatered: '6 hours ago'
    },
    {
      id: '3',
      name: 'Cotton Field C',
      stage: 'Germination',
      health: 'warning',
      daysPlanted: 12,
      expectedHarvest: 108,
      waterLevel: 45,
      sunlight: 85,
      lastWatered: '1 day ago'
    }
  ]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'success';
      case 'good': return 'secondary';
      case 'warning': return 'warning';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <Activity className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <Card className="card-3d animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-success" />
          Crop Monitoring
          <Badge variant="outline" className="ml-auto">
            Live Data
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.id} className="p-4 bg-gradient-card rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{crop.name}</h4>
                  <p className="text-sm text-muted-foreground">{crop.stage} Stage</p>
                </div>
                <Badge 
                  variant={getHealthColor(crop.health) as any}
                  className="flex items-center gap-1"
                >
                  {getHealthIcon(crop.health)}
                  {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Droplets className="w-4 h-4" />
                    <span className="font-semibold">{crop.waterLevel}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Water Level</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent">
                    <Sun className="w-4 h-4" />
                    <span className="font-semibold">{crop.sunlight}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Sunlight</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold">{crop.daysPlanted}d</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Days Planted</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-warning">
                    <Activity className="w-4 h-4" />
                    <span className="font-semibold">{crop.expectedHarvest}d</span>
                  </div>
                  <p className="text-xs text-muted-foreground">To Harvest</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Last watered: {crop.lastWatered}
                </span>
                {crop.health === 'warning' && (
                  <Button size="sm" variant="outline" className="text-xs">
                    Water Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button size="sm" variant="outline" className="text-xs">
            View All Crops
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropMonitoringCard;