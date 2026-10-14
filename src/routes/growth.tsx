import { createFileRoute, Link } from "@tanstack/react-router";
import techImg from "@/assets/work-tech.jpg";
import { seo } from "@/lib/seo";
import { growthServices } from "@/content/services";
import { PageHero, Section, SectionHead, ServiceGrid, Steps, btnClass, Reveal } from "@/components/site/primitives";
import { PortfolioGrid } from "@/components/site/Portfolio";
import { FinalCta } from "@/components/site/blocks";

export const Route = createFileRoute("/growth")({
  head: () => seo({ title: "VANTIQ Growth — Brand Strategy & Marketing", description: "Brand positioning, social media management, short-form content, paid campaigns, and reporting from VANTIQ Growth.", path: "/growth" }),
  component: Growth,
});

const pillars = [
  { t: "Positioning", d: "A clear idea of who you serve and why you're the right choice." },
  { t: "Creative consistency", d: "One look and voice, so every post builds on the last." },
  { t: "Distribution", d: "The right formats on the right channels, on a schedule." },
  { t: "Measurement", d: "Honest numbers that tell us what to keep and what to change." },
];

function Growth() {
  return (
    <>
      <PageHero image={techImg} label="VANTIQ Growth" title="Build a Brand People Recognize. Give It Room to Grow." text="Growth works when four things line up: positioning, creative consistency, content distribution, and measurement. We build all four as one system.">
        <Link to="/contact" search={{ type: "Digital Marketing" }} className={btnClass("primary")}>Request a Marketing Proposal</Link>
      </PageHero>
      <Section>
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06} className="bg-background p-7">
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-normal">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <SectionHead label="01 — Services" title="What Growth does." />
        <div className="mt-12"><ServiceGrid items={growthServices} cols={3} ctaTo="/contact" ctaType="Digital Marketing" /></div>
      </Section>
      <Section className="border-t border-border">
        <SectionHead label="02 — Portfolio" title="Growth work." text="We publish case studies only with verified results and client permission." />
        <div className="mt-12"><PortfolioGrid categories={["Social & Marketing Campaigns", "Author Launch Campaigns"]} /></div>
      </Section>
      <Section className="border-t border-border">
        <SectionHead label="03 — Process" title="How we run a growth engagement." />
        <div className="mt-12">
          <Steps steps={[
            { n: "01", title: "Audit and discovery", text: "Where you are today, what's working, and who you're trying to reach." },
            { n: "02", title: "Strategy and creative direction", text: "Positioning, channels, formats, and a content plan." },
            { n: "03", title: "Campaign execution", text: "Production, publishing, community management, and paid media." },
            { n: "04", title: "Review and iteration", text: "Regular reports and adjustments based on what the data shows." },
          ]} />
        </div>
        <Link to="/contact" search={{ type: "Digital Marketing" }} className={btnClass("primary", "mt-10")}>Request a Marketing Proposal</Link>
      </Section>
      <FinalCta />
    </>
  );
}
