import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Camera, Upload, Scan, Bug, Leaf, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DetectionResult {
  pest: string;
  confidence: number;
  symptoms: string[];
  treatment: string;
  prevention: string[];
}

const PestDetection = () => {
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const mockResults: DetectionResult[] = [
    {
      pest: "Aphids (Green Peach Aphid)",
      confidence: 87,
      symptoms: ["Small green insects on leaves", "Curled or yellowing leaves", "Sticky honeydew on plant"],
      treatment: "Spray with neem oil solution (2-3ml per liter) in early morning or evening. Apply insecticidal soap for immediate relief.",
      prevention: ["Use reflective mulches", "Encourage beneficial insects like ladybugs", "Regular inspection of plants", "Remove weeds around crops"]
    },
    {
      pest: "Leaf Blight",
      confidence: 93,
      symptoms: ["Brown or yellow spots on leaves", "Lesions with dark borders", "Premature leaf drop"],
      treatment: "Apply copper-based fungicide every 10-14 days. Remove affected leaves and destroy them.",
      prevention: ["Ensure proper plant spacing", "Avoid overhead watering", "Crop rotation", "Use disease-resistant varieties"]
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

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
            <Bug className="w-8 h-8 animate-floating" />
            <div>
              <h1 className="text-xl font-bold">{translate('pestDetection')}</h1>
              <p className="text-sm text-white/80">AI-powered crop diagnosis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Upload Section */}
        {!selectedImage && (
          <Card className="card-3d animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Capture or Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="flex-col h-24 glow-effect transition-bounce"
                  onClick={handleCameraCapture}
                >
                  <Camera className="w-8 h-8 mb-2" />
                  <span>{translate('takePhoto')}</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-col h-24 glow-effect transition-bounce"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mb-2" />
                  <span>{translate('uploadImage')}</span>
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Take a clear photo of affected plant parts</p>
                <p>Best results: Good lighting, close-up of symptoms</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Preview and Analysis */}
        {selectedImage && (
          <Card className="card-3d animate-slide-up">
            <CardContent className="p-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Uploaded crop"
                  className="w-full h-64 object-cover rounded-lg"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Scan className="w-12 h-12 mx-auto mb-2 animate-voice-pulse" />
                      <p>Analyzing image...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetDetection}
                  className="flex-1"
                >
                  Try Another Image
                </Button>
                {!isAnalyzing && !result && (
                  <Button
                    onClick={analyzeImage}
                    className="flex-1 glow-effect"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Detection Result */}
            <Card className="card-3d animate-slide-up border-l-4 border-l-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-6 h-6" />
                  Detection Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{result.pest}</h3>
                    <div className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {result.confidence}% Confidence
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Symptoms Identified:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                      {result.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment */}
            <Card className="card-3d animate-slide-up border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Immediate Treatment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{result.treatment}</p>
              </CardContent>
            </Card>

            {/* Prevention */}
            <Card className="card-3d animate-slide-up border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="text-success">Prevention Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.prevention.map((measure, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                      <span>{measure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Expert Consultation */}
            <Card className="card-3d animate-slide-up">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Need expert advice? Connect with agricultural specialists in your area.
                  </p>
                  <Button variant="outline" className="glow-effect">
                    Contact Local Expert
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestDetection;