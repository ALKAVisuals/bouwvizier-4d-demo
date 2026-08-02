export function HeroDashboardPreview() {
  return (
    <div className="relative rounded-[28px] border border-white/10 bg-[#20262a] p-3 shadow-[0_35px_80px_rgba(0,0,0,.25)]">
      <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 px-4 py-3 text-white/70">
        <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#bd5b50]"/><span className="h-2.5 w-2.5 rounded-full bg-[#d9a64b]"/><span className="h-2.5 w-2.5 rounded-full bg-[#6d9a75]"/></div>
        <span className="text-[10px] font-bold tracking-[.18em]">BOUWVIZIER 4D</span>
        <span className="h-5 w-5 rounded-full bg-white/10" />
      </div>
      <div className="grid min-h-[390px] grid-cols-[1fr_155px] overflow-hidden rounded-b-2xl bg-[#f3f4f2] max-sm:grid-cols-1">
        <div className="relative grid-bg p-5">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#778087]">Havenkwartier</p><h3 className="mt-1 text-sm font-extrabold">4D-planning · week 31</h3></div>
            <span className="rounded-full bg-[#f8ead7] px-2 py-1 text-[9px] font-extrabold text-[#9e5c12]">−4% afwijking</span>
          </div>
          <div className="absolute inset-x-8 bottom-24 top-20 [perspective:850px]">
            <div className="relative mx-auto h-full max-w-[320px] [transform:rotateX(58deg)_rotateZ(-31deg)] [transform-style:preserve-3d]">
              <div className="absolute left-[8%] top-[55%] h-[24%] w-[82%] rounded-sm bg-[#9babb3] shadow-xl [transform:translateZ(4px)]" />
              <div className="absolute left-[12%] top-[31%] h-[25%] w-[34%] border-4 border-[#cb6e2d] bg-[#f0b36d] [transform:translateZ(40px)]" />
              <div className="absolute right-[12%] top-[31%] h-[25%] w-[34%] border-4 border-[#58906b] bg-[#92b89d] [transform:translateZ(42px)]" />
              <div className="absolute left-[14%] top-[10%] h-[22%] w-[72%] border-4 border-[#4e79a9] bg-[#9ab4ce] [transform:translateZ(82px)]" />
              <div className="absolute left-[18%] top-[1%] h-[10%] w-[64%] bg-[#d8dde0] [transform:translateZ(96px)]" />
              <div className="absolute left-[4%] top-[72%] h-2 w-[92%] bg-[#d8a13f] [transform:translateZ(2px)]" />
            </div>
          </div>
          <div className="absolute inset-x-5 bottom-4 rounded-xl border border-[#d9dddf] bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-[9px] font-bold text-[#69737a]"><span>Mei</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div>
            <div className="relative h-2 rounded-full bg-[#e5e8e9]"><div className="h-full w-[48%] rounded-full bg-[#d9862b]"/><span className="absolute left-[47%] top-1/2 h-4 w-1 -translate-y-1/2 rounded bg-[#20262a]"/></div>
            <div className="mt-2 flex items-center justify-between text-[9px]"><span className="font-bold">Week 31 · 2 augustus</span><span className="text-[#69737a]">▶ Afspelen</span></div>
          </div>
        </div>
        <div className="border-l border-[#dde1e3] bg-white p-3 max-sm:hidden">
          <p className="text-[9px] font-extrabold uppercase tracking-[.12em] text-[#788188]">Activiteiten</p>
          {[
            ["Staalconstructie","88%","#bf4d45"],
            ["Gevelsluiting","42%","#d9862b"],
            ["Dakwerk","35%","#d9862b"],
            ["Installaties","12%","#3f78b8"],
          ].map(([name, value, color]) => <div key={name} className="mt-3 rounded-lg border border-[#e1e4e5] p-2.5"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background: color}}/><span className="text-[10px] font-bold">{name}</span></div><div className="mt-2 h-1 rounded bg-[#eceeef]"><div className="h-full rounded" style={{width:value, background:color}}/></div><p className="mt-1 text-right text-[9px] text-[#737c82]">{value}</p></div>)}
        </div>
      </div>
    </div>
  );
}
