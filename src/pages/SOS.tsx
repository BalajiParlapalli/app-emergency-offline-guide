import BackLink from "@/components/BackLink";

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
    title: "📞 India Emergency Numbers",
    items: [
      "112 — National Emergency Number (police, fire, ambulance)",
      "100 — Police",
      "101 — Fire Brigade",
      "102 — Ambulance (National)",
      "108 — Emergency Medical Service (most states)",
      "1078 — Disaster Management (NDMA Helpline)",
      "181 — Women Helpline",
      "1098 — Child Helpline",
      "1070 — Cyber Crime Helpline",
    ],
  },
  {
    title: "🪖 NDRF & Disaster Response (India)",
    items: [
      "NDRF Helpline: 011-24363260 / 9711077372",
      "Indian Red Cross: 011-23359379",
      "State Disaster Response Force (SDRF) — varies by state",
      "Tune to All India Radio (AIR) for emergency broadcasts",
      "HAM Radio frequencies: 7.050 MHz (40m) for emergency nets in India",
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
      "Stamp large letters in sand/mud: SOS, HELP",
      "Car horn: 3 short, 3 long, 3 short (SOS pattern)",
    ],
  },
  {
    title: "📍 Ground-to-Air Symbols",
    items: [
      "V — Need assistance",
      "X — Need medical help",
      "→ — Travelling in this direction",
      "F — Need food & water",
      "II — Need supplies",
      "△ — Safe to land here",
      "N — No / Negative",
      "Y — Yes / Affirmative",
      "Make symbols at least 3 meters tall using rocks, logs, or trenches",
    ],
  },
];

const SOS = () => {
  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">🚨 SOS & Emergency Signals</h1>
      <p className="text-sm text-muted-foreground mb-6">India-specific emergency info included</p>

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
    </div>
  );
};

export default SOS;
