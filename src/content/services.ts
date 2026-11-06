import workAuto from "@/assets/work-auto.jpg";
import workFashion from "@/assets/work-fashion.jpg";
import workProduct from "@/assets/work-product.jpg";
import workMotion from "@/assets/work-motion.jpg";
import workMusic from "@/assets/work-music.jpg";
import workTech from "@/assets/work-tech.jpg";
import heroShelf from "@/assets/hero-screen-shelf.jpg";
import reading from "@/assets/press-reading-room.jpg";

export type Service = { title: string; text: string; image?: string };
export type PressServiceCategory = "Strategy & Positioning" | "Design & Production" | "Reader Discovery" | "Promotion & Publicity" | "Author Platform";
export type PressService = Service & { category: PressServiceCategory; details: string[] };

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

export const pressServices: PressService[] = [
  { title: "Book Cover Design", category: "Design & Production", text: "Covers designed for the genre, the shelf, and the thumbnail.", details: ["Genre-aware visual direction", "Front-cover concepts for print and digital shelves", "A coordinated look across a series, when needed"] },
  { title: "Book Trailer Production", category: "Promotion & Publicity", text: "Cinematic trailers for launch pages, social feeds, and author events.", details: ["Concept and short-form script", "Cinematic visuals, titles, and sound direction", "Exports prepared for agreed digital placements"] },
  { title: "Author Branding", category: "Strategy & Positioning", text: "A consistent look, voice, and presence across everything you publish.", details: ["Author positioning and audience direction", "Visual identity and voice guidance", "Practical brand assets for consistent use"] },
  { title: "Author Website Design", category: "Author Platform", text: "A home for your books, newsletter, and events that you own outright.", details: ["Author and book pages", "Reader signup and contact paths", "Responsive design and content handoff"] },
  { title: "Book Launch Campaigns", category: "Promotion & Publicity", text: "Coordinated creative and messaging around your release window.", details: ["Release timeline and campaign themes", "Coordinated assets for agreed channels", "A practical publishing and promotion checklist"] },
  { title: "Social Content for Authors", category: "Promotion & Publicity", text: "Posts, short videos, and quote cards that sound like you.", details: ["Reusable post concepts and captions", "Short-form video and quote-card creative", "A publishing plan shaped around the book"] },
  { title: "Reader Community Promotion", category: "Reader Discovery", text: "Introduce your book to the VANTIQ Reader Circle, with your permission.", details: ["A reader-facing book introduction", "Author or title spotlight creative", "Shared only with your explicit approval"] },
  { title: "Editorial & Book Description Copywriting", category: "Design & Production", text: "Back-cover copy, retailer descriptions, and author bios that read well.", details: ["Book description and back-cover copy", "Author biography and short promotional copy", "Editorial refinement that keeps your voice intact"] },
  { title: "AI-Assisted Promotional Visuals", category: "Design & Production", text: "Mood imagery and scene visuals for campaigns, always clearly labelled.", details: ["Book-inspired campaign imagery", "Visual direction matched to genre and tone", "Clear labelling wherever AI-assisted visuals are used"] },
  { title: "Author Marketing Strategy", category: "Strategy & Positioning", text: "A practical plan for reaching readers before, during, and after launch.", details: ["Audience and positioning review", "Channel and content priorities", "A sequenced plan for launch and ongoing discovery"] },
  { title: "Book Interior & eBook Formatting", category: "Design & Production", text: "Reader-friendly interior layouts prepared for the formats you choose.", details: ["Interior typography and page layout", "Digital reading layout preparation", "Files prepared to the agreed delivery specifications"] },
  { title: "Retailer Listing & Metadata Review", category: "Reader Discovery", text: "A clarity check for the book details readers see on retailer pages.", details: ["Review of supplied title, description, and book details", "Metadata and category consistency notes", "Recommendations only; retailer placement or sales are not guaranteed"] },
  { title: "Advance Reader Campaign Coordination", category: "Reader Discovery", text: "Organize an advance-copy outreach plan before a release.", details: ["Reader invitation and campaign timeline", "Advance-copy communication materials", "Reviews are voluntary; ratings or reviews are never guaranteed"] },
  { title: "Reader Platform Profile Support", category: "Reader Discovery", text: "Prepare accurate book and author information for reader-discovery platforms.", details: ["Profile and book information checklist", "Consistent descriptions and author details", "No promised ratings, reviews, recommendations, or placements"] },
  { title: "Book Club Discussion Guides", category: "Reader Discovery", text: "Give reading groups thoughtful prompts to start a conversation.", details: ["Book-specific discussion questions", "A concise downloadable guide", "Optional author introduction for book-club hosts"] },
  { title: "Podcast & Media Pitch Preparation", category: "Promotion & Publicity", text: "Help shape a clear, relevant story for interviews and media outreach.", details: ["Interview angles grounded in the book and author", "Short pitch, biography, and talking points", "Coverage and interview placements are not guaranteed"] },
  { title: "Author Newsletter & Welcome Sequence", category: "Author Platform", text: "Build a direct, reader-friendly way to stay in touch between releases.", details: ["Newsletter signup and welcome-message direction", "A simple reader onboarding sequence", "Editorial prompts for future author updates"] },
];

export const pressDisclaimer =
  "VANTIQ Press provides creative, branding, and promotional services. We are not a distributor or traditional publisher, and we do not guarantee retailer placement, publishing contracts, editorial outcomes, or sales.";
