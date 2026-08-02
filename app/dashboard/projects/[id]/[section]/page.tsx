import { ProjectPageShell } from "@/components/dashboard/ProjectPageShell";
import { SectionRouter } from "@/components/project/SectionRouter";

export default async function ProjectSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <ProjectPageShell><SectionRouter section={section} /></ProjectPageShell>;
}
