import { useState } from "react";
import BackLink from "@/components/BackLink";

const steps = [
  { emoji: "🧘", title: "Stay Calm", desc: "Take 3 deep breaths. Panic kills faster than most disasters. Think clearly, then act.", time: "30 sec" },
  { emoji: "🩹", title: "Check for Injuries", desc: "Check yourself first, then others nearby. Apply pressure to any bleeding. Don't move anyone with spinal injury.", time: "30 sec" },
  { emoji: "🏃", title: "Move to Safe Area", desc: "Get away from falling objects, fire, water, or structural damage. Duck under sturdy furniture during earthquake. Move to high ground during flood.", time: "30 sec" },
  { emoji: "📞", title: "Call Emergency Number", desc: "Dial 112 (National Emergency — works without SIM). State: your location, number of injured, type of emergency. Stay on line.", time: "30 sec" },
  { emoji: "📋", title: "Follow the Guide", desc: "Open the relevant Survival Guide topic for detailed steps. Share with others around you. Help children and elderly first.", time: "30 sec" },
  { emoji: "📍", title: "Share Your Location", desc: "Use the Emergency Mode to share GPS coordinates with rescuers. If no phone, mark your location visibly with cloth or SOS ground signal.", time: "30 sec" },
];

const EmergencyChecklist = () => {
  const [checked, setChecked] = useState<boolean[]>(new Array(steps.length).fill(false));

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const done = checked.filter(Boolean).length;

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" role="main" aria-label="3-Minute Emergency Checklist">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">⚡ 3-Minute Emergency Checklist</h1>
      <p className="text-sm text-muted-foreground mb-4">When disaster strikes, follow these steps in order</p>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${(done / steps.length) * 100}%` }}
          />
        </div>
        <span className="mono text-sm text-muted-foreground">{done}/{steps.length}</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            aria-label={`${checked[i] ? "Uncheck" : "Check"}: ${step.title}`}
            aria-pressed={checked[i]}
            className={`touch-target w-full text-left border rounded-lg p-4 transition-all ${
              checked[i]
                ? "border-primary/50 bg-primary/10"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                checked[i] ? "border-primary bg-primary" : "border-muted-foreground"
              }`}>
                {checked[i] && <span className="text-primary-foreground text-xs">✓</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    {step.emoji} {step.title}
                  </span>
                  <span className="mono text-xs text-muted-foreground">{step.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {done === steps.length && (
        <div className="mt-6 border border-primary rounded-lg p-4 bg-primary/10 text-center">
          <p className="font-semibold text-primary text-lg">✅ All steps completed!</p>
          <p className="text-sm text-muted-foreground mt-1">Stay where you are if safe. Help others. Wait for rescue.</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyChecklist;
