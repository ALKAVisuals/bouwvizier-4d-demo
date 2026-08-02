export type ProjectStatus = "Op schema" | "Aandacht nodig" | "Vertraagd";
export type ActivityStatus = "Niet gestart" | "Gepland" | "In uitvoering" | "Gereed" | "Vertraagd";
export type IssuePriority = "Laag" | "Middel" | "Hoog" | "Kritiek";
export type IssueStatus = "Open" | "In behandeling" | "Opgelost";
export type ProjectRole =
  | "Beheerder"
  | "Projectleider"
  | "Werkvoorbereider"
  | "Uitvoerder"
  | "Onderaannemer"
  | "Opdrachtgever"
  | "Alleen-lezen";

export type BuildingPhase =
  | "Terrein"
  | "Fundering"
  | "Ruwbouw"
  | "Gevel & dak"
  | "Installaties"
  | "Afbouw";

export interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  contractor: string;
  startDate: string;
  endDate: string;
  progress: number;
  plannedProgress: number;
  status: ProjectStatus;
  openIssues: number;
  nextMilestone: string;
  nextMilestoneDate: string;
  type: string;
}

export interface Activity {
  id: string;
  name: string;
  phase: BuildingPhase;
  startDate: string;
  endDate: string;
  responsible: string;
  status: ActivityStatus;
  progress: number;
  dependencies: string[];
  description: string;
  attachments: { name: string; type: string }[];
  issueIds: string[];
  modelPartIds: string[];
}

export interface BuildingPart {
  id: string;
  name: string;
  phase: BuildingPhase;
  activityId: string;
  startDate: string;
  endDate: string;
  delayed?: boolean;
  progress: number;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: IssuePriority;
  owner: string;
  deadline: string;
  activityId: string;
  status: IssueStatus;
  comments: number;
}

export interface TeamMember {
  id: string;
  name: string;
  function: string;
  company: string;
  role: ProjectRole;
  lastActivity: string;
  rights: string[];
  initials: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  category: string;
  activityId?: string;
  version: string;
  updatedAt: string;
  owner: string;
  size: string;
}
