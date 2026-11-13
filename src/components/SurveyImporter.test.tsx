import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SurveyImporter } from "./SurveyImporter";

afterEach(() => {
  localStorage.clear();
});

describe("SurveyImporter", () => {
  it("renders the bundled sample survey by default, clearly labelled", () => {
    render(<SurveyImporter />);
    expect(screen.getByText(/Sample data/)).toBeInTheDocument();
    expect(screen.getByText("Ordering frequency")).toBeInTheDocument();
    expect(screen.getByText("Most annoying part (open text)")).toBeInTheDocument();
  });
});
