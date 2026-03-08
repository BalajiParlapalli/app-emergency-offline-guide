import BackLink from "@/components/BackLink";

const survivalSignals = [
  { phrase: "HELP ME", signals: "3 whistle blasts · 3 fires in triangle · both arms raised in V" },
  { phrase: "NEED WATER", signals: "Ground symbol: F · point to mouth then ground" },
  { phrase: "NEED MEDICAL HELP", signals: "Ground symbol: X · lay flat with arms crossed on chest" },
  { phrase: "SAFE TO LAND", signals: "Ground symbol: △ · wave cloth slowly side to side" },
  { phrase: "YES / AFFIRMATIVE", signals: "Ground symbol: Y · wave cloth up and down" },
  { phrase: "NO / NEGATIVE", signals: "Ground symbol: N · wave cloth left to right" },
  { phrase: "GOING THIS WAY", signals: "Ground symbol: → · arrow stamped in ground" },
  { phrase: "DO NOT LAND", signals: "Wave both arms crossed above head" },
  { phrase: "ALL WELL", signals: "Single arm raised and lowered repeatedly" },
];

const sections = [
  {
    title: "🆘 Universal Distress Signals",
    items: [
      "SOS in Morse Code: ··· −−− ··· (3 short, 3 long, 3 short)",
      "3 of anything = distress: 3 fires, 3 whistle blasts, 3 gunshots",
      "Raise both arms in a V shape to signal aircraft",
      "Wave a bright cloth or mirror to reflect sunlight toward rescuers",
      "Ground-to-air: large X = need help, V = need assistance, → = going this direction",
      "At night: flash a light 3 times, pause, repeat",
    ],
  },
  {
    title: "🔥 Smoke Signals",
    items: [
      "Daytime: create thick white smoke by adding green leaves/grass to fire",
      "Dark background (forest): white smoke is most visible",
      "Light background (snow/sand): dark smoke — add rubber, oil, or plastic",
      "3 smoke fires in a triangle = international distress signal",
      "Keep fire ready to light quickly when aircraft/rescuers spotted",
      "Best time: early morning or late afternoon when air is calm",
    ],
  },
  {
    title: "📞 India Emergency Numbers (NDMA Verified)",
    items: [
      "112 — National Emergency Number (police, fire, ambulance) — works even without SIM",
      "100 — Police",
      "101 — Fire Brigade",
      "102 — Ambulance (National Health Mission)",
      "108 — Emergency Medical Service (GVK EMRI — operates in 15+ states)",
      "1078 — Disaster Management (NDMA Helpline)",
      "181 — Women Helpline (Ministry of Women & Child Development)",
      "1098 — Childline India Foundation",
      "1070 — Cyber Crime Helpline (MHA)",
      "14461 — COVID/Health Helpline (MoHFW)",
    ],
  },
  {
    title: "🪖 NDRF & Disaster Response (India)",
    items: [
      "NDRF Helpline: 011-24363260 / 9711077372",
      "Indian Red Cross Society: 011-23359379",
      "NIDM (National Institute of Disaster Management): 011-23702432",
      "State Disaster Response Force (SDRF) — contact via state emergency control rooms",
      "Tune to All India Radio (AIR) for emergency broadcasts during disasters",
      "HAM Radio: 7.050 MHz (40m band) for emergency nets in India — licensed operators",
      "Community alert: bang metal objects, use loud whistles in patterns of 3",
    ],
  },
  {
    title: "🔦 Visual & Audio Signals",
    items: [
      "Mirror flash: aim reflected sunlight at aircraft or distant rescuers",
      "Whistle: 3 short blasts = distress, 1 long blast = response/location",
      "At night: swing a burning stick in circles overhead",
      "Use bright orange/red fabric tied to a high point as a flag",
      "Stamp large letters in sand/mud: SOS, HELP (minimum 3 metres tall)",
      "Car horn: 3 short, 3 long, 3 short (SOS pattern)",
    ],
  },
  {
    title: "📍 Ground-to-Air Symbols (ICAO Standard)",
    items: [
      "V — Need assistance",
      "X — Need medical help",
      "→ — Travelling in this direction",
      "F — Need food & water",
      "II — Need supplies",
      "△ — Safe to land here",
      "N — No / Negative",
      "Y — Yes / Affirmative",
      "Make symbols at least 3 metres tall using rocks, logs, or trenches for aerial visibility",
    ],
  },
];

const SOS = () => {
  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">🚨 SOS & Emergency Signals</h1>
      <p className="text-sm text-muted-foreground mb-6">India-specific · NDMA / NDRF / NIDM verified</p>

      {/* Survival signal phrases */}
      <h2 className="text-xl font-semibold mb-3">🗣️ Survival Signal Phrases</h2>
      <div className="space-y-2 mb-6">
        {survivalSignals.map(({ phrase, signals }) => (
          <div key={phrase} className="border border-border rounded-lg px-3 py-2.5">
            <span className="font-semibold text-sm block">{phrase}</span>
            <span className="text-xs text-muted-foreground">{signals}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <details key={i} className="border border-border rounded-lg group" open={i === 0}>
            <summary className="px-4 py-3 font-semibold text-lg cursor-pointer hover:bg-secondary/50 transition-colors list-none flex justify-between items-center">
              {section.title}
              <span className="text-muted-foreground text-sm group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <ul className="px-4 pb-4 space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                  {item}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="mt-6 border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground">
          📋 Sources: NDMA (ndma.gov.in), NDRF (ndrf.gov.in), NIDM (nidm.gov.in), MoHFW (mohfw.gov.in), Indian Red Cross Society (indianredcross.org), Civil Defence India. Numbers verified as of 2024.
        </p>
      </div>
    </div>
  );
};

export default SOS;
