"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { issues as initialIssues } from "@/lib/mock-data";
import type { Issue } from "@/lib/types";

type CommentMap = Record<string, { id: string; author: string; text: string; createdAt: string }[]>;

interface DemoStoreValue {
  issues: Issue[];
  comments: CommentMap;
  resolveIssue: (issueId: string) => void;
  reopenIssue: (issueId: string) => void;
  addComment: (activityId: string, text: string) => void;
}

const DemoStore = createContext<DemoStoreValue | null>(null);
const STORAGE_KEY = "bouwvizier-demo-state-v1";

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [comments, setComments] = useState<CommentMap>({
    staalconstructie: [
      { id: "seed-1", author: "Sanne de Wit", text: "Nieuwe montagevolgorde is verwerkt in planning v12.", createdAt: "Vandaag, 14:18" },
    ],
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { issues?: Issue[]; comments?: CommentMap };
      if (parsed.issues) setIssues(parsed.issues);
      if (parsed.comments) setComments(parsed.comments);
    } catch {
      // De demo blijft bruikbaar als lokale opslag niet beschikbaar is.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ issues, comments }));
    } catch {
      // Geen foutmelding nodig voor een niet-kritische demo-opslag.
    }
  }, [issues, comments]);

  const value = useMemo<DemoStoreValue>(
    () => ({
      issues,
      comments,
      resolveIssue: (issueId) => setIssues((current) => current.map((issue) => issue.id === issueId ? { ...issue, status: "Opgelost" } : issue)),
      reopenIssue: (issueId) => setIssues((current) => current.map((issue) => issue.id === issueId ? { ...issue, status: "Open" } : issue)),
      addComment: (activityId, text) => {
        const clean = text.trim();
        if (!clean) return;
        setComments((current) => ({
          ...current,
          [activityId]: [
            ...(current[activityId] ?? []),
            { id: crypto.randomUUID(), author: "Demo gebruiker", text: clean, createdAt: "Zojuist" },
          ],
        }));
      },
    }),
    [issues, comments],
  );

  return <DemoStore.Provider value={value}>{children}</DemoStore.Provider>;
}

export function useDemoStore() {
  const context = useContext(DemoStore);
  if (!context) throw new Error("useDemoStore moet binnen DemoStoreProvider worden gebruikt.");
  return context;
}
