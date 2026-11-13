import { useState } from "react";
import type { PreferenceChoice } from "../lib/session";

interface PreferenceFormProps {
  onSubmit: (choice: PreferenceChoice, reason: string) => void;
}

const options: { value: PreferenceChoice; label: string }[] = [
  { value: "A", label: "Flow A — the current-style reorder" },
  { value: "B", label: "Flow B — the Smart Reorder redesign" },
  { value: "no-preference", label: "No preference" },
];

export function PreferenceForm({ onSubmit }: PreferenceFormProps) {
  const [choice, setChoice] = useState<PreferenceChoice | null>(null);
  const [reason, setReason] = useState("");

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-2xl font-semibold text-ink-900">
        Which did you prefer, and why?
      </h2>

      <div className="mt-5 space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium ${
              choice === opt.value ? "border-basket-600 bg-basket-50" : "border-ink-300 bg-white"
            }`}
          >
            <input
              type="radio"
              name="preference"
              className="h-4 w-4 accent-basket-600"
              checked={choice === opt.value}
              onChange={() => setChoice(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <label className="mt-5 block text-sm font-medium text-ink-700">
        Why? (optional, but helpful)
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="mt-1.5 w-full rounded-xl border border-ink-300 p-3 text-sm outline-basket-500"
          placeholder="e.g. fewer steps, felt faster, easier to spot the swap…"
        />
      </label>

      <button
        type="button"
        disabled={!choice}
        onClick={() => choice && onSubmit(choice, reason.trim())}
        className="mt-6 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        Finish session
      </button>
    </div>
  );
}
