import type { ActivityStatus, BuildingPart } from "@/lib/types";

export const statusColors: Record<ActivityStatus, string> = {
  "Niet gestart": "#c8ced1",
  "Gepland": "#3f78b8",
  "In uitvoering": "#d9862b",
  "Gereed": "#4d8b63",
  "Vertraagd": "#bf4d45",
};

export function partStatusAtDate(part: BuildingPart, currentDate: Date): ActivityStatus {
  const start = new Date(`${part.startDate}T12:00:00`);
  const end = new Date(`${part.endDate}T12:00:00`);
  if (currentDate < start) {
    const daysUntilStart = (start.getTime() - currentDate.getTime()) / 86400000;
    return daysUntilStart <= 45 ? "Gepland" : "Niet gestart";
  }
  if (currentDate > end) return part.delayed && part.progress < 100 ? "Vertraagd" : "Gereed";
  if (part.delayed) return "Vertraagd";
  return "In uitvoering";
}
