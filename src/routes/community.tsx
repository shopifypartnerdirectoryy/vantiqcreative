import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Users, Sparkles } from "lucide-react";
import { seo } from "@/lib/seo";
import { events } from "@/content/events";
import { PageHero, Section, SectionHead, Reveal, btnClass, EmptyState } from "@/components/site/primitives";
import { NewsletterForm } from "@/components/site/blocks";
import { Consent, Field, FormStatus, Honeypot, SubmitButton, isEmail, useFormSubmit } from "@/components/site/forms";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community")({
  head: () => seo({ title: "The Reader Circle", description: "Join the VANTIQ Reader Circle for new books, sample chapters, author spotlights, and future reading events.", path: "/community" }),
  component: Community,
});

const benefits = [
  { icon: BookOpen, t: "First Look", d: "Sample chapters, previews, and early announcements when available." },
  { icon: Users, t: "The Reading Circle", d: "Optional reading challenges, discussions, and literary activities." },
  { icon: Sparkles, t: "Author Spotlights", d: "Discover featured writers, upcoming releases, and the ideas behind their books." },
];

function Community() {
  const [path, setPath] = useState<"reader" | "author">("reader");
  return (
    <div className="room bg-background">
      <PageHero label="Reader Circle" title="A Reading Circle for Stories Worth Sharing." text="A place to discover books, hear about releases, and learn about the people behind the work. We're just getting started — join early and help shape it.">
        <a href="#join" className={btnClass("solid")}>Join the Reader Circle</a>
      </PageHero>
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="rounded-xl border border-border bg-card p-8">
              <b.icon className="h-6 w-6 text-gold" aria-hidden />
              <h2 className="mt-5 text-2xl font-light">{b.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-surface">
        <SectionHead label="Events & Challenges" title="What's coming up." />
        <div className="mt-10">
          {events.length === 0 ? (
            <EmptyState title="Nothing scheduled just yet" text="Nothing scheduled just yet. Join the mailing list for future announcements." />
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">{events.map((e) => (
              <li key={e.id} className="rounded-xl border border-border bg-card p-6"><p className="eyebrow">{e.kind} · {new Date(e.date).toLocaleDateString()}</p><h3 className="mt-3 text-xl">{e.title}</h3><p className="mt-2 text-sm text-muted-foreground">{e.description}</p></li>
            ))}</ul>
          )}
        </div>
      </Section>

      <Section id="join" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead label="Join" title="Choose your path." text="Occasional notes on new books, sample chapters, creative releases, and opportunities to meet the people behind the work." />
            <div role="tablist" aria-label="Join as" className="mt-8 inline-flex rounded-full border border-border p-1">
              {(["reader", "author"] as const).map((p) => (
                <button key={p} role="tab" aria-selected={path === p} type="button" onClick={() => setPath(p)} className={cn("min-h-11 rounded-full px-6 text-sm capitalize", path === p ? "bg-foreground text-background" : "text-muted-foreground")}>Join as {p === "reader" ? "a Reader" : "an Author"}</button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="rounded-xl border border-border bg-card p-6 md:p-8">
            {path === "reader" ? <NewsletterForm /> : <AuthorForm />}
          </div>
        </div>
      </Section>
    </div>
  );
}

function AuthorForm() {
  const { status, submit } = useFormSubmit();
  const [f, setF] = useState({ name: "", email: "", links: "", bookStatus: "", interest: "" });
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please enter your author name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email address.";
    if (!consent) er.consent = "Please agree so we can contact you.";
    setErr(er);
    if (Object.keys(er).length) return;
    submit({ kind: "author", ...f, consent: true, website: hp });
  };
  if (status === "success") return <FormStatus status="success" success="Thanks for registering. We'll be in touch — nothing about you or your books will be featured without your permission." />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot value={hp} onChange={setHp} />
      <Field id="a-name" label="Author name" required error={err.name}>{(p) => <input {...p} value={f.name} onChange={set("name")} />}</Field>
      <Field id="a-email" label="Email" required error={err.email}>{(p) => <input {...p} type="email" value={f.email} onChange={set("email")} />}</Field>
      <Field id="a-links" label="Website or social links">{(p) => <input {...p} value={f.links} onChange={set("links")} />}</Field>
      <Field id="a-status" label="Book status">{(p) => <select {...p} value={f.bookStatus} onChange={set("bookStatus")}><option value="">Select…</option><option>Writing</option><option>Unpublished manuscript</option><option>Published</option></select>}</Field>
      <Field id="a-interest" label="I'm interested in">{(p) => <select {...p} value={f.interest} onChange={set("interest")}><option value="">Select…</option><option>Being featured in the Library</option><option>VANTIQ Press services</option><option>Both</option></select>}</Field>
      <Consent id="a-consent" checked={consent} onChange={setConsent} error={err.consent}>I agree to VANTIQ CREATIVE contacting me. I understand nothing will be featured without my explicit permission.</Consent>
      <SubmitButton status={status}>Register as an author</SubmitButton>
      <FormStatus status={status} success="" />
    </form>
  );
}
