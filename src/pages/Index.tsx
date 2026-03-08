import { Link } from "react-router-dom";
import { AlertTriangle, Zap, BookOpen, Siren, Navigation, Radio, Braces, Backpack, StickyNote, Shield, WifiOff, Accessibility, Hand } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ClockWidget from "@/components/ClockWidget";

const sections = [
  { to: "/emergency-checklist", icon: Zap, label: "3-Min Checklist", pictogram: "⚡", desc: "Step-by-step disaster response" },
  { to: "/guide", icon: BookOpen, label: "Survival Guide", pictogram: "📖", desc: "24 topics — first aid, disasters & more" },
  { to: "/sos", icon: Siren, label: "SOS Signals", pictogram: "🆘", desc: "Emergency signals & India helplines" },
  { to: "/compass", icon: Navigation, label: "Compass", pictogram: "🧭", desc: "Digital compass for navigation" },
  { to: "/morse", icon: Radio, label: "Morse Code", pictogram: "📡", desc: "Encode, decode & flash messages" },
  { to: "/braille", icon: Braces, label: "Braille", pictogram: "⠃", desc: "Braille alphabet & survival phrases" },
  { to: "/edc", icon: Backpack, label: "EDC Kit", pictogram: "🎒", desc: "Everyday carry survival checklist" },
  { to: "/notebook", icon: StickyNote, label: "Notebook", pictogram: "📓", desc: "Personal notes & saved bookmarks" },
];

const features = [
  { icon: WifiOff, label: "100% Offline", desc: "Works without internet — install as app" },
  { icon: Shield, label: "Verified Data", desc: "Data verified with Indian Websites" },
  { icon: Accessibility, label: "Accessible", desc: "Voice commands, screen readers" },
  { icon: Hand, label: "One-Hand Use", desc: "Bottom navigation, large touch targets" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
      <a href="#main-tools" className="skip-link">Skip to main tools</a>

      {/* Header */}
      <header className="w-full max-w-lg flex items-center justify-between mb-6">
        <span className="text-xs mono text-muted-foreground">v4.0</span>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <div className="text-center mb-6 max-w-lg">
        <div className="text-6xl mb-3" role="img" aria-label="Radioactive symbol">☢</div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
          SURVIVAL KIT
        </h1>
        <p className="text-muted-foreground mt-2 text-lg"><p className="text-muted-foreground mt-2 text-lg">An Emergency Offline Toolkit</p></p>
        <p className="text-sm text-muted-foreground mt-1">Made for India · Works without internet</p>
      </div>

      {/* Clock & Date Widget */}
      <div className="w-full max-w-lg">
        <ClockWidget />
      </div>

      {/* Emergency CTA */}
      <Link
        to="/emergency"
        className="w-full max-w-lg flex items-center gap-4 rounded-xl border-2 border-destructive/60 bg-destructive/10 hover:bg-destructive/20 p-5 mb-6 transition-all active:scale-[0.98]"
        aria-label="Open Emergency Mode — call, locate, signal in one tap"
      >
        <AlertTriangle className="h-10 w-10 text-destructive shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-bold text-xl leading-tight text-destructive">🚨 EMERGENCY MODE</p>
          <p className="text-sm text-muted-foreground">Call emergency numbers · SOS signal · GPS location</p>
        </div>
        <span className="text-destructive text-2xl" aria-hidden="true">→</span>
      </Link>

      {/* Feature badges */}
      <section className="w-full max-w-lg mb-8" aria-label="App features">
        <h2 className="sr-only">Key Features</h2>
        <div className="grid grid-cols-2 gap-2">
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2">
              <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground leading-tight">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools grid */}
      <main id="main-tools" className="w-full max-w-lg" role="main">
        <h2 className="text-lg font-semibold mb-3">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sections.map(({ to, icon: Icon, label, pictogram, desc }) => (
            <Link
              key={to}
              to={to}
              className="touch-target flex items-start gap-3 rounded-lg border border-border bg-card hover:border-primary/60 hover:bg-card/80 p-4 transition-all active:scale-[0.98]"
              aria-label={`${label} — ${desc}`}
            >
              <span className="text-2xl shrink-0" role="img" aria-hidden="true">{pictogram}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <Icon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center max-w-lg w-full" aria-label="Footer">
        <div className="border border-border rounded-lg p-4 mb-4">
          <p className="text-xs text-muted-foreground">
            📋 Verified: NDMA · NDRF · NIDM · MoHFW · Indian Red Cross · Civil Defence India
          </p>
        </div>
        <p className="text-xs text-muted-foreground mono">v4.0 — works 100% offline · accessible · India focused</p>
      </footer>
    </div>
  );
};

export default Index;
