import { ProjectPageShell } from "@/components/dashboard/ProjectPageShell";
import { SectionRouter } from "@/components/project/SectionRouter";

const projectIds = ["havenkwartier", "utrecht-kantoor", "dc-nijmegen", "school-eindhoven"];
const sections = ["activities", "documents", "issues", "team", "reporting"];

export const dynamicParams = false;

export function generateStaticParams() {
  return projectIds.flatMap((id) => sections.map((section) => ({ id, section })));
}

export default async function ProjectSectionPage({
  params,
}: {
  params: Promise<{ id: string; section: string }>;
}) {
  const { section } = await params;
  return (
    <ProjectPageShell>
      <SectionRouter section={section} />
    </ProjectPageShell>
  );
}
