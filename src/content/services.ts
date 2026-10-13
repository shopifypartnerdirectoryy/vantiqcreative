import workAuto from "@/assets/work-auto.jpg";
import workFashion from "@/assets/work-fashion.jpg";
import workProduct from "@/assets/work-product.jpg";
import workMotion from "@/assets/work-motion.jpg";
import workMusic from "@/assets/work-music.jpg";
import workTech from "@/assets/work-tech.jpg";
import heroShelf from "@/assets/hero-screen-shelf.jpg";
import reading from "@/assets/press-reading-room.jpg";

export type Service = { title: string; text: string; image?: string };

export const divisions = [
  { id: "studio", n: "01", name: "VANTIQ Studio", headline: "Make the Idea Visible.", text: "AI-powered commercials, branded films, product visuals, and cinematic storytelling.", cta: "Explore Studio", to: "/studio" as const, image: workAuto },
  { id: "growth", n: "02", name: "VANTIQ Growth", headline: "Build Recognition. Earn Attention.", text: "Brand strategy, social content, digital campaigns, and marketing systems.", cta: "Explore Growth", to: "/growth" as const, image: workTech },
  { id: "press", n: "03", name: "VANTIQ Press", headline: "Give the Story a Home.", text: "Book promotion, author branding, literary marketing, and publishing support.", cta: "Explore Press", to: "/press" as const, image: reading },
];

export const studioServices: Service[] = [
  { title: "AI Commercial & Film Production", text: "Concept-to-final commercials and short films, built with AI-assisted pipelines and directed with a filmmaker's eye.", image: workAuto },
  { title: "AI Product & Brand Videos", text: "Launch films, hero loops, and brand pieces that show what a product does and why it matters.", image: workProduct },
  { title: "AI Music Videos & Visual Storytelling", text: "Visual worlds for artists and narratives — styled, sequenced, and cut to the beat.", image: workMusic },
  { title: "Creative Concept Development", text: "Treatments, scripts, and storyboards that turn a loose idea into something you can greenlight.", image: workMotion },
  { title: "Cinematic Product Visuals", text: "Stills and motion that light a product properly — for ecommerce, campaigns, and packaging.", image: workFashion },
  { title: "Motion Design & Campaign Assets", text: "Cutdowns, titles, animated type, and format variations for every placement in a campaign.", image: workTech },
  { title: "Book Trailers & Promotional Films", text: "Short films that give a book a mood, a voice, and a reason to be picked up.", image: heroShelf },
  { title: "Creative Direction & Production Strategy", text: "A clear plan for what to make, in which formats, and how it all looks like one brand.", image: reading },
];

export const growthServices: Service[] = [
  { title: "Brand Strategy & Positioning", text: "Define who you are for, what you stand for, and how you sound — before spending on media." },
  { title: "Social Media Management", text: "Planning, publishing, and community care across the platforms your audience actually uses." },
  { title: "Short-Form Video & Content Systems", text: "Repeatable formats and production rhythms so content ships consistently, not occasionally." },
  { title: "Digital Marketing & Paid Acquisition", text: "Structured paid campaigns with clear objectives, sensible budgets, and honest reporting." },
  { title: "Campaign Strategy & Execution", text: "Launches and seasonal pushes planned end to end — message, creative, channels, timing." },
  { title: "Content Calendars & Editorial Planning", text: "A calendar that connects what you publish to what you are trying to achieve." },
  { title: "Conversion-Focused Copywriting", text: "Landing pages, ads, and emails written to be read and acted on." },
  { title: "Brand Identity & Messaging", text: "Visual identity, tone of voice, and messaging frameworks your whole team can use." },
  { title: "Analytics & Performance Reporting", text: "Dashboards and plain-language reports that show what is working and what to change." },
];

export const pressServices: Service[] = [
  { title: "Book Cover Design", text: "Covers designed for the genre, the shelf, and the thumbnail." },
  { title: "Book Trailer Production", text: "Cinematic trailers for launch pages, social feeds, and author events." },
  { title: "Author Branding", text: "A consistent look, voice, and presence across everything you publish." },
  { title: "Author Website Design", text: "A home for your books, newsletter, and events that you own outright." },
  { title: "Book Launch Campaigns", text: "Coordinated creative and messaging around your release window." },
  { title: "Social Content for Authors", text: "Posts, short videos, and quote cards that sound like you." },
  { title: "Reader Community Promotion", text: "Introduce your book to the VANTIQ Reader Circle, with your permission." },
  { title: "Editorial & Book Description Copywriting", text: "Back-cover copy, retailer descriptions, and author bios that read well." },
  { title: "AI-Assisted Promotional Visuals", text: "Mood imagery and scene visuals for campaigns, always clearly labelled." },
  { title: "Author Marketing Strategy", text: "A practical plan for reaching readers before, during, and after launch." },
];

export const pressDisclaimer =
  "VANTIQ Press provides creative, branding, and promotional services. We are not a distributor or traditional publisher, and we do not guarantee retailer placement, publishing contracts, editorial outcomes, or sales.";
