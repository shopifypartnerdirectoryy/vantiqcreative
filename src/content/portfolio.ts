import workAuto from "@/assets/work-auto.jpg";
import workFashion from "@/assets/work-fashion.jpg";
import workProduct from "@/assets/work-product.jpg";
import workMotion from "@/assets/work-motion.jpg";
import workMusic from "@/assets/work-music.jpg";
import workTech from "@/assets/work-tech.jpg";

export const portfolioCategories = [
  "AI Films & Commercials",
  "Product & Brand Visuals",
  "Social & Marketing Campaigns",
  "Book Trailers",
  "Author Launch Campaigns",
] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  approach: string;
  media: string;
  videoUrl?: string;
  deliverables: string[];
  /** Only verified, client-approved outcomes. */
  outcomes: string[];
  type: "Actual Work" | "Concept";
  externalLink?: string;
  published: boolean;
};

export const projects: Project[] = [
  { id: "p1", slug: "chrome-velocity", title: "Chrome Velocity", category: "AI Films & Commercials", summary: "A concept automotive spot exploring speed, reflection, and night light.", approach: "AI-generated plates graded for a cold chrome palette and edited to a slow-build rhythm.", media: workAuto, deliverables: ["30s hero film", "Key stills"], outcomes: [], type: "Concept", published: true },
  { id: "p2", slug: "liquid-form", title: "Liquid Form", category: "AI Films & Commercials", summary: "Abstract motion study used as a visual language test for brand films.", approach: "Generative motion passes combined with typographic timing.", media: workMotion, deliverables: ["Motion loop", "Title treatment"], outcomes: [], type: "Concept", published: true },
  { id: "p3", slug: "neon-cadence", title: "Neon Cadence", category: "AI Films & Commercials", summary: "A music-video look development piece built around colour and pace.", approach: "Scene generation and edit locked to tempo markers.", media: workMusic, deliverables: ["Look-dev reel", "Frames"], outcomes: [], type: "Concept", published: true },
  { id: "p4", slug: "obsidian-object", title: "Obsidian Object", category: "Product & Brand Visuals", summary: "Studio-lit product visuals for a premium object, explored as a concept.", approach: "Controlled lighting setups rendered for ecommerce and campaign crops.", media: workProduct, deliverables: ["Product stills", "Social crops"], outcomes: [], type: "Concept", published: true },
  { id: "p5", slug: "atelier-noir", title: "Atelier Noir", category: "Product & Brand Visuals", summary: "Fashion editorial imagery exploring texture and shadow.", approach: "Art-directed image series with a restrained palette.", media: workFashion, deliverables: ["Editorial series"], outcomes: [], type: "Concept", published: true },
  { id: "p6", slug: "signal-tech", title: "Signal", category: "Product & Brand Visuals", summary: "Technology brand visuals showing interface-as-object.", approach: "Clean product renders with motion-ready compositions.", media: workTech, deliverables: ["Key visuals", "Motion stills"], outcomes: [], type: "Concept", published: true },
];

export const publishedProjects = () => projects.filter((p) => p.published);
