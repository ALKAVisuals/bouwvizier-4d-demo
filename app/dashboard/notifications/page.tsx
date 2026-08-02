import Link from "next/link";

const notifications = [
  ["Kritiek aandachtspunt","Levering kozijnen nog niet bevestigd","Havenkwartier · 18 min geleden"],
  ["Planning gewijzigd","Montagevolgorde staal is bijgewerkt naar versie 12","Havenkwartier · 1 uur geleden"],
  ["Nieuwe opmerking","Bram Smit reageerde op Ruwbouwinstallaties","Havenkwartier · 3 uur geleden"],
];

export default function NotificationsPage() {
  return <div className="p-4 sm:p-6 lg:p-8"><p className="eyebrow">Meldingen</p><h1 className="mt-2 text-3xl font-black">Wat vraagt uw aandacht?</h1><div className="mt-7 max-w-3xl space-y-3">{notifications.map(([type,title,meta],index)=><article key={title} className="surface flex gap-4 p-5"><span className={`mt-1 h-3 w-3 rounded-full ${index===0?"bg-[#bf4d45]":index===1?"bg-[#d9862b]":"bg-[#3f78b8]"}`}/><div><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7a848a]">{type}</p><h2 className="mt-1 font-extrabold">{title}</h2><p className="mt-2 text-sm text-[#6d777e]">{meta}</p></div></article>)}</div><Link href="/dashboard/projects/havenkwartier" className="mt-6 inline-flex rounded-xl bg-[#1d2226] px-4 py-3 text-sm font-extrabold text-white">Open Havenkwartier</Link></div>;
}
