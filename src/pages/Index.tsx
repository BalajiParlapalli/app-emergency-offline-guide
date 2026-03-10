import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Zap, BookOpen, Siren, Navigation, Radio, Braces, Backpack, StickyNote, Shield, WifiOff, Accessibility, Hand, Search, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ClockWidget from "@/components/ClockWidget";
import { guideTopics } from "@/data/guideData";

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
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    const results: { topicSlug: string; topicTitle: string; topicEmoji: string; heading: string; point: string }[] = [];
    for (const topic of guideTopics) {
      for (const section of topic.sections) {
        for (const point of section.points) {
          if (
            point.toLowerCase().includes(q) ||
            section.heading.toLowerCase().includes(q) ||
            topic.title.toLowerCase().includes(q)
          ) {
            results.push({
              topicSlug: topic.slug,
              topicTitle: topic.title,
              topicEmoji: topic.emoji,
              heading: section.heading,
              point,
            });
          }
        }
      }
    }
    return results;
  }, [query]);

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
        <p className="text-muted-foreground mt-2 text-lg">An Emergency Offline Toolkit</p>
        <p className="text-sm text-muted-foreground mt-1">Made for India · Works without internet</p>
      </div>

      {/* Search */}
      <div className="w-full max-w-lg mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search everything... (e.g. snake bite, ORS, fire)"
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search all survival topics"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary" aria-label="Clear search">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults !== null ? (
        <div className="w-full max-w-lg mb-6">
          <p className="text-xs text-muted-foreground mb-3 mono">{searchResults.length} results</p>
          {searchResults.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No results found for "{query}"</p>
          ) : (
            <div className="space-y-2">
              {searchResults.slice(0, 30).map((r, i) => (
                <Link
                  key={i}
                  to={`/guide/${r.topicSlug}`}
                  className="block border border-border rounded-lg px-4 py-3 hover:border-primary/60 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{r.topicEmoji}</span>
                    <span className="text-xs text-muted-foreground">{r.topicTitle} › {r.heading}</span>
                  </div>
                  <p className="text-sm">{r.point}</p>
                </Link>
              ))}
              {searchResults.length > 30 && (
                <p className="text-xs text-muted-foreground text-center py-2">Showing first 30 results. Refine your search.</p>
              )}
            </div>
          )}
        </div>
      ) : (
      <>

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
      <main id="main-tools" className="w-full max-w-lg">
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
            Built for emergencies · Works 100% offline
          </p>
        </div>
        <p className="text-xs text-muted-foreground mono">v4.0 — works 100% offline · accessible · India focused</p>
      </footer>
    </div>
  );
};

export default Index;
