"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { label: "Projecten", href: "/dashboard/projects", icon: "▦" },
  { label: "Portefeuille", href: "/dashboard/portfolio", icon: "◫" },
  { label: "Meldingen", href: "/dashboard/notifications", icon: "◉" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f2f3f1] lg:grid lg:grid-cols-[230px_1fr]">
      <aside className={`fixed inset-y-0 left-0 z-[60] w-[260px] border-r border-white/10 bg-[#1c2226] text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex h-full flex-col p-4">
          <div className="flex h-12 items-center justify-between px-2"><Link href="/" className="flex items-center gap-3 font-black"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#e6a446]">4D</span>BouwVizier</Link><button className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Navigatie sluiten">×</button></div>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[.045] p-3"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/40">Organisatie</p><p className="mt-1 text-sm font-extrabold">Van Dijk Bouwgroep</p></div>
          <nav className="mt-6 space-y-1" aria-label="Dashboardnavigatie">
            {items.map((item) => {
              const active = pathname.startsWith(item.href);
              return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-white text-[#1d2226]" : "text-white/65 hover:bg-white/8 hover:text-white"}`}><span className="text-base">{item.icon}</span>{item.label}</Link>;
            })}
          </nav>
          <div className="mt-auto space-y-2">
            <button className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-white/55 hover:bg-white/8 hover:text-white" onClick={() => alert("Helpcentrum is in deze demo als lokaal dialoogvenster weergegeven.")}>? Helpcentrum</button>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6a446] font-black text-[#1d2226]">JL</span><div className="min-w-0"><p className="truncate text-sm font-extrabold">Jeroen van Loon</p><p className="truncate text-xs text-white/40">Projectleider</p></div></div>
          </div>
        </div>
      </aside>
      {mobileOpen ? <button className="fixed inset-0 z-50 bg-black/40 lg:hidden" aria-label="Navigatie sluiten" onClick={() => setMobileOpen(false)} /> : null}
      <div className="min-w-0">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#d9dddf] bg-[#f7f8f6]/92 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><button className="grid h-10 w-10 place-items-center rounded-xl border border-[#d5dade] bg-white lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Navigatie openen">☰</button><div><p className="text-xs font-bold text-[#7a8389]">Projectomgeving</p><p className="text-sm font-extrabold">Van Dijk Bouwgroep</p></div></div>
          <div className="flex items-center gap-2"><button className="grid h-10 w-10 place-items-center rounded-xl border border-[#d5dade] bg-white" onClick={() => alert("U heeft 3 nieuwe projectmeldingen in deze demo.")} aria-label="Meldingen">◉</button><button className="hidden min-h-10 rounded-xl border border-[#d5dade] bg-white px-3 text-sm font-bold sm:inline-flex sm:items-center" onClick={() => alert("Organisatie-instellingen zijn alleen visueel opgenomen in deze MVP.")}>Instellingen</button></div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
