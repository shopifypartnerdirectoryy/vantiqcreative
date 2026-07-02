import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().default(""),
  ptype: z.string().trim().max(50).optional().default(""),
  brief: z.string().trim().min(1).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram notifications are not fully configured.");
    }

    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const text =
      `<b>🚀 New Project Brief — VANTIQ CREATIVE</b>\n\n` +
      `<b>Name:</b> ${esc(data.name)}\n` +
      `<b>Email:</b> ${esc(data.email)}\n` +
      `<b>Company:</b> ${esc(data.company || "—")}\n` +
      `<b>Project Type:</b> ${esc(data.ptype || "—")}\n\n` +
      `<b>Brief:</b>\n${esc(data.brief)}`;

    const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TELEGRAM_API_KEY,
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Telegram send failed [${res.status}]: ${body}`);
    }

    return { ok: true };
  });
