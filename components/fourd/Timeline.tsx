"use client";

import { useEffect, useMemo, useState } from "react";
import { dateToPercent, formatShortDate, getWeekNumber, percentToDate } from "@/lib/date";
import type { Activity } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function Timeline({ startDate, endDate, currentDate, onDateChange, activities }: { startDate: string; endDate: string; currentDate: Date; onDateChange: (date: Date) => void; activities: Activity[] }) {
  const start = useMemo(() => new Date(`${startDate}T12:00:00`), [startDate]);
  const end = useMemo(() => new Date(`${endDate}T12:00:00`), [endDate]);
  const [playing, setPlaying] = useState(false);
  const percent = dateToPercent(currentDate, start, end);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 5);
      if (next >= end) {
        onDateChange(end);
        setPlaying(false);
      } else onDateChange(next);
    }, 550);
    return () => window.clearInterval(timer);
  }, [playing, currentDate, end, onDateChange]);

  const markers = [
    { label: "Start ruwbouw", date: "2026-04-06" },
    { label: "Wind- en waterdicht", date: "2026-09-18" },
    { label: "Start afbouw", date: "2026-10-05" },
    { label: "Oplevering", date: "2027-03-19" },
  ];

  const monthLabels = useMemo(() => {
    const labels: { label: string; position: number }[] = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1, 12);
    while (cursor <= end) {
      if (cursor >= start) labels.push({ label: new Intl.DateTimeFormat("nl-NL", { month: "short", year: cursor.getMonth() === 0 ? "2-digit" : undefined }).format(cursor), position: dateToPercent(cursor, start, end) });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return labels;
  }, [start, end]);

  return (
    <section className="border-t border-[#d8dcde] bg-white p-4" aria-label="Bouwtijdlijn">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><Button size="sm" variant={playing ? "secondary" : "primary"} onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Animatie pauzeren" : "Bouwvolgorde afspelen"}>{playing ? "Ⅱ Pauze" : "▶ Afspelen"}</Button><Button size="sm" variant="ghost" onClick={() => onDateChange(new Date("2026-08-02T12:00:00"))}>Vandaag</Button></div>
        <div className="text-right"><p className="font-black">Week {getWeekNumber(currentDate)} · {formatShortDate(currentDate)}</p><p className="text-xs text-[#7a848a]">{activities.filter((activity) => new Date(`${activity.startDate}T12:00:00`) <= currentDate && new Date(`${activity.endDate}T12:00:00`) >= currentDate).length} actieve werkzaamheden</p></div>
      </div>
      <div className="relative mt-5 pb-1 pt-7">
        <div className="absolute inset-x-0 top-0 h-5 overflow-hidden text-[9px] font-bold text-[#7a848a]">{monthLabels.map((month) => <span key={`${month.label}-${month.position}`} className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${month.position}%` }}>{month.label}</span>)}</div>
        <div className="relative h-12 rounded-xl border border-[#d8dcde] bg-[#f3f5f4]">
          <div className="absolute inset-y-0 left-0 rounded-l-xl bg-[#d8e8dc]" style={{ width: `${percent}%` }} />
          {markers.map((marker) => { const position = dateToPercent(new Date(`${marker.date}T12:00:00`), start, end); return <button key={marker.label} type="button" className="group absolute top-0 h-full w-4 -translate-x-1/2" style={{ left: `${position}%` }} title={marker.label} onClick={() => onDateChange(new Date(`${marker.date}T12:00:00`))}><span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rotate-45 border border-white bg-[#1d2226]"/><span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#1d2226] px-2 py-1 text-[10px] font-bold text-white group-hover:block">{marker.label}</span></button>; })}
          <input aria-label="Datum in bouwplanning" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" type="range" min={0} max={1000} value={Math.round(percent * 10)} onChange={(event) => onDateChange(percentToDate(Number(event.target.value) / 10, start, end))} />
          <div className="pointer-events-none absolute -top-1 h-14 w-1 -translate-x-1/2 rounded-full bg-[#d17f22] shadow-[0_0_0_4px_rgba(209,127,34,.15)]" style={{ left: `${percent}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-bold text-[#828b90]"><span>W{getWeekNumber(start)}</span><span>Sleep de indicator om de bouwstatus te wijzigen</span><span>W{getWeekNumber(end)}</span></div>
      </div>
    </section>
  );
}
