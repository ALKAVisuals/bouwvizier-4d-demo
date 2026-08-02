"use client";

import { FormEvent, useMemo, useState } from "react";
import { team as seedTeam } from "@/lib/mock-data";
import type { ProjectRole, TeamMember } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

const roles: ProjectRole[] = ["Beheerder","Projectleider","Werkvoorbereider","Uitvoerder","Onderaannemer","Opdrachtgever","Alleen-lezen"];

export function TeamView() {
  const [members,setMembers]=useState<TeamMember[]>(seedTeam);
  const [query,setQuery]=useState("");
  const [role,setRole]=useState("Alle rollen");
  const [inviteOpen,setInviteOpen]=useState(false);
  const [feedback,setFeedback]=useState("");
  const [selected,setSelected]=useState<TeamMember|null>(null);
  const filtered=useMemo(()=>members.filter(member=>`${member.name} ${member.company} ${member.function}`.toLowerCase().includes(query.toLowerCase())&&(role==="Alle rollen"||member.role===role)),[members,query,role]);

  const invite=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const name=String(data.get("name")??"").trim();
    const company=String(data.get("company")??"").trim();
    const email=String(data.get("email")??"").trim();
    if(!name||!company||!email.includes("@")){setFeedback("Vul een naam, bedrijf en geldig e-mailadres in.");return;}
    const newRole=String(data.get("role")??"Alleen-lezen") as ProjectRole;
    setMembers(current=>[...current,{id:crypto.randomUUID(),name,function:"Projectpartner",company,role:newRole,lastActivity:"Uitnodiging verzonden",rights:newRole==="Alleen-lezen"?["Alleen bekijken"]:["Eigen activiteiten","Opmerkingen","Bijlagen"],initials:name.split(" ").map(part=>part[0]).join("").slice(0,2).toUpperCase()}]);
    setInviteOpen(false);setFeedback("");
  };

  return <div className="p-4 sm:p-6 lg:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Samenwerking</p><h2 className="mt-2 text-2xl font-black">Team en toegang</h2><p className="mt-2 text-sm text-[#68727a]">Beheer wie projectinformatie kan bekijken, toevoegen of wijzigen.</p></div><Button onClick={()=>setInviteOpen(true)}>＋ Gebruiker uitnodigen</Button></div><div className="mt-6 surface p-4"><div className="grid gap-3 sm:grid-cols-[1fr_220px_auto]"><input className="min-h-11 rounded-xl border border-[#d4d9dc] px-3 text-sm" placeholder="Zoek op naam, functie of bedrijf" value={query} onChange={e=>setQuery(e.target.value)}/><select className="min-h-11 rounded-xl border border-[#d4d9dc] bg-white px-3 text-sm font-bold" value={role} onChange={e=>setRole(e.target.value)}><option>Alle rollen</option>{roles.map(item=><option key={item}>{item}</option>)}</select><Button variant="ghost" onClick={()=>{setQuery("");setRole("Alle rollen");}}>Wissen</Button></div></div><div className="mt-6 surface overflow-hidden">{filtered.length?<div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-[#f4f5f3] text-[10px] uppercase tracking-[.08em] text-[#707a80]"><tr><th className="p-4">Naam</th><th className="p-4">Functie</th><th className="p-4">Bedrijf</th><th className="p-4">Rol</th><th className="p-4">Laatste activiteit</th><th className="p-4">Toegang</th><th className="p-4"></th></tr></thead><tbody>{filtered.map(member=><tr key={member.id} className="border-t border-[#e0e3e4]"><td className="p-4"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6e9e8] font-black">{member.initials}</span><strong>{member.name}</strong></div></td><td className="p-4">{member.function}</td><td className="p-4 font-bold">{member.company}</td><td className="p-4"><Badge tone={member.role==="Beheerder"?"orange":member.role==="Alleen-lezen"?"neutral":"blue"}>{member.role}</Badge></td><td className="p-4 text-[#68727a]">{member.lastActivity}</td><td className="p-4"><span className="text-xs font-bold">{member.rights.length} rechten</span></td><td className="p-4"><button className="rounded-lg border border-[#d4d9dc] px-3 py-2 text-xs font-extrabold" onClick={()=>setSelected(member)}>Beheer</button></td></tr>)}</tbody></table></div>:<div className="p-5"><EmptyState title="Geen teamleden gevonden" description="Pas de zoekterm of rolfilter aan."/></div>}</div>
  <Modal open={inviteOpen} title="Gebruiker uitnodigen" onClose={()=>setInviteOpen(false)}><form onSubmit={invite} className="space-y-4"><p className="rounded-xl bg-[#f5f6f4] p-3 text-sm text-[#657078]">De uitnodiging wordt alleen in lokale state toegevoegd; er wordt geen e-mail verstuurd.</p><label className="block text-sm font-bold">Naam<input name="name" className="mt-2 min-h-11 w-full rounded-xl border border-[#d4d9dc] px-3"/></label><label className="block text-sm font-bold">E-mailadres<input name="email" type="email" className="mt-2 min-h-11 w-full rounded-xl border border-[#d4d9dc] px-3"/></label><label className="block text-sm font-bold">Bedrijf<input name="company" className="mt-2 min-h-11 w-full rounded-xl border border-[#d4d9dc] px-3"/></label><label className="block text-sm font-bold">Rol<select name="role" className="mt-2 min-h-11 w-full rounded-xl border border-[#d4d9dc] bg-white px-3">{roles.map(item=><option key={item}>{item}</option>)}</select></label>{feedback?<p className="rounded-xl bg-[#fae9e7] p-3 text-sm font-bold text-[#a23d37]" role="alert">{feedback}</p>:null}<div className="flex justify-end gap-2"><Button type="button" variant="secondary" onClick={()=>setInviteOpen(false)}>Annuleren</Button><Button type="submit">Uitnodiging toevoegen</Button></div></form></Modal>
  <Modal open={Boolean(selected)} title="Toegangsrechten" onClose={()=>setSelected(null)}>{selected?<div><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#e7eae9] font-black">{selected.initials}</span><div><h3 className="font-black">{selected.name}</h3><p className="text-sm text-[#68727a]">{selected.company}</p></div></div><div className="mt-5 rounded-xl bg-[#f5f6f4] p-4"><p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#7a848a]">Huidige rol</p><p className="mt-2 font-black">{selected.role}</p></div><div className="mt-5 space-y-2">{selected.rights.map(right=><label key={right} className="flex items-center gap-3 rounded-xl border border-[#dce0e2] p-3 text-sm font-bold"><input type="checkbox" defaultChecked/>{right}</label>)}</div><Button className="mt-5 w-full" onClick={()=>{setSelected(null);alert("Rechten lokaal bijgewerkt voor de demo.");}}>Wijzigingen opslaan</Button></div>:null}</Modal>
  </div>;
}
