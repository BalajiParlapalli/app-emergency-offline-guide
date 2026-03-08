import { describe, it, expect } from "vitest";
import { morseMap, textToMorse } from "@/lib/morse";

describe("morseMap", () => {
  it("contains all 26 letters", () => {
    for (let i = 65; i <= 90; i++) {
      expect(morseMap[String.fromCharCode(i)]).toBeDefined();
    }
  });

  it("contains digits 0-9", () => {
    for (let i = 0; i <= 9; i++) {
      expect(morseMap[String(i)]).toBeDefined();
    }
  });

  it("has correct SOS encoding", () => {
    expect(morseMap["S"]).toBe("···");
    expect(morseMap["O"]).toBe("−−−");
  });

  it("maps space to /", () => {
    expect(morseMap[" "]).toBe("/");
  });
});

describe("textToMorse", () => {
  it("encodes SOS correctly", () => {
    expect(textToMorse("SOS")).toBe("··· −−− ···");
  });

  it("encodes HELP correctly", () => {
    expect(textToMorse("HELP")).toBe("···· · ·−·· ·−−·");
  });

  it("is case-insensitive", () => {
    expect(textToMorse("sos")).toBe(textToMorse("SOS"));
  });

  it("handles spaces as word separator /", () => {
    expect(textToMorse("HI THERE")).toContain("/");
  });

  it("handles empty string", () => {
    expect(textToMorse("")).toBe("");
  });

  it("ignores unknown characters", () => {
    expect(textToMorse("A@B")).toBe("·−  −···");
  });

  it("encodes digits correctly", () => {
    expect(textToMorse("123")).toBe("·−−−− ··−−− ···−−");
  });

  it("encodes punctuation", () => {
    expect(textToMorse("?")).toBe("··−−··");
    expect(textToMorse("!")).toBe("−·−·−−");
  });
});
