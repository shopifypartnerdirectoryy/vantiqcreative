import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { seo, jsonLd } from "@/lib/seo";
import { averageRating, getBook, visibleBooks } from "@/content/books";
import { getAuthor } from "@/content/authors";
import { site, ph } from "@/content/site";
import { Section, Tag, btnClass, EmptyState } from "@/components/site/primitives";
import { BookCard, BookCover, bookLabels } from "@/components/site/books";
import { Consent, Field, FormStatus, Honeypot, SubmitButton, useFormSubmit } from "@/components/site/forms";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/library/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { slug: book.slug };
  },
  head: ({ loaderData }) => {
    const book = loaderData ? getBook(loaderData.slug) : undefined;
    if (!book) return { meta: [{ title: "Book unavailable | VANTIQ CREATIVE" }, { name: "robots", content: "noindex" }] };
    const h = seo({ title: book.seoTitle ?? book.title, description: book.seoDescription ?? book.description.slice(0, 155), path: `/library/${book.slug}`, type: "book" });
    const draft = book.status === "draft";
    return {
      ...h,
      meta: draft ? [...h.meta, { name: "robots", content: "noindex" }] : h.meta,
      scripts: draft ? [] : [jsonLd({ "@context": "https://schema.org", "@type": "Book", name: book.title, author: { "@type": "Person", name: getAuthor(book.authorId)?.name }, genre: book.genre, isbn: book.isbn, datePublished: book.publicationDate, bookFormat: book.formats })],
    };
  },
  notFoundComponent: () => (
    <Section className="room pt-40"><EmptyState title="We couldn't find that book" text="It may not be published yet, or the link may be wrong."><Link to="/library" className={btnClass("solid")}>Back to the Library</Link></EmptyState></Section>
  ),
  component: BookPage,
});

function BookPage() {
  const { slug } = Route.useLoaderData();
  const book = getBook(slug)!;
  const author = getAuthor(book.authorId);
  const [sample, setSample] = useState(false);
  const [copied, setCopied] = useState(false);
  const avg = averageRating(book);
  const more = visibleBooks().filter((b) => b.authorId === book.authorId && b.id !== book.id).slice(0, 4);
  const recs = (book.recommendations ?? []).map((s) => getBook(s)).filter(Boolean).filter((b) => b!.authorId !== book.authorId || !more.includes(b!));
  const url = `${site.url}/library/${book.slug}`;

  const share = async () => {
    if (navigator.share) { try { await navigator.share({ title: book.title, url }); } catch { /* cancelled */ } return; }
    await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="room bg-background">
      <Section className="pt-32 md:pt-36">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/library">Library</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{book.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,360px)_1fr]">
          <BookCover book={book} eager className="mx-auto w-full max-w-[360px]" />
          <div>
            <div className="flex flex-wrap gap-2">{bookLabels(book).map((l) => <Tag key={l}>{l}</Tag>)}<Tag>{book.genre}</Tag></div>
            <h1 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">{book.title}</h1>
            {book.subtitle && <p className="mt-2 text-xl text-muted-foreground">{book.subtitle}</p>}
            {author && <p className="mt-4">by <Link to="/authors/$slug" params={{ slug: author.slug }} className="underline hover:text-gold">{author.name}</Link></p>}
            <p className="mt-3 text-sm text-muted-foreground">{avg ? `${avg.toFixed(1)} / 5 from ${book.approvedReviews.length} reader review${book.approvedReviews.length > 1 ? "s" : ""}` : "No reviews yet — be the first to review."}</p>
            <p className="mt-6 max-w-2xl leading-relaxed">{book.description}</p>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-4 text-sm">
              <div><dt className="eyebrow">Formats</dt><dd className="mt-1">{book.formats.join(", ")}</dd></div>
              {book.publicationDate && <div><dt className="eyebrow">Published</dt><dd className="mt-1">{new Date(book.publicationDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</dd></div>}
              {book.isbn && <div><dt className="eyebrow">ISBN</dt><dd className="mt-1">{book.isbn}</dd></div>}
              {book.series && <div><dt className="eyebrow">Series</dt><dd className="mt-1">{book.series}</dd></div>}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {book.retailers.map((r) => <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={btnClass("solid")}>Buy on {r.label}</a>)}
              {book.retailers.length === 0 && import.meta.env.DEV && <span className="rounded-full border border-dashed border-destructive/50 px-4 py-2 text-xs text-destructive">Dev only: add retailer links in books.ts</span>}
              <button type="button" onClick={() => setSample(true)} className={btnClass("outline")}>Read a sample</button>
              <button type="button" onClick={share} className={btnClass("ghost")}>{copied ? "Link copied" : "Share"}</button>
            </div>
          </div>
        </div>
      </Section>

      {author && ph(author.bio) && (
        <Section className="border-t border-border bg-surface">
          <p className="eyebrow">About the author</p>
          <h2 className="mt-4 text-3xl font-light">{author.name}</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{ph(author.bio)}</p>
          <Link to="/authors/$slug" params={{ slug: author.slug }} className={btnClass("outline", "mt-6")}>Author profile</Link>
        </Section>
      )}

      {(more.length > 0 || recs.length > 0) && (
        <Section className="border-t border-border">
          {more.length > 0 && <><h2 className="text-3xl font-light">More by {author?.name}</h2><div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">{more.map((b) => <BookCard key={b.id} book={b} />)}</div></>}
          {recs.length > 0 && <><h2 className="mt-16 text-3xl font-light">You might also like</h2><div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">{recs.map((b) => <BookCard key={b!.id} book={b!} />)}</div></>}
        </Section>
      )}

      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-light">Reader reviews</h2>
            {book.approvedReviews.length === 0 ? <p className="mt-4 text-muted-foreground">Be the first to review.</p> : (
              <ul className="mt-6 space-y-6">{book.approvedReviews.map((r) => (
                <li key={r.name + r.date} className="border-b border-border pb-6">
                  <p className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-gold text-gold" : "text-border"}`} />)}</p>
                  <p className="mt-2">{r.text}</p><p className="mt-2 text-sm text-muted-foreground">— {r.name}</p>
                </li>))}</ul>
            )}
          </div>
          <ReviewForm slug={book.slug} />
        </div>
      </Section>

      <Dialog open={sample} onOpenChange={setSample}>
        <DialogContent className="room max-h-[85vh] max-w-2xl overflow-y-auto border-border bg-background">
          <DialogTitle className="font-serif text-2xl font-light">{book.title} — Sample</DialogTitle>
          {book.sampleChapter ? (
            <div className="whitespace-pre-line font-serif text-lg leading-relaxed">{book.sampleChapter}</div>
          ) : (
            <DialogDescription>A sample chapter isn't available yet. Join the Reader Circle to hear when one is released.</DialogDescription>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ReviewForm({ slug }: { slug: string }) {
  const { status, submit } = useFormSubmit();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!name.trim()) er.name = "Please add a display name.";
    if (!rating) er.rating = "Choose a rating.";
    if (text.trim().length < 10) er.text = "Reviews need at least 10 characters.";
    if (!consent) er.consent = "Please agree to the review guidelines.";
    setErr(er);
    if (Object.keys(er).length) return;
    submit({ kind: "review", bookSlug: slug, displayName: name, rating, text, consent: true, website: hp });
  };
  if (status === "success") return <FormStatus status="success" success="Thanks for your review. It will appear after moderation." />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5 rounded-xl border border-border bg-card p-6">
      <h3 className="text-xl">Write a review</h3>
      <p className="text-xs text-muted-foreground">Reviews are moderated before they appear.</p>
      <Honeypot value={hp} onChange={setHp} />
      <Field id="r-name" label="Display name" required error={err.name}>{(p) => <input {...p} value={name} onChange={(e) => setName(e.target.value)} />}</Field>
      <fieldset>
        <legend className="text-sm font-medium">Rating <span className="text-gold">*</span></legend>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input type="radio" name="r-rating" className="peer sr-only" checked={rating === n} onChange={() => setRating(n)} />
              <span className="grid h-11 w-11 place-items-center rounded-md peer-focus-visible:ring-2 peer-focus-visible:ring-ring"><Star className={`h-6 w-6 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground"}`} /></span>
              <span className="sr-only">{n} star{n > 1 ? "s" : ""}</span>
            </label>
          ))}
        </div>
        {err.rating && <p role="alert" className="text-xs text-destructive">{err.rating}</p>}
      </fieldset>
      <Field id="r-text" label="Review" required error={err.text}>{(p) => <textarea {...p} rows={4} value={text} onChange={(e) => setText(e.target.value)} />}</Field>
      <Consent id="r-consent" checked={consent} onChange={setConsent} error={err.consent}>I confirm this is my honest opinion and agree it may be published under my display name after moderation.</Consent>
      <SubmitButton status={status}>Submit review</SubmitButton>
      <FormStatus status={status} success="" />
    </form>
  );
}
