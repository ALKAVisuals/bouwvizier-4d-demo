"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@bouwbedrijf.nl");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== "demo@bouwbedrijf.nl" || password !== "demo123") {
      setError("De ingevoerde demo-inloggegevens kloppen niet.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => router.push("/dashboard/projects"), 650);
  };

  return (
    <main className="grid min-h-screen bg-[#eef0ee] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#1c2226] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#e39a2f]/15 blur-3xl" />
        <Link href="/" className="relative z-10 flex items-center gap-3 font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#e6a446]">4D</span>BouwVizier</Link>
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow !text-[#e6a446]">Projectomgeving Van Dijk Bouwgroep</p>
          <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em]">Van planning naar gedeeld bouwbeeld.</h1>
          <p className="mt-6 max-w-lg leading-8 text-white/60">Bekijk fasering, voortgang, documenten en knelpunten in één visuele projectomgeving.</p>
          <div className="mt-9 grid grid-cols-3 gap-3">
            {[['4','Actieve projecten'],['6','Vertraagde activiteiten'],['8','Komende mijlpalen']].map(([value,label]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.045] p-4"><strong className="text-2xl">{value}</strong><p className="mt-1 text-xs leading-5 text-white/50">{label}</p></div>)}
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/35">Beveiligde demo-omgeving · fictieve projectgegevens</p>
      </section>

      <section className="grid place-items-center p-5 sm:p-10">
        <div className="w-full max-w-md animate-fade-up">
          <Link href="/" className="mb-9 flex items-center gap-3 font-black lg:hidden"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1d2226] text-[#e6a446]">4D</span>BouwVizier</Link>
          <p className="eyebrow">Welkom terug</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-.03em]">Inloggen op uw projectomgeving</h1>
          <p className="mt-3 text-sm leading-6 text-[#677179]">Gebruik de onderstaande demo-inloggegevens om de klikbare MVP te openen.</p>

          <div className="mt-6 rounded-2xl border border-[#dfc48f] bg-[#fbf4e7] p-4 text-sm">
            <div className="flex justify-between gap-3"><span className="text-[#786a50]">E-mail</span><strong>demo@bouwbedrijf.nl</strong></div>
            <div className="mt-2 flex justify-between gap-3"><span className="text-[#786a50]">Wachtwoord</span><strong>demo123</strong></div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <label className="block text-sm font-bold">E-mailadres<input className="mt-2 min-h-12 w-full rounded-xl border border-[#cfd5d8] bg-white px-4 outline-none transition focus:border-[#b67527]" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label className="block text-sm font-bold">Wachtwoord<input className="mt-2 min-h-12 w-full rounded-xl border border-[#cfd5d8] bg-white px-4 outline-none transition focus:border-[#b67527]" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {error ? <div className="rounded-xl border border-[#e5b6b1] bg-[#fbecea] p-3 text-sm font-bold text-[#a23d37]" role="alert">{error}</div> : null}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Projectomgeving laden…</> : "Inloggen en demo openen"}</Button>
          </form>
          <div className="mt-7 flex items-center justify-between border-t border-[#d8dddf] pt-5 text-xs text-[#737d84]"><span>Geen echte authenticatie</span><Link href="/" className="font-bold text-[#343b40]">← Terug naar homepage</Link></div>
        </div>
      </section>
    </main>
  );
}
