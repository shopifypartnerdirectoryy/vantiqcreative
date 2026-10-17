import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Book } from "@/content/books";
import { getAuthor } from "@/content/authors";
import { Tag } from "./primitives";
import { cn } from "@/lib/utils";

const genreAccent: Record<string, string> = {
  "Christian Living & Healing": "oklch(0.48 0.08 150)",
  "Medical Thriller": "oklch(0.4 0.1 225)",
  "Contemporary Fiction": "oklch(0.48 0.09 30)",
  "Historical Fiction": "oklch(0.45 0.08 80)",
  "Literary Fiction": "oklch(0.42 0.08 300)",
  Memoir: "oklch(0.46 0.09 35)",
  "Children's Fantasy": "oklch(0.52 0.1 210)",
  "Self-Help & Mindset": "oklch(0.5 0.085 70)",
  "Dark Psychology & Influence": "oklch(0.42 0.12 25)",
  "AI & Future Tech": "oklch(0.45 0.1 240)",
  "Thriller & Mystery": "oklch(0.32 0.03 260)",
  "Romance & Fiction": "oklch(0.5 0.12 0)",
  "Business & Marketing": "oklch(0.42 0.07 160)",
  Other: "oklch(0.4 0.02 60)",
};

/** Real cover if it loads; otherwise a designed typographic cover. Never a broken image. */
export function BookCover({ book, className, eager }: { book: Book; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const author = getAuthor(book.authorId)?.name ?? "";
  const accent = book.fallbackAccent ?? genreAccent[book.genre] ?? genreAccent.Other;
  return (
    <div className={cn("relative aspect-[2/3] overflow-hidden rounded-[3px] shadow-[0_20px_40px_-15px_oklch(0_0_0/0.45)]", className)}>
      {book.cover && !failed ? (
        <img src={book.cover} alt={`Cover of ${book.title}`} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} className="h-full w-full object-cover" width={400} height={600} />
      ) : (
        <div role="img" aria-label={`Cover of ${book.title} by ${author}`} className="flex h-full w-full flex-col justify-between p-[9%] text-[oklch(0.97_0.01_85)]" style={{ background: `linear-gradient(160deg, ${accent}, oklch(0.16 0.01 60))` }}>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-80">{book.genre}</span>
          <div>
            <span className="block h-px w-10 bg-current opacity-60" />
            <p className="mt-3 font-serif text-[clamp(1rem,2.2vw,1.6rem)] leading-tight">{book.title}</p>
            {book.subtitle && <p className="mt-2 text-[11px] opacity-80">{book.subtitle}</p>}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-90">{author}</span>
        </div>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/30 to-transparent" />
    </div>
  );
}

export function bookLabels(b: Book) {
  return [b.status === "draft" && "Draft preview", b.featured && "Featured", b.staffPick && "Staff Pick", b.newRelease && "New Release"].filter(Boolean) as string[];
}

export function BookCard({ book, onQuickView }: { book: Book; onQuickView?: (b: Book) => void }) {
  const author = getAuthor(book.authorId);
  return (
    <article className="group">
      <div className="transition duration-500 [@media(hover:hover)]:group-hover:-translate-y-1.5 motion-reduce:transform-none">
        <BookCover book={book} />
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {bookLabels(book).map((l) => <Tag key={l} className={l === "Draft preview" ? "border-destructive/40 text-destructive" : ""}>{l}</Tag>)}
      </div>
      <h3 className="mt-3 font-serif text-lg leading-snug">{book.title}</h3>
      {author && <p className="text-sm text-muted-foreground">{author.name}</p>}
      <p className="mt-1 text-xs text-muted-foreground">{book.genre} · {book.formats.join(", ")}{book.publicationDate ? ` · ${new Date(book.publicationDate).getFullYear()}` : ""}</p>
      {book.retailerRating && <p className="mt-1 text-xs text-muted-foreground">{book.retailerRating.retailer} rating: {book.retailerRating.value.toFixed(1)} / 5 · {book.retailerRating.reviewCount} review{book.retailerRating.reviewCount === 1 ? "" : "s"}</p>}
      <div className="mt-3 flex gap-4 text-sm font-semibold">
        <Link to="/library/$slug" params={{ slug: book.slug }} className="min-h-11 inline-flex items-center hover:text-gold">
          View Details<span className="sr-only">: {book.title}</span> →
        </Link>
        {onQuickView && (
          <button type="button" onClick={() => onQuickView(book)} className="min-h-11 text-muted-foreground hover:text-gold">
            Quick view<span className="sr-only">: {book.title}</span>
          </button>
        )}
      </div>
    </article>
  );
}
