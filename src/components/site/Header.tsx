import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { btnClass } from "./primitives";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-baseline gap-2 font-display text-lg tracking-[0.22em]", className)} aria-label="VANTIQ CREATIVE home">
      <span className="font-semibold">VANTIQ</span>
      <span className="text-[10px] tracking-[0.4em] text-gold">CREATIVE</span>
    </Link>
  );
}

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("theme-light")), []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("theme-light", next);
    try { localStorage.setItem("vantiq-theme", next ? "light" : "dark"); } catch { /* ignore */ }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to Cinematic Dark theme" : "Switch to Reading Room Light theme"}
      aria-pressed={light}
      className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition hover:border-gold hover:text-gold"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

function contextualCta(path: string) {
  if (path.startsWith("/press")) return { to: "/press" as const, hash: "submit", label: "Submit Your Book" };
  if (path.startsWith("/library") || path.startsWith("/community") || path.startsWith("/authors"))
    return { to: "/community" as const, hash: "join", label: "Join the Reader Circle" };
  return { to: "/contact" as const, hash: undefined, label: "Start a Project" };
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const cta = contextualCta(path);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                  activeProps={{ className: "!text-gold", "aria-current": "page" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to={cta.to} hash={cta.hash} className={btnClass("primary", "hidden sm:inline-flex")}>
            {cta.label}
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full border border-border xl:hidden">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm border-border bg-background p-0 [&>button]:hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <SheetTitle className="font-display text-base tracking-[0.2em]">MENU</SheetTitle>
                <SheetClose aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-border">
                  <X className="h-4 w-4" />
                </SheetClose>
              </div>
              <nav aria-label="Mobile" className="px-5 py-6">
                <ul className="space-y-1">
                  {[{ to: "/" as const, label: "Home" }, ...navLinks, { to: "/contact" as const, label: "Contact" }].map((l) => (
                    <li key={l.to}>
                      <SheetClose asChild>
                        <Link
                          to={l.to}
                          activeOptions={{ exact: l.to === "/" }}
                          className="flex min-h-12 items-center rounded-lg px-3 font-display text-2xl text-muted-foreground hover:text-foreground"
                          activeProps={{ className: "!text-gold", "aria-current": "page" }}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <SheetClose asChild>
                  <Link to={cta.to} hash={cta.hash} className={btnClass("primary", "mt-8 w-full")}>{cta.label}</Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
