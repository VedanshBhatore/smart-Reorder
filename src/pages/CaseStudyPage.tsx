import { Overview } from "../features/casestudy/sections/Overview";
import { Teardown } from "../features/casestudy/sections/Teardown";
import { Research } from "../features/casestudy/sections/Research";
import { ProblemStatement } from "../features/casestudy/sections/ProblemStatement";
import { Solution } from "../features/casestudy/sections/Solution";
import { Validation } from "../features/casestudy/sections/Validation";
import { MetricsRollout } from "../features/casestudy/sections/MetricsRollout";
import { Learnings } from "../features/casestudy/sections/Learnings";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "teardown", label: "Teardown" },
  { id: "research", label: "Research" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "validation", label: "Validation" },
  { id: "metrics", label: "Metrics" },
  { id: "learnings", label: "Learnings" },
];

export function CaseStudyPage() {
  return (
    <div>
      <div className="border-b border-ink-300 bg-gradient-to-b from-basket-50 to-ink-100">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">
            Product teardown &amp; redesign case study
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
            Smart Reorder: cutting the taps out of buying the same groceries again
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-700">
            A teardown of Instamart's reorder flow, a redesign called "Smart Reorder," and a built-in
            usability test to check whether it actually helps — all in one interactive case study.
          </p>
          <nav className="mt-8 flex flex-wrap gap-2">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-basket-300 bg-white px-3 py-1.5 text-sm font-medium text-basket-700 hover:bg-basket-50"
              >
                {i + 1}. {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl divide-y divide-ink-300 px-4 sm:px-6">
        <Overview />
        <Teardown />
        <Research />
        <ProblemStatement />
        <Solution />
        <Validation />
        <MetricsRollout />
        <Learnings />
      </div>

      <footer className="border-t border-ink-300 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-ink-500 sm:px-6">
          Independent portfolio case study. "Basket" is a fictional concept brand — not affiliated with
          Swiggy or Instamart. Instamart is discussed here only as commentary on an existing product.
        </div>
      </footer>
    </div>
  );
}
