import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteNav } from "./components/SiteNav";

// Route-level code splitting: only the case study, results, and test pages pull in
// Recharts, so lazy-loading them keeps the two actual app prototypes (the thing most
// visitors click first) off the critical path for that larger chunk.
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage })));
const PrototypeAPage = lazy(() => import("./pages/PrototypeAPage").then((m) => ({ default: m.PrototypeAPage })));
const PrototypeBPage = lazy(() => import("./pages/PrototypeBPage").then((m) => ({ default: m.PrototypeBPage })));
const TestPage = lazy(() => import("./pages/TestPage").then((m) => ({ default: m.TestPage })));
const ResultsPage = lazy(() => import("./pages/ResultsPage").then((m) => ({ default: m.ResultsPage })));

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>{children}</main>
    </div>
  );
}

function PageFallback() {
  return <div className="flex min-h-screen items-center justify-center text-sm text-ink-500">Loading…</div>;
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<SiteLayout><CaseStudyPage /></SiteLayout>} />
        <Route path="/test" element={<SiteLayout><TestPage /></SiteLayout>} />
        <Route path="/results" element={<SiteLayout><ResultsPage /></SiteLayout>} />
        {/* Prototypes render edge-to-edge (no site chrome) so they feel like a real app. */}
        <Route path="/prototype/a" element={<PrototypeAPage />} />
        <Route path="/prototype/b" element={<PrototypeBPage />} />
      </Routes>
    </Suspense>
  );
}
