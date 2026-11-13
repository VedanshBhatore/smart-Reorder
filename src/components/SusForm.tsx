import { useState } from "react";
import { isValidSusAnswers, SUS_ITEMS } from "../lib/sus";

interface SusFormProps {
  flowLabel: string;
  onSubmit: (answers: number[]) => void;
}

const scaleLabels = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export function SusForm({ flowLabel, onSubmit }: SusFormProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(SUS_ITEMS.length).fill(null));

  const complete = answers.every((a) => a !== null);

  function setAnswer(index: number, value: number) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h2 className="font-display text-2xl font-semibold text-ink-900">
        Quick questionnaire — {flowLabel}
      </h2>
      <p className="mt-1 text-sm text-ink-500">
        Standard System Usability Scale. Rate how much you agree with each statement.
      </p>

      <div className="mt-6 space-y-6">
        {SUS_ITEMS.map((item, index) => (
          <fieldset key={item} className="rounded-2xl bg-white p-4 shadow-sm">
            <legend className="mb-3 text-sm font-medium text-ink-900">
              {index + 1}. {item}
            </legend>
            <div className="flex items-center justify-between gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  key={value}
                  className="flex flex-1 cursor-pointer flex-col items-center gap-1 text-[11px] text-ink-500"
                >
                  <input
                    type="radio"
                    name={`sus-${index}`}
                    value={value}
                    checked={answers[index] === value}
                    onChange={() => setAnswer(index, value)}
                    className="h-5 w-5 accent-basket-600"
                  />
                  {value === 1 || value === 5 ? (
                    <span className="text-center">{scaleLabels[value - 1]}</span>
                  ) : (
                    <span>{value}</span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="button"
        disabled={!complete}
        onClick={() => onSubmit(answers as number[])}
        className="mt-8 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white disabled:opacity-40"
      >
        {complete ? "Submit" : `Answer all ${SUS_ITEMS.length} statements to continue`}
      </button>
      {complete && !isValidSusAnswers(answers as number[]) && (
        <p className="mt-2 text-center text-xs text-red-600">
          Something looks off with the answers — please re-check each row.
        </p>
      )}
    </div>
  );
}
