/** Add only confirmed events, challenges, and launches. Empty lists show an honest empty state. */
export type CommunityEvent = {
  id: string;
  kind: "Event" | "Reading Challenge" | "Launch";
  title: string;
  date: string; // ISO
  description: string;
  link?: string;
};

export const events: CommunityEvent[] = [];

/** Only add testimonials you have written permission to publish. */
export const approvedTestimonials: { quote: string; name: string; role: string }[] = [];
