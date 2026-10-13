import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { bundleItems } from "@/content/packages";
import { site, ph } from "@/content/site";
import { Section, btnClass, Reveal, Eyebrow } from "./primitives";
import { Consent, Field, FormStatus, Honeypot, SubmitButton, isEmail, useFormSubmit } from "./forms";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`f${i}`} className="border-0">
          <AccordionTrigger className="py-6 text-left font-display text-lg font-normal hover:no-underline md:text-xl">{f.q}</AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function BundleBuilder() {
  const [picked, setPicked] = useState<string[]>([]);
  const navigate = useNavigate();
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const selected = bundleItems.filter((b) => picked.includes(b.id));
  const priced = selected.every((s) => s.price);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <fieldset>
        <legend className="sr-only">Choose deliverables</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {bundleItems.map((b) => {
            const on = picked.includes(b.id);
            return (
              <label key={b.id} className={cn("flex min-h-20 cursor-pointer items-center gap-4 rounded-lg border p-5 transition", on ? "border-gold bg-gold/10" : "border-border hover:border-foreground/30")}>
                <input type="checkbox" className="sr-only peer" checked={on} onChange={() => toggle(b.id)} />
                <span aria-hidden className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-ring", on ? "border-gold bg-gold text-gold-foreground" : "border-border")}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{b.label}</span>
                  <span className="text-xs text-muted-foreground">{b.price ?? "Request a quote"}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <aside aria-live="polite" className="rounded-lg border border-border bg-surface p-6">
        <Eyebrow>Your package</Eyebrow>
        {selected.length === 0 ? (
          <p className="mt-5 text-sm text-muted-foreground">Select one or more deliverables to build your Screen + Shelf package.</p>
        ) : (
          <ul className="mt-5 space-y-2 text-sm">
            {selected.map((s) => (
              <li key={s.id} className="flex justify-between gap-4 border-b border-border pb-2"><span>{s.label}</span><span className="text-muted-foreground">{s.price ?? "Quote"}</span></li>
            ))}
          </ul>
        )}
        <p className="mt-5 text-xs text-muted-foreground">{selected.length > 0 && !priced ? "Final pricing depends on scope — we'll send a written estimate." : "\u00a0"}</p>
        <button type="button" disabled={selected.length === 0}
          onClick={() => navigate({ to: "/contact", search: { type: "Book Publishing & Promotion", bundle: picked.join(",") } })}
          className={btnClass("primary", "mt-4 w-full")}>
          Request a package estimate
        </button>
      </aside>
    </div>
  );
}

export function FinalCta() {
  const availability = ph(site.availability);
  return (
    <Section className="border-t border-border">
      <Reveal className="mx-auto max-w-3xl text-center">
        {availability && <p className="eyebrow">{availability}</p>}
        <h2 className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.02]">Have an idea worth bringing to life?</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className={btnClass("primary")}>Start a Project</Link>
          <Link to="/press" hash="submit" className={btnClass("outline")}>Publishing Enquiry</Link>
        </div>
      </Reveal>
    </Section>
  );
}

const genrePrefs = ["Self-Help & Mindset", "Dark Psychology & Influence", "AI & Future Tech", "Thriller & Mystery", "Romance & Fiction", "Business & Marketing"];

export function NewsletterForm({ compact }: { compact?: boolean }) {
  const { status, submit } = useFormSubmit();
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!isEmail(email)) er.email = "Enter a valid email address.";
    if (!consent) er.consent = "Please confirm you'd like to receive emails.";
    setErrors(er);
    if (Object.keys(er).length) return;
    submit({ kind: "newsletter", email, preferences: prefs, consent: true, website: hp });
  };

  if (status === "success") return <FormStatus status={status} success="You're on the list. We'll be in touch when there's something worth sharing." />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot value={hp} onChange={setHp} />
      <Field id="nl-email" label="Email" required error={errors.email}>
        {(p) => <input {...p} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
      </Field>
      {!compact && (
        <fieldset>
          <legend className="text-sm font-medium">Genres you enjoy <span className="text-xs text-muted-foreground">(optional)</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {genrePrefs.map((g) => {
              const on = prefs.includes(g);
              return (
                <button key={g} type="button" aria-pressed={on} onClick={() => setPrefs((p) => (on ? p.filter((x) => x !== g) : [...p, g]))}
                  className={cn("min-h-10 rounded-full border px-3 text-xs", on ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground")}>{g}</button>
              );
            })}
          </div>
        </fieldset>
      )}
      <Consent id="nl-consent" checked={consent} onChange={setConsent} error={errors.consent}>
        I'd like to receive occasional emails from VANTIQ CREATIVE. I can unsubscribe at any time. See the <Link to="/privacy" className="underline">privacy policy</Link>.
      </Consent>
      <SubmitButton status={status}>Join the list</SubmitButton>
      <FormStatus status={status} success="" />
    </form>
  );
}
