/** Site-wide configuration. Edit values here; every page reads from this file. */
import haliyAdamPortrait from "@/assets/haliy-adam-founder.jpg.asset.json";

/** Preview builds show draft records and [PLACEHOLDER] values so you can see where content goes.
 *  Published builds hide them. */
export const SHOW_DRAFTS = import.meta.env.DEV;

export const isPlaceholder = (v?: string | null) => !v || /^\[.*\]$/.test(v.trim());
/** Returns the value, or null when it is still a placeholder on a published build. */
export const ph = (v?: string | null) => (isPlaceholder(v) && !SHOW_DRAFTS ? null : v ?? null);

export const site = {
  name: "VANTIQ CREATIVE",
  url: "https://vantiqcreative.lovable.app",
  tagline: "Every story deserves a screen and a shelf.",
  email: "vantiqcreative@gmail.com",
  phoneDisplay: "+1 (786) 480-0071",
  phoneHref: "tel:+17864800071",
  whatsapp: "https://wa.me/17864800071",
  /** Availability line in the final CTA. Set to null to hide. */
  availability: "Now booking [MONTH YEAR]." as string | null,
  responseNote: "We aim to respond within one business day.",
  socials: [
    { id: "instagram", label: "Instagram", handle: "@vantiqcreative", href: "https://www.instagram.com/vantiqcreative" },
    { id: "tiktok", label: "TikTok", handle: "@vantiqcreative", href: "https://www.tiktok.com/@vantiqcreative" },
    { id: "linkedin", label: "LinkedIn", handle: "VANTIQ CREATIVE", href: "https://www.linkedin.com/company/vantiqcreativeare" },
  ],
  founder: {
    name: "Haliy Adam",
    bio: "Haliy Adam founded VANTIQ CREATIVE around a simple belief: every story deserves a screen and a shelf. The creative house brings visual storytelling, brand growth, and publishing together, helping ideas find their form and reach the audiences they deserve.",
    photo: haliyAdamPortrait.url,
    credentials: "[FOUNDER CREDENTIALS]",
    socials: [] as { label: string; href: string }[], // [FOUNDER SOCIAL LINKS]
  },
  tools: ["Runway", "Google Veo", "Midjourney", "Kling AI", "ElevenLabs"],
};

export const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/growth", label: "Growth" },
  { to: "/press", label: "Press" },
  { to: "/library", label: "Library" },
  { to: "/community", label: "Reader Circle" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
] as const;

export const projectTypes = [
  "AI Film & Commercials",
  "Product Videos",
  "Social Media",
  "Digital Marketing",
  "Brand Strategy",
  "Book Publishing & Promotion",
  "Feature My Book",
  "Author Branding",
  "Other",
] as const;

export const budgetRanges = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $7,500", "$7,500 – $15,000", "$15,000+", "Not sure yet"];
export const timelines = ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Flexible"];

export const processSteps = [
  { n: "01", title: "Discovery", text: "Understand the brief, audience, and desired outcome.", timeline: "Week 1", deliverables: "Discovery call, written brief, scope outline" },
  { n: "02", title: "Direction", text: "Establish messaging, creative approach, and scope.", timeline: "Week 1–2", deliverables: "Creative direction, moodboards, proposal" },
  { n: "03", title: "Production", text: "Develop creative assets, campaigns, or publishing deliverables.", timeline: "Agreed per project", deliverables: "Drafts and work-in-progress reviews" },
  { n: "04", title: "Refinement", text: "Review and revise the work according to agreed terms.", timeline: "Agreed per project", deliverables: "[REVISION ROUNDS] rounds of revisions" },
  { n: "05", title: "Delivery", text: "Provide approved assets and relevant handover information.", timeline: "On approval", deliverables: "Final files, formats, usage notes" },
  { n: "06", title: "Next Steps", text: "Discuss ongoing support where appropriate.", timeline: "Optional", deliverables: "Retainer or follow-on options" },
];
