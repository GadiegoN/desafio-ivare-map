export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-slate-50 to-white p-3">
      <div className="text-[11px] font-semibold text-slate-600">{label}</div>
      <div className="mt-1 font-mono text-sm text-slate-900">{value}</div>
    </div>
  );
}
