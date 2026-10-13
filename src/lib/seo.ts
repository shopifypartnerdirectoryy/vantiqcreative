import { site } from "@/content/site";

export function seo({ title, description, path, type = "website" }: { title: string; description: string; path: string; type?: string }) {
  const full = `${title} | VANTIQ CREATIVE`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: site.url + path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: site.url + path }],
  };
}

export const jsonLd = (obj: unknown) => ({ type: "application/ld+json", children: JSON.stringify(obj) });
