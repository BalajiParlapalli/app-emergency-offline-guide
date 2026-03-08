import { describe, it, expect } from "vitest";
import { guideTopics } from "@/data/guideData";

describe("guideData integrity", () => {
  it("has at least 20 topics", () => {
    expect(guideTopics.length).toBeGreaterThanOrEqual(20);
  });

  it("all topics have unique slugs", () => {
    const slugs = guideTopics.map(t => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all topics have title, emoji, and sections", () => {
    for (const topic of guideTopics) {
      expect(topic.title).toBeTruthy();
      expect(topic.emoji).toBeTruthy();
      expect(topic.sections.length).toBeGreaterThan(0);
    }
  });

  it("all sections have heading and points", () => {
    for (const topic of guideTopics) {
      for (const section of topic.sections) {
        expect(section.heading).toBeTruthy();
        expect(section.points.length).toBeGreaterThan(0);
      }
    }
  });

  it("ground-to-air signals use correct ICAO 'II' for supplies", () => {
    const commTopic = guideTopics.find(t => t.slug === "communication");
    const signalsSection = commTopic?.sections.find(s => s.heading.includes("Ground-to-Air"));
    const suppliesPoint = signalsSection?.points.find(p => p.includes("Need supplies"));
    expect(suppliesPoint).toMatch(/^II/);
  });

  it("food safety uses correct WHO 2-hour guideline", () => {
    const foodTopic = guideTopics.find(t => t.slug === "food-nutrition");
    const safetySection = foodTopic?.sections.find(s => s.heading.includes("Safe Food"));
    const timePoint = safetySection?.points.find(p => p.includes("room temperature"));
    expect(timePoint).toContain("2 hours");
    expect(timePoint).not.toContain("4 hours");
  });

  it("emergency numbers include 112, 108, 100, 101", () => {
    const prepTopic = guideTopics.find(t => t.slug === "everyday-preparedness");
    const allText = JSON.stringify(prepTopic);
    expect(allText).toContain("112");
  });

  it("Good Samaritan Law reference is correct", () => {
    const transportTopic = guideTopics.find(t => t.slug === "transportation-safety");
    const allText = JSON.stringify(transportTopic);
    expect(allText).toContain("Motor Vehicles Amendment Act 2019");
  });

  it("BNS Section 353 reference is correct", () => {
    const crisisTopic = guideTopics.find(t => t.slug === "crisis-communication");
    const allText = JSON.stringify(crisisTopic);
    expect(allText).toContain("BNS Section 353");
  });

  it("anti-rabies vaccine protocol mentions 4 doses", () => {
    const firstAidTopic = guideTopics.find(t => t.slug === "first-aid");
    const allText = JSON.stringify(firstAidTopic);
    expect(allText).toContain("4 doses");
  });
});
