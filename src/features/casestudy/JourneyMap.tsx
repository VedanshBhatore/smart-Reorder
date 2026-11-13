import { currentJourney, frictionStyles } from "./journeyMapData";

export function JourneyMap() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-0">
        {currentJourney.map((item, i) => (
          <div key={item.step} className="flex items-stretch">
            <div className="flex w-56 flex-col rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-ink-500">Step {i + 1}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${frictionStyles[item.friction].badge}`}
                >
                  {item.friction} friction
                </span>
              </div>
              <h4 className="mt-2 text-sm font-semibold text-ink-900">{item.step}</h4>
              <p className="mt-1 text-xs text-ink-500">{item.detail}</p>
              <div className="mt-3 h-1 w-full rounded-full bg-ink-100">
                <div
                  className={`h-1 rounded-full ${frictionStyles[item.friction].bar}`}
                  style={{ width: item.friction === "high" ? "100%" : item.friction === "medium" ? "60%" : "25%" }}
                />
              </div>
              <p className="mt-2 text-xs text-ink-700">{item.frictionNote}</p>
            </div>
            {i < currentJourney.length - 1 && (
              <div className="flex w-8 shrink-0 items-center justify-center text-ink-300">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
