export default function DashboardLoading() {
  return <div className="p-5 sm:p-7 lg:p-9"><div className="skeleton h-8 w-72 rounded-lg"/><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({length:4}).map((_,index)=><div key={index} className="skeleton h-28 rounded-2xl"/>)}</div><div className="mt-7 grid gap-5 lg:grid-cols-3">{Array.from({length:3}).map((_,index)=><div key={index} className="skeleton h-72 rounded-2xl"/>)}</div></div>;
}
