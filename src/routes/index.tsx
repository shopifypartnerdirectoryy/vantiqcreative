import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-screen-shelf.jpg";
import { divisions } from "@/content/services";
import { visibleBooks } from "@/content/books";
import { homeFaqs } from "@/content/faqs";
import { site, ph } from "@/content/site";
import { seo, jsonLd } from "@/lib/seo";
import { Eyebrow, Reveal, Section, SectionHead, Steps, btnClass, EmptyState } from "@/components/site/primitives";
import { BundleBuilder, FaqList, FinalCta } from "@/components/site/blocks";
import { BookCard } from "@/components/site/books";
import { PortfolioGrid } from "@/components/site/Portfolio";

export const Route = createFileRoute("/")({
  head: () => {
    const h = seo({ title: "Every Story Deserves a Screen and a Shelf", description: "VANTIQ CREATIVE is a creative house for AI films and commercials, brand growth, and book promotion — Studio, Growth, and Press.", path: "/" });
    return {
      ...h,
      meta: [{ title: "VANTIQ CREATIVE — Every Story Deserves a Screen and a Shelf" }, ...h.meta.slice(1)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, email: site.email, telephone: "+1-786-480-0071", sameAs: site.socials.map((s) => s.href) })],
    };
  },
  component: Home,
});

function Home() {
  const books = visibleBooks().slice(0, 10);
  const founder = site.founder;
  return (
    <>
      {/* 01 Hero */}
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img src={hero} alt="" aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-70" width={1600} height={1008} fetchPriority="high" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/20" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />
        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-36 md:px-8">
          <Eyebrow>VANTIQ CREATIVE — Studio · Growth · Press</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,7rem)] font-light leading-[0.95]">
            Every Story Deserves<br />a <em className="font-serif not-italic text-gold">Screen</em> and a <em className="font-serif not-italic text-gold">Shelf</em>.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We turn ideas into cinematic experiences, build brands that earn attention, and bring books to the readers who will remember them.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link to="/contact" className={btnClass("primary")}>Start a Project</Link>
            <Link to="/library" className={btnClass("outline")}>Explore the Bookshelf</Link>
            <a href="#divisions" className={btnClass("ghost")}>Meet the Three Divisions ↓</a>
          </div>
        </div>
      </section>

      {/* 02 Divisions */}
      <Section id="divisions">
        <SectionHead label="02 — The Divisions" title="Three disciplines. One creative house." text="Studio and Growth bring ideas to screens. Press brings books and authors to readers." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {divisions.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08}>
              <Link to={d.to} className={`group block overflow-hidden rounded-xl border border-border ${d.id === "press" ? "room" : "bg-surface"}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.image} alt="" loading="lazy" width={800} height={600} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="bg-background p-7">
                  <p className="eyebrow">{d.n} — {d.name}</p>
                  <h3 className="mt-4 text-2xl font-light">{d.headline}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                  <span className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold group-hover:text-gold">{d.cta} →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 03 Bundle */}
      <Section className="border-y border-border bg-surface">
        <SectionHead label="03 — Screen + Shelf" title="Build a launch package for your book." text="Pick the pieces you need. We'll come back with one coordinated plan and a written estimate." />
        <div className="mt-12"><BundleBuilder /></div>
      </Section>

      {/* 04 Bookshelf */}
      <div className="room">
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="04 — Real books by real authors" title="Real books by real authors." />
            <Link to="/library" className={btnClass("outline")}>Explore the Library</Link>
          </div>
          {books.length ? (
            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {books.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          ) : (
            <div className="mt-12"><EmptyState title="The first titles are on their way" text="Our books will appear here as soon as they're ready to share."><Link to="/community" className={btnClass("outline")}>Get notified</Link></EmptyState></div>
          )}
        </Section>
      </div>

      {/* 05 Work */}
      <Section>
        <SectionHead label="05 — Selected Work" title="Recent frames." text="Concept pieces are labelled as concepts. Client work appears only with permission." />
        <div className="mt-12"><PortfolioGrid categories={["AI Films & Commercials", "Product & Brand Visuals", "Social & Marketing Campaigns", "Book Trailers"]} limit={6} /></div>
      </Section>

      {/* 06 Process */}
      <Section className="border-t border-border">
        <SectionHead label="06 — Our Process" title="How a project moves." />
        <div className="mt-12">
          <Steps steps={[
            { n: "01", title: "Discover the brief", text: "We learn what you're making, who it's for, and what success looks like." },
            { n: "02", title: "Define the direction", text: "Concept, tone, and scope agreed in writing before production starts." },
            { n: "03", title: "Produce and refine", text: "We make the work and review it with you in planned rounds." },
            { n: "04", title: "Deliver and build momentum", text: "Final assets handed over, with a plan for putting them to work." },
          ]} />
        </div>
        <Link to="/process" className={btnClass("ghost", "mt-8")}>See the full process →</Link>
      </Section>

      {/* 07 Founder */}
      <Section className="border-t border-border">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
            {founder.photo ? <img src={founder.photo} alt={founder.name} className="h-full w-full object-cover" loading="lazy" /> : (
              <div className="grid h-full place-items-center p-10 text-center font-serif text-3xl text-muted-foreground">VANTIQ<br />CREATIVE</div>
            )}
          </div>
          <div>
            <Eyebrow>07 — The Founder</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">One person's conviction: a story should look as good as it reads.</h2>
            {ph(founder.name) && <p className="mt-6 text-lg">{ph(founder.name)}</p>}
            {ph(founder.credentials) && <p className="text-sm text-gold">{ph(founder.credentials)}</p>}
            <p className="mt-5 text-muted-foreground">
              {ph(founder.bio) ?? "VANTIQ CREATIVE was founded on the idea that films, brands, and books share the same job — getting the right people to pay attention and remember. Studio makes the images, Growth puts them in front of an audience, and Press does the same for authors."}
            </p>
            <Link to="/about" className={btnClass("outline", "mt-8")}>About VANTIQ</Link>
          </div>
        </div>
      </Section>

      {/* 08 FAQ */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead label="08 — Questions" title="Good to know." />
          <FaqList items={homeFaqs} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
