import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";

interface KitItem {
  text: string;
  checked: boolean;
}

interface Category {
  title: string;
  emoji: string;
  items: KitItem[];
}

const STORAGE_KEY = "survival-edc-kit";

const defaultCategories: Category[] = [
  {
    title: "First Aid",
    emoji: "⛑",
    items: [
      { text: "Medical kit", checked: false },
      { text: "Sanitizer", checked: false },
      { text: "Bandages (crepe + adhesive)", checked: false },
      { text: "Mask (N95)", checked: false },
      { text: "Surgical blade", checked: false },
      { text: "Needle & thread (suture)", checked: false },
      { text: "Safety pins", checked: false },
      { text: "Necessary pills & ointments", checked: false },
      { text: "ORS packets", checked: false },
      { text: "Antiseptic solution (Dettol/Betadine)", checked: false },
      { text: "Tweezers", checked: false },
      { text: "Tourniquet / rubber band", checked: false },
      { text: "Disposable gloves", checked: false },
    ],
  },
  {
    title: "Warmth & Fire",
    emoji: "🔥",
    items: [
      { text: "Fire starter (ferro rod)", checked: false },
      { text: "Zippo lighter", checked: false },
      { text: "Candle (magic candle / foil candle)", checked: false },
      { text: "Cotton balls (with vaseline)", checked: false },
      { text: "Magnifying glass", checked: false },
      { text: "Waterproof matches", checked: false },
      { text: "Dryer lint (tinder)", checked: false },
    ],
  },
  {
    title: "Signaling & Navigation",
    emoji: "🧭",
    items: [
      { text: "Compass", checked: false },
      { text: "Map of your region", checked: false },
      { text: "Whistle (3-blast SOS)", checked: false },
      { text: "Signalling mirror", checked: false },
      { text: "Telescope / binoculars", checked: false },
      { text: "Hand-crank radio", checked: false },
      { text: "Flare gun / signal flare", checked: false },
    ],
  },
  {
    title: "Food & Water",
    emoji: "🥤",
    items: [
      { text: "Chocolate / nuts / dry fruits", checked: false },
      { text: "Oats / muesli packets", checked: false },
      { text: "Packaged biscuits (Parle-G, etc.)", checked: false },
      { text: "Canned food (ready-to-eat)", checked: false },
      { text: "Energy bars", checked: false },
      { text: "Instant noodles / poha mix", checked: false },
      { text: "Salt & sugar sachets", checked: false },
      { text: "Water bottle (1L minimum)", checked: false },
      { text: "Water purification tablets", checked: false },
      { text: "Portable water filter (LifeStraw)", checked: false },
      { text: "Electrolyte powder (Electral)", checked: false },
    ],
  },
  {
    title: "Shelter & Protection",
    emoji: "⛺",
    items: [
      { text: "Emergency Mylar blanket", checked: false },
      { text: "Tarpaulin sheet (6×8 ft)", checked: false },
      { text: "Paracord (50 ft)", checked: false },
      { text: "Raincoat / poncho", checked: false },
      { text: "Mosquito net (compact)", checked: false },
      { text: "Sleeping bag (lightweight)", checked: false },
      { text: "Sunglasses", checked: false },
      { text: "Hat / cap", checked: false },
    ],
  },
  {
    title: "Tools & Repair",
    emoji: "🔧",
    items: [
      { text: "Multi-tool card / Swiss knife", checked: false },
      { text: "Aluminum foil", checked: false },
      { text: "Mini torch / headlamp", checked: false },
      { text: "Extra batteries (AA/AAA)", checked: false },
      { text: "Fevikwik (super glue)", checked: false },
      { text: "Electrical tape", checked: false },
      { text: "Duct tape (small roll)", checked: false },
      { text: "Paracord watch / bracelet", checked: false },
      { text: "Sewing kit (mini)", checked: false },
      { text: "Cable ties / zipper ties", checked: false },
      { text: "Wire (thin gauge)", checked: false },
    ],
  },
  {
    title: "Documents & Info",
    emoji: "📄",
    items: [
      { text: "Pen and waterproof paper", checked: false },
      { text: "Mini survival guide (printed)", checked: false },
      { text: "Emergency contacts list (laminated)", checked: false },
      { text: "Aadhaar / ID photocopy", checked: false },
      { text: "Cash (₹500 & ₹100 notes)", checked: false },
      { text: "USB drive with important docs", checked: false },
    ],
  },
  {
    title: "Hygiene & Misc",
    emoji: "🧼",
    items: [
      { text: "Tissues / wet wipes", checked: false },
      { text: "Plain toothpaste", checked: false },
      { text: "Soap bar (small)", checked: false },
      { text: "Sanitary pads / menstrual cup", checked: false },
      { text: "Garbage bags (heavy duty)", checked: false },
      { text: "Sunscreen (SPF 50+)", checked: false },
      { text: "Insect repellent (Odomos)", checked: false },
      { text: "A book", checked: false },
      { text: "Power bank (20000mAh)", checked: false },
      { text: "Solar charger", checked: false },
      { text: "Charging cables", checked: false },
    ],
  },
];

const EDCKit = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const toggle = (catIdx: number, itemIdx: number) => {
    setCategories(prev =>
      prev.map((cat, ci) =>
        ci === catIdx
          ? { ...cat, items: cat.items.map((it, ii) => ii === itemIdx ? { ...it, checked: !it.checked } : it) }
          : cat
      )
    );
  };

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const totalChecked = categories.reduce((s, c) => s + c.items.filter(i => i.checked).length, 0);

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCategories(defaultCategories);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" role="main" aria-label="EDC Survival Kit">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">🎒 EDC Survival Kit</h1>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground mono">{totalChecked}/{totalItems} packed</p>
        <button onClick={resetAll} className="text-xs text-muted-foreground hover:text-primary transition-colors">Reset all</button>
      </div>

      <div className="space-y-5">
        {categories.map((cat, ci) => {
          const catChecked = cat.items.filter(i => i.checked).length;
          return (
            <details key={ci} className="border border-border rounded-lg group" open={ci === 0}>
              <summary className="px-4 py-3 font-semibold text-lg cursor-pointer hover:bg-secondary/50 transition-colors list-none flex justify-between items-center">
                <span>{cat.emoji} {cat.title}</span>
                <span className="text-sm text-muted-foreground mono">{catChecked}/{cat.items.length}</span>
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {cat.items.map((item, ii) => (
                  <button
                    key={ii}
                    onClick={() => toggle(ci, ii)}
                    className="touch-target flex items-center gap-3 w-full text-left py-2"
                    aria-label={`${item.checked ? "Uncheck" : "Check"} ${item.text}`}
                    aria-pressed={item.checked}
                  >
                    <span className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${item.checked ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                      {item.checked && <span className="text-primary-foreground text-xs">✓</span>}
                    </span>
                    <span className={`text-sm ${item.checked ? "line-through text-muted-foreground" : ""}`}>{item.text}</span>
                  </button>
                ))}
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default EDCKit;
