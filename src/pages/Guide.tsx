import { useState } from "react";
import BackLink from "@/components/BackLink";

const topics = [
  {
    title: "💧 Water",
    items: [
      "Find flowing water over stagnant — rivers, streams",
      "Boil water for at least 1 minute to kill pathogens",
      "Collect rainwater using tarps or containers",
      "Morning dew can be collected with cloth and wrung out",
      "Avoid drinking seawater — it causes dehydration",
      "Filter through sand/gravel/charcoal layers before boiling",
    ],
  },
  {
    title: "🍖 Food",
    items: [
      "Learn to identify edible plants in your region",
      "Set simple snare traps for small game",
      "Insects are high in protein — crickets, grubs, ants",
      "Avoid brightly colored or milky-sap plants (often toxic)",
      "Preserve meat by smoking or salting",
      "Dandelions, cattails, and acorns are widely safe to eat",
    ],
  },
  {
    title: "🏕️ Shelter",
    items: [
      "Find natural shelter: caves, overhangs, dense trees",
      "Build lean-to using a ridge pole and branches",
      "Insulate floor with dry leaves, grass, or pine needles",
      "Keep shelter small to retain body heat",
      "Face opening away from prevailing wind",
      "Elevate off ground in wet/swampy areas",
    ],
  },
  {
    title: "🔥 Fire",
    items: [
      "Carry fire starters: matches, lighters, ferro rod",
      "Tinder: dry bark, dryer lint, cotton balls with vaseline",
      "Kindling: small twigs, split wood, dry grass bundles",
      "Fire bow drill: hardwood spindle on softwood board",
      "Keep fire small and controlled — conserve fuel",
      "Bank fire at night with ash to preserve coals",
    ],
  },
  {
    title: "🩹 First Aid",
    items: [
      "Stop bleeding: apply direct pressure with clean cloth",
      "Clean wounds with clean water, apply bandage",
      "Splint fractures with sticks and cloth strips",
      "Treat burns with cool running water (not ice)",
      "Stay hydrated to prevent shock",
      "Elevate injured limbs to reduce swelling",
      "Willow bark tea can reduce pain/fever (natural aspirin)",
    ],
  },
  {
    title: "🧭 Navigation",
    items: [
      "Sun rises in the East, sets in the West",
      "North Star (Polaris) indicates true North",
      "Moss tends to grow on the North side of trees (Northern Hemisphere)",
      "Shadow stick method: plant stick, mark shadow tip, wait 15min, mark again — line points East-West",
      "Follow rivers downstream to find civilization",
      "Use landmarks and make trail markers to avoid getting lost",
    ],
  },
];

const Guide = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-6">📖 Survival Guide</h1>

      <div className="space-y-3">
        {topics.map((topic, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-4 py-3 font-semibold text-lg flex justify-between items-center hover:bg-secondary/50 transition-colors"
            >
              {topic.title}
              <span className="text-muted-foreground text-sm">{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <ul className="px-4 pb-4 space-y-2">
                {topic.items.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground pl-2 border-l-2 border-primary/40">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
