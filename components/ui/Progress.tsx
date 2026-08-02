export function Progress({ value, tone = "blue", label }: { value: number; tone?: "blue" | "green" | "orange" | "red"; label?: string }) {
  const colors = { blue: "bg-[#3f78b8]", green: "bg-[#4d8b63]", orange: "bg-[#d9862b]", red: "bg-[#bf4d45]" };
  return (
    <div className="w-full">
      {label ? <div className="mb-1 flex justify-between text-xs text-[#657078]"><span>{label}</span><strong className="text-[#2b3135]">{value}%</strong></div> : null}
      <div className="h-2 overflow-hidden rounded-full bg-[#e7eaec]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div className={`h-full rounded-full transition-all duration-500 ${colors[tone]}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}
