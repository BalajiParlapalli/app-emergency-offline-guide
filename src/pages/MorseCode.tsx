import { useState, useRef, useCallback } from "react";
import BackLink from "@/components/BackLink";

const morseMap: Record<string, string> = {
  A: "·−", B: "−···", C: "−·−·", D: "−··", E: "·", F: "··−·",
  G: "−−·", H: "····", I: "··", J: "·−−−", K: "−·−", L: "·−··",
  M: "−−", N: "−·", O: "−−−", P: "·−−·", Q: "−−·−", R: "·−·",
  S: "···", T: "−", U: "··−", V: "···−", W: "·−−", X: "−··−",
  Y: "−·−−", Z: "−−··",
  "0": "−−−−−", "1": "·−−−−", "2": "··−−−", "3": "···−−",
  "4": "····−", "5": "·····", "6": "−····", "7": "−−···",
  "8": "−−−··", "9": "−−−−·",
  ".": "·−·−·−", ",": "−−··−−", "?": "··−−··", "!": "−·−·−−",
  " ": "/",
};

const survivalPhrases = [
  { text: "SOS", morse: "··· −−− ···", meaning: "International distress signal" },
  { text: "HELP", morse: "···· · ·−·· ·−−·", meaning: "Request assistance" },
  { text: "WATER", morse: "·−− ·− − · ·−·", meaning: "Need water" },
  { text: "FOOD", morse: "··−· −−− −−− −··", meaning: "Need food" },
  { text: "DANGER", morse: "−·· ·− −· −−· · ·−·", meaning: "Warning of threat" },
  { text: "SAFE", morse: "··· ·− ··−· ·", meaning: "Area is safe" },
  { text: "FIRE", morse: "··−· ·· ·−· ·", meaning: "Fire nearby / need fire" },
  { text: "MOVE", morse: "−− −−− ···− ·", meaning: "Need to relocate" },
  { text: "STOP", morse: "··· − −−− ·−−·", meaning: "Halt / do not proceed" },
  { text: "YES", morse: "−·−− · ···", meaning: "Affirmative" },
  { text: "NO", morse: "−· −−−", meaning: "Negative" },
  { text: "HURT", morse: "···· ··− ·−· −", meaning: "Injured" },
  { text: "TRAPPED", morse: "− ·−· ·− ·−−· ·−−· · −··", meaning: "Cannot move / stuck" },
  { text: "SHELTER", morse: "··· ···· · ·−·· − · ·−·", meaning: "Need shelter" },
  { text: "MEDICINE", morse: "−− · −·· ·· −·−· ·· −· ·", meaning: "Need medical supplies" },
];

const textToMorse = (text: string) =>
  text.toUpperCase().split("").map(c => morseMap[c] || "").join(" ");

const DOT_MS = 200;
const DASH_MS = 600;
const GAP_MS = 200;
const CHAR_GAP_MS = 600;
const WORD_GAP_MS = 1400;

const MorseCode = () => {
  const [input, setInput] = useState("");
  const [flashing, setFlashing] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const abortRef = useRef(false);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const flashMorse = useCallback(async (text: string) => {
    abortRef.current = false;
    setFlashing(true);
    const morse = textToMorse(text);
    for (const char of morse) {
      if (abortRef.current) break;
      if (char === "·") {
        setFlashOn(true); await sleep(DOT_MS); setFlashOn(false); await sleep(GAP_MS);
      } else if (char === "−") {
        setFlashOn(true); await sleep(DASH_MS); setFlashOn(false); await sleep(GAP_MS);
      } else if (char === "/") {
        await sleep(WORD_GAP_MS);
      } else if (char === " ") {
        await sleep(CHAR_GAP_MS);
      }
    }
    setFlashOn(false);
    setFlashing(false);
  }, []);

  const stopFlash = () => { abortRef.current = true; setFlashOn(false); setFlashing(false); };

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" role="main" aria-label="Morse Code Tool">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-6">📡 Morse Code</h1>

      {/* Encoder */}
      <div className="mb-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type text to encode..."
          className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary mb-2"
        />
        {input && (
          <div className="bg-card border border-primary/30 rounded-md p-3 mono text-primary text-lg tracking-widest break-all mb-2">
            {textToMorse(input)}
          </div>
        )}
        {input && (
          <button
            onClick={() => flashing ? stopFlash() : flashMorse(input)}
            className={`touch-target w-full py-3 rounded-md text-sm font-semibold transition-colors ${
              flashing ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
            }`}
            aria-label={flashing ? "Stop Morse flashlight" : "Flash input text as Morse code"}
          >
            {flashing ? "⬛ Stop Flashlight" : "🔦 Flash as Morse"}
          </button>
        )}
      </div>

      {/* Flashlight screen */}
      {flashOn && (
        <div className="fixed inset-0 z-50 bg-white" onClick={stopFlash} />
      )}

      {/* Survival phrases */}
      <h2 className="text-xl font-semibold mb-3">🆘 Survival Phrases</h2>
      <div className="space-y-2 mb-6">
        {survivalPhrases.map(({ text, morse, meaning }) => (
          <div key={text} className="border border-border rounded-lg px-3 py-2.5 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{text}</span>
              <button
                onClick={() => flashMorse(text)}
                className="touch-target text-xs text-primary hover:text-primary/80 mono px-2 py-1"
                disabled={flashing}
                aria-label={`Flash ${text} as Morse code`}
              >
                🔦 Flash
              </button>
            </div>
            <span className="mono text-primary text-sm tracking-widest">{morse}</span>
            <span className="text-xs text-muted-foreground">{meaning}</span>
          </div>
        ))}
      </div>

      {/* Reference Chart */}
      <h2 className="text-xl font-semibold mb-3">Reference Chart</h2>
      <div className="grid grid-cols-2 gap-1 text-sm">
        {Object.entries(morseMap).filter(([k]) => k !== " ").map(([char, code]) => (
          <div key={char} className="flex justify-between px-3 py-1.5 rounded bg-secondary/50">
            <span className="font-semibold">{char}</span>
            <span className="mono text-primary">{code}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorseCode;
