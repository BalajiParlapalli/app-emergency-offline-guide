import { describe, it, expect } from "vitest";
import { toIST, getISTHHMM } from "@/lib/ist-time";

describe("toIST", () => {
  it("converts UTC midnight to IST 5:30 AM", () => {
    // Create a date at UTC midnight: 2024-01-15T00:00:00Z
    const utcMidnight = new Date("2024-01-15T00:00:00Z");
    const ist = toIST(utcMidnight);
    expect(ist.getHours()).toBe(5);
    expect(ist.getMinutes()).toBe(30);
  });

  it("converts UTC noon to IST 5:30 PM", () => {
    const utcNoon = new Date("2024-01-15T12:00:00Z");
    const ist = toIST(utcNoon);
    expect(ist.getHours()).toBe(17);
    expect(ist.getMinutes()).toBe(30);
  });

  it("handles date boundary crossing (UTC 20:00 = IST next day 1:30)", () => {
    const utcEvening = new Date("2024-01-15T20:00:00Z");
    const ist = toIST(utcEvening);
    expect(ist.getHours()).toBe(1);
    expect(ist.getMinutes()).toBe(30);
    expect(ist.getDate()).toBe(16);
  });
});

describe("getISTHHMM", () => {
  it("returns HH:MM format", () => {
    const result = getISTHHMM(new Date("2024-01-15T00:00:00Z"));
    expect(result).toBe("05:30");
  });

  it("pads single-digit hours", () => {
    const result = getISTHHMM(new Date("2024-01-15T00:00:00Z"));
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it("returns correct time for IST midnight", () => {
    // IST midnight = UTC 18:30 previous day
    const result = getISTHHMM(new Date("2024-01-14T18:30:00Z"));
    expect(result).toBe("00:00");
  });
});
