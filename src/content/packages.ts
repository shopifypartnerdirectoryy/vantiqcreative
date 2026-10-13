/** Prices: set a string like "$1,500" to display it. Leave null to show "Request a quote". */

export const bundleItems = [
  { id: "cover", label: "Book cover & visual identity", price: null as string | null },
  { id: "trailer", label: "Book trailer", price: null as string | null },
  { id: "website", label: "Author website", price: null as string | null },
  { id: "social", label: "Social launch campaign", price: null as string | null },
  { id: "shorts", label: "Promotional short-form videos", price: null as string | null },
  { id: "strategy", label: "Launch strategy", price: null as string | null },
];

export const pressPackages = [
  {
    id: "starter",
    name: "Starter",
    summary: "Essential presentation and promotional assets.",
    audience: "Authors preparing a first release or refreshing an existing book.",
    price: null as string | null, // [PRICE TO BE CONFIRMED]
    deliverables: ["Book description copywriting", "Promotional graphics set", "Author bio refresh"],
  },
  {
    id: "launch",
    name: "Launch",
    summary: "Coordinated release creative and campaign support.",
    audience: "Authors with a release date who want a planned launch window.",
    price: null as string | null,
    deliverables: ["Everything in Starter", "Book trailer", "Social launch campaign", "Launch timeline & checklist"],
  },
  {
    id: "signature",
    name: "Signature",
    summary: "A broader author brand and promotional solution.",
    audience: "Authors building a long-term brand across several books.",
    price: null as string | null,
    deliverables: ["Everything in Launch", "Author website", "Author brand identity", "Ongoing marketing strategy"],
  },
];
