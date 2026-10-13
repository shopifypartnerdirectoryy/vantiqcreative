import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "./Header";

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.76-.39 2.89 2.89 0 0 1 3.69-2.78V9.17a6.37 6.37 0 0 0-.81-.05A6.36 6.36 0 1 0 15.72 15.5V8.56a8.15 8.15 0 0 0 4.77 1.54V6.69h-.9z" />
    </svg>
  );
}
const icons = { instagram: Instagram, linkedin: Linkedin, tiktok: TikTokIcon };

const cols = [
  { title: "Studio & Growth", links: [
    { to: "/studio", label: "Studio Services" },
    { to: "/growth", label: "Growth Services" },
    { to: "/work", label: "Selected Work" },
    { to: "/process", label: "Process" },
  ] },
  { title: "Publishing", links: [
    { to: "/press", label: "VANTIQ Press" },
    { to: "/library", label: "Library" },
    { to: "/press", hash: "submit", label: "Submit a Book" },
    { to: "/community", label: "Reader Circle" },
  ] },
  { title: "Company", links: [
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/privacy", label: "Privacy" },
    { to: "/terms", label: "Terms" },
  ] },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Studio, Growth, and Press — one creative house for films, brands, and books.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="eyebrow">{c.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} hash={"hash" in l ? l.hash : undefined} className="text-foreground/85 hover:text-gold">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all text-foreground/85 hover:text-gold"><Mail className="h-4 w-4 shrink-0" />{site.email}</a></li>
            <li><a href={site.phoneHref} className="inline-flex items-center gap-2 text-foreground/85 hover:text-gold"><Phone className="h-4 w-4" />{site.phoneDisplay}</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/85 hover:text-gold"><MessageCircle className="h-4 w-4" />WhatsApp</a></li>
          </ul>
          <ul className="mt-6 flex gap-2">
            {site.socials.map((s) => {
              const Icon = icons[s.id as keyof typeof icons];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${s.handle}`} className="grid h-11 w-11 place-items-center rounded-full border border-border hover:border-gold hover:text-gold">
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-muted-foreground md:px-8">© 2026 VANTIQ CREATIVE. All rights reserved.</p>
      </div>
    </footer>
  );
}
