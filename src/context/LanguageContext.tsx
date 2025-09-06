import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const translations = {
  en: {
    welcome: "Welcome to KrishiMitra",
    selectLanguage: "Select Your Language",
    continue: "Continue",
    home: "Home",
    chat: "AI Assistant",
    pestDetection: "Pest Detection",
    community: "Community",
    weather: "Weather Forecast",
    cropAdvisory: "Crop Advisory",
    marketPrices: "Market Prices",
    soilHealth: "Soil Health",
    speakNow: "Speak now...",
    listening: "Listening...",
    askQuestion: "Ask your farming question",
    uploadImage: "Upload Image",
    takePhoto: "Take Photo",
    farmDetails: "Farm Details",
    farmSize: "Farm Size",
    soilType: "Soil Type",
    previousCrops: "Previous Crops",
    getStarted: "Get Started",
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
    today: "Today",
    tomorrow: "Tomorrow",
    temperature: "Temperature",
    humidity: "Humidity",
    rainfall: "Rainfall"
  },
  hi: {
    welcome: "कृषिमित्र में आपका स्वागत है",
    selectLanguage: "अपनी भाषा चुनें",
    continue: "जारी रखें",
    home: "होम",
    chat: "एआई सहायक",
    pestDetection: "कीट पहचान",
    community: "समुदाय",
    weather: "मौसम पूर्वानुमान",
    cropAdvisory: "फसल सलाह",
    marketPrices: "बाज़ार की कीमतें",
    soilHealth: "मिट्टी का स्वास्थ्य",
    speakNow: "अब बोलें...",
    listening: "सुन रहे हैं...",
    askQuestion: "अपना कृषि प्रश्न पूछें",
    uploadImage: "छवि अपलोड करें",
    takePhoto: "फोटो लें",
    farmDetails: "खेत का विवरण",
    farmSize: "खेत का आकार",
    soilType: "मिट्टी का प्रकार",
    previousCrops: "पिछली फसलें",
    getStarted: "शुरू करें",
    good: "अच्छा",
    moderate: "मध्यम",
    poor: "खराब",
    today: "आज",
    tomorrow: "कल",
    temperature: "तापमान",
    humidity: "नमी",
    rainfall: "वर्षा"
  },
  mr: {
    welcome: "कृषीमित्रमध्ये आपले स्वागत आहे",
    selectLanguage: "आपली भाषा निवडा",
    continue: "सुरू ठेवा",
    home: "मुख्यपृष्ठ",
    chat: "एआय सहाय्यक",
    pestDetection: "कीड ओळख",
    community: "समुदाय",
    weather: "हवामान अंदाज",
    cropAdvisory: "पीक सल्ला",
    marketPrices: "बाजारभाव",
    soilHealth: "माती आरोग्य",
    speakNow: "आता बोला...",
    listening: "ऐकत आहे...",
    askQuestion: "आपला शेती प्रश्न विचारा",
    uploadImage: "प्रतिमा अपलोड करा",
    takePhoto: "फोटो काढा",
    farmDetails: "शेत तपशील",
    farmSize: "शेताचा आकार",
    soilType: "मातीचा प्रकार",
    previousCrops: "मागील पिके",
    getStarted: "सुरुवात करा",
    good: "चांगले",
    moderate: "मध्यम",
    poor: "खराब",
    today: "आज",
    tomorrow: "उद्या",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    rainfall: "पाऊस"
  },
  bn: {
    welcome: "কৃষিমিত্রে আপনাকে স্বাগতম",
    selectLanguage: "আপনার ভাষা নির্বাচন করুন",
    continue: "চালিয়ে যান",
    home: "হোম",
    chat: "এআই সহায়ক",
    pestDetection: "পোকা সনাক্তকরণ",
    community: "কমিউনিটি",
    weather: "আবহাওয়া পূর্বাভাস",
    cropAdvisory: "ফসল পরামর্শ",
    marketPrices: "বাজার দর",
    soilHealth: "মাটির স্বাস্থ্য",
    speakNow: "এখন বলুন...",
    listening: "শুনছি...",
    askQuestion: "আপনার কৃষি প্রশ্ন জিজ্ঞাসা করুন",
    uploadImage: "ছবি আপলোড করুন",
    takePhoto: "ছবি তুলুন",
    farmDetails: "খামারের বিবরণ",
    farmSize: "খামারের আকার",
    soilType: "মাটির ধরন",
    previousCrops: "পূর্ববর্তী ফসল",
    getStarted: "শুরু করুন",
    good: "ভাল",
    moderate: "মাঝারি",
    poor: "খারাপ",
    today: "আজ",
    tomorrow: "আগামীকাল",
    temperature: "তাপমাত্রা",
    humidity: "আর্দ্রতা",
    rainfall: "বৃষ্টিপাত"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};