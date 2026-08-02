import { ActivitiesView } from "./ActivitiesView";
import { DocumentsView } from "./DocumentsView";
import { IssuesView } from "./IssuesView";
import { TeamView } from "./TeamView";
import { ReportingView } from "./ReportingView";

export function SectionRouter({ section }: { section: string }) {
  if (section === "activities") return <ActivitiesView />;
  if (section === "documents") return <DocumentsView />;
  if (section === "issues") return <IssuesView />;
  if (section === "team") return <TeamView />;
  if (section === "reporting") return <ReportingView />;
  return <div className="p-8"><div className="surface p-8"><h2 className="text-xl font-black">Onderdeel niet gevonden</h2><p className="mt-2 text-sm text-[#68727a]">Gebruik de projecttabbladen om naar een beschikbaar onderdeel te navigeren.</p></div></div>;
}
