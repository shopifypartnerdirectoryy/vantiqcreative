import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import reading from "@/assets/press-reading-room.jpg";
import { seo } from "@/lib/seo";
import { pressServices, pressDisclaimer } from "@/content/services";
import { pressPackages } from "@/content/packages";
import { budgetRanges } from "@/content/site";
import { PageHero, Section, SectionHead, ServiceGrid, Steps, btnClass } from "@/components/site/primitives";
import { BundleBuilder } from "@/components/site/blocks";
import { Consent, Field, FormStatus, Honeypot, SubmitButton, isEmail, useFormSubmit } from "@/components/site/forms";

export const Route = createFileRoute("/press")({
  head: () => seo({ title: "VANTIQ Press — Author Services & Book Promotion", description: "Book covers, trailers, author branding, websites, and launch campaigns for independent and published authors.", path: "/press" }),
  component: Press,
});

function Press() {
  return (
    <div className="room bg-background">
      <PageHero image={reading} label="VANTIQ Press" title="Bring Your Book Into the Right Hands." text="We help authors present their work well and promote it with care — covers, trailers, branding, websites, and coordinated launch campaigns that make a book easier to find and harder to forget.">
        <a href="#services" className={btnClass("solid")}>Explore Author Services</a>
        <a href="#submit" className={btnClass("outline")}>Submit Your Book</a>
      </PageHero>

      <Section id="services">
        <SectionHead label="01 — Author Services" title="Everything around the book." />
        <div className="mt-12"><ServiceGrid items={pressServices} cols={3} ctaTo="/contact" ctaType="Book Publishing & Promotion" /></div>
        <p className="mt-8 max-w-3xl border-l-2 border-gold pl-4 text-sm text-muted-foreground">{pressDisclaimer}</p>
      </Section>

      <Section className="border-t border-border bg-surface">
        <SectionHead label="02 — Packages" title="Three ways to work with Press." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pressPackages.map((p) => (
            <article key={p.id} className={`flex flex-col rounded-xl border bg-card p-8 ${p.id === "launch" ? "border-gold" : "border-border"}`}>
              <h3 className="text-3xl font-light">{p.name}</h3>
              <p className="mt-2 text-muted-foreground">{p.summary}</p>
              <p className="mt-6 font-serif text-2xl">{p.price ?? "Request a quote"}</p>
              <p className="mt-4 text-xs text-muted-foreground"><strong className="text-foreground">For:</strong> {p.audience}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">{p.deliverables.map((d) => <li key={d} className="flex gap-2"><span className="text-gold">—</span>{d}</li>)}</ul>
              <Link to="/contact" search={{ type: "Book Publishing & Promotion", service: `${p.name} package` }} className={btnClass(p.id === "launch" ? "primary" : "outline", "mt-8")}>Enquire about {p.name}</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHead label="03 — Launch Timeline" title="From manuscript to momentum." />
        <div className="mt-12">
          <Steps steps={[
            { n: "01", title: "Book and audience discovery", text: "What the book is, and who it's for." },
            { n: "02", title: "Positioning and creative direction", text: "How it should look and sound on the shelf." },
            { n: "03", title: "Asset production", text: "Cover, trailer, copy, and campaign creative." },
            { n: "04", title: "Launch preparation", text: "Pages, schedules, and pre-launch content." },
            { n: "05", title: "Release and promotion", text: "Coordinated activity across your channels." },
            { n: "06", title: "Post-launch review", text: "What worked and what comes next." },
          ]} />
        </div>
      </Section>

      <Section className="border-t border-border bg-surface">
        <SectionHead label="04 — Screen + Shelf" title="Combine services into one launch." />
        <div className="mt-12"><BundleBuilder /></div>
      </Section>

      <Section id="submit" className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHead label="05 — Submit Your Book" title="Tell us about your book." text="Submitting doesn't publish or feature anything. Our editorial team reviews every submission, and nothing appears on the site without your explicit permission." />
          <SubmitBookForm />
        </div>
      </Section>
    </div>
  );
}

function SubmitBookForm() {
  const { status, submit } = useFormSubmit();
  const [f, setF] = useState({ authorName: "", email: "", bookTitle: "", genre: "", status: "Unpublished" as "Unpublished" | "Published", description: "", purchaseLinks: "", authorLinks: "", goal: "", budget: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.authorName.trim()) er.authorName = "Please enter the author name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email address.";
    if (!f.bookTitle.trim()) er.bookTitle = "Please enter the book title.";
    if (f.description.trim().length < 10) er.description = "A short description helps us review (10+ characters).";
    if (!consent) er.consent = "Please agree so we can contact you about your submission.";
    setErr(er);
    if (Object.keys(er).length) return;
    submit({ kind: "book", ...f, consent: true, website: hp });
  };

  if (status === "success") return <FormStatus status="success" success="Thank you — your book has been received for editorial review. We'll be in touch by email. Nothing will be published without your permission." />;

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot value={hp} onChange={setHp} />
      <Field id="b-name" label="Author name" required error={err.authorName}>{(p) => <input {...p} value={f.authorName} onChange={set("authorName")} autoComplete="name" />}</Field>
      <Field id="b-email" label="Email" required error={err.email}>{(p) => <input {...p} type="email" value={f.email} onChange={set("email")} autoComplete="email" />}</Field>
      <Field id="b-title" label="Book title" required error={err.bookTitle}>{(p) => <input {...p} value={f.bookTitle} onChange={set("bookTitle")} />}</Field>
      <Field id="b-genre" label="Genre">{(p) => <input {...p} value={f.genre} onChange={set("genre")} />}</Field>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium">Publication status <span className="text-gold">*</span></legend>
        <div className="mt-3 flex gap-6">
          {(["Unpublished", "Published"] as const).map((s) => (
            <label key={s} className="flex min-h-11 items-center gap-2 text-sm"><input type="radio" name="b-status" checked={f.status === s} onChange={() => setF({ ...f, status: s })} className="h-4 w-4 accent-[var(--gold)]" />{s}</label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2"><Field id="b-desc" label="Book description" required error={err.description}>{(p) => <textarea {...p} rows={5} value={f.description} onChange={set("description")} />}</Field></div>
      <Field id="b-links" label="Purchase or preview links">{(p) => <input {...p} value={f.purchaseLinks} onChange={set("purchaseLinks")} />}</Field>
      <Field id="b-alinks" label="Author website or social links">{(p) => <input {...p} value={f.authorLinks} onChange={set("authorLinks")} />}</Field>
      <Field id="b-goal" label="Primary goal">{(p) => <input {...p} value={f.goal} onChange={set("goal")} placeholder="e.g. a launch campaign, a new cover" />}</Field>
      <Field id="b-budget" label="Budget range">{(p) => <select {...p} value={f.budget} onChange={set("budget")}><option value="">Select…</option>{budgetRanges.map((b) => <option key={b}>{b}</option>)}</select>}</Field>
      <div className="sm:col-span-2"><Field id="b-msg" label="Additional message">{(p) => <textarea {...p} rows={3} value={f.message} onChange={set("message")} />}</Field></div>
      <div className="sm:col-span-2 space-y-5">
        <Consent id="b-consent" checked={consent} onChange={setConsent} error={err.consent}>I agree to VANTIQ CREATIVE contacting me about this submission. I understand it won't be published or featured without my explicit permission.</Consent>
        <SubmitButton status={status}>Submit for review</SubmitButton>
        <FormStatus status={status} success="" />
      </div>
    </form>
  );
}
