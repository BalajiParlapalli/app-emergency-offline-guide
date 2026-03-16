import BackLink from "@/components/BackLink";
import { Sun, Moon, Mountain, Compass, Map, Trees } from "lucide-react";

interface Technique {
  title: string;
  emoji: string;
  icon: typeof Sun;
  steps: { step: string; detail: string }[];
  note?: string;
}

const techniques: Technique[] = [
  {
    title: "Sun Navigation",
    emoji: "☀️",
    icon: Sun,
    steps: [
      { step: "Sun rises in the East", detail: "Between 6–7 AM, the sun is approximately due East. Face the sun and North is to your left." },
      { step: "Sun sets in the West", detail: "Between 5–7 PM, the sun is approximately due West. Face the sun and North is to your right." },
      { step: "Shadow shortest at noon = North-South line", detail: "At solar noon (~12:30 PM IST in most of India), your shadow points roughly North (since India is in the Northern Hemisphere)." },
      { step: "Analog watch method", detail: "Point the hour hand at the sun. The midpoint between the hour hand and 12 o'clock points approximately South (in Northern Hemisphere). Divide that angle in half for South." },
      { step: "Seasonal variation", detail: "The sun is exactly East/West only during equinoxes (March 21, Sept 23). In summer it rises NE and sets NW; in winter it rises SE and sets SW." },
      { step: "India-specific", detail: "India is between 8°N–37°N latitude. The sun is almost overhead during summer months, making shadow methods less accurate in May-June in southern India." },
    ],
    note: "Accuracy: ±15° in most conditions. Good enough for general direction finding.",
  },
  {
    title: "Shadow Stick Method",
    emoji: "📍",
    icon: Map,
    steps: [
      { step: "Step 1: Place a straight stick (1 metre) vertically in flat ground", detail: "Choose a spot with clear sun exposure. The stick should cast a visible shadow." },
      { step: "Step 2: Mark the tip of the shadow with a stone or scratch", detail: "This is your first reference point. Label it 'W' (in the Northern Hemisphere, the first shadow tip is roughly West)." },
      { step: "Step 3: Wait 15–20 minutes", detail: "The shadow will move as the sun moves. More time = more accuracy. 15 min is minimum." },
      { step: "Step 4: Mark the new shadow tip position", detail: "Label this point 'E'. The shadow moves from West to East (opposite of the sun's movement)." },
      { step: "Step 5: Draw a line between W and E marks", detail: "This line runs approximately East-West. The 'W' mark is West, 'E' mark is East." },
      { step: "Step 6: Stand with W to your left and E to your right", detail: "You are now facing approximately North. Behind you is South." },
      { step: "Improved accuracy", detail: "For better results, do this at solar noon or mark shadows every 15 min for 1–2 hours and use the shortest shadow (which points North)." },
    ],
    note: "This works anywhere the sun is visible. Used by militaries worldwide. Best accuracy near noon.",
  },
  {
    title: "North Star (Polaris) Navigation",
    emoji: "⭐",
    icon: Moon,
    steps: [
      { step: "Find the Big Dipper (Saptarishi Mandal)", detail: "Look for seven bright stars forming a ladle/cup shape. Visible in the northern sky most of the year from India." },
      { step: "Locate the two 'pointer stars'", detail: "The two stars at the front edge of the cup (Dubhe and Merak) point toward Polaris." },
      { step: "Extend the line 5× the distance between the pointers", detail: "Follow the line from Merak through Dubhe, extend about 5 times that gap. You'll find a moderately bright star — that's Polaris." },
      { step: "Polaris indicates True North", detail: "Polaris is within 1° of true North. The height of Polaris above the horizon equals your latitude." },
      { step: "From India (8°N–37°N)", detail: "Polaris appears low in the northern sky. In southern India (8°N), it's very close to the horizon and may be hard to see. In northern India (30°+), it's easily visible." },
      { step: "Alternative: Cassiopeia", detail: "If Big Dipper is not visible, find Cassiopeia (W-shaped constellation). Polaris is roughly between Big Dipper and Cassiopeia." },
      { step: "Southern Hemisphere note", detail: "Polaris is NOT visible south of the equator. Use Southern Cross (Crux) instead to find south celestial pole." },
    ],
    note: "Works only on clear nights. Polaris has been used for navigation for over 2,000 years.",
  },
  {
    title: "Terrain & Nature Clues",
    emoji: "🌲",
    icon: Trees,
    steps: [
      { step: "Water flows downhill → rivers lead to civilisation", detail: "Follow streams downstream. In India, most rivers flow towards major cities and eventually the sea. Rivers are also routes for rescue teams." },
      { step: "Moss tends to grow on the North side of trees (in Northern Hemisphere)", detail: "Moss prefers shade. In India's latitude, the north side gets less sun. However, this is unreliable in dense forests — use as supplementary clue only." },
      { step: "Spider webs tend to face South", detail: "Spiders prefer warmth — in the Northern Hemisphere, south-facing spots get more sun. Observational, not 100% reliable." },
      { step: "Ant hills often have gentler slope on the South side", detail: "Ants build to maximise sun exposure. The longer, gentler slope faces south in Northern Hemisphere." },
      { step: "Wind patterns in India", detail: "SW monsoon winds (June–Sept) blow from Arabian Sea. NE monsoon (Oct–Dec) from Bay of Bengal. If you know the season, wind direction gives approximate orientation." },
      { step: "Valley navigation", detail: "Walk downstream through valleys. Avoid ridgelines (exposed to weather, harder travel). River valleys lead to settlements in India." },
      { step: "Sound clues", detail: "Sounds of traffic, trains, temple bells, mosque azaan carry far in still air. Sound travels further at night. Moving toward human-made sounds leads to civilisation." },
      { step: "Light pollution at night", detail: "A glow on the horizon at night indicates a town or city. Walk toward the glow." },
    ],
    note: "Natural clues are supplementary. Use multiple methods together for best accuracy.",
  },
  {
    title: "Using Landmarks & Maps",
    emoji: "🗺️",
    icon: Compass,
    steps: [
      { step: "Identify prominent landmarks before you travel", detail: "Mountain peaks, radio towers, large trees, water tanks — note their direction from your route." },
      { step: "Triangulation with landmarks", detail: "If you can see two known landmarks, you can estimate your position by noting the angle between them." },
      { step: "Railway tracks lead to stations", detail: "In India, follow railway tracks — stations have water, communication, and people. Walk along tracks, not on them." },
      { step: "Power lines lead to habitation", detail: "High-tension lines connect cities. Follow them, maintaining safe distance (30+ metres from fallen lines)." },
      { step: "Road classification in India", detail: "Wide tarred road = National/State Highway → leads to town. Narrow mud track = village path → leads to habitation within 5–10 km." },
      { step: "Temple/mosque visibility", detail: "Religious structures in India are often on hilltops or have tall structures (gopurams, minarets) visible from far away." },
      { step: "Offline maps", detail: "Download offline maps (Google Maps offline, OsmAnd) before trips to remote areas. GPS works without internet — only map tiles need downloading." },
    ],
    note: "Always tell someone your route and expected return time before entering remote areas.",
  },
  {
    title: "Distance Estimation",
    emoji: "📏",
    icon: Mountain,
    steps: [
      { step: "Pace counting (most reliable)", detail: "Average adult: ~1,300–1,500 paces per km on flat ground. Count every left footfall = ~650 per km. Practice on known distances." },
      { step: "Sound estimation", detail: "Thunder: count seconds between flash and sound, divide by 3 = distance in km. Gunshot audible up to 5 km. Voice carries ~1 km in open terrain." },
      { step: "Visual estimation (clear day)", detail: "Human figure: visible at 2 km, details at 200m. Building: visible at 8–10 km. Mountain: visible at 50+ km but appears closer than it is." },
      { step: "Travel time estimation", detail: "Walking speed on flat terrain: 4–5 km/hour. Hilly terrain: 2–3 km/hour. Add 1 hour per 300m of elevation gain (Naismith's rule)." },
      { step: "Night travel", detail: "Avoid unless necessary. Speed drops to 1–2 km/hour. Use torch briefly to check terrain, then navigate by starlight to preserve night vision." },
      { step: "India-specific terrain", detail: "Western Ghats: dense canopy, 1–2 km/hour. Thar Desert: 3 km/hour but dehydration limits travel. Himalayan trails: 2 km/hour average." },
    ],
    note: "Always overestimate travel time. Fatigue, terrain, and weather slow you more than you expect.",
  },
];

const NavigationSurvival = () => (
  <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
    <div className="w-full max-w-2xl">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-1">🧭 Navigation Without Technology</h1>
      <p className="text-sm text-muted-foreground mb-2">
        Navigate when GPS and phone fail — using sun, stars, shadows, and terrain.
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Classical techniques used in military field manuals, scouting, and survival training worldwide.
      </p>

      <div className="space-y-8">
        {techniques.map((tech) => (
          <section key={tech.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{tech.emoji}</span>
              <h2 className="text-xl font-bold">{tech.title}</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="space-y-3">
                {tech.steps.map((s, i) => (
                  <div key={i} className="rounded-lg bg-secondary/50 border border-border p-3">
                    <p className="text-sm font-semibold flex gap-2">
                      <span className="text-primary font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      {s.step}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">{s.detail}</p>
                  </div>
                ))}
              </div>
              {tech.note && (
                <p className="text-xs text-muted-foreground mt-3 italic border-t border-border pt-3">
                  📝 {tech.note}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default NavigationSurvival;
