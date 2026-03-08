import { describe, it, expect } from "vitest";
import { brailleMap, textToBraille } from "@/lib/braille";

describe("brailleMap", () => {
  it("contains all 26 letters", () => {
    for (let i = 65; i <= 90; i++) {
      expect(brailleMap[String.fromCharCode(i)]).toBeDefined();
    }
  });

  it("contains digits 0-9", () => {
    for (let i = 0; i <= 9; i++) {
      expect(brailleMap[String(i)]).toBeDefined();
    }
  });

  it("maps A to ⠁", () => {
    expect(brailleMap["A"]).toBe("⠁");
  });

  it("maps S to ⠎", () => {
    expect(brailleMap["S"]).toBe("⠎");
  });

  it("numbers have numeric indicator prefix ⠼", () => {
    for (let i = 0; i <= 9; i++) {
      expect(brailleMap[String(i)]).toMatch(/^⠼/);
    }
  });
});

describe("textToBraille", () => {
  it("encodes HELP correctly", () => {
    expect(textToBraille("HELP")).toBe("⠓⠑⠇⠏");
  });

  it("encodes SOS correctly", () => {
    expect(textToBraille("SOS")).toBe("⠎⠕⠎");
  });

  it("is case-insensitive", () => {
    expect(textToBraille("help")).toBe(textToBraille("HELP"));
  });

  it("handles empty string", () => {
    expect(textToBraille("")).toBe("");
  });

  it("replaces unknown characters with space", () => {
    expect(textToBraille("A B")).toBe("⠁ ⠃");
  });
});
