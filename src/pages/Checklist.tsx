import { useState, useEffect } from "react";
import BackLink from "@/components/BackLink";

interface Item {
  id: string;
  text: string;
  checked: boolean;
}

const STORAGE_KEY = "survival-checklist";

const defaultItems: Item[] = [
  { id: "1", text: "Water bottles / purification tablets", checked: false },
  { id: "2", text: "Canned food / dried rations", checked: false },
  { id: "3", text: "First aid kit", checked: false },
  { id: "4", text: "Knife / multi-tool", checked: false },
  { id: "5", text: "Fire starter (lighter / matches / ferro rod)", checked: false },
  { id: "6", text: "Flashlight / batteries", checked: false },
  { id: "7", text: "Rope / paracord", checked: false },
  { id: "8", text: "Tarp / emergency blanket", checked: false },
  { id: "9", text: "Map of the area", checked: false },
  { id: "10", text: "Radio (hand-crank)", checked: false },
];

const Checklist = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultItems;
  });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggle = (id: string) => {
    setItems(items.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  };

  const addItem = () => {
    const text = newItem.trim();
    if (!text) return;
    setItems([...items, { id: Date.now().toString(), text, checked: false }]);
    setNewItem("");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(it => it.id !== id));
  };

  const checked = items.filter(i => i.checked).length;

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">📋 Checklist</h1>
      <p className="text-sm text-muted-foreground mb-6 mono">{checked}/{items.length} secured</p>

      <div className="flex gap-2 mb-6">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addItem()}
          placeholder="Add item..."
          className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button onClick={addItem} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
          Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 border border-border rounded-md px-3 py-2.5 group">
            <button onClick={() => toggle(item.id)} className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${item.checked ? "bg-primary border-primary" : "border-muted-foreground"}`}>
              {item.checked && <span className="text-primary-foreground text-xs">✓</span>}
            </button>
            <span className={`flex-1 text-sm ${item.checked ? "line-through text-muted-foreground" : ""}`}>{item.text}</span>
            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
