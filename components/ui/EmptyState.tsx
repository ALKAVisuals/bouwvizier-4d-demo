export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-[#cfd5d8] bg-[#fafbfa] p-8 text-center">
      <div>
        <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#ecefed] text-xl">⌕</div>
        <h3 className="font-extrabold">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#657078]">{description}</p>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}
