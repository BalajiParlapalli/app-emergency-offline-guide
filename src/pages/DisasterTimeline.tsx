import { useState } from "react";
import BackLink from "@/components/BackLink";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AlertTriangle, CloudRain, Mountain, Droplets, Thermometer, Factory, Waves } from "lucide-react";

interface TimePhase {
  label: string;
  hours: string;
  actions: string[];
  urgency: "prepare" | "alert" | "critical" | "danger" | "recover" | "rebuild";
}

interface Disaster {
  id: string;
  name: string;
  emoji: string;
  icon: typeof CloudRain;
  timeline: TimePhase[];
}

const urgencyStyles: Record<string, string> = {
  prepare: "border-primary/40 bg-primary/5",
  alert: "border-yellow-500/40 bg-yellow-500/5",
  critical: "border-orange-500/40 bg-orange-500/10",
  danger: "border-destructive/60 bg-destructive/10",
  recover: "border-blue-400/40 bg-blue-400/5",
  rebuild: "border-green-500/40 bg-green-500/5",
};

const urgencyDot: Record<string, string> = {
  prepare: "bg-primary",
  alert: "bg-yellow-500",
  critical: "bg-orange-500",
  danger: "bg-destructive",
  recover: "bg-blue-400",
  rebuild: "bg-green-500",
};

const disasters: Disaster[] = [
  {
    id: "cyclone",
    name: "Cyclone",
    emoji: "🌀",
    icon: CloudRain,
    timeline: [
      {
        label: "T – 48 hours",
        hours: "-48h",
        urgency: "prepare",
        actions: [
          "Track weather alerts on IMD website or All India Radio",
          "Charge all power banks, phones & torches fully",
          "Store at least 20 litres of drinking water per person",
          "Stock non-perishable food for 3–5 days (dry rations, biscuits, chivda)",
          "Fill vehicle fuel tanks — fuel stations may close",
          "Withdraw cash — ATMs and UPI may not work",
          "Inform family members in other cities about your location",
          "Check first-aid kit: bandages, antiseptic, ORS packets, paracetamol",
        ],
      },
      {
        label: "T – 24 hours",
        hours: "-24h",
        urgency: "alert",
        actions: [
          "Secure loose objects outdoors (flower pots, signboards, tin sheets)",
          "Prepare emergency grab bag: documents, medicines, torch, whistle, cash",
          "Identify strongest room in house — away from windows (preferably internal bathroom or storeroom)",
          "Trim tree branches near power lines if safely reachable",
          "Move livestock and vehicles to higher ground if in flood-prone area",
          "Charge devices to 100% and enable battery saver mode",
          "Fill all available containers with water (buckets, bottles, bathtubs)",
          "Note nearest NDRF/SDRF shelter location from local administration announcements",
        ],
      },
      {
        label: "T – 6 hours",
        hours: "-6h",
        urgency: "critical",
        actions: [
          "Move indoors — do not go outside for any reason",
          "Turn refrigerator to coldest setting (preserves food longer if power cuts)",
          "Switch off electrical mains if flooding is expected",
          "Keep emergency bag, torch & whistle within arm's reach",
          "Close and bolt all windows and doors; tape large glass panes with X-pattern",
          "Fill bathtub with water for sanitation use",
          "Tune to All India Radio (AIR) for official updates",
          "Ensure children and elderly are in the safe room",
        ],
      },
      {
        label: "T – 0 (Cyclone Hits)",
        hours: "0h",
        urgency: "danger",
        actions: [
          "Stay in the strongest room — away from all windows and exterior walls",
          "If wind stops suddenly (cyclone eye), DO NOT go outside — the second wall is coming",
          "Lie flat under sturdy furniture if roof starts lifting",
          "Avoid floodwater at all costs — may carry sewage, snakes, or live wires",
          "Do not use candles — use torch only (gas leaks possible)",
          "If trapped under debris, tap on pipes/walls in sets of three (SOS)",
          "Keep shoes on at all times — broken glass and debris",
          "Comfort children — give them simple tasks to reduce panic",
        ],
      },
      {
        label: "T + 6 hours",
        hours: "+6h",
        urgency: "recover",
        actions: [
          "Wait for official 'all clear' before going outside",
          "Watch for broken power lines — assume all fallen wires are live",
          "Avoid damaged buildings — aftershock winds or structural weakness can cause collapse",
          "Check for gas leaks — if you smell gas, leave immediately, do not switch lights",
          "Boil all drinking water or use purification tablets",
          "Check on elderly neighbours and those living alone",
          "Photograph damage for insurance claims before cleanup",
          "Do not drive through flooded roads — 30cm of water can sweep a car",
        ],
      },
      {
        label: "T + 24 hours",
        hours: "+24h",
        urgency: "rebuild",
        actions: [
          "Check water supply for contamination — use ORS if diarrhoea starts",
          "Help neighbours if safe — prioritise elderly, disabled, and children",
          "Report damaged infrastructure to local authorities (1078 — NDMA Disaster helpline)",
          "Clean and disinfect all surfaces that contacted floodwater",
          "Discard all food that contacted floodwater or was unrefrigerated > 4 hours",
          "Watch for post-flood diseases: leptospirosis, dengue, cholera",
          "Apply for disaster relief through district collector's office",
          "Begin documenting losses — photos, bills, receipts for claims",
        ],
      },
    ],
  },
  {
    id: "earthquake",
    name: "Earthquake",
    emoji: "🏚️",
    icon: Mountain,
    timeline: [
      {
        label: "Preparedness (Always)",
        hours: "PREP",
        urgency: "prepare",
        actions: [
          "Identify safe spots in every room: under sturdy tables, next to load-bearing walls",
          "Secure heavy furniture (bookshelves, almirahs) to walls with brackets",
          "Keep emergency kit ready: torch, whistle, first-aid, water, documents",
          "Know your building's seismic zone (India has Zone II–V; check BIS standards)",
          "Practice 'Drop, Cover, Hold On' drill with family every 6 months",
          "Store heavy objects on lower shelves",
          "Identify gas and electrical main shut-offs",
          "Keep sturdy shoes near bed — broken glass is the #1 post-quake injury",
        ],
      },
      {
        label: "During Earthquake (0–60 sec)",
        hours: "0h",
        urgency: "danger",
        actions: [
          "DROP to hands and knees immediately",
          "Take COVER under sturdy furniture — protect head and neck",
          "HOLD ON to the furniture until shaking stops",
          "If no cover available, crouch next to interior wall, protect head with arms",
          "Do NOT run outside during shaking — falling debris is the biggest killer",
          "Do NOT stand in doorways (myth) — modern doorways are not stronger",
          "If in bed, stay in bed and cover head with pillow",
          "If outdoors, move to open area away from buildings, trees, power lines",
          "If driving, pull over, stop, set parking brake — stay inside the vehicle",
        ],
      },
      {
        label: "T + 0–5 minutes",
        hours: "+5m",
        urgency: "critical",
        actions: [
          "Check yourself for injuries before helping others",
          "Expect aftershocks — they can be nearly as strong as the main quake",
          "If trapped: tap on pipes (SOS — 3 taps, pause, repeat), do not shout (conserve energy, dust inhalation risk)",
          "Cover mouth with cloth to avoid dust inhalation",
          "Check for gas leaks — if you smell gas, open windows and leave immediately",
          "Do NOT use lifts — use stairs only",
          "Do NOT use matches or lighters until gas leaks are ruled out",
          "Turn off electrical mains if you see sparking or smell burning",
        ],
      },
      {
        label: "T + 1 hour",
        hours: "+1h",
        urgency: "recover",
        actions: [
          "Move to designated open assembly area",
          "Check on neighbours — prioritise elderly, children, disabled",
          "Do NOT re-enter damaged buildings — even if they look stable",
          "Use battery radio or phone for official updates",
          "If near coast, move to high ground immediately — tsunami risk after submarine earthquakes",
          "Start first aid for injured: stop bleeding, immobilise fractures",
          "Mark buildings as 'safe' or 'unsafe' with visible signs for rescue teams",
          "Report trapped people to NDRF helpline: 011-24363260 or local emergency 112",
        ],
      },
      {
        label: "T + 24 hours",
        hours: "+24h",
        urgency: "rebuild",
        actions: [
          "Continue monitoring aftershocks — can continue for days/weeks",
          "Boil drinking water — pipes may be damaged and contaminated",
          "Get structural assessment before re-entering any building",
          "Document all damage with photographs for insurance",
          "Watch for post-disaster mental health: PTSD, anxiety in children",
          "Clean up broken glass and hazardous debris wearing thick gloves and shoes",
          "Contact district disaster management authority for relief and shelter",
          "Help community recovery — share food, water, and medical supplies",
        ],
      },
    ],
  },
  {
    id: "flood",
    name: "Flood",
    emoji: "🌊",
    icon: Droplets,
    timeline: [
      {
        label: "T – 48 hours (Warning)",
        hours: "-48h",
        urgency: "prepare",
        actions: [
          "Monitor CWC (Central Water Commission) flood bulletins and IMD alerts",
          "Move important documents, valuables to upper floors or waterproof bags",
          "Store 3 days of drinking water in sealed containers",
          "Prepare emergency bag: medicines, torch, dry food, cash, phone charger",
          "Identify evacuation route to nearest high ground or relief camp",
          "Raise electrical appliances and sockets above expected flood level",
          "Stock ORS packets, water purification tablets, and chlorine drops",
          "Inform relatives about your planned evacuation route",
        ],
      },
      {
        label: "T – 12 hours",
        hours: "-12h",
        urgency: "alert",
        actions: [
          "If authorities order evacuation — leave immediately, do not wait",
          "Move to upper floor if staying — never stay on ground floor",
          "Switch off electrical mains and gas connections",
          "Anchor loose outdoor objects or move them inside",
          "Fill fuel tanks — vehicles may be needed for evacuation",
          "Charge all devices to 100%",
          "Keep emergency numbers ready: 112, 1078 (NDMA Disaster), 108 (Ambulance)",
          "Pack medicines for at least 7 days — pharmacies may be inaccessible",
        ],
      },
      {
        label: "During Flood",
        hours: "0h",
        urgency: "danger",
        actions: [
          "Never walk through moving water — 15 cm of fast water can knock you down",
          "Never drive through flooded roads — 30 cm can float a car, 60 cm can sweep an SUV",
          "If trapped on roof, signal with bright cloth or torch at night",
          "Avoid contact with floodwater — contains sewage, chemicals, animal waste",
          "Do NOT touch electrical equipment or fallen power lines in water",
          "If swept away, float on back with feet downstream — grab overhanging branches",
          "Keep children and elderly on highest point available",
          "Use whistle signals: 3 blasts = need help",
        ],
      },
      {
        label: "T + 12 hours",
        hours: "+12h",
        urgency: "recover",
        actions: [
          "Wait for official clearance before returning home",
          "Beware of weakened structures, sinkholes, and washed-out roads",
          "Boil all water before drinking — minimum 1 minute rolling boil",
          "Discard all food that touched floodwater",
          "Check for snakes and insects in and around your home",
          "Disinfect everything with bleach solution (1 tbsp per gallon of water)",
          "Report waterborne illness symptoms immediately: diarrhoea, fever, vomiting",
          "Pump out basement water gradually (⅓ per day) to prevent structural collapse",
        ],
      },
      {
        label: "T + 48 hours",
        hours: "+48h",
        urgency: "rebuild",
        actions: [
          "Get electrical systems inspected before switching on mains",
          "Dry out buildings — use fans, open windows to prevent mould",
          "Dispose of contaminated items: mattresses, carpets, upholstered furniture",
          "Apply for flood relief from district administration",
          "Vaccinate against waterborne diseases if advised by health authorities",
          "Watch for leptospirosis symptoms: fever + muscle pain + red eyes (from contaminated water contact)",
          "Document damage for insurance: photographs with date stamps",
          "Support community cleanup and check on vulnerable neighbours",
        ],
      },
    ],
  },
  {
    id: "landslide",
    name: "Landslide",
    emoji: "⛰️",
    icon: Mountain,
    timeline: [
      {
        label: "Warning Signs (Hours/Days Before)",
        hours: "WARN",
        urgency: "alert",
        actions: [
          "New cracks appearing in ground, walls, or roads",
          "Doors or windows that suddenly stick or jam",
          "Trees, fences or utility poles tilting or moving",
          "Unusual water seepage on hillside slopes",
          "Rumbling sounds from the hillside (getting louder)",
          "Sudden decrease or increase in stream/river water level",
          "Small rockfalls or soil slips from cut slopes",
          "Springs or wet patches appearing on previously dry slopes — report to local authority immediately",
        ],
      },
      {
        label: "Imminent (Minutes Before)",
        hours: "-5m",
        urgency: "critical",
        actions: [
          "If you notice warning signs, evacuate immediately — do not wait for official orders",
          "Move perpendicular to the slide direction (sideways, not downhill)",
          "Alert neighbours verbally and with loud whistle blasts",
          "Do NOT cross landslide debris — it may still be moving",
          "Avoid river valleys and low-lying areas — debris flows follow water channels",
          "Take emergency bag if possible, but prioritise your life",
          "Move to pre-identified safe zone on stable ground",
          "Call 112 and report location and direction of movement",
        ],
      },
      {
        label: "During Landslide",
        hours: "0h",
        urgency: "danger",
        actions: [
          "If you cannot escape, curl into a tight ball and protect your head",
          "If indoors, take cover under sturdy furniture away from the slope-facing wall",
          "If in a vehicle, drive away from the slide path at right angles",
          "If near a stream, move to higher ground immediately — debris flows travel in channels",
          "Do NOT try to outrun a landslide downhill — move sideways",
          "Listen for unusual sounds: breaking trees, boulders knocking together",
          "Stay away from the slide's edges — ground may collapse further",
          "If buried, conserve air — breathe slowly, create air pocket near face",
        ],
      },
      {
        label: "T + 1 hour",
        hours: "+1h",
        urgency: "recover",
        actions: [
          "Stay away from the slide area — secondary slides are common",
          "Report trapped people: NDRF 011-24363260 or call 112",
          "Help injured with first aid — fractures and crush injuries are most common",
          "Check for damaged gas lines, water pipes, electrical wires",
          "Do NOT re-enter damaged buildings without structural assessment",
          "If road is blocked, mark it clearly for other travellers",
          "Monitor weather — rain can trigger additional slides",
          "Account for all family members and neighbours",
        ],
      },
      {
        label: "T + 24 hours",
        hours: "+24h",
        urgency: "rebuild",
        actions: [
          "Get professional geotechnical assessment before returning to area",
          "Watch for further ground movement: new cracks, tilting, seepage",
          "Replant vegetation on bare slopes if possible (roots stabilise soil)",
          "Report damage to district administration for relief",
          "Ensure drainage channels are clear to prevent water accumulation",
          "Consider relocation if area is classified as high-risk landslide zone by GSI",
          "Support affected families — landslides often destroy entire homes",
          "Document damage and get government survey for compensation claims",
        ],
      },
    ],
  },
  {
    id: "heatwave",
    name: "Heat Wave",
    emoji: "🌡️",
    icon: Thermometer,
    timeline: [
      {
        label: "Warning Issued (T – 48h)",
        hours: "-48h",
        urgency: "prepare",
        actions: [
          "IMD defines heatwave: plains >40°C (or 4.5°C above normal), severe >47°C",
          "Stock ORS packets, electrolyte powder, buttermilk, raw mango (aam panna)",
          "Prepare cooling towels and ice packs — freeze water bottles",
          "Check on elderly neighbours who live alone — they are most vulnerable",
          "Ensure water supply: store at least 4 litres per person per day",
          "Identify coolest room in home (ground floor, north-facing, well-ventilated)",
          "Check that fans and coolers are working; service air conditioners",
          "Avoid scheduling outdoor work between 11 AM – 4 PM during the heatwave period",
        ],
      },
      {
        label: "During Heat Wave",
        hours: "0h",
        urgency: "danger",
        actions: [
          "Stay indoors between 11 AM – 4 PM — peak heat hours",
          "Drink water every 20 minutes even if not thirsty — minimum 3–4 litres/day",
          "Wear light-coloured, loose cotton clothing",
          "Use wet cloth on forehead, neck, and wrists for rapid cooling",
          "NEVER leave children or animals in parked vehicles — temperatures reach 60°C inside",
          "Eat light meals — avoid heavy, oily, spicy food; eat fruits like watermelon, cucumber",
          "Watch for heatstroke signs: no sweating, confusion, body temp >40°C — this is a medical emergency",
          "Do not drink very cold water suddenly — causes stomach cramps; drink room temperature water",
          "Avoid alcohol, tea, coffee — they dehydrate",
          "If working outdoors is unavoidable, take 10-minute breaks every 30 minutes in shade",
        ],
      },
      {
        label: "Heat Exhaustion Response",
        hours: "AID",
        urgency: "critical",
        actions: [
          "Symptoms: heavy sweating, weakness, nausea, dizziness, headache, muscle cramps",
          "Move person to cool shaded area immediately",
          "Remove excess clothing",
          "Apply cool wet cloths to neck, armpits, groin (pulse points)",
          "Give ORS or salted water (1 tsp salt per litre)",
          "Fan the person continuously",
          "If symptoms don't improve in 30 minutes → treat as heatstroke → call 108",
          "Do NOT give aspirin or paracetamol for heat illness — they don't help and can worsen",
        ],
      },
      {
        label: "Heatstroke Emergency",
        hours: "⚠️",
        urgency: "danger",
        actions: [
          "Heatstroke = body temp >40°C, confusion, loss of consciousness, NO sweating",
          "THIS IS LIFE-THREATENING — call 108 immediately",
          "Cool the person aggressively: ice packs on neck, armpits, groin",
          "Immerse in cold water if available (bathtub, tank)",
          "Fan vigorously while spraying with water",
          "Do NOT give fluids if person is unconscious",
          "Place in recovery position (on side) if unconscious",
          "Continue cooling until body temperature drops below 38°C or help arrives",
          "Untreated heatstroke has >50% mortality — every minute counts",
        ],
      },
      {
        label: "After Heat Wave",
        hours: "+24h",
        urgency: "recover",
        actions: [
          "Continue drinking extra fluids for 2–3 days after heatwave ends",
          "Watch for delayed symptoms: kidney problems, rhabdomyolysis (dark urine, muscle pain)",
          "Gradually return to outdoor activities — heat acclimatisation takes 7–14 days",
          "Check on elderly and chronically ill — they recover slowly",
          "Restock ORS, water supplies, and cooling equipment",
          "Report heat-related deaths/illness to local health authority",
          "India loses 100+ lives to heatwaves annually — share awareness with community",
          "Plan long-term: plant trees for shade, improve home ventilation, install reflective roofing",
        ],
      },
    ],
  },
  {
    id: "gasleak",
    name: "Industrial Gas Leak",
    emoji: "☣️",
    icon: Factory,
    timeline: [
      {
        label: "Detection Signs",
        hours: "DETECT",
        urgency: "alert",
        actions: [
          "Strong unusual smell: chlorine, ammonia, rotten eggs, sweet chemical odour",
          "Burning or irritation in eyes, nose, throat",
          "Visible gas cloud: yellow, green, or white fog near industrial area",
          "Dead birds, insects, or animals in the area",
          "People around you coughing, choking, or collapsing",
          "Continuous alarm sirens from nearby factory",
          "Unusual taste in mouth (metallic or chemical)",
          "If you notice ANY of these — do not wait for confirmation, act immediately",
        ],
      },
      {
        label: "Immediate Response (0–5 min)",
        hours: "0h",
        urgency: "danger",
        actions: [
          "Cover nose and mouth with wet cloth — preferably cotton soaked in water or vinegar",
          "Move UPWIND (wind blowing from behind you) and UPHILL (many gases are heavier than air)",
          "If indoors, close all doors, windows, vents — seal gaps with wet towels",
          "Turn off all fans, ACs, exhaust systems — they pull contaminated air inside",
          "Do NOT use vehicles if the gas is flammable — sparks from ignition can cause explosion",
          "Avoid low-lying areas: basements, ditches, ground floors — heavy gases accumulate there",
          "Do NOT smoke, light matches, or use any open flame",
          "Call 112, inform about suspected gas leak with your location and wind direction",
          "Reference: Bhopal Gas Tragedy (1984) — MIC gas killed thousands partly because people ran downwind",
        ],
      },
      {
        label: "Evacuation (5–30 min)",
        hours: "+15m",
        urgency: "critical",
        actions: [
          "Move perpendicular to wind direction if unsure which way is upwind",
          "Help elderly, children, and disabled persons evacuate",
          "If you feel dizzy or difficulty breathing — crawl (lower gas concentration near ground for some gases, but NOT all)",
          "Remove contaminated clothing as soon as you reach safe area",
          "Wash exposed skin thoroughly with soap and running water",
          "Flush eyes with clean water for at least 15 minutes if irritated",
          "Do NOT eat or drink anything that may have been exposed to the gas",
          "Move at least 500 metres (ideally 1+ km) from the source",
        ],
      },
      {
        label: "Medical Response",
        hours: "+1h",
        urgency: "recover",
        actions: [
          "Seek medical attention even if you feel fine — some gases have delayed effects (12–48 hours)",
          "Tell doctors what chemical you suspect (check factory signboards, SDSsheets)",
          "Common delayed effects: pulmonary oedema (fluid in lungs), chemical pneumonia",
          "Keep exposed clothing in sealed bag — may be needed for investigation",
          "Monitor breathing for 48 hours: worsening cough, breathlessness, chest tightness = hospital immediately",
          "If someone is unconscious: recovery position, clear airway, CPR if no breathing",
          "Do NOT induce vomiting if chemicals were ingested",
          "Call NDMA helpline 1077 or State Disaster Management Authority",
        ],
      },
      {
        label: "Recovery (Days After)",
        hours: "+48h",
        urgency: "rebuild",
        actions: [
          "Do not return to affected area until authorities declare it safe",
          "Clean all water tanks and food storage — may be contaminated",
          "Ventilate home thoroughly for 24+ hours before staying overnight",
          "Get lung function tests (spirometry) if you were exposed",
          "Report health symptoms to district health officer — helps track outbreak",
          "Document exposure for compensation claims under Public Liability Insurance Act 1991",
          "Participate in community awareness meetings on industrial hazards",
          "Know your rights: Environment Protection Act 1986, NGT guidelines for industrial safety",
        ],
      },
    ],
  },
];

const DisasterTimeline = () => {
  const [activeDisaster, setActiveDisaster] = useState("cyclone");
  const [activePhase, setActivePhase] = useState(0);

  const disaster = disasters.find((d) => d.id === activeDisaster)!;
  const phase = disaster.timeline[activePhase];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
      <div className="w-full max-w-2xl">
        <BackLink />
        <h1 className="text-3xl font-bold text-primary mb-1">⏱️ Disaster Timeline</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Learn what to do before, during & after each disaster — step by step.
        </p>

        {/* Disaster selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {disasters.map((d) => (
            <button
              key={d.id}
              onClick={() => { setActiveDisaster(d.id); setActivePhase(0); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                activeDisaster === d.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span>{d.emoji}</span>
              <span>{d.name}</span>
            </button>
          ))}
        </div>

        {/* Timeline slider */}
        <div className="mb-6">
          <div className="flex gap-1 overflow-x-auto pb-2">
            {disaster.timeline.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-mono font-semibold border transition-all ${
                  activePhase === i
                    ? `${urgencyStyles[p.urgency]} border-current text-foreground`
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/40"
                }`}
              >
                {p.hours}
              </button>
            ))}
          </div>
          {/* Progress line */}
          <div className="flex gap-0.5 mt-2">
            {disaster.timeline.map((p, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i <= activePhase ? urgencyDot[p.urgency] : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Phase content */}
        <div className={`rounded-xl border-2 p-5 ${urgencyStyles[phase.urgency]} transition-all`}>
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${urgencyDot[phase.urgency]}`} />
            <h2 className="text-lg font-bold">{phase.label}</h2>
          </div>
          <ul className="space-y-3">
            {phase.actions.map((action, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
            disabled={activePhase === 0}
            className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium disabled:opacity-30 hover:border-primary/40 transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActivePhase(Math.min(disaster.timeline.length - 1, activePhase + 1))}
            disabled={activePhase === disaster.timeline.length - 1}
            className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium disabled:opacity-30 hover:border-primary/40 transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisasterTimeline;
