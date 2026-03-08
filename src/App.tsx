import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import GuideTopic from "./pages/GuideTopic";
import Bookmarks from "./pages/Bookmarks";
import MorseCode from "./pages/MorseCode";
import Braille from "./pages/Braille";
import SOS from "./pages/SOS";
import EDCKit from "./pages/EDCKit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/edc" element={<EDCKit />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/:topicSlug" element={<GuideTopic />} />
          <Route path="/guide/bookmarks" element={<Bookmarks />} />
          <Route path="/morse" element={<MorseCode />} />
          <Route path="/braille" element={<Braille />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
