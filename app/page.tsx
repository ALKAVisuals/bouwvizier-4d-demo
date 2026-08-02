import Link from "next/link";
import { HeroDashboardPreview } from "@/components/marketing/HeroDashboardPreview";

const problems = [
  ["Versnipperde informatie", "Planning, modellen, verslagen en voortgang staan in verschillende systemen en bestanden."],
  ["Te late signalering", "Knelpunten worden vaak pas zichtbaar wanneer een activiteit al invloed heeft op de bouwstroom."],
  ["Moeilijk uit te leggen", "Een traditionele balkenplanning maakt ruimtelijke afhankelijkheden niet direct begrijpelijk."],
];

const benefits = [
  ["Uitvoerder", "Ziet per dag welke bouwdelen actief zijn en waar afwijkingen ontstaan."],
  ["Werkvoorbereider", "Koppelt activiteiten, documenten, partijen en aandachtspunten aan één visuele context."],
  ["Projectleider", "Vergelijkt geplande en werkelijke voortgang en stuurt eerder bij op kritieke fasen."],
  ["Opdrachtgever", "Krijgt een helder, betrouwbaar voortgangsbeeld zonder technische planning te ontleden."],
];

export default function MarketingPage() {
  return (
    <main className="overflow-hidden bg-[#f4f5f3]">
      <header className="sticky top-0 z-50 border-b border-[#dce0e2]/85 bg-[#f4f5f3]/90 backdrop-blur-xl">
        <div className="container-shell flex h-18 items-center justify-between gap-5">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1d2226] text-[#e6a446]">4D</span><span>BouwVizier</span></Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-[#505a61] md:flex" aria-label="Hoofdnavigatie"><a href="#product">Product</a><a href="#werkwijze">Werkwijze</a><a href="#prijzen">Prijzen</a><a href="#faq">FAQ</a></nav>
          <div className="flex items-center gap-2"><Link href="/login" className="hidden rounded-xl px-3 py-2 text-sm font-bold hover:bg-white sm:inline-flex">Inloggen</Link><Link href="/login" className="rounded-xl bg-[#1d2226] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-black">Bekijk demo</Link></div>
        </div>
      </header>

      <section className="relative border-b border-[#dde1e2] bg-[#efeee9] py-18 lg:py-24">
        <div className="pointer-events-none absolute -right-28 -top-40 h-[500px] w-[500px] rounded-full bg-[#e2a143]/15 blur-3xl" />
        <div className="container-shell grid items-center gap-14 lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative z-10 animate-fade-up">
            <p className="eyebrow">4D-planning voor de bouw</p>
            <h1 className="mt-5 max-w-2xl text-balance text-5xl font-black leading-[1.03] tracking-[-.045em] text-[#171a1d] sm:text-6xl">Maak uw bouwplanning zichtbaar</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d676e]">Verbind uw 3D-model met de projectplanning en geef uw team direct inzicht in fasering, voortgang en knelpunten.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/login" className="rounded-xl bg-[#1d2226] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg hover:bg-black">Bekijk interactieve demo →</Link><a href="#contact" className="rounded-xl border border-[#cfd5d8] bg-white px-5 py-3.5 text-sm font-extrabold hover:bg-[#fafafa]">Plan een kennismaking</a></div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-[#59636a]"><span>✓ Geen IFC-koppeling nodig voor demo</span><span>✓ Ingericht voor Nederlandse bouwteams</span></div>
          </div>
          <div className="relative animate-fade-up [animation-delay:120ms]"><HeroDashboardPreview /></div>
        </div>
      </section>

      <section className="py-22">
        <div className="container-shell">
          <div className="max-w-2xl"><p className="eyebrow">Waarom het misgaat</p><h2 className="mt-4 text-4xl font-black tracking-[-.035em]">Een planning is pas waardevol als iedereen hem begrijpt.</h2><p className="mt-4 leading-7 text-[#647078]">Bouwteams beschikken over veel informatie, maar missen vaak één gedeeld beeld van wat waar en wanneer gebeurt.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{problems.map(([title, description], index) => <article key={title} className="surface p-6"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5ead9] font-black text-[#a45f12]">0{index+1}</span><h3 className="mt-6 text-lg font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657078]">{description}</p></article>)}</div>
        </div>
      </section>

      <section id="product" className="border-y border-[#dce1e2] bg-[#1c2125] py-22 text-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="eyebrow !text-[#e6a446]">Van 3D naar 4D</p><h2 className="mt-4 text-4xl font-black tracking-[-.035em]">Zie de bouwvolgorde, niet alleen de eindvorm.</h2><p className="mt-5 max-w-xl leading-7 text-white/65">Elke activiteit wordt gekoppeld aan relevante bouwdelen. Door de tijdlijn te verschuiven ziet het team direct wat gereed is, wat nu loopt en waar vertraging invloed heeft.</p><ul className="mt-7 space-y-3 text-sm font-bold text-white/85"><li>● Statuskleuren per bouwdeel</li><li>● Filters op fase, partij en periode</li><li>● Aandachtspunten en documenten in context</li></ul></div>
          <div className="grid gap-4 sm:grid-cols-2">{[["Gepland","Blauw","#3f78b8"],["In uitvoering","Oranje","#d9862b"],["Gereed","Groen","#4d8b63"],["Vertraagd","Rood","#bf4d45"]].map(([title,label,color]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><span className="block h-2 w-16 rounded-full" style={{background:color}}/><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/55">{label} maakt de status ook zonder planningservaring direct herkenbaar.</p></div>)}</div>
        </div>
      </section>

      <section className="py-22"><div className="container-shell"><div className="text-center"><p className="eyebrow">Voor het hele projectteam</p><h2 className="mt-4 text-4xl font-black tracking-[-.035em]">Eén beeld, verschillende verantwoordelijkheden.</h2></div><div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, description]) => <article key={title} className="surface p-6"><h3 className="font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657078]">{description}</p></article>)}</div></div></section>

      <section id="werkwijze" className="border-y border-[#dce1e2] bg-white py-22"><div className="container-shell"><p className="eyebrow">In drie stappen operationeel</p><div className="mt-10 grid gap-8 lg:grid-cols-3">{[["01","Documenten aanleveren","U levert planning, model, bestek en relevante werkafspraken aan."],["02","Project wordt ingericht","Wij structureren fasen, activiteiten, bouwdelen, rollen en signaleringen."],["03","Team krijgt toegang","Projectpartners werken in een beveiligde omgeving met één actueel projectbeeld."]].map(([n,t,d]) => <div key={n} className="relative border-t-2 border-[#20262a] pt-5"><span className="text-sm font-black text-[#b26b18]">{n}</span><h3 className="mt-3 text-xl font-extrabold">{t}</h3><p className="mt-3 text-sm leading-6 text-[#657078]">{d}</p></div>)}</div></div></section>

      <section className="py-22"><div className="container-shell"><div className="surface overflow-hidden bg-[#23292d] text-white"><div className="grid gap-8 p-7 lg:grid-cols-[.7fr_1.3fr] lg:p-12"><div><p className="eyebrow !text-[#e6a446]">Interactieve productpreview</p><h2 className="mt-4 text-3xl font-black tracking-[-.03em]">Verplaats de tijd. Zie het gebouw veranderen.</h2><p className="mt-4 text-sm leading-7 text-white/60">De volledige demo bevat een draaibaar 3D-model, fasefilters, tijdlijnanimatie, activiteitendetails, opmerkingen en lokale statussen.</p><Link href="/login" className="mt-7 inline-flex rounded-xl bg-[#e6a446] px-5 py-3 text-sm font-extrabold text-[#1d2226]">Open het projectdashboard</Link></div><HeroDashboardPreview /></div></div></div></section>

      <section id="prijzen" className="border-y border-[#dce1e2] bg-[#efeee9] py-22"><div className="container-shell grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Prijsindicatie</p><h2 className="mt-4 text-4xl font-black tracking-[-.035em]">Schaalbaar per actief project.</h2><p className="mt-4 leading-7 text-[#647078]">Start klein met één project en breid uit zodra de werkwijze binnen uw organisatie is bewezen.</p></div><div className="surface p-7"><div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e0e3e4] pb-6"><div><p className="text-sm font-bold text-[#69737a]">Basisplatform</p><p className="mt-2 text-4xl font-black">vanaf €200 <span className="text-base font-bold text-[#69737a]">/ maand</span></p></div><span className="rounded-full bg-[#e8f1e9] px-3 py-1.5 text-xs font-extrabold text-[#3f7350]">1 actief project inbegrepen</span></div><div className="grid gap-5 py-6 sm:grid-cols-2"><div><p className="font-extrabold">Extra actief project</p><p className="mt-2 text-2xl font-black">€50</p><p className="text-sm text-[#69737a]">per project per maand</p></div><div><p className="font-extrabold">Projectinrichting</p><p className="mt-2 text-2xl font-black">vanaf €50</p><p className="text-sm text-[#69737a]">per uur</p></div></div><p className="rounded-xl bg-[#f5f6f4] p-4 text-sm leading-6 text-[#657078]">De definitieve prijs is afhankelijk van projectomvang, modelkwaliteit, planningsdetail en de gewenste ondersteuning tijdens projectoverleggen.</p></div></div></section>

      <section id="faq" className="py-22"><div className="container-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Veelgestelde vragen</p><h2 className="mt-4 text-4xl font-black tracking-[-.035em]">Praktisch starten zonder zware implementatie.</h2></div><div className="space-y-3">{[["Is een perfect BIM-model noodzakelijk?","Nee. Voor de eerste inrichting kan ook een vereenvoudigd model worden gebruikt, zolang bouwdelen logisch te koppelen zijn aan fasen."],["Vervangt dit onze bestaande planning?","Nee. Het platform visualiseert en verrijkt de bestaande planning; bronbestanden en verantwoordelijkheden blijven bij het projectteam."],["Kunnen onderaannemers beperkte toegang krijgen?","Ja. Rollen kunnen worden ingericht voor beheerder, projectleider, uitvoerder, onderaannemer, opdrachtgever en alleen-lezen."],["Is de demo al gekoppeld aan IFC of planningssoftware?","Deze MVP gebruikt lokale mockdata en een gestileerd model. Echte koppelingen horen bij een volgende productfase."]].map(([q,a]) => <details key={q} className="surface group p-5"><summary className="cursor-pointer list-none font-extrabold">{q}<span className="float-right text-xl transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-2xl text-sm leading-6 text-[#657078]">{a}</p></details>)}</div></div></section>

      <section id="contact" className="bg-[#1d2226] py-18 text-white"><div className="container-shell flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow !text-[#e6a446]">Klaar voor een beter projectgesprek?</p><h2 className="mt-3 text-3xl font-black">Laat de planning zien in plaats van haar uit te leggen.</h2></div><div className="flex flex-wrap gap-3"><Link href="/login" className="rounded-xl bg-[#e6a446] px-5 py-3 text-sm font-extrabold text-[#1d2226]">Bekijk interactieve demo</Link><a href="mailto:demo@bouwvizier.nl" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-extrabold">Plan een kennismaking</a></div></div></section>
      <footer className="bg-[#15191c] py-8 text-sm text-white/45"><div className="container-shell flex flex-wrap justify-between gap-4"><span>© 2026 BouwVizier 4D · Conceptdemo</span><span>Alle projectdata in deze demo is fictief.</span></div></footer>
    </main>
  );
}
