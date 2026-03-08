import { Link } from "react-router-dom";
import { BookOpen, Radio, Braces, Siren, Backpack, AlertTriangle, Navigation, Zap } from "lucide-react";

const sections = [
  { to: "/emergency", icon: AlertTriangle, label: "🚨 Emergency Mode", desc: "Call, locate, signal — one tap", highlight: true },
  { to: "/emergency-checklist", icon: Zap, label: "⚡ 3-Min Checklist", desc: "Step-by-step disaster response" },
  { to: "/edc", icon: Backpack, label: "EDC Kit", desc: "Everyday carry survival checklist" },
  { to: "/guide", icon: BookOpen, label: "Survival Guide", desc: "24 topics — first aid, disasters & more" },
  { to: "/morse", icon: Radio, label: "Morse Code", desc: "Encode, decode & flash messages" },
  { to: "/braille", icon: Braces, label: "Braille", desc: "Braille alphabet & survival phrases" },
  { to: "/sos", icon: Siren, label: "SOS Signals", desc: "Emergency signals & India helplines" },
  { to: "/compass", icon: Navigation, label: "🧭 Compass", desc: "Digital compass for navigation" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          ☢ SURVIVAL KIT
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">After Apocalypse Offline Toolkit</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {sections.map(({ to, icon: Icon, label, desc, highlight }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-start gap-4 rounded-lg border p-5 transition-colors ${
              highlight
                ? "border-destructive/60 bg-destructive/10 hover:bg-destructive/20 sm:col-span-2"
                : "border-border bg-card hover:border-primary/60 hover:bg-card/80"
            }`}
          >
            <Icon className={`h-7 w-7 shrink-0 mt-0.5 ${highlight ? "text-destructive" : "text-primary"}`} />
            <div>
              <p className="font-semibold text-lg leading-tight">{label}</p>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-12 mono">v3.0 — works 100% offline</p>
    </div>
  );
};

export default Index;
