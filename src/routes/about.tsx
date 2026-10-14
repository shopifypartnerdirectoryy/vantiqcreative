import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-screen-shelf.jpg";
import { seo } from "@/lib/seo";
import { divisions } from "@/content/services";
import { site, ph } from "@/content/site";
import { PageHero, Section, SectionHead, btnClass } from "@/components/site/primitives";
import { FinalCta } from "@/components/site/blocks";

export const Route = createFileRoute("/about")({
  head: () => seo({ title: "About", description: "VANTIQ CREATIVE is one company working across visual production, strategic growth, and publishing.", path: "/about" }),
  component: About,
});

const principles = [
  { t: "Craft before volume", d: "We'd rather make one thing properly than ten things quickly." },
  { t: "Honest by default", d: "Concepts are labelled, results are verified, prices are written down." },
  { t: "One story, every format", d: "A film, a feed, and a book cover should feel like the same idea." },
  { t: "Built to be used", d: "Everything we deliver comes ready for the places it will live." },
];

function About() {
  const f = site.founder;
  return (
    <>
      <PageHero image={hero} label="About" title="One creative house. Screens and shelves." text="VANTIQ CREATIVE brings visual production, brand growth, and publishing together, because the same skills — story, craft, and attention — sit underneath all three." />
      <Section>
        <SectionHead label="Philosophy" title="Attention is earned, then kept." text="Most brands and authors don't need more content. They need work that looks considered, says one clear thing, and reaches the people who will care. That's what we build." />
      </Section>
      <Section className="border-t border-border">
        <div className="grid gap-6 lg:grid-cols-3">
          {divisions.map((d) => (
            <div key={d.id} className="rounded-xl border border-border bg-surface p-7">
              <p className="eyebrow">{d.name}</p>
              <h3 className="mt-4 text-2xl font-light">{d.headline}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d.text}</p>
              <Link to={d.to} className={btnClass("ghost", "mt-4 px-0")}>{d.cta} →</Link>
            </div>
          ))}
        </div>
      </Section>
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
            {f.photo ? <img src={f.photo} alt={f.name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center font-serif text-3xl text-muted-foreground">Founder</div>}
          </div>
          <div>
            <SectionHead label="Founder" title={ph(f.name) ?? "The founder"} text={ph(f.bio) ?? "Founder profile coming soon."} />
            {ph(f.credentials) && <p className="mt-4 text-sm text-gold">{ph(f.credentials)}</p>}
            {f.socials.length > 0 && <div className="mt-6 flex gap-3">{f.socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={btnClass("outline")}>{s.label}</a>)}</div>}
          </div>
        </div>
      </Section>
      <Section className="border-t border-border">
        <SectionHead label="Principles" title="How we work." />
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {principles.map((p) => <div key={p.t} className="bg-background p-7"><h3 className="text-xl font-normal">{p.t}</h3><p className="mt-2 text-sm text-muted-foreground">{p.d}</p></div>)}
        </div>
        <Link to="/work" className={btnClass("outline", "mt-10")}>See selected work</Link>
      </Section>
      <FinalCta />
    </>
  );
}
