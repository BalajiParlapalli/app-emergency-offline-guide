import BackLink from "@/components/BackLink";

const brailleMap: Record<string, string> = {
  A: "⠁", B: "⠃", C: "⠉", D: "⠙", E: "⠑", F: "⠋",
  G: "⠛", H: "⠓", I: "⠊", J: "⠚", K: "⠅", L: "⠇",
  M: "⠍", N: "⠝", O: "⠕", P: "⠏", Q: "⠟", R: "⠗",
  S: "⠎", T: "⠞", U: "⠥", V: "⠧", W: "⠺", X: "⠭",
  Y: "⠽", Z: "⠵",
  "0": "⠼⠚", "1": "⠼⠁", "2": "⠼⠃", "3": "⠼⠉",
  "4": "⠼⠙", "5": "⠼⠑", "6": "⠼⠋", "7": "⠼⠛",
  "8": "⠼⠓", "9": "⠼⠊",
};

const Braille = () => {
  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-2">⠃ Braille Reference</h1>
      <p className="text-sm text-muted-foreground mb-6">Tap communication when silence is survival</p>

      <h2 className="text-xl font-semibold mb-3">Letters</h2>
      <div className="grid grid-cols-2 gap-1 text-sm mb-6">
        {Object.entries(brailleMap).filter(([k]) => isNaN(Number(k))).map(([char, braille]) => (
          <div key={char} className="flex justify-between px-3 py-2 rounded bg-secondary/50">
            <span className="font-semibold">{char}</span>
            <span className="text-primary text-2xl leading-none">{braille}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Numbers</h2>
      <div className="grid grid-cols-2 gap-1 text-sm">
        {Object.entries(brailleMap).filter(([k]) => !isNaN(Number(k))).map(([char, braille]) => (
          <div key={char} className="flex justify-between px-3 py-2 rounded bg-secondary/50">
            <span className="font-semibold">{char}</span>
            <span className="text-primary text-2xl leading-none">{braille}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-2">How Braille Works</h3>
        <p className="text-sm text-muted-foreground">
          Each Braille cell has 6 dots arranged in a 3×2 grid. Different combinations of raised dots represent different letters. 
          Feel or mark dots on any surface — paper, wood, clay — to leave messages others can read by touch in darkness.
        </p>
      </div>
    </div>
  );
};

export default Braille;
