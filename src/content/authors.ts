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
    id: "deborah-ling",
    slug: "deborah-ling",
    name: "Deborah Ling",
    bio: "",
    socials: [],
    genres: ["Christian Living & Healing"],
    permission: true,
    status: "approved",
  },
  {
    id: "rosemarie-aquilina-robert-leader",
    slug: "rosemarie-aquilina-robert-leader",
    name: "Rosemarie Aquilina & Robert Leader†",
    bio: "",
    socials: [],
    genres: ["Medical Thriller"],
    permission: true,
    status: "approved",
  },
  {
    id: "dave-gioia",
    slug: "dave-gioia",
    name: "Dave Gioia",
    bio: "",
    socials: [],
    genres: ["Contemporary Fiction", "Literary Fiction"],
    permission: true,
    status: "approved",
  },
  {
    id: "jack-ryan",
    slug: "jack-ryan",
    name: "Jack Ryan",
    bio: "",
    socials: [],
    genres: ["Historical Fiction", "Literary Fiction"],
    permission: true,
    status: "approved",
  },
  {
    id: "sergio-a-tinoco",
    slug: "sergio-a-tinoco",
    name: "Sergio A. Tinoco",
    bio: "",
    socials: [],
    genres: ["Memoir"],
    permission: true,
    status: "approved",
  },
  {
    id: "patricia-squire",
    slug: "patricia-squire",
    name: "Patricia Squire",
    bio: "",
    socials: [],
    genres: ["Children's Fantasy"],
    permission: true,
    status: "approved",
  },
  {
    id: "michael-knapp",
    slug: "michael-knapp",
    name: "Michael Knapp",
    bio: "",
    socials: [],
    genres: ["Romance & Fiction"],
    permission: true,
    status: "approved",
  },
  {
    id: "jamie-goudeau",
    slug: "jamie-goudeau",
    name: "Jamie Goudeau",
    bio: "",
    socials: [],
    genres: ["Memoir"],
    permission: true,
    status: "approved",
  },
  {
    id: "jean-pi-lee",
    slug: "jean-pi-lee",
    name: "Jean Pi Lee",
    bio: "",
    socials: [],
    genres: ["Essays"],
    permission: true,
    status: "approved",
  },
  {
    id: "roger-e-pedersen",
    slug: "roger-e-pedersen",
    name: "Roger E. Pedersen",
    bio: "",
    socials: [],
    genres: ["Science Fiction"],
    permission: true,
    status: "approved",
  },
  {
    id: "jon-waller",
    slug: "jon-waller",
    name: "Jon Waller",
    bio: "",
    socials: [],
    genres: ["Sports Fiction"],
    permission: true,
    status: "approved",
  },
  {
    id: "david-milton-mcgowan",
    slug: "david-milton-mcgowan",
    name: "David Milton McGowan",
    bio: "",
    socials: [],
    genres: ["Western"],
    permission: true,
    status: "approved",
  },
  {
    id: "ev-cochrane",
    slug: "ev-cochrane",
    name: "Ev Cochrane",
    bio: "",
    socials: [],
    genres: ["History & Myth"],
    permission: true,
    status: "approved",
  },
];

export const visibleAuthors = () =>
  authors.filter((a) => a.permission && (a.status === "approved" || SHOW_DRAFTS));
export const getAuthor = (idOrSlug: string) =>
  visibleAuthors().find((a) => a.id === idOrSlug || a.slug === idOrSlug);
