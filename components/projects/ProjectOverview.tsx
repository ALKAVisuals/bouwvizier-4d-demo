"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { projects as seedProjects, projectStats } from "@/lib/mock-data";
import type { Project, ProjectStatus } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

const toneForStatus = (status: ProjectStatus) => status === "Op schema" ? "green" : status === "Vertraagd" ? "red" : "orange";

function ProjectVisual({ project }: { project: Project }) {
  const palette = project.status === "Vertraagd" ? ["#7c878d", "#bf4d45"] : project.status === "Aandacht nodig" ? ["#64777e", "#d9862b"] : ["#627980", "#4d8b63"];
  return (
    <div className="grid-bg relative h-40 overflow-hidden bg-[#e7e9e6]">
      <div className="absolute inset-x-9 bottom-5 h-4 rounded-sm bg-[#b7c0c3] shadow-lg" />
      <div className="absolute bottom-9 left-[18%] h-18 w-[30%] border-4 bg-white/75 shadow-lg" style={{ borderColor: palette[0] }} />
      <div className="absolute bottom-9 right-[18%] h-24 w-[30%] border-4 bg-white/75 shadow-lg" style={{ borderColor: palette[1] }} />
      <div className="absolute bottom-[116px] left-[30%] h-3 w-[40%] bg-[#c7ced1]" />
      <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold shadow-sm">{project.type}</span>
    </div>
  );
}

export function ProjectOverview() {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Alle statussen");
  const [type, setType] = useState("Alle typen");
  const [modalOpen, setModalOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.location} ${project.client}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "Alle statussen" || project.status === status) && (type === "Alle typen" || project.type === type);
  }), [projects, query, status, type]);

  const addProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();
    if (!name || !location) {
      setFormError("Vul minimaal een projectnaam en locatie in.");
      return;
    }
    const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`;
    setProjects((current) => [{
      id,
      name,
      location,
      client: String(data.get("client") || "Nog te bepalen"),
      contractor: "Van Dijk Bouwgroep",
      startDate: "2026-09-01",
      endDate: "2027-06-30",
      progress: 0,
      plannedProgress: 0,
      status: "Op schema",
      openIssues: 0,
      nextMilestone: "Projectinrichting afronden",
      nextMilestoneDate: "2026-09-05",
      type: String(data.get("type") || "Woningbouw"),
    }, ...current]);
    setModalOpen(false);
    setFormError("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow">Portfolio</p><h1 className="mt-2 text-3xl font-black tracking-[-.035em]">Actieve bouwprojecten</h1><p className="mt-2 text-sm text-[#68727a]">Bekijk voortgang, open punten en de eerstvolgende mijlpalen.</p></div>
        <Button onClick={() => setModalOpen(true)}>＋ Nieuw project</Button>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Portefeuillestatistieken">
        {[
          ["Actieve projecten", projectStats.activeProjects, "Binnen de organisatie"],
          ["Vertraagde activiteiten", projectStats.delayedActivities, "Over alle projecten"],
          ["Mijlpalen komende 30 dagen", projectStats.milestonesNext30Days, "2 vragen aandacht"],
          ["Projectgebruikers", projectStats.teamMembers, "6 externe partners"],
        ].map(([label, value, note], index) => <article key={String(label)} className="surface p-5"><div className="flex items-start justify-between"><span className="text-sm font-bold text-[#657078]">{label}</span><span className={`status-dot ${index===1 ? "bg-[#bf4d45]" : index===2 ? "bg-[#d9862b]" : "bg-[#4d8b63]"}`} /></div><strong className="mt-3 block text-3xl font-black">{value}</strong><p className="mt-1 text-xs text-[#80898f]">{note}</p></article>)}
      </section>

      <section className="mt-7 surface p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_190px_170px_auto]">
          <label className="relative"><span className="sr-only">Project zoeken</span><span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#818a90]">⌕</span><input className="min-h-11 w-full rounded-xl border border-[#d5dade] bg-white pl-9 pr-3 text-sm" placeholder="Zoek op project, locatie of opdrachtgever" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <select className="min-h-11 rounded-xl border border-[#d5dade] bg-white px-3 text-sm font-bold" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter op status"><option>Alle statussen</option><option>Op schema</option><option>Aandacht nodig</option><option>Vertraagd</option></select>
          <select className="min-h-11 rounded-xl border border-[#d5dade] bg-white px-3 text-sm font-bold" value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter op type"><option>Alle typen</option>{Array.from(new Set(projects.map((project) => project.type))).map((projectType) => <option key={projectType}>{projectType}</option>)}</select>
          <Button variant="ghost" onClick={() => { setQuery(""); setStatus("Alle statussen"); setType("Alle typen"); }}>Filters wissen</Button>
        </div>
      </section>

      <div className="mt-6">
        {filtered.length ? <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">{filtered.map((project) => <article key={project.id} className="surface overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"><ProjectVisual project={project}/><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.08em] text-[#7a848a]">{project.location}</p><h2 className="mt-1 text-lg font-extrabold leading-6">{project.name}</h2></div><Badge tone={toneForStatus(project.status)}>{project.status}</Badge></div><dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs"><div><dt className="text-[#7a848a]">Opdrachtgever</dt><dd className="mt-1 truncate font-bold" title={project.client}>{project.client}</dd></div><div><dt className="text-[#7a848a]">Looptijd</dt><dd className="mt-1 font-bold">{formatDate(project.startDate,{day:"2-digit",month:"short"})} – {formatDate(project.endDate,{day:"2-digit",month:"short",year:"2-digit"})}</dd></div></dl><div className="mt-5"><Progress value={project.progress} tone={project.status === "Vertraagd" ? "red" : project.status === "Aandacht nodig" ? "orange" : "green"} label="Werkelijke voortgang"/></div><div className="mt-5 flex items-center justify-between border-t border-[#e1e4e5] pt-4"><span className={`text-sm font-extrabold ${project.openIssues ? "text-[#ad473f]" : "text-[#4d8b63]"}`}>{project.openIssues} open aandachtspunten</span>{seedProjects.some((item) => item.id === project.id) ? <Link href={`/dashboard/projects/${project.id}`} className="rounded-xl bg-[#1d2226] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-black">Open project →</Link> : <button className="rounded-xl bg-[#1d2226] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-black" onClick={() => alert("Dit lokaal toegevoegde project moet eerst worden ingericht voordat de 4D-werkruimte beschikbaar is.")}>Inrichten →</button>}</div></div></article>)}</section> : <EmptyState title="Geen projecten gevonden" description="Pas de zoekterm of filters aan om projecten in deze demo te tonen." action={<Button variant="secondary" onClick={() => {setQuery(""); setStatus("Alle statussen"); setType("Alle typen");}}>Alle projecten tonen</Button>} />}
      </div>

      <Modal open={modalOpen} title="Nieuw demoproject" onClose={() => setModalOpen(false)}>
        <form onSubmit={addProject} className="space-y-4">
          <p className="rounded-xl bg-[#f5f6f4] p-3 text-sm text-[#657078]">Dit voegt een lokaal project toe aan de huidige demosessie. Er wordt geen backend aangeroepen.</p>
          <label className="block text-sm font-bold">Projectnaam<input name="name" className="mt-2 min-h-11 w-full rounded-xl border border-[#d2d7da] px-3" placeholder="Bijv. Nieuwbouw zorgcentrum Arnhem" /></label>
          <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-bold">Locatie<input name="location" className="mt-2 min-h-11 w-full rounded-xl border border-[#d2d7da] px-3" placeholder="Arnhem" /></label><label className="block text-sm font-bold">Projecttype<select name="type" className="mt-2 min-h-11 w-full rounded-xl border border-[#d2d7da] bg-white px-3"><option>Woningbouw</option><option>Utiliteit</option><option>Renovatie</option><option>Logistiek</option></select></label></div>
          <label className="block text-sm font-bold">Opdrachtgever<input name="client" className="mt-2 min-h-11 w-full rounded-xl border border-[#d2d7da] px-3" placeholder="Naam organisatie" /></label>
          {formError ? <p className="rounded-xl bg-[#fae9e7] p-3 text-sm font-bold text-[#a53e38]" role="alert">{formError}</p> : null}
          <div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Annuleren</Button><Button type="submit">Project toevoegen</Button></div>
        </form>
      </Modal>
    </div>
  );
}
