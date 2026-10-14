import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-cinematic.jpg";
import { seo } from "@/lib/seo";
import { studioServices } from "@/content/services";
import { site } from "@/content/site";
import { PageHero, Section, SectionHead, ServiceGrid, btnClass } from "@/components/site/primitives";
import { PortfolioGrid } from "@/components/site/Portfolio";
import { FinalCta } from "@/components/site/blocks";

export const Route = createFileRoute("/studio")({
  head: () => seo({ title: "VANTIQ Studio — AI Films & Commercials", description: "AI-assisted commercials, brand films, product visuals, music videos, and book trailers — developed from concept to cinematic final.", path: "/studio" }),
  component: Studio,
});

function Studio() {
  return (
    <>
      <PageHero image={heroImg} label="VANTIQ Studio" title="Visual Stories Built to Hold Attention." text="We take a concept — a product, a campaign, a song, a book — and develop it into cinematic assets: scripted, designed, generated with AI-assisted tools, and finished by hand.">
        <Link to="/contact" search={{ type: "AI Film & Commercials" }} className={btnClass("primary")}>Request a Production Quote</Link>
        <a href="#studio-work" className={btnClass("outline")}>View Selected Work</a>
      </PageHero>
      <Section>
        <SectionHead label="01 — Services" title="What Studio makes." />
        <div className="mt-12"><ServiceGrid items={studioServices} ctaTo="/contact" ctaType="AI Film & Commercials" /></div>
      </Section>
      <section aria-label="Production tools we use" className="overflow-hidden border-y border-border py-8">
        <p className="mb-5 text-center eyebrow">Tools in our pipeline · no affiliation implied</p>
        <div className="flex w-max marquee gap-16 motion-reduce:animate-none">
          {[...site.tools, ...site.tools, ...site.tools, ...site.tools].map((t, i) => (
            <span key={i} aria-hidden={i >= site.tools.length} className="font-display text-2xl text-muted-foreground/70">{t}</span>
          ))}
        </div>
      </section>
      <Section id="studio-work">
        <SectionHead label="02 — Portfolio" title="Studio work." />
        <div className="mt-12"><PortfolioGrid categories={["AI Films & Commercials", "Product & Brand Visuals", "Book Trailers"]} /></div>
      </Section>
      <FinalCta />
    </>
  );
}
