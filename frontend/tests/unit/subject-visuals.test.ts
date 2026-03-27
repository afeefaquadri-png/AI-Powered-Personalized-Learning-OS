import { describe, it, expect } from "vitest";
import { getVisual, SUBJECT_VISUALS, DEFAULT_VISUAL } from "@/app/dashboard/components/subject-visuals";

describe("getVisual", () => {
  it("returns the correct visual for a known subject", () => {
    const visual = getVisual("Mathematics");
    expect(visual).toBe(SUBJECT_VISUALS["Mathematics"]);
    expect(visual.accent).toBe("text-blue-400");
  });

  it("returns DEFAULT_VISUAL for an unknown subject", () => {
    const visual = getVisual("Unknown Subject");
    expect(visual).toBe(DEFAULT_VISUAL);
  });

  it("returns visuals for all defined subjects", () => {
    const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Biology", "Computer Science"];
    for (const subject of subjects) {
      const visual = getVisual(subject);
      expect(visual).not.toBe(DEFAULT_VISUAL);
      expect(visual.bg).toBeTruthy();
      expect(visual.accent).toBeTruthy();
    }
  });
});
