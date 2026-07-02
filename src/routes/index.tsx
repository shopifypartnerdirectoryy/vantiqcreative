import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Film,
  Play,
  Camera,
  Music2,
  Megaphone,
  Share2,
  Target,
  Lightbulb,
  Zap,
  Award,
  Clock,
  TrendingUp,
  HeartHandshake,
  Layers,
  Infinity as InfinityIcon,
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  Linkedin,
  Instagram,
  ArrowRight,
  Plus,
  Minus,
  Star,
  Heart,
  MessageSquare,
  Bookmark,
  ThumbsUp,
  Repeat2,
  Send,
} from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .55.04.81.11V9.17a6.37 6.37 0 0 0-.81-.05A6.36 6.36 0 0 0 3 15.49a6.36 6.36 0 0 0 6.36 6.36 6.36 6.36 0 0 0 6.36-6.36V8.56a8.15 8.15 0 0 0 4.77 1.54V6.69h-1z" />
    </svg>
  );
}

import heroImg from "@/assets/hero-cinematic.jpg";
import workAuto from "@/assets/work-auto.jpg";
import workFashion from "@/assets/work-fashion.jpg";
import workProduct from "@/assets/work-product.jpg";
import workMotion from "@/assets/work-motion.jpg";
import workMusic from "@/assets/work-music.jpg";
import workTech from "@/assets/work-tech.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VANTIQ CREATIVE — AI Creative Studio & Digital Marketing Agency" },
      { name: "description", content: "Creating the Future of Brand Storytelling. We craft AI commercials, cinematic content, and high-converting digital campaigns for premium brands." },
      { property: "og:title", content: "VANTIQ CREATIVE — AI Creative Studio" },
      { property: "og:description", content: "AI-Powered Creativity. Real Business Results." },
    ],
  }),
  component: Index,
});

/* -------------------------------- Helpers -------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-electric/60" />
      {children}
    </div>
  );
}

/* --------------------------------- Page ---------------------------------- */

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="grain-overlay" />
      <Loader />
      <Nav />
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Transformation />
      <Portfolio />
      <Process />
      <WhyChoose />
      <Stats />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </div>
  );
}

/* ------------------------------- Loader ---------------------------------- */

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ letterSpacing: "0.6em", opacity: 0 }}
              animate={{ letterSpacing: "0.3em", opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-light tracking-[0.3em] text-foreground"
            >
              VANTIQ
            </motion.div>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-electric to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- Nav ----------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = ["Work", "Services", "Process", "About", "Contact"];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-[11px] font-bold text-background">
              V
            </span>
            <span className="font-display text-sm font-medium tracking-[0.25em]">VANTIQ</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="group relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-background transition-all hover:bg-electric hover:text-white"
          >
            Start project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ---------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-end overflow-hidden pb-24 pt-32">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mb-8"
        >
          <SectionLabel>AI Creative Studio · Est. 2026</SectionLabel>
        </motion.div>

        <h1 className="font-display text-[clamp(2.75rem,7.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
          {["The Future of", "Creative Production", "Starts Here."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.9 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {i === 1 ? (
                <span className="italic text-gradient-accent font-extralight">{line}</span>
              ) : (
                <span className="text-gradient">{line}</span>
              )}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="mt-12 grid items-end gap-10 md:grid-cols-[1fr_auto]"
        >
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We create AI commercials, product films, music videos, cinematic trailers and
            performance campaigns that help ambitious brands grow faster — and stand
            unmistakably apart.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-all hover:bg-electric hover:text-white hover:shadow-[var(--shadow-glow)]"
            >
              Start Your Project
              <span className="grid h-7 w-7 place-items-center rounded-full bg-background/10 transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full glass px-6 py-4 text-sm font-medium text-foreground transition-all hover:border-white/20"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground/10">
                <Play className="h-3 w-3 fill-current" />
              </span>
              View Our Work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-24 flex items-center justify-between border-t border-white/10 pt-6 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span>Scroll to explore</span>
          <span className="hidden md:block">VTQ-001 · WORLDWIDE</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-foreground"
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ Trusted By ------------------------------- */

function TrustedBy() {
  const tools = [
    "RUNWAY", "GOOGLE VEO", "MIDJOURNEY", "KLING AI", "PIKA",
    "ELEVENLABS", "ADOBE PREMIERE", "AFTER EFFECTS", "CAPCUT", "CHATGPT",
  ];
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-16">
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
        <SectionLabel>Powered by industry-leading creative tech</SectionLabel>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="marquee flex shrink-0 items-center gap-16 pr-16">
          {[...tools, ...tools].map((t, i) => (
            <span
              key={i}
              className="font-display text-2xl font-light tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-foreground md:text-3xl"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <SectionLabel>01 — Studio</SectionLabel>
        </motion.div>
        <div className="grid gap-16 lg:grid-cols-12">
          <motion.h2
            {...fadeUp}
            className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] lg:col-span-7"
          >
            <span className="text-gradient">Where creativity meets </span>
            <span className="italic text-gradient-accent font-extralight">artificial intelligence.</span>
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:col-span-5 lg:pt-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              At VANTIQ CREATIVE, every brand deserves world-class storytelling. We
              blend AI technology, creative strategy, cinematic production and marketing
              expertise into a single, premium creative engine.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6">
              {[
                { k: "AI", v: "Technology" },
                { k: "Creative", v: "Strategy" },
                { k: "Cinematic", v: "Production" },
                { k: "Marketing", v: "Expertise" },
              ].map((x) => (
                <div key={x.v} className="glass rounded-2xl p-5">
                  <div className="font-display text-2xl font-light">{x.k}</div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Services ------------------------------- */

function Services() {
  const items = [
    { icon: Film, title: "AI Commercial Production", desc: "Cinematic brand films generated through cutting-edge AI pipelines." },
    { icon: Camera, title: "AI Product Videos", desc: "Hero product moments rendered with photoreal precision." },
    { icon: Music2, title: "AI Music Videos", desc: "Visual narratives that turn tracks into cultural moments." },
    { icon: Play, title: "AI Movie & Trailer Production", desc: "Story-driven trailers and short films at studio scale." },
    { icon: Share2, title: "Social Media Content", desc: "Native, scroll-stopping content built per platform." },
    { icon: Megaphone, title: "Social Media Management", desc: "Editorial calendars, community and creative ops." },
    { icon: Target, title: "Digital Marketing", desc: "Performance campaigns engineered for measurable growth." },
    { icon: Lightbulb, title: "Brand Strategy", desc: "Positioning, narrative and identity that compound." },
  ];

  return (
    <section id="services" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <motion.div {...fadeUp}>
            <SectionLabel>02 — Capabilities</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
              An end-to-end<br />creative engine.
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="max-w-md text-muted-foreground">
            Eight disciplines, one studio. Built for brands who want strategy,
            production and performance under a single creative roof.
          </motion.p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-ink p-8 transition-colors hover:bg-charcoal"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/0 blur-3xl transition-all duration-700 group-hover:bg-electric/20" />
              <div className="relative flex h-full flex-col">
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-electric group-hover:bg-electric/10">
                    <it.icon className="h-4 w-4 transition-colors group-hover:text-electric" />
                  </div>
                </div>
                <h3 className="mb-3 font-display text-xl font-medium leading-tight">{it.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                <div className="mt-10 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-electric">
                  Explore
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------- Transformation (Before/After) -------------------- */

function Transformation() {
  const platforms = [
    {
      name: "Instagram",
      handle: "@northwave.studio",
      icon: Instagram,
      before: { vibe: "Generic feed, inconsistent crops, washed-out colors.", color: "#A0A0A0" },
      after: { vibe: "Editorial grid, signature palette, considered typography.", color: "#3B82F6" },
    },
    {
      name: "TikTok",
      handle: "@northwave",
      icon: Play,
      before: { vibe: "Random captions, no hook structure, low watch-time.", color: "#A0A0A0" },
      after: { vibe: "Hook-driven openers, branded captions, 3.4× retention.", color: "#3B82F6" },
    },
    {
      name: "LinkedIn",
      handle: "Northwave Studio",
      icon: Linkedin,
      before: { vibe: "Press releases, stock photography, no thought leadership.", color: "#A0A0A0" },
      after: { vibe: "Founder POV, native carousels, 6× engaged reach.", color: "#3B82F6" },
    },
    {
      name: "YouTube",
      handle: "Northwave",
      icon: Play,
      before: { vibe: "Forgettable thumbnails, weak titles, flat CTR.", color: "#A0A0A0" },
      after: { vibe: "Cinematic thumbnails, structured series, +210% CTR.", color: "#3B82F6" },
    },
  ];

  return (
    <section id="transformation" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-20 max-w-3xl">
          <SectionLabel>03 — Showcase</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
            <span className="text-gradient">From ordinary </span>
            <span className="italic text-gradient-accent font-extralight">to iconic.</span>
          </h2>
          <p className="mt-8 max-w-xl text-muted-foreground">
            See how strategic creative direction and branded content transform
            social performance — across every platform that matters.
          </p>
        </motion.div>

        <div className="space-y-20">
          {platforms.map((p, i) => (
            <BeforeAfter key={p.name} platform={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({
  platform,
  index,
}: {
  platform: {
    name: string;
    handle: string;
    icon: React.ComponentType<{ className?: string }>;
    before: { vibe: string };
    after: { vibe: string };
  };
  index: number;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const Icon = platform.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 lg:grid-cols-[1fr_2fr]"
    >
      <div className="space-y-5">
        <span className="font-mono text-xs text-muted-foreground">
          0{index + 1} / Platform
        </span>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl glass">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-3xl font-medium">{platform.name}</h3>
            <p className="text-sm text-muted-foreground">{platform.handle}</p>
          </div>
        </div>
        <div className="space-y-3 pt-3 text-sm">
          <div className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground/60" />
            <p className="text-muted-foreground"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">Before · </span>{platform.before.vibe}</p>
          </div>
          <div className="flex gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-electric shadow-[0_0_12px_var(--electric)]" />
            <p className="text-foreground"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric">After · </span>{platform.after.vibe}</p>
          </div>
        </div>
        <p className="pt-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          ← Drag to compare →
        </p>
      </div>

      <div
        ref={ref}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        className="relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-3xl border border-white/10 select-none"
      >
        {/* AFTER (background, full) */}
        <div className="absolute inset-0">
          <FakeFeed platform={platform.name} variant="after" handle={platform.handle} />
        </div>
        {/* BEFORE (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <FakeFeed platform={platform.name} variant="before" handle={platform.handle} />
        </div>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-gradient-to-b from-transparent via-electric to-transparent shadow-[0_0_20px_var(--electric)]" />
          <div className="absolute top-1/2 -ml-5 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full glass-strong text-foreground shadow-[var(--shadow-glow)]">
            <div className="flex">
              <ArrowRight className="h-3 w-3 rotate-180 -mr-1" />
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute left-4 top-4 z-10 rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Before
        </span>
        <span className="absolute right-4 top-4 z-10 rounded-full bg-electric/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
          After
        </span>
      </div>
    </motion.div>
  );
}

function FakeFeed({
  platform,
  variant,
  handle,
}: {
  platform: string;
  variant: "before" | "after";
  handle: string;
}) {
  const isAfter = variant === "after";
  const isInsta = platform === "Instagram";
  const isLi = platform === "LinkedIn";
  const isTt = platform === "TikTok";

  const bg = isAfter ? "bg-ink" : "bg-[#0d0d10]";
  const accentTxt = isAfter ? "text-foreground" : "text-muted-foreground/70";

  // Instagram-style grid
  if (isInsta || (!isLi && !isTt)) {
    const tiles = isAfter
      ? [workFashion, workProduct, workMotion, workAuto, workMusic, workTech, workFashion, workProduct, workMotion]
      : null;
    return (
      <div className={`flex h-full w-full flex-col ${bg}`}>
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-full ${isAfter ? "bg-gradient-to-br from-electric to-purple-500" : "bg-white/20"}`} />
            <div>
              <div className={`text-xs font-medium ${accentTxt}`}>{handle.replace("@", "")}</div>
              <div className="text-[9px] text-muted-foreground">{isAfter ? "Creative Studio · Worldwide" : "Brand · Local"}</div>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{platform}</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-0.5 p-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden bg-white/5">
              {isAfter && tiles ? (
                <img src={tiles[i]} alt="" className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(${i * 40}deg, #1a1a1a, #2a2a2a)`,
                  }}
                />
              )}
              {isAfter && i === 0 && (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-2">
                  <div className="font-display text-[10px] font-medium text-white">SS26 Collection</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // LinkedIn-style post
  if (isLi) {
    return (
      <div className={`flex h-full w-full flex-col ${bg} p-6`}>
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className={`h-12 w-12 rounded-full ${isAfter ? "bg-gradient-to-br from-electric to-purple-500" : "bg-white/15"}`} />
          <div>
            <div className={`text-sm font-medium ${accentTxt}`}>{handle}</div>
            <div className="text-[10px] text-muted-foreground">{isAfter ? "Creative Studio · 12,400 followers" : "Company · 320 followers"}</div>
            <div className="text-[10px] text-muted-foreground">2h · 🌐</div>
          </div>
        </div>
        <div className="space-y-3 py-4">
          {isAfter ? (
            <>
              <p className="text-sm text-foreground">
                Most brands chase trends. The strongest ones <span className="text-electric">build their own gravity.</span>
              </p>
              <p className="text-xs text-muted-foreground">Here's the framework we use with founders ↓</p>
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground/80">
                We are pleased to announce our Q3 results. Please find attached the
                press release for further information regarding our quarterly...
              </p>
            </>
          )}
        </div>
        <div className={`relative flex-1 overflow-hidden rounded-xl ${isAfter ? "" : "bg-white/5"}`}>
          {isAfter ? (
            <img src={workMotion} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center text-[10px] text-muted-foreground">[ attached.pdf ]</div>
          )}
        </div>
        <div className="mt-3 flex items-center gap-5 border-t border-white/5 pt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {isAfter ? "2,431" : "12"}</span>
          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {isAfter ? "284" : "1"}</span>
          <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3" /> {isAfter ? "192" : "0"}</span>
          <span className="flex items-center gap-1"><Send className="h-3 w-3" /> {isAfter ? "Share" : "Share"}</span>
        </div>
      </div>
    );
  }

  // TikTok-style vertical
  return (
    <div className={`flex h-full w-full ${bg}`}>
      {[0, 1, 2].map((col) => (
        <div key={col} className="relative flex-1 border-r border-white/5 last:border-r-0">
          <div className="absolute inset-0">
            {isAfter ? (
              <img
                src={[workMusic, workFashion, workAuto][col]}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="mb-2 text-[10px] font-medium text-white">
              {isAfter ? ["Behind the campaign 🎬", "Director's cut ✦", "How we shot this →"][col] : "untitled clip"}
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-white/80">
              <Heart className="h-3 w-3" fill="currentColor" />
              <span>{isAfter ? ["482K", "291K", "1.2M"][col] : ["12", "8", "4"][col]}</span>
            </div>
          </div>
          <div className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-white/10 text-[8px] text-white">
            {isAfter ? "★" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Portfolio -------------------------------- */

function Portfolio() {
  const cats = ["All", "AI Commercials", "Product", "Music Videos", "Trailers", "Social", "Brand", "Motion"];
  const [active, setActive] = useState("All");
  const projects = [
    { img: workAuto, title: "Phantom GT", client: "Aurinox Motors", tag: "AI Commercials", result: "+340% recall", tool: "Veo · Runway" },
    { img: workFashion, title: "SS26 Edition", client: "Maison Noir", tag: "Brand", result: "Vogue feature", tool: "Midjourney" },
    { img: workProduct, title: "Lauron Parfum", client: "Lauron Paris", tag: "Product", result: "$2.1M launch", tool: "Kling · Pika" },
    { img: workMotion, title: "Liquid Identity", client: "Vertex Labs", tag: "Motion", result: "Awwwards SOTD", tool: "After Effects" },
    { img: workMusic, title: "Echoes", client: "ALYX", tag: "Music Videos", result: "12M views", tool: "Runway · CapCut" },
    { img: workTech, title: "OS Reveal", client: "Northbyte", tag: "AI Commercials", result: "Trending #1", tool: "Veo · CapCut" },
  ];

  const filtered = active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <section id="work" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <motion.div {...fadeUp}>
            <SectionLabel>04 — Selected Work</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
              The portfolio.
            </h2>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                  active === c
                    ? "bg-foreground text-background"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.a
                layout
                key={p.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block overflow-hidden rounded-2xl bg-white/5"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                    <span className="rounded-full glass px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.tag}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full glass text-foreground transition-all duration-500 group-hover:bg-electric group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.client}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-medium leading-tight">{p.title}</h3>
                    <div className="mt-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.15em]">
                      <span className="text-electric">{p.result}</span>
                      <span className="text-muted-foreground">{p.tool}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Process -------------------------------- */

function Process() {
  const steps = [
    { n: "01", t: "Discovery", d: "We immerse in your brand, market, and audience to surface the real opportunity." },
    { n: "02", t: "Strategy", d: "A clear creative direction, narrative architecture and channel plan." },
    { n: "03", t: "AI Production", d: "World-class AI pipelines turn vision into cinematic footage." },
    { n: "04", t: "Post Production", d: "Color, sound design, motion and edit — engineered for impact." },
    { n: "05", t: "Review", d: "Refinement rounds tuned for performance, not just polish." },
    { n: "06", t: "Launch", d: "Roll-out across paid, owned and earned with measurement built in." },
  ];
  return (
    <section id="process" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <SectionLabel>05 — Process</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
            How we build.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <div className="relative mb-6 grid h-12 w-12 place-items-center rounded-full glass-strong">
                  <span className="font-mono text-xs text-electric">{s.n}</span>
                  <span className="absolute inset-0 -z-10 rounded-full bg-electric/10 blur-xl" />
                </div>
                <h3 className="font-display text-xl font-medium">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why Choose ------------------------------- */

function WhyChoose() {
  const items = [
    { i: Sparkles, t: "AI-First Production", d: "Native AI pipelines built into every project, not bolted on." },
    { i: Award, t: "Luxury Visual Quality", d: "Editorial-grade craft across film, design and motion." },
    { i: Zap, t: "Fast Turnaround", d: "Production cycles measured in days, not months." },
    { i: Lightbulb, t: "Creative Strategy", d: "Concepts rooted in cultural insight and brand truth." },
    { i: Target, t: "Marketing Expertise", d: "Performance thinking baked into the creative." },
    { i: TrendingUp, t: "Business Results", d: "Measurable lift on awareness, conversion and retention." },
    { i: Layers, t: "Premium Storytelling", d: "Narratives that feel like cinema, not content." },
    { i: InfinityIcon, t: "Scalable Content", d: "One core idea, infinite native cut-downs per channel." },
    { i: HeartHandshake, t: "Dedicated Support", d: "A senior team that picks up the phone." },
  ];
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <SectionLabel>06 — Why VANTIQ</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
            Nine reasons<br />we get hired.
          </h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((x, i) => (
            <motion.div
              key={x.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="group glass rounded-2xl p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-foreground/5 text-foreground transition-all duration-500 group-hover:bg-electric/15 group-hover:text-electric">
                <x.i className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-medium">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Stats --------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1800;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Stats() {
  const items = [
    { v: 250, s: "+", l: "Projects Delivered" },
    { v: 75, s: "+", l: "Clients Worldwide" },
    { v: 20, s: "M+", l: "Content Views" },
    { v: 98, s: "%", l: "Client Satisfaction" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-24">
      <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "var(--gradient-cinematic)" }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.l}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <div className="font-display text-6xl font-light tracking-tight md:text-7xl text-gradient">
              <Counter to={it.v} suffix={it.s} />
            </div>
            <div className="mt-3 text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
              {it.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ------------------------------ */

function Testimonials() {
  const items = [
    {
      img: avatar1,
      name: "Sofia Renault",
      role: "CMO, Maison Noir",
      industry: "Luxury Fashion",
      q: "VANTIQ delivered a campaign that felt indistinguishable from Saint Laurent — at a fraction of the timeline. They've become a true creative partner.",
    },
    {
      img: avatar2,
      name: "Marcus Hale",
      role: "Founder, Northbyte",
      industry: "SaaS",
      q: "Our product reveal hit #1 trending in 36 hours. The AI-driven workflow let us iterate creative weekly. A serious unfair advantage.",
    },
    {
      img: avatar3,
      name: "Amara Okafor",
      role: "Brand Director, Lauron Paris",
      industry: "Fragrance",
      q: "Every frame felt curated. The team blends cinematic craft with marketing rigor — rare and exactly what our category required.",
    },
  ];
  const [i, setI] = useState(0);
  return (
    <section id="testimonials" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mb-16 flex items-end justify-between gap-6">
          <div>
            <SectionLabel>07 — Words</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
              From our clients.
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => setI((i - 1 + items.length) % items.length)}
              className="grid h-12 w-12 place-items-center rounded-full glass transition-colors hover:text-electric"
            >
              ←
            </button>
            <button
              onClick={() => setI((i + 1) % items.length)}
              className="grid h-12 w-12 place-items-center rounded-full glass transition-colors hover:text-electric"
            >
              →
            </button>
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 rounded-3xl glass-strong p-10 md:grid-cols-[auto_1fr] md:p-16"
            >
              <div className="flex md:flex-col md:items-start items-center gap-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                  <img src={items[i].img} alt={items[i].name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div>
                  <div className="font-display text-lg">{items[i].name}</div>
                  <div className="text-xs text-muted-foreground">{items[i].role}</div>
                  <div className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {items[i].industry}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-electric text-electric" />
                  ))}
                </div>
                <p className="font-display text-2xl font-light leading-snug text-gradient md:text-4xl">
                  "{items[i].q}"
                </p>
                <div className="flex gap-2 pt-4">
                  {items.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      className={`h-1 transition-all duration-500 ${
                        k === i ? "w-12 bg-electric" : "w-6 bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ ---------------------------------- */

function FAQ() {
  const items = [
    { q: "What industries do you work with?", a: "Luxury, fashion, automotive, tech, music, hospitality, fragrance, fintech and ambitious consumer startups. If craft and growth both matter to you, we're a fit." },
    { q: "What AI tools do you use?", a: "Runway, Google Veo, Midjourney, Kling AI, Pika, ElevenLabs and a custom stack tied into Premiere, After Effects and CapCut for finishing." },
    { q: "How long does a project take?", a: "Hero films: 2–4 weeks. Social campaigns: 5–10 days. Always-on retainers ship weekly. Rush windows available on request." },
    { q: "Can you manage social media end-to-end?", a: "Yes — strategy, calendar, production, copy, community and reporting. We act as your in-house team, just faster and sharper." },
    { q: "Do you offer retainers?", a: "Most partners run monthly retainers tailored to volume and channels. We also take on standalone hero projects." },
    { q: "Do you work internationally?", a: "We're remote-first and serve brands across North America, Europe, the Middle East and Asia." },
    { q: "How many revisions are included?", a: "Two structured rounds per deliverable. Most projects land in one — our briefing process is built to minimize churn." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp} className="mb-16">
          <SectionLabel>08 — Questions</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
            Things worth asking.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="grid grid-cols-[auto_1fr] items-center gap-6">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="font-display text-lg font-medium transition-colors group-hover:text-electric md:text-xl">
                      {it.q}
                    </span>
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full glass">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-12 pr-12 text-muted-foreground leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA ------------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.30 0.15 250 / 0.4), transparent 65%)" }}
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div {...fadeUp}>
          <SectionLabel>09 — Let's collaborate</SectionLabel>
        </motion.div>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.95] tracking-[-0.03em]"
        >
          <span className="text-gradient">Let's build something </span>
          <span className="italic text-gradient-accent font-extralight">remarkable.</span>
        </motion.h2>
        <motion.p {...fadeUp} className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground">
          Whether you're launching a brand, producing a campaign, or scaling online growth —
          VANTIQ CREATIVE transforms ideas into premium experiences.
        </motion.p>
        <motion.div {...fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:bg-electric hover:text-white hover:shadow-[var(--shadow-glow)]"
          >
            Start Your Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full glass-strong px-7 py-4 text-sm font-medium text-foreground transition-all hover:border-white/20"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact -------------------------------- */

function Contact() {
  const channels = [
    { i: Mail, l: "Email", v: "vantiqcreative@gmail.com", h: "mailto:vantiqcreative@gmail.com" },
    { i: Phone, l: "Phone", v: "+1 (786) 480-0071", h: "tel:+17864800071" },
    { i: Linkedin, l: "LinkedIn", v: "Vantiqcreative", h: "https://www.linkedin.com/company/vantiqcreativeare" },
    { i: Instagram, l: "Instagram", v: "@vantiqcreative", h: "https://www.instagram.com/vantiqcreative" },
    { i: TikTokIcon, l: "TikTok", v: "@vantiqcreative", h: "https://www.tiktok.com/@vantiqcreative" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <motion.div {...fadeUp} className="space-y-10">
          <div>
            <SectionLabel>10 — Contact</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1] tracking-[-0.02em] text-gradient">
              Tell us about<br />your project.
            </h2>
          </div>
          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.l}
                href={c.h}
                className="group flex items-center justify-between gap-4 border-t border-white/10 py-4 last:border-b transition-colors hover:text-electric"
              >
                <div className="flex items-center gap-4">
                  <c.i className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-electric" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.l}</span>
                </div>
                <span className="font-display text-base font-medium">{c.v}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 rounded-3xl glass-strong p-8 md:p-10"
        >
          <Field label="Name" name="name" placeholder="Your full name" />
          <Field label="Email" name="email" type="email" placeholder="you@brand.com" />
          <Field label="Company" name="company" placeholder="Brand or studio name" />
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2">
              {["Commercial", "Product", "Music Video", "Social", "Retainer"].map((t) => (
                <label
                  key={t}
                  className="cursor-pointer rounded-full glass px-3 py-1.5 text-xs text-muted-foreground transition-colors has-checked:bg-electric has-checked:text-white"
                >
                  <input type="radio" name="ptype" className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Brief
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about the brand, ambition, and timing."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-electric focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground py-4 text-sm font-medium text-background transition-all hover:bg-electric hover:text-white hover:shadow-[var(--shadow-glow)]"
          >
            Send Project Brief
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <p className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3" /> We reply within one business day.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-electric focus:outline-none"
      />
    </div>
  );
}

/* --------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h3 className="font-display text-[clamp(3rem,12vw,11rem)] font-extralight leading-[0.9] tracking-[-0.04em] shimmer-text">
            VANTIQ
          </h3>
        </div>
        <div className="grid gap-10 border-t border-white/10 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="max-w-sm text-sm text-muted-foreground">
              Creating the Future of Brand Storytelling. An AI creative studio &
              digital marketing partner for premium brands.
            </p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Navigate</div>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Portfolio", "Process"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-foreground/80 transition-colors hover:text-electric">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">More</div>
            <ul className="space-y-2 text-sm">
              {["Testimonials", "FAQ", "Contact", "Privacy", "Terms"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-foreground/80 transition-colors hover:text-electric">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <span>© 2026 VANTIQ CREATIVE. All Rights Reserved.</span>
          <div className="flex items-center gap-5">
            <a href="https://www.instagram.com/vantiqcreative" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">IG</a>
            <a href="https://www.linkedin.com/company/vantiqcreativeare" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LI</a>
            <a href="https://www.tiktok.com/@vantiqcreative" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">TT</a>
          </div>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_10px_var(--electric)]" />
            Available for new projects · Q1 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
