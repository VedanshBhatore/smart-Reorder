import { useMemo, useRef, useState } from "react";
import sampleSurveyCsv from "../data/sampleSurvey.csv?raw";
import { readJSON, writeJSON } from "../lib/storage";
import { summarizeSurvey } from "../lib/surveyCsv";
import { SampleDataBadge } from "./SampleDataBadge";
import { FrequencyBarChart } from "./charts/FrequencyBarChart";
import { TextFieldSummary } from "./charts/TextFieldSummary";

const SURVEY_CSV_KEY = "basket.survey.csv.v1";

export function SurveyImporter() {
  const [importedCsv, setImportedCsv] = useState<string | null>(() => readJSON<string | null>(SURVEY_CSV_KEY, null));
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const usingSample = importedCsv === null;
  const csv = importedCsv ?? sampleSurveyCsv;
  const summary = useMemo(() => summarizeSurvey(csv), [csv]);

  async function handleFile(file: File) {
    setError(null);
    try {
      const text = await file.text();
      const parsed = summarizeSurvey(text);
      if (parsed.totalResponses === 0) {
        setError("That file parsed but has no response rows — check it's the Forms CSV export.");
        return;
      }
      setImportedCsv(text);
      writeJSON(SURVEY_CSV_KEY, text);
    } catch {
      setError("Could not read that file as CSV.");
    }
  }

  function clearImport() {
    setImportedCsv(null);
    writeJSON(SURVEY_CSV_KEY, null);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full border border-basket-500 px-3 py-1.5 text-sm font-semibold text-basket-600"
        >
          Import survey CSV
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        {!usingSample && (
          <button type="button" onClick={clearImport} className="text-xs font-semibold text-red-600 underline">
            Remove import, show sample instead
          </button>
        )}
        <span className="ml-auto text-xs text-ink-500">{summary.totalResponses} responses</span>
        {usingSample && <SampleDataBadge />}
      </div>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {summary.missingHeaders.length > 0 && (
        <p className="mb-4 rounded-xl border border-dashed border-accent-500 bg-accent-500/10 p-3 text-sm text-accent-600">
          {summary.missingHeaders.length} question{summary.missingHeaders.length === 1 ? "" : "s"} from{" "}
          <code>surveyColumnMap.ts</code> weren't found in this CSV's headers — if you reworded a question,
          update its <code>csvHeader</code> there to match.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {summary.fields.map((field) =>
          field.type === "text" ? (
            <TextFieldSummary key={field.key} field={field} />
          ) : (
            <FrequencyBarChart key={field.key} field={field} />
          )
        )}
      </div>
    </div>
  );
}
