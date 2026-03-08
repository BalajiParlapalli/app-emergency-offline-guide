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
      { text: "Bandages", checked: false },
      { text: "Mask", checked: false },
      { text: "Blade", checked: false },
      { text: "Needle", checked: false },
      { text: "Safety pin", checked: false },
      { text: "Necessary pills & ointments", checked: false },
    ],
  },
  {
    title: "Warmth & Fire",
    emoji: "🔥",
    items: [
      { text: "Fire starter", checked: false },
      { text: "Zippo lighter", checked: false },
      { text: "Candle (magic candle / small foil candle)", checked: false },
      { text: "Cotton", checked: false },
      { text: "Magnifying glass", checked: false },
    ],
  },
  {
    title: "Signaling & Navigation",
    emoji: "🧭",
    items: [
      { text: "Compass", checked: false },
      { text: "Map", checked: false },
      { text: "Whistle", checked: false },
      { text: "Signalling mirror", checked: false },
      { text: "Telescope", checked: false },
    ],
  },
  {
    title: "Food & Water",
    emoji: "🥤",
    items: [
      { text: "Chocolate or nuts / dry fruits", checked: false },
      { text: "Oats", checked: false },
      { text: "Water bottle", checked: false },
      { text: "Water purification tablets", checked: false },
    ],
  },
  {
    title: "Other Essentials",
    emoji: "🎒",
    items: [
      { text: "Multi-tool card / multi-tool", checked: false },
      { text: "Aluminum foil", checked: false },
      { text: "Mini torch", checked: false },
      { text: "Fevikwik (super glue)", checked: false },
      { text: "Electrical tape", checked: false },
      { text: "Paracord watch", checked: false },
      { text: "Tissues", checked: false },
      { text: "Pen and paper", checked: false },
      { text: "Mini survival guide", checked: false },
      { text: "Plain toothpaste", checked: false },
      { text: "Zipper ties", checked: false },
      { text: "A book", checked: false },
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

  const resetAll = () => setCategories(defaultCategories);

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
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
                    className="flex items-center gap-3 w-full text-left py-1.5"
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
