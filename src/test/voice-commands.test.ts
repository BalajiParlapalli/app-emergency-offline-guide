import { describe, it, expect } from "vitest";
import { findCommand, normalize, commands } from "@/lib/voice-commands";

describe("normalize", () => {
  it("lowercases text", () => {
    expect(normalize("HELLO")).toBe("hello");
  });

  it("removes punctuation", () => {
    expect(normalize("hello!")).toBe("hello");
  });

  it("collapses whitespace", () => {
    expect(normalize("  hello   world  ")).toBe("hello world");
  });
});

describe("findCommand", () => {
  it("finds single-word commands", () => {
    expect(findCommand("compass")).toBe("compass");
    expect(findCommand("sos")).toBe("sos");
    expect(findCommand("guide")).toBe("guide");
    expect(findCommand("braille")).toBe("braille");
    expect(findCommand("morse")).toBe("morse");
  });

  it("finds multi-word commands", () => {
    expect(findCommand("open emergency mode")).toBe("emergency mode");
    expect(findCommand("go to morse code")).toBe("morse code");
    expect(findCommand("show survival guide")).toBe("survival guide");
    expect(findCommand("emergency checklist")).toBe("emergency checklist");
  });

  it("is case-insensitive", () => {
    expect(findCommand("COMPASS")).toBe("compass");
    expect(findCommand("SOS")).toBe("sos");
  });

  it("handles noisy transcripts", () => {
    expect(findCommand("please open the compass for me")).toBe("compass");
    expect(findCommand("I need help")).toBe("help");
  });

  it("returns null for unrecognized commands", () => {
    expect(findCommand("what is the weather")).toBeNull();
    expect(findCommand("play some music")).toBeNull();
  });

  it("prefers longer matches", () => {
    // "emergency checklist" should match before just "emergency"
    expect(findCommand("open emergency checklist")).toBe("emergency checklist");
    // "morse code" should match before just "morse"
    expect(findCommand("show morse code")).toBe("morse code");
  });

  it("maps all commands to valid routes", () => {
    for (const [, route] of Object.entries(commands)) {
      expect(route).toMatch(/^\//);
    }
  });
});
