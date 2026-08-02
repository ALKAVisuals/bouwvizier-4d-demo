export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("nl-NL", options ?? { day: "2-digit", month: "short", year: "numeric" }).format(
    typeof date === "string" ? new Date(`${date}T12:00:00`) : date,
  );

export const formatShortDate = (date: string | Date) =>
  new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "short" }).format(
    typeof date === "string" ? new Date(`${date}T12:00:00`) : date,
  );

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const dateToPercent = (date: Date, start: Date, end: Date) =>
  clamp(((date.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100, 0, 100);

export const percentToDate = (percent: number, start: Date, end: Date) =>
  new Date(start.getTime() + ((end.getTime() - start.getTime()) * percent) / 100);

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const getWeekNumber = (input: Date) => {
  const date = new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const daysBetween = (start: string, end: string) =>
  Math.max(1, Math.round((new Date(`${end}T12:00:00`).getTime() - new Date(`${start}T12:00:00`).getTime()) / 86400000));
