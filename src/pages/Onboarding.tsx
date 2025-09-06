import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useVoice } from '@/context/VoiceContext';
import { Globe, Mic, Sprout, Users } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { language, setLanguage, translate } = useLanguage();
  const { speak, setCurrentLanguage } = useVoice();
  const [step, setStep] = useState(1);
  const [farmDetails, setFarmDetails] = useState({
    farmSize: '',
    soilType: '',
    previousCrops: ''
  });

  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr' as Language, name: 'Marathi', nativeName: 'मराठी' },
    { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setCurrentLanguage(lang);
    speak(translate('welcome'), lang);
    setTimeout(() => setStep(2), 1000);
  };

  const handleContinue = () => {
    localStorage.setItem('farmDetails', JSON.stringify(farmDetails));
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Welcome */}
        <div className="text-center text-white animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="w-16 h-16 text-accent animate-floating" />
          </div>
          <h1 className="text-4xl font-bold mb-2">KrishiMitra</h1>
          <p className="text-lg opacity-90">{translate('welcome')}</p>
        </div>

        {step === 1 && (
          <Card className="card-3d animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Globe className="w-6 h-6 text-primary" />
                {translate('selectLanguage')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="outline"
                  size="lg"
                  className="w-full justify-start text-left transition-smooth hover:shadow-glow"
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <span className="font-semibold">{lang.nativeName}</span>
                  <span className="ml-2 text-muted-foreground">({lang.name})</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="card-3d animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Users className="w-6 h-6 text-primary" />
                {translate('farmDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmSize">{translate('farmSize')} (acres)</Label>
                <Input
                  id="farmSize"
                  value={farmDetails.farmSize}
                  onChange={(e) => setFarmDetails(prev => ({ ...prev, farmSize: e.target.value }))}
                  placeholder="2.5"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">{translate('soilType')}</Label>
                <Select onValueChange={(value) => setFarmDetails(prev => ({ ...prev, soilType: value }))}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="black">Black Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousCrops">{translate('previousCrops')}</Label>
                <Input
                  id="previousCrops"
                  value={farmDetails.previousCrops}
                  onChange={(e) => setFarmDetails(prev => ({ ...prev, previousCrops: e.target.value }))}
                  placeholder="Rice, Wheat, Cotton"
                  className="text-lg"
                />
              </div>

              <Button
                size="lg"
                className="w-full glow-effect transition-bounce"
                onClick={handleContinue}
              >
                <Sprout className="w-5 h-5 mr-2" />
                {translate('getStarted')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Voice indicator */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Mic className="w-4 h-4" />
            <span>Voice assistance enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;