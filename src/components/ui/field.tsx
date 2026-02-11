import { cn } from "./cn";

export function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="text-xs font-semibold text-slate-800">{label}</div>
      )}
      {children}
      {error ? (
        <div className="text-xs text-red-600">{error}</div>
      ) : hint ? (
        <div className="text-xs text-slate-500">{hint}</div>
      ) : null}
    </div>
  );
}
