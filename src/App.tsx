import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteNav } from "./components/SiteNav";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { PrototypeAPage } from "./pages/PrototypeAPage";
import { PrototypeBPage } from "./pages/PrototypeBPage";
import { TestPage } from "./pages/TestPage";
import { ResultsPage } from "./pages/ResultsPage";

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout><CaseStudyPage /></SiteLayout>} />
      <Route path="/test" element={<SiteLayout><TestPage /></SiteLayout>} />
      <Route path="/results" element={<SiteLayout><ResultsPage /></SiteLayout>} />
      {/* Prototypes render edge-to-edge (no site chrome) so they feel like a real app. */}
      <Route path="/prototype/a" element={<PrototypeAPage />} />
      <Route path="/prototype/b" element={<PrototypeBPage />} />
    </Routes>
  );
}
