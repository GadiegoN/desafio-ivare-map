import { cn } from "./cn";

export function Input({
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border px-3 py-2 text-sm",
        "border-slate-200 bg-white text-slate-900",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent",
        disabled && "bg-slate-50 text-slate-500",
        className,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
