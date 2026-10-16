import { useServerFn } from "@tanstack/react-start";
import { useRef, useState, type ReactNode } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { submitForm, type FormPayload } from "@/lib/forms.functions";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type DistOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type Payload = DistOmit<FormPayload, "startedAt" | "website"> & { website?: string };

export type Status = "idle" | "loading" | "success" | "error";

/** Handles loading/success/error, duplicate-submission lock, and bot-timing for any form. */
export function useFormSubmit() {
  const send = useServerFn(submitForm);
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(Date.now());
  const submit = async (payload: Payload) => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await send({ data: { ...payload, startedAt: startedAt.current } as FormPayload });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return { status, submit, reset: () => setStatus("idle") };
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none aria-[invalid=true]:border-destructive";

export function Field({ id, label, error, required, hint, children }: { id: string; label: string; error?: string; required?: boolean; hint?: string; children: (props: { id: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean }) => ReactNode }) {
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label} {required ? <span className="text-gold" aria-hidden>*</span> : <span className="text-xs text-muted-foreground">(optional)</span>}
      </label>
      {children({ id, className: inputCls, "aria-invalid": !!error, "aria-describedby": describedBy, required })}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label>Website<input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} /></label>
    </div>
  );
}

export function Consent({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--gold)]" />
        <span>{children}</span>
      </label>
      {error && <p role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function SubmitButton({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <button type="submit" disabled={status === "loading"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-gold-foreground transition hover:brightness-110 disabled:opacity-60">
      {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {status === "loading" ? "Sending…" : children}
    </button>
  );
}

export function FormStatus({ status, success }: { status: Status; success: string }) {
  return (
    <div aria-live="polite" className="min-h-0">
      {status === "success" && (
        <p className={cn("flex items-start gap-2 rounded-md border border-success/40 bg-success/10 p-4 text-sm")}>
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden /> {success}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm">
          We couldn't send that just now — nothing was submitted. Please try again, email{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>, or{" "}
          <a className="inline-flex items-center gap-1 underline" href={site.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-3 w-3" />message us on WhatsApp</a>.
        </p>
      )}
    </div>
  );
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
