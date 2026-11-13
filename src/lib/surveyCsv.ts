import Papa from "papaparse";
import type { SurveyFieldConfig, SurveyFieldType } from "./surveyColumnMap";
import { surveyColumnMap } from "./surveyColumnMap";

export interface FieldDistribution {
  key: string;
  shortLabel: string;
  type: SurveyFieldType;
  total: number; // non-empty responses for this field
  counts: { label: string; count: number }[]; // empty for "text" fields
  mean?: number; // only set for "likert" fields
  sampleResponses?: string[]; // only set for "text" fields
}

export interface SurveySummary {
  totalResponses: number;
  fields: FieldDistribution[];
  /** Configured question headers that weren't found in the uploaded CSV — likely a reworded question. */
  missingHeaders: string[];
}

export function parseSurveyCsv(csvText: string): { rows: Record<string, string>[]; headers: string[] } {
  const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true });
  return { rows: parsed.data, headers: parsed.meta.fields ?? [] };
}

export function summarizeField(rows: Record<string, string>[], field: SurveyFieldConfig): FieldDistribution {
  const values = rows.map((r) => (r[field.csvHeader] ?? "").trim()).filter((v) => v !== "");

  if (field.type === "text") {
    return {
      key: field.key,
      shortLabel: field.shortLabel,
      type: field.type,
      total: values.length,
      counts: [],
      sampleResponses: values.slice(0, 5),
    };
  }

  const counts = new Map<string, number>();
  for (const opt of field.options ?? []) counts.set(opt, 0);
  let otherCount = 0;
  for (const v of values) {
    if (counts.has(v)) counts.set(v, (counts.get(v) ?? 0) + 1);
    else otherCount += 1;
  }
  const countList = [...counts.entries()].map(([label, count]) => ({ label, count }));
  if (otherCount > 0) countList.push({ label: "Other / unrecognized", count: otherCount });

  let mean: number | undefined;
  if (field.type === "likert") {
    const nums = values.map(Number).filter((n) => Number.isFinite(n));
    mean = nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : undefined;
  }

  return { key: field.key, shortLabel: field.shortLabel, type: field.type, total: values.length, counts: countList, mean };
}

export function summarizeSurvey(csvText: string): SurveySummary {
  const { rows, headers } = parseSurveyCsv(csvText);
  const missingHeaders = surveyColumnMap.filter((f) => !headers.includes(f.csvHeader)).map((f) => f.csvHeader);
  const fields = surveyColumnMap.map((f) => summarizeField(rows, f));
  return { totalResponses: rows.length, fields, missingHeaders };
}
