import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { site } from "@/content/site";
import { Section } from "@/components/site/primitives";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms & Conditions", description: "Terms for using the VANTIQ CREATIVE website and submitting enquiries, books, and reviews.", path: "/terms" }),
  component: () => (
    <Section className="pt-32 md:pt-40">
      <article className="mx-auto max-w-3xl space-y-6 leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-foreground">
        <h1 className="text-5xl font-light text-foreground">Terms & Conditions</h1>
        <p className="text-sm">Draft — last updated [DATE]. This draft has not been reviewed by a lawyer.</p>
        <h2>Using this site</h2>
        <p>Content on this site belongs to VANTIQ CREATIVE or its authors and clients unless stated otherwise. Concept work is labelled as such.</p>
        <h2>Projects</h2>
        <p>Every project is governed by a separate written proposal or agreement setting out scope, timeline, revisions, price, and usage rights.</p>
        <h2>Book submissions</h2>
        <p>Submitting a book does not create a publishing agreement and does not mean it will be featured. We feature books only with the author's explicit permission. VANTIQ Press does not guarantee sales, retailer placement, or publishing contracts.</p>
        <h2>Reviews</h2>
        <p>Reviews are moderated. We may decline reviews that are abusive, off-topic, or not genuine.</p>
        <h2>Contact</h2>
        <p>Questions: <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </article>
    </Section>
  ),
});
