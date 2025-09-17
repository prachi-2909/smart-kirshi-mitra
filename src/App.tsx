import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import PestDetection from "./pages/PestDetection";
import Community from "./pages/Community";
import WeatherDetails from "./pages/WeatherDetails";
import MarketPrices from "./pages/MarketPrices";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./context/LanguageContext";
import { VoiceProvider } from "./context/VoiceContext";
import { LocationProvider } from "./context/LocationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <VoiceProvider>
          <LocationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/pest-detection" element={<PestDetection />} />
              <Route path="/community" element={<Community />} />
              <Route path="/weather-details" element={<WeatherDetails />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </LocationProvider>
        </VoiceProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
