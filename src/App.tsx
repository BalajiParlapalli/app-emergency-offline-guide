import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import GuideTopic from "./pages/GuideTopic";
import Notebook from "./pages/Notebook";
import MorseCode from "./pages/MorseCode";
import Braille from "./pages/Braille";
import SOS from "./pages/SOS";
import EDCKit from "./pages/EDCKit";
import Compass from "./pages/Compass";
import EmergencyChecklist from "./pages/EmergencyChecklist";
import EmergencyMode from "./pages/EmergencyMode";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import VoiceCommand from "./components/VoiceCommand";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edc" element={<EDCKit />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/bookmarks" element={<Notebook />} />
          <Route path="/guide/:topicSlug" element={<GuideTopic />} />
          <Route path="/morse" element={<MorseCode />} />
          <Route path="/braille" element={<Braille />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/compass" element={<Compass />} />
          <Route path="/emergency-checklist" element={<EmergencyChecklist />} />
          <Route path="/emergency" element={<EmergencyMode />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
        <VoiceCommand />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
