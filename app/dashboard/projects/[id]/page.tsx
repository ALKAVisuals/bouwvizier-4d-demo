import { ProjectPageShell } from "@/components/dashboard/ProjectPageShell";
import { FourDWorkspace } from "@/components/fourd/FourDWorkspace";

const projectIds = ["havenkwartier", "utrecht-kantoor", "dc-nijmegen", "school-eindhoven"];

export function generateStaticParams() {
  return projectIds.map((id) => ({ id }));
}

export default function ProjectDashboardPage() {
  return <ProjectPageShell><FourDWorkspace /></ProjectPageShell>;
}
