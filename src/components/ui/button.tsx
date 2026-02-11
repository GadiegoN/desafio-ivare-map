import { cn } from "./cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

export function Button({
  children,
  onClick,
  type = "button",
  disabled,
  loading,
  variant = "primary",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
  } as const;

  const variants = {
    primary:
      "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm " +
      "hover:from-blue-700 hover:to-indigo-700 focus:ring-indigo-400",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400",
    danger:
      "bg-linear-to-r from-rose-600 to-red-600 text-white shadow-sm " +
      "hover:from-rose-700 hover:to-red-700 focus:ring-red-400",
    ghost:
      "bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-300",
  } as const;

  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}
