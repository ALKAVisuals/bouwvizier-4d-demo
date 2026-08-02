import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "green" | "blue" | "orange" | "red" | "yellow" }) {
  const tones = {
    neutral: "bg-[#eef1f2] text-[#4e5960]",
    green: "bg-[#e6f2e9] text-[#386d4b]",
    blue: "bg-[#e8f0fa] text-[#35699e]",
    orange: "bg-[#fbefdf] text-[#a76011]",
    red: "bg-[#fae9e7] text-[#a63e38]",
    yellow: "bg-[#fbf4d8] text-[#7d6414]",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
