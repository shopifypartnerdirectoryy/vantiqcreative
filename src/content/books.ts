import { SHOW_DRAFTS } from "./site";

export type Genre =
  | "Self-Help & Mindset"
  | "Dark Psychology & Influence"
  | "AI & Future Tech"
  | "Thriller & Mystery"
  | "Romance & Fiction"
  | "Business & Marketing"
  | "Other";

export type Format = "Ebook" | "Paperback" | "Hardcover" | "Audiobook";

export type Review = { name: string; rating: number; text: string; date: string };

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
  recommendations?: string[]; // slugs, manually configured
  seoTitle?: string;
  seoDescription?: string;
};

export const books: Book[] = [
  {
    id: "b1",
    slug: "book-1",
    title: "[BOOK 1 TITLE]",
    subtitle: "[BOOK 1 SUBTITLE]",
    authorId: "founder",
    description: "[BOOK 1 DESCRIPTION]",
    genre: "Self-Help & Mindset",
    formats: ["Ebook", "Paperback"],
    retailers: [],
    featured: true,
    status: "draft",
    consent: true,
    approvedReviews: [],
    recommendations: ["book-2"],
  },
  {
    id: "b2",
    slug: "book-2",
    title: "[BOOK 2 TITLE]",
    authorId: "founder",
    description: "[BOOK 2 DESCRIPTION]",
    genre: "Dark Psychology & Influence",
    fallbackAccent: "oklch(0.45 0.12 25)",
    formats: ["Ebook"],
    retailers: [],
    newRelease: true,
    status: "draft",
    consent: true,
    approvedReviews: [],
  },
  {
    id: "b3",
    slug: "book-3",
    title: "[BOOK 3 TITLE]",
    authorId: "founder",
    description: "[BOOK 3 DESCRIPTION]",
    genre: "AI & Future Tech",
    fallbackAccent: "oklch(0.45 0.1 240)",
    formats: ["Ebook", "Audiobook"],
    retailers: [],
    staffPick: true,
    status: "draft",
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
