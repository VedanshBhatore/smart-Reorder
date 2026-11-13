import { useState } from "react";
import { Link } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { PrototypeFooter } from "../components/PrototypeFooter";
import { ToastProvider } from "../components/Toast";
import { FlowB } from "../features/flowB/FlowB";

export function PrototypeBPage() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-100 p-6 max-sm:p-0">
      <div className="flex items-center gap-4 max-sm:hidden">
        <Link to="/" className="text-sm text-ink-500 underline">
          ← Back to case study
        </Link>
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="rounded-full border border-ink-300 px-3 py-1 text-sm text-ink-700"
        >
          ↻ Restart flow
        </button>
      </div>
      <PhoneFrame label="Flow B — Smart Reorder (redesign)">
        <ToastProvider key={runId}>
          <FlowB onDone={() => setRunId((n) => n + 1)} />
          <PrototypeFooter />
        </ToastProvider>
      </PhoneFrame>
    </div>
  );
}
