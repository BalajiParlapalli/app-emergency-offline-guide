import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, Hand, Brain, Eye, ClipboardList } from "lucide-react";
import BackLink from "@/components/BackLink";

type Threat =
  | "breathing"
  | "temperature"
  | "injured"
  | "trapped"
  | "lost"
  | "no-water"
  | "unsafe"
  | "someone-needs-help";

type Resource =
  | "phone"
  | "water"
  | "shelter"
  | "people"
  | "signal"
  | "injury";

const threats: { id: Threat; label: string; emoji: string }[] = [
  { id: "breathing", label: "Can't breathe", emoji: "😤" },
  { id: "temperature", label: "Too hot / cold", emoji: "🌡️" },
  { id: "injured", label: "Injured", emoji: "🩸" },
  { id: "trapped", label: "Trapped", emoji: "🏚️" },
  { id: "lost", label: "Lost", emoji: "🧭" },
  { id: "no-water", label: "No water", emoji: "💧" },
  { id: "unsafe", label: "Unsafe location", emoji: "⚠️" },
  { id: "someone-needs-help", label: "Someone needs help", emoji: "🆘" },
];

const resources: { id: Resource; label: string }[] = [
  { id: "phone", label: "Phone with battery" },
  { id: "water", label: "Any water" },
  { id: "shelter", label: "Shelter nearby" },
  { id: "people", label: "Other people" },
  { id: "signal", label: "A way to signal" },
  { id: "injury", label: "Any injury" },
];

interface ActionPlan {
  action: string;
  detail: string;
  link: string;
  linkLabel: string;
}

function generatePlan(
  selectedThreats: Set<Threat>,
  selectedResources: Set<Resource>
): ActionPlan {
  const hasPhone = selectedResources.has("phone");
  const hasPeople = selectedResources.has("people");
  const hasWater = selectedResources.has("water");
  const hasShelter = selectedResources.has("shelter");
  const hasSignal = selectedResources.has("signal");
  const hasInjury = selectedResources.has("injury");

  // Priority-based logic
  if (selectedThreats.has("breathing")) {
    return {
      action: "Clear your airway immediately. Move to fresh air if possible.",
      detail: hasPhone
        ? "Call 112 NOW while moving to ventilated area."
        : "Signal for help — bang on walls, shout.",
      link: "/guide/first-aid",
      linkLabel: "First Aid Guide",
    };
  }

  if (selectedThreats.has("injured") || hasInjury) {
    if (hasPeople) {
      return {
        action: "Get help for bleeding first, then call 112.",
        detail: "Apply direct pressure to wounds. Ask others to call for help.",
        link: "/guide/first-aid",
        linkLabel: "First Aid Guide",
      };
    }
    return {
      action: "Stop the bleeding. Apply pressure with any cloth.",
      detail: hasPhone
        ? "Call 112 immediately after controlling bleeding."
        : "Signal for help using SOS after stabilizing.",
      link: hasPhone ? "/emergency" : "/sos",
      linkLabel: hasPhone ? "Emergency Mode" : "SOS Signals",
    };
  }

  if (selectedThreats.has("trapped")) {
    if (hasPhone) {
      return {
        action: "Send your GPS location NOW, then signal.",
        detail: "Share location via SMS/WhatsApp. Conserve battery — turn off non-essentials.",
        link: "/emergency",
        linkLabel: "Emergency Mode (GPS)",
      };
    }
    if (hasSignal) {
      return {
        action: "Signal your location using light, sound, or SOS pattern.",
        detail: "Use Morse SOS (··· ——— ···) by tapping or flashing. Stay put.",
        link: "/morse",
        linkLabel: "Morse Code Tool",
      };
    }
    return {
      action: "Make noise at regular intervals. Tap walls. Shout every 5 minutes.",
      detail: "Conserve energy between signals. Do NOT try to dig out without stable support.",
      link: "/sos",
      linkLabel: "SOS Signals",
    };
  }

  if (selectedThreats.has("temperature")) {
    if (hasShelter) {
      return {
        action: "Get to shelter immediately. Regulate body temperature.",
        detail: hasWater
          ? "Drink water slowly. Cool/warm body gradually — never rapidly."
          : "Find shade/warmth first. Signal for water rescue second.",
        link: "/guide/extreme-weather",
        linkLabel: "Extreme Weather Guide",
      };
    }
    return {
      action: "Find shade or warmth first, signal second.",
      detail: "Cover your head. If cold, insulate from the ground. If hot, minimize movement.",
      link: "/environmental-signals",
      linkLabel: "Environmental Signals",
    };
  }

  if (selectedThreats.has("no-water")) {
    return {
      action: hasShelter
        ? "Stay in shade. Minimize sweating. Ration any liquids."
        : "Find shade first. Then look for water sources.",
      detail: "Dew on plants, rain collection, moving water > still water. Do NOT drink seawater.",
      link: "/guide/water-purification",
      linkLabel: "Water Purification Guide",
    };
  }

  if (selectedThreats.has("lost")) {
    return {
      action: hasPhone
        ? "Share GPS location NOW. Stay put. Signal at intervals."
        : "Use the sun/stars to find direction. Stay on high ground.",
      detail: "If you have no direction cues, STAY WHERE YOU ARE. Rescuers search your last known location.",
      link: hasPhone ? "/emergency" : "/navigation-survival",
      linkLabel: hasPhone ? "Emergency Mode (GPS)" : "Navigate Without GPS",
    };
  }

  if (selectedThreats.has("unsafe")) {
    return {
      action: "Move away from the threat. Get to open ground.",
      detail: hasPhone
        ? "Call 112 once you're safe. Report the hazard."
        : "Move uphill from floods, away from buildings in earthquakes, upwind from gas leaks.",
      link: "/disaster-timeline",
      linkLabel: "Disaster Timeline",
    };
  }

  if (selectedThreats.has("someone-needs-help")) {
    return {
      action: hasPeople
        ? "Assign tasks: one person calls 112, one provides first aid."
        : "Check responsiveness. Open airway. If no breathing, start CPR.",
      detail: hasPhone
        ? "Call 112 FIRST, then provide first aid. Speaker mode."
        : "Shout for help while assessing the victim.",
      link: "/guide/first-aid",
      linkLabel: "First Aid Guide",
    };
  }

  // Fallback
  return {
    action: "Call 112. Describe your situation clearly.",
    detail: "State: location, number of people, injuries, immediate threats.",
    link: "/emergency",
    linkLabel: "Emergency Mode",
  };
}

const steps = [
  { label: "STOP", icon: Hand, desc: "Sit down. Do nothing for 60 seconds." },
  { label: "THINK", icon: Brain, desc: "What is your immediate threat?" },
  { label: "OBSERVE", icon: Eye, desc: "What do you have? What's around you?" },
  { label: "PLAN", icon: ClipboardList, desc: "Your ONE action right now." },
];

const STOPMethod = () => {
  const [step, setStep] = useState(0);
  const [selectedThreats, setSelectedThreats] = useState<Set<Threat>>(new Set());
  const [selectedResources, setSelectedResources] = useState<Set<Resource>>(new Set());
  const [countdown, setCountdown] = useState(60);
  const [countdownDone, setCountdownDone] = useState(false);

  // Step 0 countdown
  const startCountdown = useCallback(() => {
    setCountdownDone(false);
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCountdownDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleThreat = (id: Threat) => {
    setSelectedThreats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleResource = (id: Resource) => {
    setSelectedResources((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setStep(0);
    setSelectedThreats(new Set());
    setSelectedResources(new Set());
    setCountdown(60);
    setCountdownDone(false);
  };

  const plan =
    step === 3 && selectedThreats.size > 0
      ? generatePlan(selectedThreats, selectedResources)
      : null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
      <div className="w-full max-w-lg">
        <BackLink />

        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Hand className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-primary">STOP Method</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Survival Decision Engine — Stop panicking, start surviving
          </p>
        </header>

        {/* Step indicators */}
        <div className="flex gap-1 mb-6">
          {steps.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            {(() => {
              const StepIcon = steps[step].icon;
              return <StepIcon className="h-5 w-5 text-primary" />;
            })()}
            <h2 className="text-xl font-bold">
              {steps[step].label}
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            Step {step + 1}/4
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{steps[step].desc}</p>

        {/* Step 0: STOP — breathe timer */}
        {step === 0 && (
          <div className="text-center space-y-6">
            {!countdownDone && countdown === 60 ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold">
                  You're alive. That's what matters right now.
                </p>
                <p className="text-sm text-muted-foreground">
                  Sit down if you can. Press the button below and breathe for 60 seconds.
                </p>
                <button
                  onClick={startCountdown}
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg active:scale-[0.98] transition-transform"
                >
                  Start 60-Second Calm
                </button>
              </div>
            ) : !countdownDone ? (
              <div className="space-y-4">
                <div className="text-7xl font-bold text-primary mono">
                  {countdown}
                </div>
                <p className="text-sm text-muted-foreground animate-pulse">
                  Breathe in... hold... breathe out...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg font-semibold text-primary">✓ Good. You're calmer now.</p>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  Next: Think <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
            {(countdown < 60 && !countdownDone) && (
              <button
                onClick={() => {
                  setCountdownDone(true);
                  setCountdown(0);
                }}
                className="text-xs text-muted-foreground underline"
              >
                Skip — I'm calm
              </button>
            )}
          </div>
        )}

        {/* Step 1: THINK — threat selection */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm font-medium mb-2">
              Tap what threatens you most RIGHT NOW:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {threats.map((t) => (
                <button
                  key={t.id}
                  onClick={() => toggleThreat(t.id)}
                  className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm font-medium transition-all active:scale-[0.98] ${
                    selectedThreats.has(t.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            {selectedThreats.size > 0 && (
              <button
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                Next: Observe <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Step 2: OBSERVE — resource checklist */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm font-medium mb-2">
              Look around you. Do you have:
            </p>
            <div className="space-y-2">
              {resources.map((r) => (
                <button
                  key={r.id}
                  onClick={() => toggleResource(r.id)}
                  className={`w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all active:scale-[0.98] ${
                    selectedResources.has(r.id)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                      selectedResources.has(r.id)
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedResources.has(r.id) && (
                      <span className="text-primary-foreground text-xs font-bold">✓</span>
                    )}
                  </div>
                  <span className={selectedResources.has(r.id) ? "font-medium" : ""}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              Next: Plan <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 3: PLAN — dynamic action */}
        {step === 3 && plan && (
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">
                Your ONE action right now
              </p>
              <p className="text-xl font-bold leading-snug mb-3">
                {plan.action}
              </p>
              <p className="text-sm text-muted-foreground">
                {plan.detail}
              </p>
            </div>

            <Link
              to={plan.link}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-bold active:scale-[0.98] transition-transform"
            >
              Do this now → {plan.linkLabel}
            </Link>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                Change threats
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                Change resources
              </button>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="h-4 w-4" /> Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default STOPMethod;
