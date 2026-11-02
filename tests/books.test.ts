import { describe, expect, it } from "vitest";
import { books, visibleBooks } from "../src/content/books";
import { visibleAuthors } from "../src/content/authors";
import { site } from "../src/content/site";

describe("submitted real books", () => {
  it("lists all seventeen supplied books for visitors", () => {
    expect(visibleBooks().map((book) => book.title)).toEqual([
      "The Walking Wounded Revised",
      "Nobel Pursuits",
      "Valley of Saint Anne",
      "Himba Pond Dance",
      "Early Mornings with “Dick”",
      "Blame It on Socrates",
      "Proud American",
      "Stjarna’s Stars",
      "Shattered by Love",
      "A Girl with a Bad Reputation",
      "Lucrecia: Memoir of a Manic Woman",
      "Reflections for the Twenty-First Century",
      "SuperPower: The Ability to Fly or to Become Invisible",
      "Finish the Race",
      "Gunfighters, Thieves and Lawmen",
      "Boundaries",
      "Egypt Under the Stars",
    ]);
  });

  it("uses each supplied retailer link without substituting a review URL", () => {
    expect(books.flatMap((book) => book.retailers.map((retailer) => retailer.href))).toEqual([
      "https://www.amazon.com/dp/B0GTLS5JDN",
      "https://www.amazon.com/dp/B0DR3389GV",
      "https://www.amazon.com/dp/B0FKQF9GYD",
      "https://www.amazon.com/dp/B0FLB4NYSK",
      "https://www.amazon.com/Early-QA-Dick-Jack-Ryan/dp/1808570472?ref_=ast_author_dp&th=1&psc=1",
      "https://www.amazon.com/BLAME-SOCRATES-Jack-Ryan-ebook/dp/B0F2SJZY24?ref_=ast_author_mpb",
      "https://www.amazon.com/Proud-American-Migrant-Soldier-Agent-ebook/dp/B0H1348M12?ref_=ast_author_mpb",
      "https://www.amazon.com/Stjarnas-Stars-Patricia-Squire/dp/1039192289",
      "https://www.amazon.com/Shattered-Love-carousel-romance-heartache-ebook/dp/B0CNKYDB52?ref_=ast_author_mpb",
      "https://www.amazon.com/Girl-Bad-Reputation-Dave-Gioia-ebook/dp/B0F45YJJHN?ref_=ast_author_mpb",
      "https://www.amazon.com/Lucrecia-Memoir-Manic-Jamie-Goudeau/dp/B0H639GLNQ",
      "https://www.amazon.com/Reflections-Twenty-First-Century-Jean-Lee/dp/1039151930",
      "https://www.amazon.com/SuperPower-Ability-Become-Invisible-Phoenix-ebook/dp/B0DFBXKY2C",
      "https://www.amazon.com/Finish-Race-Jon-Waller/dp/B0H1P1D7PM",
      "https://www.amazon.com/Gunfighters-Thieves-Lawmen-Milton-McGowan-ebook/dp/B08DNHKVVV",
      "https://www.amazon.com/Boundaries-David-M-McGowan-ebook/dp/B0CRMWVRLW",
      "https://www.amazon.co.uk/Egypt-Under-Stars-Religion-Cosmogonic-ebook/dp/B0GH3HPFL8",
    ]);
  });

  it("keeps Amazon ratings separate from actual approved reader reviews", () => {
    expect(books.find((book) => book.slug === "nobel-pursuits")?.retailerRating).toEqual({
      value: 4.6,
      reviewCount: 3,
      retailer: "Amazon",
    });
    expect(books.every((book) => book.approvedReviews.length === 0)).toBe(true);
  });

  it("lists only actual supplied cover files and every named author", () => {
    expect(books.filter((book) => book.cover)).toHaveLength(17);
    expect(visibleAuthors().map((author) => author.name)).toEqual([
      "Deborah Ling",
      "Rosemarie Aquilina & Robert Leader†",
      "Dave Gioia",
      "Jack Ryan",
      "Sergio A. Tinoco",
      "Patricia Squire",
      "Michael Knapp",
      "Jamie Goudeau",
      "Jean Pi Lee",
      "Roger E. Pedersen",
      "Jon Waller",
      "David Milton McGowan",
      "Ev Cochrane",
    ]);
  });

  it("uses the supplied founder name and portrait-backed profile", () => {
    expect(site.founder.name).toBe("Haliy Adam");
    expect(site.founder.photo).toContain("haliy-adam-founder.jpg");
    expect(site.founder.bio).toContain("every story deserves a screen and a shelf");
  });
});
