import { Link } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { PrototypeFooter } from "../components/PrototypeFooter";

export function PrototypeAPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-100 p-6">
      <div className="flex flex-col items-center gap-4">
        <Link to="/" className="text-sm text-ink-500 underline max-sm:hidden">
          ← Back to case study
        </Link>
        <PhoneFrame label="Flow A — Current-style reorder (baseline)">
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center text-ink-500">
            Flow A lands in Phase 2.
          </div>
          <PrototypeFooter />
        </PhoneFrame>
      </div>
    </div>
  );
}
