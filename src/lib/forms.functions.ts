import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const s = (max: number) => z.string().trim().max(max);
const opt = (max: number) => s(max).optional().default("");

const common = {
  website: z.string().max(0, "Spam detected").optional().default(""), // honeypot
  startedAt: z.number(), // time the form was opened (bot check)
};

const schema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("contact"),
    ...common,
    name: s(200).min(1),
    email: s(255).email(),
    company: opt(200),
    projectType: s(80).min(1),
    budget: opt(80),
    timeline: opt(80),
    description: s(5000).min(10),
    contactMethod: opt(40),
    links: opt(1000),
    bundle: opt(500),
    consent: z.literal(true),
  }),
  z.object({
    kind: z.literal("book"),
    ...common,
    authorName: s(200).min(1),
    email: s(255).email(),
    bookTitle: s(300).min(1),
    genre: opt(80),
    status: z.enum(["Unpublished", "Published"]),
    description: s(5000).min(10),
    purchaseLinks: opt(1000),
    authorLinks: opt(1000),
    goal: opt(200),
    budget: opt(80),
    message: opt(3000),
    consent: z.literal(true),
  }),
  z.object({
    kind: z.literal("newsletter"),
    ...common,
    email: s(255).email(),
    preferences: z.array(s(80)).max(12).default([]),
    consent: z.literal(true),
  }),
  z.object({
    kind: z.literal("author"),
    ...common,
    name: s(200).min(1),
    email: s(255).email(),
    links: opt(1000),
    bookStatus: opt(80),
    interest: opt(200),
    consent: z.literal(true),
  }),
  z.object({
    kind: z.literal("review"),
    ...common,
    bookSlug: s(120).min(1),
    displayName: s(80).min(1),
    rating: z.number().int().min(1).max(5),
    text: s(3000).min(10),
    consent: z.literal(true),
  }),
]);

export type FormPayload = z.input<typeof schema>;

const titles: Record<string, string> = {
  contact: "🎬 New Project Enquiry",
  book: "📚 New Book Submission (needs editorial review)",
  newsletter: "✉️ New Reader Circle / Newsletter signup",
  author: "✍️ New Author registration",
  review: "⭐ New Reader Review (awaiting moderation)",
};

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Bot checks: honeypot filled or submitted too fast → pretend success, send nothing.
    if (data.website || Date.now() - data.startedAt < 2500) return { ok: true };

    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID) {
      throw new Error("Form delivery is not configured.");
    }

    const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const { kind, website: _w, startedAt: _s, consent: _c, ...fields } = data as Record<string, unknown> & { kind: string };
    const lines = Object.entries(fields)
      .filter(([, v]) => v !== "" && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => `<b>${esc(k)}:</b> ${esc(Array.isArray(v) ? v.join(", ") : String(v))}`);
    const text = `<b>${titles[kind]}</b>\n<i>VANTIQ CREATIVE website</i>\n\n${lines.join("\n")}`.slice(0, 4000);

    const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TELEGRAM_API_KEY,
      },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
    });
    if (!res.ok) {
      console.error("Telegram send failed", res.status, await res.text());
      throw new Error("Delivery failed");
    }
    return { ok: true };
  });
