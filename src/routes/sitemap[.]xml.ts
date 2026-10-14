import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/content/site";
import { books } from "@/content/books";
import { authors } from "@/content/authors";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["/", "/work", "/studio", "/growth", "/press", "/library", "/community", "/process", "/about", "/contact", "/privacy", "/terms",
          ...books.filter((b) => b.status === "approved" && b.consent).map((b) => `/library/${b.slug}`),
          ...authors.filter((a) => a.status === "approved" && a.permission).map((a) => `/authors/${a.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${site.url}${p}</loc></url>`).join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
