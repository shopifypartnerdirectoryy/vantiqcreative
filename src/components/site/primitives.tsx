import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHead({ label, title, text, className }: { label: string; title: ReactNode; text?: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02]">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>}
    </Reveal>
  );
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">{children}</div>
    </section>
  );
}

const btn = {
  base: "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none",
  primary: "bg-gold text-gold-foreground hover:brightness-110",
  solid: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-foreground/25 text-foreground hover:border-gold hover:text-gold",
  ghost: "text-foreground underline-offset-4 hover:text-gold hover:underline px-2",
};
export type BtnVariant = "primary" | "solid" | "outline" | "ghost";
export const btnClass = (v: BtnVariant = "primary", extra?: string) => cn(btn.base, btn[v], extra);

export function ButtonLink({ variant = "primary", className, ...props }: ComponentProps<typeof Link> & { variant?: BtnVariant }) {
  return <Link {...props} className={btnClass(variant, className as string)} />;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground", className)}>
      {children}
    </span>
  );
}

export function EmptyState({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center">
      <h3 className="text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}

export function PageHero({ label, title, text, children, image }: { label: string; title: ReactNode; text: ReactNode; children?: ReactNode; image?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" width={1600} height={1000} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <Eyebrow>{label}</Eyebrow>
        <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.98]">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{text}</p>
        {children && <div className="mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function ServiceGrid({ items, cols = 4, ctaTo, ctaType }: { items: { title: string; text: string; image?: string }[]; cols?: 3 | 4; ctaTo: "/contact"; ctaType: string }) {
  return (
    <div className={cn("grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2", cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((s, i) => (
        <article key={s.title} className="group flex flex-col bg-background">
          {s.image && (
            <div className="aspect-[16/10] overflow-hidden">
              <img src={s.image} alt="" loading="lazy" width={800} height={500} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-xl font-normal leading-snug">{s.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <Link to={ctaTo} search={{ type: ctaType, service: s.title }} className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-foreground hover:text-gold">
              Enquire <span aria-hidden className="ml-2">→</span>
              <span className="sr-only"> about {s.title}</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Steps({ steps }: { steps: { n: string; title: string; text: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {steps.map((s) => (
        <li key={s.n} className="bg-background p-7">
          <span className="font-mono text-sm text-gold">{s.n}</span>
          <h3 className="mt-4 text-xl font-normal">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
