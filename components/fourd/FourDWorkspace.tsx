"use client";

import { useMemo, useRef, useState } from "react";
import { activities, buildingParts, phases } from "@/lib/mock-data";
import type { BuildingPhase } from "@/lib/types";
import { BuildingViewer } from "./BuildingViewer";
import { Timeline } from "./Timeline";
import { ActivityPanel } from "./ActivityPanel";
import { partStatusAtDate, statusColors } from "./status";

export function FourDWorkspace() {
  const [currentDate, setCurrentDate] = useState(new Date("2026-08-02T12:00:00"));
  const [enabledPhases, setEnabledPhases] = useState<Set<BuildingPhase>>(new Set(phases));
  const [selectedActivityId, setSelectedActivityId] = useState("staalconstructie");
  const [selectedPartId, setSelectedPartId] = useState<string | null>("frame-left");
  const [resetSignal, setResetSignal] = useState(0);
  const [viewerError, setViewerError] = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);

  const selectedPart = buildingParts.find(part => part.id === selectedPartId);
  const activeCounts = useMemo(() => phases.reduce<Record<string, number>>((result, phase) => {
    result[phase] = buildingParts.filter(part => part.phase === phase && partStatusAtDate(part, currentDate) !== "Niet gestart").length;
    return result;
  }, {}), [currentDate]);

  const selectPart = (partId: string) => {
    setSelectedPartId(partId || null);
    const part = buildingParts.find(item => item.id === partId);
    if (part) setSelectedActivityId(part.activityId);
  };

  const selectActivity = (activityId: string) => {
    setSelectedActivityId(activityId);
    const activity = activities.find(item => item.id === activityId);
    const firstVisible = buildingParts.find(part => activity?.modelPartIds.includes(part.id));
    if (firstVisible) setSelectedPartId(firstVisible.id);
  };

  const togglePhase = (phase: BuildingPhase) => setEnabledPhases(current => {
    const next = new Set(current);
    if (next.has(phase)) next.delete(phase); else next.add(phase);
    return next;
  });

  const fullscreen = async () => {
    try {
      if (!viewerRef.current?.requestFullscreen) throw new Error();
      await viewerRef.current.requestFullscreen();
    } catch {
      setViewerError("Fullscreen wordt in deze browser niet ondersteund.");
      window.setTimeout(() => setViewerError(""), 2400);
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-5">
      <section className="surface overflow-hidden">
        <div className="grid min-h-[690px] xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0">
            <div ref={viewerRef} className="relative h-[520px] bg-[#edf0ef] sm:h-[570px] xl:h-[600px]">
              <BuildingViewer parts={buildingParts} currentDate={currentDate} enabledPhases={enabledPhases} selectedPartId={selectedPartId} onSelect={selectPart} resetSignal={resetSignal} />
              <div className="absolute left-3 top-3 max-w-[calc(100%-24px)] rounded-xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur sm:left-4 sm:top-4">
                <div className="flex flex-wrap items-center gap-2"><strong className="text-sm">3D-bouwmodel</strong><span className="rounded bg-[#eef1f2] px-2 py-1 text-[10px] font-extrabold">GESTILEERD DEMOMODEL</span></div>
                <p className="mt-1 text-xs text-[#68727a]">Sleep om te draaien · scroll om te zoomen · klik een bouwdeel</p>
              </div>
              <div className="absolute right-3 top-3 flex gap-2 sm:right-4 sm:top-4"><button className="grid h-10 min-w-10 place-items-center rounded-xl border border-white/70 bg-white/90 px-3 text-xs font-extrabold shadow-lg backdrop-blur hover:bg-white" onClick={() => setResetSignal(value => value + 1)} title="Camera resetten">↻ <span className="hidden sm:inline">Reset</span></button><button className="grid h-10 min-w-10 place-items-center rounded-xl border border-white/70 bg-white/90 px-3 text-xs font-extrabold shadow-lg backdrop-blur hover:bg-white" onClick={fullscreen} title="Fullscreen openen">⛶</button></div>
              {viewerError ? <div className="absolute right-4 top-16 rounded-xl bg-[#a94740] px-3 py-2 text-xs font-bold text-white shadow-lg" role="alert">{viewerError}</div> : null}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[520px]">
                <div className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">{Object.entries(statusColors).map(([status,color]) => <span key={status} className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#59646b]"><span className="h-2.5 w-2.5 rounded-full" style={{background:color}}/>{status}</span>)}</div>
                </div>
                {selectedPart ? <div className="rounded-xl bg-[#1d2226]/92 p-3 text-white shadow-lg backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-white/50">Geselecteerd bouwdeel</p><div className="mt-1 flex items-center justify-between gap-4"><strong className="text-sm">{selectedPart.name}</strong><span className="text-xs font-bold text-[#e6a446]">{partStatusAtDate(selectedPart,currentDate)}</span></div></div> : null}
              </div>
            </div>

            <div className="border-t border-[#d8dcde] bg-[#f7f8f6] p-3 sm:p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.1em] text-[#778188]">Fasefilters</p><p className="mt-1 text-xs text-[#778188]">Toon of verberg modelonderdelen per bouwfase.</p></div><div className="flex flex-wrap gap-2">{phases.map(phase => <button key={phase} onClick={()=>togglePhase(phase)} aria-pressed={enabledPhases.has(phase)} className={`rounded-xl border px-3 py-2 text-xs font-extrabold transition ${enabledPhases.has(phase)?"border-[#bfc7cb] bg-white text-[#20262a] shadow-sm":"border-transparent bg-[#e4e7e7] text-[#8a9297] line-through"}`}><span className={`mr-2 inline-block h-2 w-2 rounded-full ${activeCounts[phase] ? "bg-[#d9862b]" : "bg-[#adb5b9]"}`}/>{phase} <span className="ml-1 text-[10px] text-[#8a9297]">{activeCounts[phase]}</span></button>)}</div></div>
            </div>
            <Timeline startDate="2026-02-02" endDate="2027-03-19" currentDate={currentDate} onDateChange={setCurrentDate} activities={activities} />
          </div>
          <ActivityPanel selectedActivityId={selectedActivityId} onSelect={selectActivity} currentDate={currentDate} />
        </div>
      </section>
    </div>
  );
}
