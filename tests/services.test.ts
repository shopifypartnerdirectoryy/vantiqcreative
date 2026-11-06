import { describe, expect, it } from "vitest";
import { pressServices } from "../src/content/services";

describe("VANTIQ Press services", () => {
  it("adds distinct reader-discovery and author-platform offerings", () => {
    const titles = pressServices.map((service) => service.title);
    expect(titles).toContain("Book Interior & eBook Formatting");
    expect(titles).toContain("Retailer Listing & Metadata Review");
    expect(titles).toContain("Advance Reader Campaign Coordination");
    expect(titles).toContain("Reader Platform Profile Support");
    expect(titles).toContain("Book Club Discussion Guides");
    expect(titles).toContain("Podcast & Media Pitch Preparation");
    expect(titles).toContain("Author Newsletter & Welcome Sequence");
  });

  it("provides details and a category for every browsable service", () => {
    expect(pressServices).toHaveLength(17);
    expect(pressServices.every((service) => service.category && service.details.length > 0)).toBe(true);
  });

  it("does not promise retailer placement or reader reviews", () => {
    const details = pressServices.flatMap((service) => service.details).join(" ");
    expect(details).toContain("retailer placement or sales are not guaranteed");
    expect(details).toContain("Reviews are voluntary");
  });
});