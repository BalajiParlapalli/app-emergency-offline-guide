import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EmergencyMode from "./pages/EmergencyMode";
import ScrollToTop from "./components/ScrollToTop";
import OfflineBanner from "./components/OfflineBanner";

const BottomNav = lazy(() => import("./components/BottomNav"));
const VoiceCommand = lazy(() => import("./components/VoiceCommand"));
const Toaster = lazy(() => import("./components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("./components/ui/sonner").then(m => ({ default: m.Toaster })));

const Guide = lazy(() => import("./pages/Guide"));
const GuideTopic = lazy(() => import("./pages/GuideTopic"));
const Notebook = lazy(() => import("./pages/Notebook"));
const MorseCode = lazy(() => import("./pages/MorseCode"));
const Braille = lazy(() => import("./pages/Braille"));
const SOS = lazy(() => import("./pages/SOS"));
const EDCKit = lazy(() => import("./pages/EDCKit"));
const Compass = lazy(() => import("./pages/Compass"));
const EmergencyChecklist = lazy(() => import("./pages/EmergencyChecklist"));
const EmergencyMode = lazy(() => import("./pages/EmergencyMode"));
const NotFound = lazy(() => import("./pages/NotFound"));
const VitalSigns = lazy(() => import("./pages/VitalSigns"));
const DisasterTimeline = lazy(() => import("./pages/DisasterTimeline"));
const PowerPlanner = lazy(() => import("./pages/PowerPlanner"));
const EnvironmentalSignals = lazy(() => import("./pages/EnvironmentalSignals"));
const PsychologicalSurvival = lazy(() => import("./pages/PsychologicalSurvival"));
const NavigationSurvival = lazy(() => import("./pages/NavigationSurvival"));

const App = () => (
  <TooltipProvider>
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
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
          <Route path="/vital-signs" element={<VitalSigns />} />
          <Route path="/disaster-timeline" element={<DisasterTimeline />} />
          <Route path="/power-planner" element={<PowerPlanner />} />
          <Route path="/environmental-signals" element={<EnvironmentalSignals />} />
          <Route path="/psychological-survival" element={<PsychologicalSurvival />} />
          <Route path="/navigation-survival" element={<NavigationSurvival />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
        <VoiceCommand />
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
