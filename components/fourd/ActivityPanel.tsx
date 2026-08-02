"use client";

import { FormEvent, useMemo, useState } from "react";
import { activities } from "@/lib/mock-data";
import { formatDate } from "@/lib/date";
import type { Activity } from "@/lib/types";
import { useDemoStore } from "@/context/demo-store";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";

const toneForActivity = (status: Activity["status"]) => status === "Gereed" ? "green" : status === "Vertraagd" ? "red" : status === "In uitvoering" ? "orange" : status === "Gepland" ? "blue" : "neutral";

export function ActivityPanel({ selectedActivityId, onSelect, currentDate }: { selectedActivityId: string; onSelect: (id: string) => void; currentDate: Date }) {
  const [tab, setTab] = useState<"details" | "comments" | "files">("details");
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState("");
  const { comments, addComment, issues } = useDemoStore();
  const selected = activities.find((activity) => activity.id === selectedActivityId) ?? activities[0];
  const visible = useMemo(() => activities.filter((activity) => new Date(`${activity.startDate}T12:00:00`) <= new Date(currentDate.getTime() + 1000*60*60*24*70)), [currentDate]);

  const submitComment = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) {
      setFeedback("Schrijf eerst een opmerking.");
      return;
    }
    addComment(selected.id, comment);
    setComment("");
    setFeedback("Opmerking lokaal toegevoegd.");
    window.setTimeout(() => setFeedback(""), 1800);
  };

  return (
    <aside className="flex min-h-[560px] min-w-0 flex-col border-l border-[#d8dcde] bg-white xl:w-[390px]">
      <div className="border-b border-[#d8dcde] p-4">
        <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.1em] text-[#7a848a]">Activiteiten op tijdlijn</p><p className="mt-1 text-sm font-black">{visible.length} zichtbaar</p></div><select className="rounded-lg border border-[#d5dade] bg-white px-2 py-2 text-xs font-bold" aria-label="Activiteiten sorteren"><option>Planning</option><option>Status</option><option>Partij</option></select></div>
      </div>
      <div className="max-h-[245px] overflow-y-auto border-b border-[#d8dcde] p-2 scrollbar-thin">
        {visible.map((activity) => <button key={activity.id} className={`mb-1 w-full rounded-xl p-3 text-left transition ${selected.id === activity.id ? "bg-[#f4eadc] shadow-sm" : "hover:bg-[#f4f6f5]"}`} onClick={() => onSelect(activity.id)}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-extrabold">{activity.name}</p><p className="mt-1 truncate text-xs text-[#788188]">{activity.responsible}</p></div><Badge tone={toneForActivity(activity.status)}>{activity.status}</Badge></div><div className="mt-2 flex items-center gap-3"><div className="h-1.5 flex-1 rounded-full bg-[#e2e6e7]"><div className={`h-full rounded-full ${activity.status === "Vertraagd" ? "bg-[#bf4d45]" : activity.status === "Gereed" ? "bg-[#4d8b63]" : "bg-[#d9862b]"}`} style={{width:`${activity.progress}%`}} /></div><span className="text-[10px] font-black text-[#69737a]">{activity.progress}%</span></div></button>)}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="p-4 pb-0"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7a848a]">{selected.phase}</p><h2 className="mt-1 text-lg font-black leading-6">{selected.name}</h2></div><Badge tone={toneForActivity(selected.status)}>{selected.status}</Badge></div><div className="mt-4"><Progress value={selected.progress} tone={selected.status === "Vertraagd" ? "red" : selected.status === "Gereed" ? "green" : "orange"} label="Voortgang" /></div></div>
        <div className="mt-4 flex border-y border-[#e0e3e4] px-3">{([['details','Details'],['comments',`Opmerkingen (${(comments[selected.id]??[]).length})`],['files',`Bijlagen (${selected.attachments.length})`]] as const).map(([id,label]) => <button key={id} className={`border-b-2 px-2.5 py-3 text-xs font-extrabold ${tab===id?"border-[#d9862b] text-[#1d2226]":"border-transparent text-[#717b82]"}`} onClick={()=>setTab(id)}>{label}</button>)}</div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-thin">
          {tab === "details" ? <div className="space-y-5 text-sm">
            <p className="leading-6 text-[#5f6970]">{selected.description}</p>
            <dl className="grid grid-cols-2 gap-4"><div><dt className="text-xs text-[#7c868c]">Start</dt><dd className="mt-1 font-extrabold">{formatDate(selected.startDate)}</dd></div><div><dt className="text-xs text-[#7c868c]">Einde</dt><dd className="mt-1 font-extrabold">{formatDate(selected.endDate)}</dd></div><div className="col-span-2"><dt className="text-xs text-[#7c868c]">Verantwoordelijke partij</dt><dd className="mt-1 font-extrabold">{selected.responsible}</dd></div></dl>
            <div><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7c868c]">Afhankelijkheden</p><div className="mt-2 flex flex-wrap gap-2">{selected.dependencies.length ? selected.dependencies.map((id) => <button key={id} onClick={() => onSelect(id)} className="rounded-lg bg-[#eef1f2] px-2.5 py-1.5 text-xs font-bold hover:bg-[#e1e5e6]">{activities.find((item)=>item.id===id)?.name ?? id}</button>) : <span className="text-xs text-[#7c868c]">Geen voorgangers</span>}</div></div>
            <div><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7c868c]">Aandachtspunten</p><div className="mt-2 space-y-2">{issues.filter(issue => selected.issueIds.includes(issue.id) && issue.status !== "Opgelost").map(issue => <div key={issue.id} className="rounded-xl border border-[#e6bbb7] bg-[#fbecea] p-3"><p className="font-extrabold text-[#9f3e38]">{issue.title}</p><p className="mt-1 text-xs text-[#795d5a]">Deadline {formatDate(issue.deadline)}</p></div>)}{!issues.some(issue => selected.issueIds.includes(issue.id) && issue.status !== "Opgelost") ? <p className="rounded-xl bg-[#eef4ef] p-3 text-xs font-bold text-[#4c7057]">Geen open aandachtspunten voor deze activiteit.</p> : null}</div></div>
          </div> : null}

          {tab === "comments" ? <div><div className="space-y-3">{(comments[selected.id] ?? []).map(item => <div key={item.id} className="rounded-xl bg-[#f4f6f5] p-3"><div className="flex justify-between gap-3"><strong className="text-xs">{item.author}</strong><span className="text-[10px] text-[#838c91]">{item.createdAt}</span></div><p className="mt-2 text-sm leading-5 text-[#566169]">{item.text}</p></div>)}{!(comments[selected.id]??[]).length ? <p className="rounded-xl border border-dashed border-[#d4d9dc] p-5 text-center text-sm text-[#758087]">Nog geen opmerkingen bij deze activiteit.</p> : null}</div><form className="mt-4" onSubmit={submitComment}><label className="text-xs font-extrabold">Nieuwe opmerking<textarea className="mt-2 min-h-24 w-full resize-y rounded-xl border border-[#d1d7da] p-3 text-sm" value={comment} onChange={(event)=>setComment(event.target.value)} placeholder="Leg een besluit, vraag of observatie vast…" /></label>{feedback ? <p className="mt-2 text-xs font-bold text-[#a35f13]" role="status">{feedback}</p> : null}<Button size="sm" className="mt-3 w-full" type="submit">Opmerking toevoegen</Button></form></div> : null}

          {tab === "files" ? <div className="space-y-2">{selected.attachments.map(file => <button key={file.name} className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#dce0e2] p-3 text-left hover:bg-[#f6f7f6]" onClick={() => alert(`${file.name} is een mockbijlage in deze demo.`)}><span className="min-w-0"><strong className="block truncate text-sm">{file.name}</strong><span className="mt-1 block text-xs text-[#7c868c]">Gekoppeld aan {selected.name}</span></span><span className="rounded bg-[#eef1f2] px-2 py-1 text-[10px] font-extrabold">{file.type}</span></button>)}{!selected.attachments.length ? <p className="text-sm text-[#758087]">Geen bijlagen gekoppeld.</p> : null}</div> : null}
        </div>
      </div>
    </aside>
  );
}
