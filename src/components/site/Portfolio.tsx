import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { portfolioCategories, publishedProjects, type Project } from "@/content/portfolio";
import { EmptyState, Tag, btnClass } from "./primitives";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ categories = portfolioCategories as readonly string[], limit }: { categories?: readonly string[]; limit?: number }) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const all = publishedProjects().filter((p) => categories.includes(p.category));
  const shown = (filter === "All" ? all : all.filter((p) => p.category === filter)).slice(0, limit);

  return (
    <div>
      <div role="group" aria-label="Filter work by category" className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}
            className={cn("min-h-11 rounded-full border px-4 text-sm transition", filter === c ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
            {c}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">{shown.length} {shown.length === 1 ? "project" : "projects"}</p>

      {shown.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Nothing to show here yet" text="We only publish work we can stand behind. Projects in this category will appear once they are complete and approved for sharing.">
            <Link to="/contact" className={btnClass("outline")}>Be the first project</Link>
          </EmptyState>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => setOpen(p)} className="group block w-full text-left">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img src={p.media} alt={`${p.title} — ${p.type === "Concept" ? "concept visual" : "project still"}`} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <Tag className="absolute left-3 top-3">{p.type}</Tag>
                </div>
                <p className="mt-4 eyebrow">{p.category}</p>
                <h3 className="mt-2 text-xl">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-background">
          {open && (
            <>
              <img src={open.media} alt="" className="aspect-video w-full rounded-md object-cover" width={1200} height={675} />
              <div className="flex flex-wrap gap-2"><Tag>{open.type}</Tag><Tag>{open.category}</Tag></div>
              <DialogTitle className="text-3xl font-light">{open.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground">{open.summary}</DialogDescription>
              <div className="grid gap-6 text-sm sm:grid-cols-2">
                <div><h4 className="eyebrow">Creative approach</h4><p className="mt-2">{open.approach}</p></div>
                <div><h4 className="eyebrow">Deliverables</h4><ul className="mt-2 list-disc pl-4">{open.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></div>
              </div>
              {open.outcomes.length > 0 ? (
                <div className="text-sm"><h4 className="eyebrow">Verified outcomes</h4><ul className="mt-2 list-disc pl-4">{open.outcomes.map((o) => <li key={o}>{o}</li>)}</ul></div>
              ) : open.type === "Concept" ? (
                <p className="text-xs text-muted-foreground">This is a self-initiated concept piece, not commissioned client work.</p>
              ) : null}
              {open.externalLink && <a href={open.externalLink} target="_blank" rel="noopener noreferrer" className={btnClass("outline", "w-fit")}>View project</a>}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
