import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { getAuthor } from "@/content/authors";
import { visibleBooks } from "@/content/books";
import { ph } from "@/content/site";
import { Eyebrow, Section, Tag, btnClass, EmptyState } from "@/components/site/primitives";
import { BookCard } from "@/components/site/books";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const a = getAuthor(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? getAuthor(loaderData.slug) : undefined;
    if (!a) return { meta: [{ title: "Author unavailable | VANTIQ CREATIVE" }, { name: "robots", content: "noindex" }] };
    const h = seo({ title: `${a.name} — Author`, description: `Books, biography, and links for ${a.name}, featured by VANTIQ Press.`, path: `/authors/${a.slug}`, type: "profile" });
    return a.status === "draft" ? { ...h, meta: [...h.meta, { name: "robots", content: "noindex" }] } : h;
  },
  notFoundComponent: () => <Section className="room pt-40"><EmptyState title="Author not found" text="This profile isn't available."><Link to="/library" className={btnClass("solid")}>Browse the Library</Link></EmptyState></Section>,
  component: AuthorPage,
});

function AuthorPage() {
  const { slug } = Route.useLoaderData();
  const a = getAuthor(slug)!;
  const books = visibleBooks().filter((b) => b.authorId === a.id);
  return (
    <div className="room bg-background">
      <Section className="pt-32 md:pt-40">
        <div className="grid items-start gap-12 md:grid-cols-[280px_1fr]">
          <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface">
            {a.portrait ? <img src={a.portrait} alt={`Portrait of ${a.name}`} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center font-serif text-6xl text-muted-foreground">{a.name.replace(/[[\]]/g, "").charAt(0)}</div>}
          </div>
          <div>
            <Eyebrow>Author</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-light">{a.name}</h1>
            <div className="mt-4 flex flex-wrap gap-2">{a.genres.map((g) => <Tag key={g}>{g}</Tag>)}</div>
            {ph(a.bio) && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{ph(a.bio)}</p>}
            {ph(a.message) && <blockquote className="mt-6 max-w-2xl border-l-2 border-gold pl-4 font-serif text-xl italic">{ph(a.message)}</blockquote>}
            <div className="mt-8 flex flex-wrap gap-3">
              {a.website && <a href={a.website} target="_blank" rel="noopener noreferrer" className={btnClass("outline")}>Website</a>}
              {a.socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={btnClass("ghost")}>{s.label}</a>)}
            </div>
          </div>
        </div>
      </Section>
      <Section className="border-t border-border">
        <h2 className="text-3xl font-light">Books</h2>
        {books.length ? <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">{books.map((b) => <BookCard key={b.id} book={b} />)}</div> : <p className="mt-4 text-muted-foreground">No published books listed yet.</p>}
      </Section>
      <Section className="border-t border-border bg-surface text-center">
        <h2 className="text-3xl font-light">Hear about new releases first.</h2>
        <Link to="/community" hash="join" className={btnClass("solid", "mt-8")}>Join the Reader Circle</Link>
      </Section>
    </div>
  );
}
