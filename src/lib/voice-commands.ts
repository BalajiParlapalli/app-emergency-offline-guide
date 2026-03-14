export const commands: Record<string, string> = {
  "home": "/",
  "emergency": "/emergency",
  "emergency mode": "/emergency",
  "guide": "/guide",
  "survival guide": "/guide",
  "survival": "/guide",
  "morse": "/morse",
  "morse code": "/morse",
  "braille": "/braille",
  "compass": "/compass",
  "direction": "/compass",
  "checklist": "/emergency-checklist",
  "emergency checklist": "/emergency-checklist",
  "sos": "/sos",
  "signal": "/sos",
  "signals": "/sos",
  "notebook": "/notebook",
  "notes": "/notebook",
  "note": "/notebook",
  "kit": "/edc",
  "backpack": "/edc",
  "edc": "/edc",
  "first aid": "/guide/first-aid",
  "vital signs": "/vital-signs",
  "vitals": "/vital-signs",
  "blood pressure": "/vital-signs",
  "heart rate": "/vital-signs",
  "pulse": "/vital-signs",
  "oxygen": "/vital-signs",
  "spo2": "/vital-signs",
  "blood sugar": "/vital-signs",
  "temperature": "/vital-signs",
  "hemoglobin": "/vital-signs",
  "help": "/emergency",
  "help me": "/emergency",
  "danger": "/emergency",
};

export const normalize = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

export const findCommand = (transcript: string): string | null => {
  const normalized = normalize(transcript);
  const words = normalized.split(" ");

  const sorted = Object.entries(commands).sort((a, b) => b[0].length - a[0].length);

  for (const [key] of sorted) {
    const keyWords = key.split(" ");
    if (keyWords.length > 1) {
      let searchFrom = 0;
      let allFound = true;
      for (const kw of keyWords) {
        const idx = words.indexOf(kw, searchFrom);
        if (idx === -1) { allFound = false; break; }
        searchFrom = idx + 1;
      }
      if (allFound) return key;
    } else {
      if (words.includes(key)) return key;
    }
  }

  for (const [key] of sorted) {
    if (normalized.includes(key)) return key;
  }

  return null;
};
