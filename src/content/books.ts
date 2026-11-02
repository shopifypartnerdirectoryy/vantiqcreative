import { SHOW_DRAFTS } from "./site";
import walkingWoundedCover from "@/assets/the-walking-wounded-cover.png.asset.json";
import nobelPursuitsCover from "@/assets/nobel-pursuits-cover.png.asset.json";
import valleyOfSaintAnneCover from "@/assets/valley-of-saint-anne-cover.png.asset.json";
import himbaPondDanceCover from "@/assets/himba-pond-dance-cover.png.asset.json";
import earlyMorningsCover from "@/assets/early-mornings-with-dick-cover.png.asset.json";
import blameItOnSocratesCover from "@/assets/blame-it-on-socrates-cover.png.asset.json";
import proudAmericanCover from "@/assets/proud-american-cover.png.asset.json";
import stjarnasStarsCover from "@/assets/stjarnas-stars-cover.png.asset.json";
import shatteredByLoveCover from "@/assets/shattered-by-love-cover.png.asset.json";
import girlWithBadReputationCover from "@/assets/girl-with-a-bad-reputation-cover.png.asset.json";
import lucreciaCover from "@/assets/lucrecia-cover.png.asset.json";
import reflectionsCover from "@/assets/reflections-twenty-first-century-cover.png.asset.json";
import superpowerCover from "@/assets/superpower-cover.png.asset.json";
import finishTheRaceCover from "@/assets/finish-the-race-cover.png.asset.json";
import gunfightersCover from "@/assets/gunfighters-thieves-lawmen-cover.png.asset.json";
import boundariesCover from "@/assets/boundaries-cover.png.asset.json";
import egyptUnderTheStarsCover from "@/assets/egypt-under-the-stars-cover.png.asset.json";

export type Genre =
  | "Christian Living & Healing"
  | "Medical Thriller"
  | "Contemporary Fiction"
  | "Historical Fiction"
  | "Literary Fiction"
  | "Memoir"
  | "Children's Fantasy"
  | "Self-Help & Mindset"
  | "Dark Psychology & Influence"
  | "AI & Future Tech"
  | "Thriller & Mystery"
  | "Romance & Fiction"
  | "Business & Marketing"
  | "Essays"
  | "Science Fiction"
  | "Sports Fiction"
  | "Western"
  | "History & Myth"
  | "Other";

export type Format = "Ebook" | "Paperback" | "Hardcover" | "Audiobook" | "Kindle Edition";

export type Review = { name: string; rating: number; text: string; date: string };
export type RetailerRating = { value: number; reviewCount: number; retailer: string };

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  authorId: string;
  description: string;
  genre: Genre;
  cover?: string; // image URL or import; leave empty to use the designed typographic cover
  fallbackAccent?: string; // CSS color for the typographic cover
  formats: Format[];
  publicationDate?: string; // ISO date
  isbn?: string;
  sampleChapter?: string; // supplied excerpt only
  retailers: { label: string; href: string }[]; // never invent URLs
  series?: string;
  featured?: boolean;
  newRelease?: boolean;
  staffPick?: boolean;
  /** "draft" records never appear on the published site. */
  status: "draft" | "approved";
  /** Author has given permission to feature this book. */
  consent: boolean;
  /** Only add reviews that were submitted by real readers and approved. */
  approvedReviews: Review[];
  retailerRating?: RetailerRating;
  recommendations?: string[]; // slugs, manually configured
  seoTitle?: string;
  seoDescription?: string;
};

export const books: Book[] = [
  {
    id: "walking-wounded",
    slug: "the-walking-wounded-revised",
    title: "The Walking Wounded Revised",
    subtitle: "The Healing Journey: Restoring Hope from Your Abusive Past",
    authorId: "deborah-ling",
    description: "Pastor Deborah Ling draws on her experience of abuse and her Christian faith to explore healing, forgiveness, and renewed hope. Scripture and end-of-chapter questions invite readers to reflect.",
    genre: "Christian Living & Healing",
    cover: walkingWoundedCover.url,
    formats: ["Paperback"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/dp/B0GTLS5JDN" }],
    featured: true,
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 5.0, reviewCount: 1, retailer: "Amazon" },
  },
  {
    id: "nobel-pursuits",
    slug: "nobel-pursuits",
    title: "Nobel Pursuits",
    authorId: "rosemarie-aquilina-robert-leader",
    description: "A cancer breakthrough at New York’s Falk Institute turns deadly when a research assistant is found dead. As scientific fraud threatens a career and a wife’s life, a medical thriller unfolds.",
    genre: "Medical Thriller",
    cover: nobelPursuitsCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/dp/B0DR3389GV" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 4.6, reviewCount: 3, retailer: "Amazon" },
  },
  {
    id: "valley-of-saint-anne",
    slug: "valley-of-saint-anne",
    title: "Valley of Saint Anne",
    authorId: "dave-gioia",
    description: "Inspired by Anne Frank’s diary, this novel follows twelve-year-old Dee Dee as she records a Southern California childhood shaped by grief and family change.",
    genre: "Contemporary Fiction",
    cover: valleyOfSaintAnneCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/dp/B0FKQF9GYD" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 3.7, reviewCount: 8, retailer: "Amazon" },
  },
  {
    id: "himba-pond-dance",
    slug: "himba-pond-dance",
    title: "Himba Pond Dance",
    authorId: "dave-gioia",
    description: "During the Great Recession, siblings Trey and Kim face their parents’ separation, foreclosure, and an uncertain new home. Their journeys explore identity, friendship, and belonging.",
    genre: "Contemporary Fiction",
    cover: himbaPondDanceCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/dp/B0FLB4NYSK" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 4.2, reviewCount: 7, retailer: "Amazon" },
  },
  {
    id: "early-mornings-with-dick",
    slug: "early-mornings-with-dick",
    title: "Early Mornings with “Dick”",
    authorId: "jack-ryan",
    description: "A compelling historical novel following a Georgetown law student whose private breakfasts with President Richard Nixon reshape his understanding of leadership, truth, and public service.",
    genre: "Historical Fiction",
    cover: earlyMorningsCover.url,
    formats: ["Hardcover"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Early-QA-Dick-Jack-Ryan/dp/1808570472?ref_=ast_author_dp&th=1&psc=1" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 5.0, reviewCount: 1, retailer: "Amazon" },
  },
  {
    id: "blame-it-on-socrates",
    slug: "blame-it-on-socrates",
    title: "Blame It on Socrates",
    authorId: "jack-ryan",
    description: "Professor Patrick Dolan returns to the turbulent 1960s after a long-lost letter forces him to examine the ideals, friendships, and unfinished choices of his past.",
    genre: "Literary Fiction",
    cover: blameItOnSocratesCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/BLAME-SOCRATES-Jack-Ryan-ebook/dp/B0F2SJZY24?ref_=ast_author_mpb" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 5.0, reviewCount: 7, retailer: "Amazon" },
  },
  {
    id: "proud-american",
    slug: "proud-american",
    title: "Proud American",
    subtitle: "The Migrant, Soldier, and Agent",
    authorId: "sergio-a-tinoco",
    description: "A remarkable true story of a South Texas migrant worker who became a soldier and federal agent—a testament to service, sacrifice, faith, and Hispanic American pride.",
    genre: "Memoir",
    cover: proudAmericanCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Proud-American-Migrant-Soldier-Agent-ebook/dp/B0H1348M12?ref_=ast_author_mpb" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
    retailerRating: { value: 5.0, reviewCount: 2, retailer: "Amazon" },
  },
  {
    id: "stjarnas-stars",
    slug: "stjarnas-stars",
    title: "Stjarna’s Stars",
    authorId: "patricia-squire",
    description: "An illustrated story of a young girl, winter skies, and the wonder of following the stars.",
    genre: "Children's Fantasy",
    cover: stjarnasStarsCover.url,
    formats: ["Hardcover"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Stjarnas-Stars-Patricia-Squire/dp/1039192289" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "shattered-by-love",
    slug: "shattered-by-love",
    title: "Shattered by Love",
    subtitle: "Edited by Patricia Fancher",
    authorId: "michael-knapp",
    description: "A heartfelt story of romance, joy, and heartache across a life shaped by family and service.",
    genre: "Romance & Fiction",
    cover: shatteredByLoveCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Shattered-Love-carousel-romance-heartache-ebook/dp/B0CNKYDB52?ref_=ast_author_mpb" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "girl-with-a-bad-reputation",
    slug: "a-girl-with-a-bad-reputation",
    title: "A Girl with a Bad Reputation",
    authorId: "dave-gioia",
    description: "A sharp, emotional novel about rumour, judgement, and a young woman reclaiming her own story.",
    genre: "Literary Fiction",
    cover: girlWithBadReputationCover.url,
    formats: ["Ebook"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Girl-Bad-Reputation-Dave-Gioia-ebook/dp/B0F45YJJHN?ref_=ast_author_mpb" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "lucrecia-memoir",
    slug: "lucrecia-memoir-of-a-manic-woman",
    title: "Lucrecia: Memoir of a Manic Woman",
    authorId: "jamie-goudeau",
    description: "A candid memoir of living with mania, resilience, and the long search for wholeness.",
    genre: "Memoir",
    cover: lucreciaCover.url,
    formats: ["Paperback"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Lucrecia-Memoir-Manic-Jamie-Goudeau/dp/B0H639GLNQ" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "reflections-twenty-first-century",
    slug: "reflections-for-the-twenty-first-century",
    title: "Reflections for the Twenty-First Century",
    authorId: "jean-pi-lee",
    description: "Thoughtful essays on a changing world, from global shifts to the personal questions of modern life.",
    genre: "Essays",
    cover: reflectionsCover.url,
    formats: ["Paperback"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Reflections-Twenty-First-Century-Jean-Lee/dp/1039151930" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "superpower",
    slug: "superpower-ability-to-fly-or-become-invisible",
    title: "SuperPower: The Ability to Fly or to Become Invisible",
    authorId: "roger-e-pedersen",
    description: "Book 4 of In Ashes, Phoenix Eagles Shall Rise — where extraordinary abilities carry extraordinary consequences.",
    genre: "Science Fiction",
    cover: superpowerCover.url,
    formats: ["Kindle Edition"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/SuperPower-Ability-Become-Invisible-Phoenix-ebook/dp/B0DFBXKY2C" }],
    series: "In Ashes, Phoenix Eagles Shall Rise",
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "finish-the-race",
    slug: "finish-the-race",
    title: "Finish the Race",
    authorId: "jon-waller",
    description: "An energetic story of endurance and determination, where crossing the line means more than winning.",
    genre: "Sports Fiction",
    cover: finishTheRaceCover.url,
    formats: ["Hardcover"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Finish-Race-Jon-Waller/dp/B0H1P1D7PM" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "gunfighters-thieves-lawmen",
    slug: "gunfighters-thieves-and-lawmen",
    title: "Gunfighters, Thieves and Lawmen",
    subtitle: "Illustrated by Samantha Singer",
    authorId: "david-milton-mcgowan",
    description: "Frontier tales of outlaws, lawmen, and the hard choices of the open range.",
    genre: "Western",
    cover: gunfightersCover.url,
    formats: ["Kindle Edition"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Gunfighters-Thieves-Lawmen-Milton-McGowan-ebook/dp/B08DNHKVVV" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "boundaries",
    slug: "boundaries-david-m-mcgowan",
    title: "Boundaries",
    authorId: "david-milton-mcgowan",
    description: "A Western of ranch country, loyalty, and the lines people draw — and cross.",
    genre: "Western",
    cover: boundariesCover.url,
    formats: ["Kindle Edition"],
    retailers: [{ label: "Amazon", href: "https://www.amazon.com/Boundaries-David-M-McGowan-ebook/dp/B0CRMWVRLW" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "egypt-under-the-stars",
    slug: "egypt-under-the-stars",
    title: "Egypt Under the Stars",
    subtitle: "Astral Religion and Cosmogonic Myth in Ancient Egypt",
    authorId: "ev-cochrane",
    description: "A scholarly exploration of astral religion and cosmogonic myth in ancient Egypt.",
    genre: "History & Myth",
    cover: egyptUnderTheStarsCover.url,
    formats: ["Kindle Edition"],
    retailers: [{ label: "Amazon UK", href: "https://www.amazon.co.uk/Egypt-Under-Stars-Religion-Cosmogonic-ebook/dp/B0GH3HPFL8" }],
    status: "approved",
    consent: true,
    approvedReviews: [],
  },
];

/** Books visible to visitors: approved + consented. Drafts appear only in preview builds. */
export const visibleBooks = () =>
  books.filter((b) => b.consent && (b.status === "approved" || SHOW_DRAFTS));

export const getBook = (slug: string) => visibleBooks().find((b) => b.slug === slug);

export const averageRating = (b: Book) =>
  b.approvedReviews.length
    ? b.approvedReviews.reduce((s, r) => s + r.rating, 0) / b.approvedReviews.length
    : null;
