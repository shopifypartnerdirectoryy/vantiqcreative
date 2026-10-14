import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { seo } from "@/lib/seo";
import { site, projectTypes, budgetRanges, timelines } from "@/content/site";
import { bundleItems } from "@/content/packages";
import { Eyebrow, Section } from "@/components/site/primitives";
import { Consent, Field, FormStatus, Honeypot, SubmitButton, isEmail, useFormSubmit } from "@/components/site/forms";

const searchSchema = z.object({
  type: z.string().optional(),
  service: z.string().optional(),
  bundle: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => seo({ title: "Contact — Start a Project", description: "Tell VANTIQ CREATIVE about your film, brand, or book project. Email, phone, WhatsApp, or the enquiry form.", path: "/contact" }),
  component: Contact,
});

function Contact() {
  const search = Route.useSearch();
  const initialType = projectTypes.find((t) => t === search.type) ?? "";
  const initialBundle = (search.bundle ?? "").split(",").filter((id) => bundleItems.some((b) => b.id === id));
  const { status, submit } = useFormSubmit();
  const [f, setF] = useState({
    name: "", email: "", company: "", projectType: initialType as string, budget: "", timeline: "",
    description: search.service ? `Interested in: ${search.service}\n\n` : "", contactMethod: "Email", links: "",
  });
  const [bundle, setBundle] = useState<string[]>(initialBundle);
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!isEmail(f.email)) er.email = "Enter a valid email address.";
    if (!f.projectType) er.projectType = "Choose a project type.";
    if (f.description.trim().length < 10) er.description = "Tell us a little more (10+ characters).";
    if (!consent) er.consent = "Please agree so we can reply to you.";
    setErr(er);
    if (Object.keys(er).length) { document.getElementById(`c-${Object.keys(er)[0]}`)?.focus(); return; }
    submit({ kind: "contact", ...f, bundle: bundleItems.filter((b) => bundle.includes(b.id)).map((b) => b.label).join(", "), consent: true, website: hp });
  };

  return (
    <Section className="pt-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1]">Let's talk about your project.</h1>
          <p className="mt-6 text-muted-foreground">{site.responseNote}</p>
          <ul className="mt-10 space-y-4">
            <li><a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 hover:text-gold"><Mail className="h-5 w-5 text-gold" />{site.email}</a></li>
            <li><a href={site.phoneHref} className="flex min-h-11 items-center gap-3 hover:text-gold"><Phone className="h-5 w-5 text-gold" />{site.phoneDisplay}</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-gold"><MessageCircle className="h-5 w-5 text-gold" />Message us on WhatsApp</a></li>
          </ul>
        </div>

        {status === "success" ? (
          <div className="self-start"><FormStatus status="success" success="Thank you — your enquiry has been received. We aim to respond within one business day." /></div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="relative grid gap-5 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2 md:p-8">
            <Honeypot value={hp} onChange={setHp} />
            <Field id="c-name" label="Name" required error={err.name}>{(p) => <input {...p} value={f.name} onChange={set("name")} autoComplete="name" />}</Field>
            <Field id="c-email" label="Email" required error={err.email}>{(p) => <input {...p} type="email" value={f.email} onChange={set("email")} autoComplete="email" />}</Field>
            <Field id="c-company" label="Company or author name">{(p) => <input {...p} value={f.company} onChange={set("company")} />}</Field>
            <Field id="c-projectType" label="Project type" required error={err.projectType}>{(p) => <select {...p} value={f.projectType} onChange={set("projectType")}><option value="">Select…</option>{projectTypes.map((t) => <option key={t}>{t}</option>)}</select>}</Field>
            <Field id="c-budget" label="Budget range">{(p) => <select {...p} value={f.budget} onChange={set("budget")}><option value="">Select…</option>{budgetRanges.map((t) => <option key={t}>{t}</option>)}</select>}</Field>
            <Field id="c-timeline" label="Timeline">{(p) => <select {...p} value={f.timeline} onChange={set("timeline")}><option value="">Select…</option>{timelines.map((t) => <option key={t}>{t}</option>)}</select>}</Field>
            <div className="sm:col-span-2"><Field id="c-description" label="Project description" required error={err.description}>{(p) => <textarea {...p} rows={6} value={f.description} onChange={set("description")} />}</Field></div>
            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-medium">Screen + Shelf deliverables <span className="text-xs text-muted-foreground">(optional)</span></legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {bundleItems.map((b) => (
                  <label key={b.id} className="flex min-h-11 items-center gap-3 text-sm">
                    <input type="checkbox" checked={bundle.includes(b.id)} onChange={() => setBundle((x) => (x.includes(b.id) ? x.filter((i) => i !== b.id) : [...x, b.id]))} className="h-4 w-4 accent-[var(--gold)]" />{b.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field id="c-method" label="Preferred contact method">{(p) => <select {...p} value={f.contactMethod} onChange={set("contactMethod")}><option>Email</option><option>Phone</option><option>WhatsApp</option></select>}</Field>
            <Field id="c-links" label="Relevant links">{(p) => <input {...p} value={f.links} onChange={set("links")} placeholder="Website, references, drafts" />}</Field>
            <div className="space-y-5 sm:col-span-2">
              <Consent id="c-consent" checked={consent} onChange={setConsent} error={err.consent}>I agree to VANTIQ CREATIVE storing these details to respond to my enquiry.</Consent>
              <SubmitButton status={status}>Send enquiry</SubmitButton>
              <FormStatus status={status} success="" />
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
