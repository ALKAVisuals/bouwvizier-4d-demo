import type { Metadata } from "next";
import "./globals.css";
import { DemoStoreProvider } from "@/context/demo-store";

export const metadata: Metadata = {
  title: "BouwVizier 4D | Maak uw bouwplanning zichtbaar",
  description: "Klikbare SaaS-demo voor visuele 4D-bouwplanning, voortgang en knelpunten.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <DemoStoreProvider>{children}</DemoStoreProvider>
      </body>
    </html>
  );
}
