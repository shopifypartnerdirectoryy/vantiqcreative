import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero, Section, btnClass } from "@/components/site/primitives";
import { PortfolioGrid } from "@/components/site/Portfolio";
import { FinalCta } from "@/components/site/blocks";

export const Route = createFileRoute("/work")({
  head: () => seo({ title: "Selected Work", description: "AI films, product visuals, campaigns, book trailers, and author launches from VANTIQ CREATIVE — clearly labelled as client work or concept.", path: "/work" }),
  component: () => (
    <>
      <PageHero label="Work" title="Selected work." text="Films, visuals, campaigns, and launches. Every piece is labelled as Actual Work or Concept — we don't dress up experiments as client results.">
        <Link to="/contact" className={btnClass("primary")}>Start a Project</Link>
      </PageHero>
      <Section><PortfolioGrid /></Section>
      <FinalCta />
    </>
  ),
});
