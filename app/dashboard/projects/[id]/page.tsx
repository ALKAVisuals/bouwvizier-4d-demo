import { Suspense } from "react";
import { ProjectPageShell } from "@/components/dashboard/ProjectPageShell";
import { FourDWorkspace } from "@/components/fourd/FourDWorkspace";

const projectIds = ["havenkwartier", "utrecht-kantoor", "dc-nijmegen", "school-eindhoven"];

export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

function WorkspaceFallback() {
  return (
    <div className="p-3 sm:p-4 lg:p-5">
      <div className="surface overflow-hidden">
        <div className="skeleton h-[760px] rounded-2xl" />
      </div>
    </div>
  );
}

export default function ProjectDashboardPage() {
  return (
    <ProjectPageShell>
      <Suspense fallback={<WorkspaceFallback />}>
        <FourDWorkspace />
      </Suspense>
    </ProjectPageShell>
  );
}
