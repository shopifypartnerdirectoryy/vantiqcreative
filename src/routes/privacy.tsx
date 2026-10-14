import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/content/site";
import { Section } from "@/components/site/primitives";

export const Route = createFileRoute("/privacy")({
  head: () => seo({ title: "Privacy Policy", description: "How VANTIQ CREATIVE collects, uses, and protects the information you share through this website.", path: "/privacy" }),
  component: () => (
    <Section className="pt-32 md:pt-40">
      <article className="mx-auto max-w-3xl space-y-6 leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-foreground">
        <h1 className="text-5xl font-light text-foreground">Privacy Policy</h1>
        <p className="text-sm">Draft — last updated [DATE]. This draft has not been reviewed by a lawyer.</p>
        <h2>What we collect</h2>
        <p>When you send an enquiry, submit a book, join the Reader Circle, register as an author, or write a review, we collect the details you enter — such as your name, email, links, and message.</p>
        <h2>How we use it</h2>
        <p>We use your information only to reply to you, review submissions, moderate reviews, and — if you opted in — send occasional emails. We don't sell your data.</p>
        <h2>Where it goes</h2>
        <p>Form submissions are delivered privately to the VANTIQ team through a secure messaging service. Your theme preference is stored in your own browser.</p>
        <h2>Your choices</h2>
        <p>You can ask us to access, correct, or delete your information, or unsubscribe at any time, by emailing <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </article>
    </Section>
  ),
});
