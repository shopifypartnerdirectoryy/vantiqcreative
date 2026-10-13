import { SHOW_DRAFTS } from "./site";

export type Author = {
  id: string;
  slug: string;
  name: string;
  bio: string;
  portrait?: string;
  website?: string;
  socials: { label: string; href: string }[];
  genres: string[];
  message?: string;
  /** Author has granted permission to appear on the site. */
  permission: boolean;
  status: "draft" | "approved";
};

export const authors: Author[] = [
  {
    id: "founder",
    slug: "founder",
    name: "[MY NAME]",
    bio: "[BIO]",
    portrait: undefined, // [PHOTO]
    website: undefined, // [AUTHOR WEBSITE]
    socials: [], // [AUTHOR SOCIAL LINKS]
    genres: ["Self-Help & Mindset", "AI & Future Tech"],
    message: "[OPTIONAL AUTHOR MESSAGE]",
    permission: true,
    status: "draft",
  },
];

export const visibleAuthors = () =>
  authors.filter((a) => a.permission && (a.status === "approved" || SHOW_DRAFTS));
export const getAuthor = (idOrSlug: string) =>
  visibleAuthors().find((a) => a.id === idOrSlug || a.slug === idOrSlug);
