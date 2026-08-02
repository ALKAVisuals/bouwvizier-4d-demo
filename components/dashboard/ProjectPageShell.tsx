"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { projectForId } from "@/lib/mock-data";
import { formatDate, getWeekNumber } from "@/lib/date";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

const tabs = [
  { label: "4D-planning", section: "" },
  { label: "Activiteiten", section: "activities" },
  { label: "Documenten", section: "documents" },
  { label: "Aandachtspunten", section: "issues" },
  { label: "Team", section: "team" },
  { label: "Rapportage", section: "reporting" },
];

function ProjectMetrics({ project }: { project: Project }) {
  const deviation = project.progress - project.plannedProgress;
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {[
        ["Huidige week", `Week ${getWeekNumber(new Date("2026-08-02T12:00:00"))}`, "2 augustus 2026"],
        ["Geplande voortgang", `${project.plannedProgress}%`, "Volgens basisplanning"],
        ["Werkelijke voortgang", `${project.progress}%`, "Laatste update vrijdag"],
        ["Afwijking", `${deviation > 0 ? "+" : ""}${deviation}%`, deviation < 0 ? "Achter op planning" : "Voor op planning"],
        ["Volgende mijlpaal", project.nextMilestone, formatDate(project.nextMilestoneDate)],
      ].map(([label, value, meta], index) => <div key={label} className="rounded-xl border border-[#dce0e2] bg-white p-3.5"><p className="text-[10px] font-extrabold uppercase tracking-[.08em] text-[#7b858b]">{label}</p><p className={`mt-2 truncate font-black ${index===3 && deviation < 0 ? "text-[#b64841]" : ""}`} title={value}>{value}</p><p className="mt-1 text-[11px] text-[#7b858b]">{meta}</p></div>)}
    </div>
  );
}

export function ProjectPageShell({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const project = projectForId(params.id);

  return (
    <div className="min-w-0">
      <section className="border-b border-[#d9dddf] bg-[#f7f8f6] px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-start">
          <div><Link href="/dashboard/projects" className="text-xs font-extrabold text-[#68727a] hover:text-[#1d2226]">← Alle projecten</Link><div className="mt-3 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-black tracking-[-.03em] sm:text-3xl">{project.name}</h1><Badge tone={project.status === "Op schema" ? "green" : project.status === "Vertraagd" ? "red" : "orange"}>{project.status}</Badge></div><p className="mt-2 text-sm text-[#68727a]">{project.location} · {project.client} · {project.contractor}</p></div>
          <div className="flex flex-wrap gap-2"><button className="min-h-10 rounded-xl border border-[#d5dade] bg-white px-3 text-sm font-bold" onClick={() => alert("Deel-link gekopieerd voor deze demosessie.")}>Delen</button><button className="min-h-10 rounded-xl border border-[#d5dade] bg-white px-3 text-sm font-bold" onClick={() => window.print()}>Projectrapport</button><button className="min-h-10 rounded-xl bg-[#1d2226] px-4 text-sm font-extrabold text-white" onClick={() => alert("Projectinstellingen zijn zichtbaar in de uitgebreide productversie.")}>Project beheren</button></div>
        </div>
        <ProjectMetrics project={project} />
        <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-[#d8dcde]" aria-label="Projectonderdelen">
          {tabs.map((tab) => {
            const href = tab.section ? `/dashboard/projects/${project.id}/${tab.section}` : `/dashboard/projects/${project.id}`;
            const active = tab.section ? pathname.endsWith(`/${tab.section}`) : pathname === `/dashboard/projects/${project.id}`;
            return <Link key={tab.label} href={href} className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-extrabold ${active ? "border-[#d78a2d] text-[#1d2226]" : "border-transparent text-[#6c767d] hover:text-[#1d2226]"}`}>{tab.label}</Link>;
          })}
        </nav>
      </section>
      {children}
    </div>
  );
}
