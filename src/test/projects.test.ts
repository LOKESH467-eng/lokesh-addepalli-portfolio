import { describe, expect, it } from "vitest";

import { projects } from "@/lib/projects";

describe("portfolio project slots", () => {
  it("keeps exactly six project slots", () => {
    expect(projects).toHaveLength(6);
  });

  it("shows the two projects named in the supplied screenshots without invented technologies", () => {
    expect(projects.slice(0, 2).map((project) => project.title)).toEqual([
      "Plantwise",
      "CampusConnect",
    ]);
    expect(projects.slice(0, 2).every((project) => !project.tags)).toBe(true);
  });

  it("keeps the remaining four slots as empty placeholders", () => {
    expect(projects.slice(2)).toEqual([
      { number: "03", isPlaceholder: true },
      { number: "04", isPlaceholder: true },
      { number: "05", isPlaceholder: true },
      { number: "06", isPlaceholder: true },
    ]);
  });
});