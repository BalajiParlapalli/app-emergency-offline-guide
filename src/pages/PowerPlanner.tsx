import { useState } from "react";
import BackLink from "@/components/BackLink";
import { Battery, BatteryLow, Radio, Smartphone, Wifi, WifiOff, Zap } from "lucide-react";

const batteryTips = [
  { threshold: "Below 50%", actions: [
    "Turn off Bluetooth, GPS, NFC immediately",
    "Disable background app refresh (Settings → Battery → Background Activity)",
    "Reduce screen brightness to minimum readable level",
    "Enable battery saver / low power mode",
    "Switch to airplane mode when not actively using phone",
    "Close all unnecessary apps — social media, games, streaming",
    "Disable auto-sync for email and cloud services",
    "Turn off haptic feedback and keyboard sounds",
  ]},
  { threshold: "Below 20%", actions: [
    "Airplane mode ON permanently — only disable briefly to send critical messages",
    "Use phone only for: emergency calls, GPS location check, torch",
    "Disable Wi-Fi and mobile data completely",
    "Turn off auto-brightness — set to minimum manually",
    "Close ALL apps except the one you need right now",
    "Use built-in torch instead of screen for light",
    "Compose messages offline, turn on network briefly to send, then airplane mode again",
    "Every 1% of battery counts — at 20% you may have 30–60 minutes of careful use left",
  ]},
  { threshold: "Below 5%", actions: [
    "Send one final location message to emergency contact with GPS coordinates",
    "Save a text note with your location and situation (readable even if phone dies)",
    "Switch phone off completely — preserve last 5% for one critical call later",
    "If you must keep it on, airplane mode + screen off + no apps",
    "Consider: one 30-second call uses ~0.5% battery; one SMS uses ~0.1%",
    "SMS is more reliable than calls in network-congested disasters",
    "If rescue is imminent, save battery for signaling (torch, screen flash)",
  ]},
];

const commOptions = [
  {
    title: "SMS vs Voice Calls",
    icon: Smartphone,
    points: [
      "SMS uses much less battery and bandwidth than voice calls",
      "SMS can queue and send when network briefly connects — calls need continuous connection",
      "In disasters, networks are congested — SMS gets through when calls don't",
      "Send location coordinates via SMS: open maps, copy coordinates, paste in message",
      "Pre-type critical messages to send quickly when network is available",
      "Use group SMS to update multiple people at once",
    ],
  },
  {
    title: "Radio Communication",
    icon: Radio,
    points: [
      "AM/FM radio works when all networks fail — keep a battery/hand-crank radio",
      "All India Radio (AIR) broadcasts disaster updates on MW & FM frequencies",
      "AIR Disaster broadcast: MW 666 kHz (Delhi), check local frequency for your city",
      "HAM (Amateur) radio operators provide emergency communication — contact local HAM club",
      "In India, HAM license from WPC (Wireless Planning & Coordination) wing, DoT",
      "Walkie-talkies work within 2–5 km without any network — useful for group coordination",
      "Community emergency channels: PMR446 (license-free in some regions), FRS channels",
    ],
  },
  {
    title: "Emergency Broadcasts",
    icon: Wifi,
    points: [
      "NDMA (National Disaster Management Authority) alerts via Common Alerting Protocol (CAP)",
      "Cell Broadcast Emergency Alerts (CBEA) — no app needed, works on all phones",
      "DD National and DD News broadcast emergency information during disasters",
      "Police wireless: 100 (Police), 101 (Fire), 108 (Ambulance), 112 (Universal Emergency)",
      "Local cable TV and FM stations often relay emergency information",
      "Satellite phones work when all terrestrial networks fail — BSNL offers satellite phone service",
      "Internet via satellite (Starlink, ISRO's satellite internet initiatives) — emerging options",
    ],
  },
  {
    title: "Offline Communication",
    icon: WifiOff,
    points: [
      "Whistle: 3 short blasts = SOS / need help (international standard)",
      "Mirror/torch signaling: 3 flashes = SOS",
      "Write messages on paper and leave at visible locations for rescuers",
      "Use bright cloth/fabric as ground signals visible from helicopters",
      "Ground-to-air signals: V = need assistance, X = need medical help, → = travelling this direction",
      "Firelight visible up to 10 km at night — use as a signal (safely)",
      "Morse code with torch: SOS = ··· −−− ···",
    ],
  },
];

const PowerPlanner = () => {
  const [bankMah, setBankMah] = useState(10000);
  const [phoneMah, setPhoneMah] = useState(4000);

  const charges = Math.floor((bankMah * 0.85) / phoneMah * 10) / 10; // 85% efficiency
  const emergencyHours = Math.round(charges * 8); // ~8 hrs per charge in emergency mode

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
      <div className="w-full max-w-2xl">
        <BackLink />
        <h1 className="text-3xl font-bold text-primary mb-1">🔋 Power & Communication</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Survive long electricity & network outages — battery strategy, communication alternatives.
        </p>

        {/* Power Calculator */}
        <section className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Power Planning Calculator</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1">
                Power Bank Capacity (mAh)
              </label>
              <input
                type="number"
                value={bankMah}
                onChange={(e) => setBankMah(Math.max(0, Number(e.target.value)))}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium block mb-1">
                Phone Battery (mAh)
              </label>
              <input
                type="number"
                value={phoneMah}
                onChange={(e) => setPhoneMah(Math.max(1, Number(e.target.value)))}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-card border border-border p-3 text-center">
              <p className="text-2xl font-bold text-primary">{charges}</p>
              <p className="text-xs text-muted-foreground">Full Charges</p>
              <p className="text-xs text-muted-foreground mt-0.5">(85% efficiency)</p>
            </div>
            <div className="rounded-lg bg-card border border-border p-3 text-center">
              <p className="text-2xl font-bold text-primary">~{emergencyHours}h</p>
              <p className="text-xs text-muted-foreground">Emergency Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">(airplane + low brightness)</p>
            </div>
          </div>
        </section>

        {/* Battery Strategy */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BatteryLow className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Battery Survival Strategy</h2>
          </div>
          <div className="space-y-4">
            {batteryTips.map((tier) => (
              <div key={tier.threshold} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Battery className="h-4 w-4 text-destructive" />
                  {tier.threshold}
                </h3>
                <ul className="space-y-2">
                  {tier.actions.map((a, i) => (
                    <li key={i} className="text-sm flex gap-2">
                      <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Communication Options */}
        <section>
          <h2 className="text-lg font-bold mb-4">📡 Communication When Networks Fail</h2>
          <div className="space-y-4">
            {commOptions.map((opt) => (
              <div key={opt.title} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <opt.icon className="h-4 w-4 text-primary" />
                  {opt.title}
                </h3>
                <ul className="space-y-2">
                  {opt.points.map((p, i) => (
                    <li key={i} className="text-sm flex gap-2">
                      <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PowerPlanner;
