"use client";

import { useMemo, useState } from "react";
import { activities, phases } from "@/lib/mock-data";
import { dateToPercent, daysBetween, formatDate } from "@/lib/date";
import type { Activity } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

const tone = (status: Activity["status"]) => status === "Gereed" ? "green" : status === "Vertraagd" ? "red" : status === "In uitvoering" ? "orange" : status === "Gepland" ? "blue" : "neutral";
const projectStart = new Date("2026-02-02T12:00:00");
const projectEnd = new Date("2027-03-19T12:00:00");

export function ActivitiesView() {
  const [phase, setPhase] = useState("Alle fasen");
  const [status, setStatus] = useState("Alle statussen");
  const [responsible, setResponsible] = useState("Alle partijen");
  const [period, setPeriod] = useState("Gehele project");
  const [selected, setSelected] = useState<Activity | null>(activities[4]);

  const filtered = useMemo(() => activities.filter((activity) => {
    const phaseMatch = phase === "Alle fasen" || activity.phase === phase;
    const statusMatch = status === "Alle statussen" || activity.status === status;
    const responsibleMatch = responsible === "Alle partijen" || activity.responsible === responsible;
    const periodMatch = period === "Gehele project" || (period === "Komende 90 dagen" && new Date(`${activity.startDate}T12:00:00`) <= new Date("2026-10-31T12:00:00") && new Date(`${activity.endDate}T12:00:00`) >= new Date("2026-08-02T12:00:00"));
    return phaseMatch && statusMatch && responsibleMatch && periodMatch;
  }), [phase, status, responsible, period]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Werkpakket</p><h2 className="mt-2 text-2xl font-black">Activiteiten en afhankelijkheden</h2><p className="mt-2 text-sm text-[#68727a]">Tabelweergave met compacte Gantt-indicatie voor het volledige project.</p></div><Button onClick={() => alert("Nieuwe activiteiten worden in een productieversie vanuit de bronplanning gesynchroniseerd.")}>＋ Activiteit</Button></div>
      <div className="mt-6 surface p-4"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><select className="min-h-11 rounded-xl border border-[#d4d9dc] bg-white px-3 text-sm font-bold" value={phase} onChange={(e)=>setPhase(e.target.value)}><option>Alle fasen</option>{phases.map(item=><option key={item}>{item}</option>)}</select><select className="min-h-11 rounded-xl border border-[#d4d9dc] bg-white px-3 text-sm font-bold" value={status} onChange={(e)=>setStatus(e.target.value)}><option>Alle statussen</option>{Array.from(new Set(activities.map(a=>a.status))).map(item=><option key={item}>{item}</option>)}</select><select className="min-h-11 rounded-xl border border-[#d4d9dc] bg-white px-3 text-sm font-bold" value={responsible} onChange={(e)=>setResponsible(e.target.value)}><option>Alle partijen</option>{Array.from(new Set(activities.map(a=>a.responsible))).map(item=><option key={item}>{item}</option>)}</select><select className="min-h-11 rounded-xl border border-[#d4d9dc] bg-white px-3 text-sm font-bold" value={period} onChange={(e)=>setPeriod(e.target.value)}><option>Gehele project</option><option>Komende 90 dagen</option></select><Button variant="ghost" onClick={()=>{setPhase("Alle fasen");setStatus("Alle statussen");setResponsible("Alle partijen");setPeriod("Gehele project");}}>Filters wissen</Button></div></div>

      <div className="mt-6 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="surface overflow-hidden">
          {filtered.length ? <div className="overflow-x-auto"><table className="w-full min-w-[1120px] text-left text-sm"><thead className="bg-[#f4f5f3] text-[10px] font-extrabold uppercase tracking-[.08em] text-[#727c82]"><tr><th className="p-4">Activiteit</th><th className="p-4">Fase</th><th className="p-4">Start</th><th className="p-4">Einde</th><th className="p-4">Duur</th><th className="p-4">Verantwoordelijke</th><th className="p-4">Voortgang</th><th className="p-4">Status</th><th className="p-4 w-[210px]">Projecttijdlijn</th></tr></thead><tbody>{filtered.map(activity => {
            const left = dateToPercent(new Date(`${activity.startDate}T12:00:00`), projectStart, projectEnd);
            const right = dateToPercent(new Date(`${activity.endDate}T12:00:00`), projectStart, projectEnd);
            return <tr key={activity.id} className={`cursor-pointer border-t border-[#e0e3e4] hover:bg-[#f8f9f8] ${selected?.id===activity.id?"bg-[#fbf5ec]":""}`} onClick={()=>setSelected(activity)}><td className="p-4"><strong>{activity.name}</strong><p className="mt-1 text-xs text-[#7b858b]">{activity.dependencies.length ? `${activity.dependencies.length} afhankelijkheden` : "Startactiviteit"}</p></td><td className="p-4 font-bold">{activity.phase}</td><td className="p-4 whitespace-nowrap">{formatDate(activity.startDate,{day:"2-digit",month:"short"})}</td><td className="p-4 whitespace-nowrap">{formatDate(activity.endDate,{day:"2-digit",month:"short"})}</td><td className="p-4 font-bold">{daysBetween(activity.startDate,activity.endDate)} d</td><td className="p-4">{activity.responsible}</td><td className="p-4 w-32"><Progress value={activity.progress} tone={activity.status==="Vertraagd"?"red":activity.status==="Gereed"?"green":"orange"}/></td><td className="p-4"><Badge tone={tone(activity.status)}>{activity.status}</Badge></td><td className="p-4"><div className="relative h-7 rounded-lg bg-[#edf0ef]"><div className={`absolute top-1 h-5 rounded-md ${activity.status==="Vertraagd"?"bg-[#bf4d45]":activity.status==="Gereed"?"bg-[#4d8b63]":"bg-[#3f78b8]"}`} style={{left:`${left}%`,width:`${Math.max(2,right-left)}%`}}/></div></td></tr>;
          })}</tbody></table></div> : <div className="p-5"><EmptyState title="Geen activiteiten binnen deze filters" description="Verruim de fase-, status-, partij- of periodefilter." /></div>}
        </div>

        {selected ? <aside className="surface h-fit p-5 2xl:sticky 2xl:top-20"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7a848a]">{selected.phase}</p><h3 className="mt-1 text-lg font-black">{selected.name}</h3></div><button onClick={()=>setSelected(null)} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-[#eef1f2]" aria-label="Details sluiten">×</button></div><p className="mt-4 text-sm leading-6 text-[#606a71]">{selected.description}</p><div className="mt-5"><Progress value={selected.progress} tone={selected.status==="Vertraagd"?"red":selected.status==="Gereed"?"green":"orange"} label="Werkelijke voortgang"/></div><dl className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-xs text-[#7a848a]">Start</dt><dd className="mt-1 font-extrabold">{formatDate(selected.startDate)}</dd></div><div><dt className="text-xs text-[#7a848a]">Einde</dt><dd className="mt-1 font-extrabold">{formatDate(selected.endDate)}</dd></div><div className="col-span-2"><dt className="text-xs text-[#7a848a]">Verantwoordelijke</dt><dd className="mt-1 font-extrabold">{selected.responsible}</dd></div></dl><div className="mt-5"><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7a848a]">Afhankelijkheden</p><div className="mt-2 space-y-2">{selected.dependencies.map(id=><button key={id} onClick={()=>setSelected(activities.find(item=>item.id===id)??selected)} className="w-full rounded-xl bg-[#eef1f2] p-3 text-left text-sm font-bold hover:bg-[#e2e6e7]">← {activities.find(item=>item.id===id)?.name}</button>)}{!selected.dependencies.length?<p className="text-sm text-[#7a848a]">Geen voorgangers.</p>:null}</div></div><Button className="mt-5 w-full" variant="secondary" onClick={()=>alert("In de 4D-weergave wordt het gekoppelde bouwdeel gemarkeerd.")}>Toon in 4D-model</Button></aside> : null}
      </div>
    </div>
  );
}
