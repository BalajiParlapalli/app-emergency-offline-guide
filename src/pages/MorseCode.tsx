import { useState } from "react";
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

const textToMorse = (text: string) =>
  text.toUpperCase().split("").map(c => morseMap[c] || "").join(" ");

const MorseCode = () => {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-6">📡 Morse Code</h1>

      <div className="mb-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type text to encode..."
          className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary mb-2"
        />
        {input && (
          <div className="bg-card border border-primary/30 rounded-md p-3 mono text-primary text-lg tracking-widest break-all">
            {textToMorse(input)}
          </div>
        )}
      </div>

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
