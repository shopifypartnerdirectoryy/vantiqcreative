import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { processSteps, ph } from "@/content/site";
import { PageHero, Section, SectionHead, btnClass } from "@/components/site/primitives";

export const Route = createFileRoute("/process")({
  head: () => seo({ title: "How We Work", description: "The VANTIQ CREATIVE process: discovery, direction, production, refinement, delivery, and next steps.", path: "/process" }),
  component: () => (
    <>
      <PageHero label="Process" title="A clear path from brief to delivery." text="Every Studio, Growth, and Press project follows the same six stages, so you always know what's happening and what comes next." />
      <Section>
        <ol className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
          {processSteps.map((s) => (
            <li key={s.n} className="grid gap-4 bg-background p-7 md:grid-cols-[80px_1.2fr_1fr_1fr] md:items-baseline">
              <span className="font-mono text-gold">{s.n}</span>
              <div><h2 className="text-2xl font-light">{s.title}</h2><p className="mt-2 text-sm text-muted-foreground">{s.text}</p></div>
              <p className="text-sm"><span className="eyebrow block">Timeline</span>{s.timeline}</p>
              <p className="text-sm"><span className="eyebrow block">Deliverables</span>{ph(s.deliverables) ?? s.deliverables.replace(/\[[^\]]+\]\s*/g, "Agreed ")}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="border-t border-border">
        <SectionHead label="Start here" title="Pick your starting point." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Studio", d: "Films, commercials, and visuals.", type: "AI Film & Commercials" },
            { t: "Growth", d: "Strategy, social, and campaigns.", type: "Digital Marketing" },
            { t: "Press", d: "Author services and book launches.", type: "Book Publishing & Promotion" },
          ].map((p) => (
            <div key={p.t} className="rounded-xl border border-border bg-surface p-7">
              <h3 className="text-2xl font-light">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              <Link to="/contact" search={{ type: p.type }} className={btnClass("outline", "mt-6")}>Start a {p.t} enquiry</Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  ),
});
