import BackLink from "@/components/BackLink";
import { AlertTriangle, Bug, CloudRain, Droplets, Mountain, Waves, Wind } from "lucide-react";

interface Signal {
  title: string;
  emoji: string;
  icon: typeof CloudRain;
  urgency: "warning" | "danger" | "info";
  signs: { sign: string; meaning: string }[];
  action: string;
}

const urgencyBorder: Record<string, string> = {
  warning: "border-yellow-500/40",
  danger: "border-destructive/50",
  info: "border-primary/40",
};

const signals: Signal[] = [
  {
    title: "Flood Warning Signals",
    emoji: "🌊",
    icon: Droplets,
    urgency: "danger",
    signs: [
      { sign: "River water suddenly rising or turning muddy brown", meaning: "Heavy rainfall upstream — flash flood likely in 30 min to 6 hours" },
      { sign: "Unusual rumbling or roaring sound from upstream", meaning: "Wall of water or debris flow approaching — evacuate to high ground NOW" },
      { sign: "Animals (dogs, cattle, rats) moving uphill or acting restless", meaning: "Animals sense vibrations and changes humans can't — trust their instincts" },
      { sign: "Water appearing in unusual places (dry streams flowing, basement seepage)", meaning: "Ground is saturated — soil can't absorb more water, surface flooding imminent" },
      { sign: "Rain intensity: if you can't see 100m ahead, it's dangerous rainfall", meaning: "More than 64mm/hour rainfall — CWC classifies this as 'very heavy'" },
      { sign: "Drains overflowing or manhole covers displaced", meaning: "Urban flooding starting — avoid low-lying roads and underpasses" },
    ],
    action: "Move to high ground immediately. Never cross flowing water. 15 cm of fast water can knock you down.",
  },
  {
    title: "Landslide Warning Signs",
    emoji: "⛰️",
    icon: Mountain,
    urgency: "danger",
    signs: [
      { sign: "New cracks appearing in ground, walls, or roads", meaning: "Ground is shifting — slope failure beginning" },
      { sign: "Trees, fence posts, or utility poles tilting or leaning", meaning: "Soil beneath is moving — imminent slide risk" },
      { sign: "Unusual water seepage on hillside slopes", meaning: "Water is lubricating the soil layers — reduces friction holding slope together" },
      { sign: "Doors and windows suddenly sticking or jamming", meaning: "Building foundation shifting due to ground movement" },
      { sign: "Springs appearing on previously dry slopes", meaning: "Water table has risen dangerously — saturated soil will fail" },
      { sign: "Small rockfalls or soil slips from cut slopes along roads", meaning: "Precursor events — larger slide may follow within hours" },
      { sign: "Rumbling sounds increasing from hillside", meaning: "Rocks and soil are beginning to move — evacuate perpendicular to slope" },
    ],
    action: "Evacuate sideways (perpendicular to slope direction). Do NOT run downhill. Report to 112.",
  },
  {
    title: "Toxic Gas / Chemical Leak",
    emoji: "☣️",
    icon: Wind,
    urgency: "danger",
    signs: [
      { sign: "Strong unusual smell: chlorine (pool-like), ammonia (pungent), rotten eggs (H₂S), sweet chemical", meaning: "Gas leak detected — each smell indicates different chemical, all are dangerous" },
      { sign: "Burning or watering eyes, irritated throat, difficulty breathing", meaning: "Toxic gas exposure — your body's alarm system. Don't ignore it" },
      { sign: "Yellow, green, or white fog/cloud near ground level, especially near industrial areas", meaning: "Visible gas cloud — many toxic gases are heavier than air and settle low" },
      { sign: "Dead birds, insects, or animals in an area", meaning: "Lethal gas concentration at ground level — do NOT enter that area" },
      { sign: "People around you suddenly coughing, choking, or collapsing", meaning: "Mass exposure event — move upwind immediately" },
      { sign: "Metallic taste in mouth or numbness on tongue", meaning: "Chemical exposure through inhalation — cover face with wet cloth immediately" },
      { sign: "Continuous alarm sirens from nearby factory/plant", meaning: "Industrial emergency declared — follow evacuation plan, move upwind and uphill" },
    ],
    action: "Cover mouth with wet cloth. Move UPWIND and UPHILL. Avoid low-lying areas. Call 112. Reference: Bhopal 1984, Vizag 2020.",
  },
  {
    title: "Tsunami Warning Signs",
    emoji: "🌊",
    icon: Waves,
    urgency: "danger",
    signs: [
      { sign: "Sea water suddenly retreating far from shore — beach area exposed unusually", meaning: "TSUNAMI APPROACHING. You have 5–30 minutes. This is the ocean pulling back before the wave." },
      { sign: "Loud roaring sound from ocean (like a freight train)", meaning: "Wave is approaching — the sound travels faster than the water" },
      { sign: "Strong earthquake felt in coastal area (any magnitude)", meaning: "Submarine earthquake can generate tsunami — move to high ground as precaution" },
      { sign: "Ocean behaving unusually: rapid tidal changes, whirlpools near shore", meaning: "Underwater geological event — treat as tsunami warning" },
      { sign: "Animals fleeing from beach area", meaning: "Animals sense infrasound from approaching wave — follow them to high ground" },
    ],
    action: "Move inland and to high ground (30+ metres) immediately. Don't wait for official warning. Don't go to beach to watch. INCOIS (Indian National Centre for Ocean Information Services) issues warnings.",
  },
  {
    title: "Cyclone Approaching",
    emoji: "🌀",
    icon: CloudRain,
    urgency: "warning",
    signs: [
      { sign: "Rapidly falling barometric pressure (if you have a barometer)", meaning: "Low pressure system intensifying — storm approaching" },
      { sign: "Long, high ocean swells arriving at coast (before storm is visible)", meaning: "Waves travel faster than the storm — swells arrive 24–48 hours before cyclone" },
      { sign: "Sky turns unusual colours: dark green, orange, or red", meaning: "Large amount of moisture and debris in atmosphere — severe storm approaching" },
      { sign: "Sudden calm after extended wind and rain", meaning: "You may be in the EYE of the cyclone — the second wall will hit with equal force from opposite direction" },
      { sign: "Birds flying inland, coastal animals moving away from shore", meaning: "Animals sense pressure changes — instinctive evacuation" },
      { sign: "Cloud bands spiraling visible from horizon", meaning: "Cyclone outer bands arriving — full impact in 6–12 hours" },
    ],
    action: "Follow IMD cyclone warnings. Secure home. Move to designated cyclone shelter if in vulnerable area.",
  },
  {
    title: "Earthquake Precursors",
    emoji: "🏚️",
    icon: AlertTriangle,
    urgency: "info",
    signs: [
      { sign: "Unusual animal behaviour: dogs barking excessively, birds leaving perches, fish jumping", meaning: "Animals may sense P-waves or electromagnetic changes before quake — not scientifically reliable but historically noted" },
      { sign: "Small foreshocks (minor tremors)", meaning: "Sometimes precede larger earthquakes — but most small quakes are NOT followed by larger ones" },
      { sign: "Unusual ground water changes: wells rising/falling, springs changing flow", meaning: "Tectonic stress can alter underground water flow — noted before some major earthquakes" },
      { sign: "Note: Earthquake prediction is NOT reliably possible", meaning: "No technology can predict when and where an earthquake will strike — always be prepared" },
      { sign: "India's seismic zones: Zone V (highest risk) includes NE India, J&K, Himachal, Uttarakhand, Kutch", meaning: "Know your zone — BIS IS 1893 classifies India into Zones II–V" },
    ],
    action: "Earthquakes cannot be predicted. Focus on preparedness: secure furniture, practice Drop-Cover-Hold, keep emergency kit ready.",
  },
  {
    title: "Heat Wave Indicators",
    emoji: "🌡️",
    icon: Bug,
    urgency: "warning",
    signs: [
      { sign: "Temperature exceeds 40°C in plains (or 30°C in hilly areas)", meaning: "IMD heatwave threshold — take protective action" },
      { sign: "Hot, dry wind with no relief at night (night temp > 30°C)", meaning: "Body cannot cool down at night — heat stress accumulates over days" },
      { sign: "Dry, cracking soil and withering vegetation", meaning: "Extreme heat and low humidity — fire risk also increases" },
      { sign: "Mirage effects on roads (shimmering)", meaning: "Ground temperature exceeding 50°C — avoid walking barefoot on roads" },
      { sign: "Increased insect activity (mosquitoes, flies) near water sources", meaning: "Stagnant water concentrates as sources dry — disease risk increases" },
      { sign: "Dust storms or dust devils forming", meaning: "Extreme heat creates convection currents — sign of unstable hot air mass" },
    ],
    action: "Stay indoors 11 AM–4 PM. Drink 3–4 litres water daily. Watch for heatstroke: confusion + no sweating = call 108 immediately.",
  },
];

const EnvironmentalSignals = () => (
  <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
    <div className="w-full max-w-2xl">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-1">🌿 Environmental Signals</h1>
      <p className="text-sm text-muted-foreground mb-2">
        Nature gives clues before disaster strikes. Learn to read them — it could save your life.
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Based on field observations documented by NDMA, IMD, GSI, and traditional knowledge systems.
      </p>

      <div className="space-y-6">
        {signals.map((sig) => (
          <section key={sig.title} className={`rounded-xl border-2 ${urgencyBorder[sig.urgency]} bg-card p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{sig.emoji}</span>
              <h2 className="text-lg font-bold">{sig.title}</h2>
            </div>

            <div className="space-y-3 mb-4">
              {sig.signs.map((s, i) => (
                <div key={i} className="rounded-lg bg-secondary/50 border border-border p-3">
                  <p className="text-sm font-semibold flex gap-2">
                    <span className="text-muted-foreground font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    {s.sign}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 ml-6">→ {s.meaning}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
              <p className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                Action: {sig.action}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default EnvironmentalSignals;
