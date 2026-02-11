import { cn } from "./cn";

export function Card({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border bg-white shadow-sm",
        "border-slate-200/80",
        className,
      )}
    >
      {(title || subtitle || right) && (
        <header className="flex items-start justify-between gap-3 border-b border-slate-200/70 p-4">
          <div className="min-w-0">
            {title && (
              <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
            )}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </header>
      )}

      <div className="p-4">{children}</div>
    </section>
  );
}
