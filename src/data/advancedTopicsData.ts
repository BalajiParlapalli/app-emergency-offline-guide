export interface AdvancedTopicEntry {
  page: string;
  pageTitle: string;
  emoji: string;
  link: string;
  heading: string;
  point: string;
}

export const advancedTopicsSearchIndex: AdvancedTopicEntry[] = [
  // Disaster Timeline
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Cyclone", point: "Step-by-step timeline: what to do 48h before, during, and after a cyclone" },
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Earthquake", point: "Drop-Cover-Hold On — earthquake response timeline with aftershock guidance" },
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Flood", point: "Flood preparation, survival during rising water, and post-flood health risks" },
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Landslide", point: "Warning signs, evacuation direction, and post-landslide safety" },
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Heat Wave", point: "IMD heatwave thresholds, heatstroke emergency, ORS and cooling techniques" },
  { page: "disaster-timeline", pageTitle: "Disaster Timeline", emoji: "⏱️", link: "/disaster-timeline", heading: "Industrial Gas Leak", point: "Move upwind and uphill, wet cloth breathing, Bhopal reference" },

  // Power Planner
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "Battery Strategy", point: "Battery survival tips: below 50%, 20%, and 5% — what to turn off and when" },
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "Power Calculator", point: "Calculate how many phone charges your power bank provides (mAh calculator)" },
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "SMS vs Calls", point: "SMS uses less battery and gets through congested networks better than voice calls" },
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "Radio Communication", point: "AM/FM radio, HAM radio, All India Radio emergency broadcasts, walkie-talkies" },
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "Offline Communication", point: "Whistle signals, mirror signaling, ground-to-air signals, Morse code torch" },
  { page: "power-planner", pageTitle: "Power & Communication", emoji: "🔋", link: "/power-planner", heading: "Airplane Mode", point: "Enable airplane mode to save battery, disable briefly to send critical messages" },

  // Environmental Signals
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Flood Warning", point: "River water suddenly rising, rumbling upstream, animals moving uphill" },
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Landslide Warning", point: "Cracks in soil, trees leaning, unusual water seepage on slopes" },
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Toxic Gas Detection", point: "Chlorine smell, burning eyes, yellow-green cloud, dead insects or birds" },
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Tsunami Signs", point: "Sea water suddenly retreating, loud ocean roar, rapid tidal changes" },
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Cyclone Signs", point: "Falling barometric pressure, long ocean swells, sky turns unusual colours" },
  { page: "environmental-signals", pageTitle: "Environmental Signals", emoji: "🌿", link: "/environmental-signals", heading: "Earthquake Precursors", point: "Unusual animal behaviour, foreshocks, groundwater changes — India seismic zones II–V" },

  // Psychological Survival
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "Panic Control", point: "4-7-8 breathing technique, 5-4-3-2-1 grounding method to stop panic attacks" },
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "Helping Children", point: "Stay calm, give tasks to reduce fear, maintain routines after disaster" },
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "Keeping Injured Conscious", point: "Talk continuously, maintain eye contact, keep them warm, raise legs" },
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "Preventing Stampedes", point: "Boxer stance to protect ribs, move diagonally, foetal position if you fall" },
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "PTSD & Mental Health", point: "Normal stress reactions vs when to seek help — NIMHANS, iCall, AASRA helplines" },
  { page: "psychological-survival", pageTitle: "Psychological Survival", emoji: "🧠", link: "/psychological-survival", heading: "Group Leadership", point: "Point at specific people when giving instructions — 'everybody' means nobody acts" },

  // Navigation Without GPS
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "Sun Navigation", point: "Sun rises East, sets West, shortest shadow at noon points North" },
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "Shadow Stick Method", point: "Place stick, mark shadow tip, wait 15 min, new tip — line between them = East-West" },
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "North Star (Polaris)", point: "Find Big Dipper (Saptarishi Mandal), pointer stars lead to Polaris = True North" },
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "Terrain Clues", point: "Water flows downhill, rivers lead to civilisation, sound of traffic carries far at night" },
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "Distance Estimation", point: "Pace counting: ~1300-1500 paces per km, Naismith's rule for hills" },
  { page: "navigation-survival", pageTitle: "Navigation Without GPS", emoji: "🧭", link: "/navigation-survival", heading: "Analog Watch Method", point: "Point hour hand at sun, midpoint to 12 o'clock indicates South" },
];
