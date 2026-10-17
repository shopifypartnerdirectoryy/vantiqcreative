import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { seo } from "@/lib/seo";
import { visibleBooks, type Book } from "@/content/books";
import { getAuthor } from "@/content/authors";
import { Eyebrow, EmptyState, Section, Tag, btnClass } from "@/components/site/primitives";
import { BookCard, BookCover, bookLabels } from "@/components/site/books";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library/")({
  head: () => seo({ title: "The Library — Find Your Next Good Read", description: "Search and browse books published and supported by VANTIQ Press, by title, author, genre, and format.", path: "/library" }),
  component: Library,
});

type Sort = "title" | "author" | "date";

function Library() {
  const all = visibleBooks();
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [format, setFormat] = useState("All");
  const [series, setSeries] = useState("All");
  const [newOnly, setNewOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("title");
  const [quick, setQuick] = useState<Book | null>(null);

  const genres = [...new Set(all.map((b) => b.genre))];
  const formats = [...new Set(all.flatMap((b) => b.formats))];
  const seriesList = [...new Set(all.map((b) => b.series).filter(Boolean))] as string[];
  const spotlight = all.find((b) => b.featured) ?? all[0];

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return all
      .filter((b) => !term || [b.title, b.subtitle, getAuthor(b.authorId)?.name, b.description, b.genre].join(" ").toLowerCase().includes(term))
      .filter((b) => genre === "All" || b.genre === genre)
      .filter((b) => format === "All" || b.formats.includes(format as never))
      .filter((b) => series === "All" || b.series === series)
      .filter((b) => !newOnly || b.newRelease)
      .sort((a, b) =>
        sort === "date" ? (b.publicationDate ?? "").localeCompare(a.publicationDate ?? "")
        : sort === "author" ? (getAuthor(a.authorId)?.name ?? "").localeCompare(getAuthor(b.authorId)?.name ?? "")
        : a.title.localeCompare(b.title));
  }, [all, q, genre, format, series, newOnly, sort]);

  const filtered = q || genre !== "All" || format !== "All" || series !== "All" || newOnly;
  const clear = () => { setQ(""); setGenre("All"); setFormat("All"); setSeries("All"); setNewOnly(false); };
  const sel = "min-h-11 rounded-md border border-input bg-card px-3 text-sm";

  return (
    <div className="room bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pt-44">
          <Eyebrow>Real books by real authors · VANTIQ Library</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1]">Find Your Next Good Read.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Explore real books, meet their authors, and find your next good read.</p>
        </div>
      </section>

      {all.length === 0 ? (
        <Section><EmptyState title="The shelves are being stocked" text="Our first titles will appear here once they're ready. Join the Reader Circle to hear when they arrive."><Link to="/community" hash="join" className={btnClass("solid")}>Join the Reader Circle</Link></EmptyState></Section>
      ) : (
        <>
          {spotlight && (
            <Section className="border-b border-border bg-surface">
              <div className="grid items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr]">
                <BookCover book={spotlight} eager className="mx-auto w-full max-w-[280px]" />
                <div>
                  <p className="eyebrow">Spotlight</p>
                  <div className="mt-3 flex flex-wrap gap-2">{bookLabels(spotlight).map((l) => <Tag key={l}>{l}</Tag>)}</div>
                  <h2 className="mt-4 text-4xl font-light">{spotlight.title}</h2>
                  {spotlight.subtitle && <p className="mt-1 text-lg text-muted-foreground">{spotlight.subtitle}</p>}
                  <p className="mt-3 text-sm">by {getAuthor(spotlight.authorId)?.name}</p>
                  <p className="mt-5 max-w-xl text-muted-foreground">{spotlight.description}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{spotlight.genre} · {spotlight.formats.join(", ")}</p>
                  <Link to="/library/$slug" params={{ slug: spotlight.slug }} className={btnClass("solid", "mt-8")}>View Book</Link>
                </div>
              </div>
            </Section>
          )}

          <Section>
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
              <label className="relative">
                <span className="sr-only">Search by title, author, or keyword</span>
                <Search aria-hidden className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, author, keyword" className="min-h-11 w-full rounded-md border border-input bg-card pl-10 pr-3 text-sm" />
              </label>
              <label><span className="sr-only">Format</span><select value={format} onChange={(e) => setFormat(e.target.value)} className={sel}><option value="All">All formats</option>{formats.map((f) => <option key={f}>{f}</option>)}</select></label>
              {seriesList.length > 0 && <label><span className="sr-only">Series</span><select value={series} onChange={(e) => setSeries(e.target.value)} className={sel}><option value="All">All series</option>{seriesList.map((f) => <option key={f}>{f}</option>)}</select></label>}
              <label><span className="sr-only">Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={sel}><option value="title">Sort: Title</option><option value="author">Sort: Author</option><option value="date">Sort: Release date</option></select></label>
            </div>
            <div role="group" aria-label="Filter by genre" className="mt-4 flex flex-wrap gap-2">
              {["All", ...genres].map((g) => (
                <button key={g} type="button" aria-pressed={genre === g} onClick={() => setGenre(g)} className={cn("min-h-10 rounded-full border px-4 text-sm", genre === g ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground")}>{g}</button>
              ))}
              <label className="ml-2 flex min-h-10 items-center gap-2 text-sm"><input type="checkbox" checked={newOnly} onChange={(e) => setNewOnly(e.target.checked)} className="h-4 w-4 accent-[var(--gold)]" />New releases</label>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <p aria-live="polite">{results.length} {results.length === 1 ? "book" : "books"}</p>
              {filtered && <button type="button" onClick={clear} className="min-h-11 underline hover:text-foreground">Clear filters</button>}
            </div>
            {results.length === 0 ? (
              <div className="mt-8"><EmptyState title="No books match that search" text="Try a different keyword or clear the filters to see everything on the shelf."><button type="button" onClick={clear} className={btnClass("outline")}>Clear filters</button></EmptyState></div>
            ) : (
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                {results.map((b) => <BookCard key={b.id} book={b} onQuickView={setQuick} />)}
              </div>
            )}
          </Section>
        </>
      )}

      <Dialog open={!!quick} onOpenChange={(o) => !o && setQuick(null)}>
        <DialogContent className="room max-w-2xl border-border bg-background">
          {quick && (
            <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
              <BookCover book={quick} />
              <div>
                <DialogTitle className="font-serif text-2xl font-light">{quick.title}</DialogTitle>
                <p className="mt-1 text-sm text-muted-foreground">by {getAuthor(quick.authorId)?.name}</p>
                <DialogDescription className="mt-4 text-sm">{quick.description}</DialogDescription>
                <p className="mt-3 text-xs text-muted-foreground">{quick.genre} · {quick.formats.join(", ")}</p>
                <Link to="/library/$slug" params={{ slug: quick.slug }} className={btnClass("solid", "mt-6")}>View Details</Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
