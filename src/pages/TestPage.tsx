import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PhoneFrame } from "../components/PhoneFrame";
import { PrototypeFooter } from "../components/PrototypeFooter";
import { ToastProvider } from "../components/Toast";
import { TapTrackerProvider } from "../components/TapTracker";
import { SusForm } from "../components/SusForm";
import { PreferenceForm } from "../components/PreferenceForm";
import { FlowA } from "../features/flowA/FlowA";
import { FlowB } from "../features/flowB/FlowB";
import { useTestSession } from "../features/testMode/useTestSession";
import type { FlowId } from "../lib/counterbalance";

const flowLabel: Record<FlowId, string> = {
  A: "Flow A — Current-style reorder",
  B: "Flow B — Smart Reorder",
};

function LiveTimer({ startedAt }: { startedAt: number | null }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (startedAt === null) return;
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, [startedAt]);
  if (startedAt === null) return <span>0.0s</span>;
  return <span>{((Date.now() - startedAt) / 1000).toFixed(1)}s</span>;
}

export function TestPage() {
  const { step, session, actions } = useTestSession();
  const [participantInput, setParticipantInput] = useState("");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          Usability test moderator
        </h1>
        <Link to="/results" className="text-sm font-medium text-basket-600 underline">
          View results →
        </Link>
      </div>

      {step.kind === "setup" && (
        <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink-900">Start a session</h2>
          <p className="mt-1 text-sm text-ink-500">
            Task for the participant: <strong>"Reorder the groceries you bought last week."</strong>{" "}
            Odd participant numbers run Flow A then Flow B; even numbers run B then A.
          </p>
          <label className="mt-4 block text-sm font-medium text-ink-700">
            Participant ID
            <input
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              placeholder="e.g. P01"
              className="mt-1.5 w-full rounded-xl border border-ink-300 p-3 text-sm outline-basket-500"
            />
          </label>
          <button
            type="button"
            disabled={!participantInput.trim()}
            onClick={() => actions.startSetup(participantInput)}
            className="mt-4 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Begin session
          </button>
        </div>
      )}

      {step.kind === "instructions" && session && (
        <div className="max-w-md rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Participant {session.participantId} · Flow {step.flowIndex + 1} of 2
          </div>
          <h2 className="mt-2 text-lg font-semibold text-ink-900">
            {flowLabel[session.order[step.flowIndex]]}
          </h2>
          <p className="mt-3 rounded-xl bg-ink-100 p-3 text-sm text-ink-700">
            Task: <strong>"Reorder the groceries you bought last week."</strong>
          </p>
          <p className="mt-3 text-sm text-ink-500">
            Hand the device to the participant. Timing starts the moment you tap Start.
          </p>
          <button
            type="button"
            onClick={actions.beginFlow}
            className="mt-4 w-full rounded-full bg-basket-600 py-3 text-sm font-semibold text-white"
          >
            Start task
          </button>
        </div>
      )}

      {step.kind === "running" && session && (
        <RunningFlow
          flowId={session.order[step.flowIndex]}
          startedAt={session.results[session.order[step.flowIndex]].startedAt}
          taps={session.results[session.order[step.flowIndex]].taps}
          mistaps={session.results[session.order[step.flowIndex]].mistaps}
          completed={session.results[session.order[step.flowIndex]].completed}
          onTap={(kind) => actions.recordTap(session.order[step.flowIndex], kind)}
          onReachedPlaced={() => actions.reachedPlaced(session.order[step.flowIndex])}
          onDone={actions.doneTapped}
          onGiveUp={() => actions.giveUpFlow(session.order[step.flowIndex])}
        />
      )}

      {step.kind === "sus" && session && (
        <SusForm
          flowLabel={flowLabel[session.order[step.flowIndex]]}
          onSubmit={(answers) => actions.submitSus(session.order[step.flowIndex], answers)}
        />
      )}

      {step.kind === "preference" && (
        <PreferenceForm onSubmit={actions.submitPreference} />
      )}

      {step.kind === "done" && session && (
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
          <span className="text-4xl">🎉</span>
          <h2 className="mt-3 text-lg font-semibold text-ink-900">Session saved</h2>
          <p className="mt-1 text-sm text-ink-500">
            Participant {session.participantId}'s results are saved to this browser.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setParticipantInput("");
                actions.reset();
              }}
              className="flex-1 rounded-full bg-basket-600 py-3 text-sm font-semibold text-white"
            >
              New participant
            </button>
            <Link
              to="/results"
              className="flex-1 rounded-full border border-basket-500 py-3 text-center text-sm font-semibold text-basket-600"
            >
              View results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

interface RunningFlowProps {
  flowId: FlowId;
  startedAt: number | null;
  taps: number;
  mistaps: number;
  completed: boolean;
  onTap: (kind: "expected" | "mistap") => void;
  onReachedPlaced: () => void;
  onDone: () => void;
  onGiveUp: () => void;
}

function RunningFlow({
  flowId,
  startedAt,
  taps,
  mistaps,
  completed,
  onTap,
  onReachedPlaced,
  onDone,
  onGiveUp,
}: RunningFlowProps) {
  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center">
      <PhoneFrame label={flowLabel[flowId]} fullscreenOnMobile={false}>
        <ToastProvider>
          <TapTrackerProvider value={{ recordTap: onTap }}>
            {flowId === "A" ? (
              <FlowA onReachedPlaced={onReachedPlaced} onDone={onDone} />
            ) : (
              <FlowB onReachedPlaced={onReachedPlaced} onDone={onDone} />
            )}
          </TapTrackerProvider>
          <PrototypeFooter />
        </ToastProvider>
      </PhoneFrame>

      <div className="w-full max-w-xs rounded-2xl bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">
          Moderator panel
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-500">Elapsed</dt>
            <dd className="font-semibold text-ink-900">
              <LiveTimer startedAt={startedAt} />
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Taps</dt>
            <dd className="font-semibold text-ink-900">{taps}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-500">Mis-taps</dt>
            <dd className="font-semibold text-ink-900">{mistaps}</dd>
          </div>
        </dl>
        {completed ? (
          <p className="mt-4 rounded-xl bg-basket-50 p-3 text-xs font-medium text-basket-700">
            Task completed — ask the participant to tap "Done" on the confirmation screen.
          </p>
        ) : (
          <button
            type="button"
            onClick={onGiveUp}
            className="mt-4 w-full rounded-full border border-red-300 py-2 text-sm font-semibold text-red-600"
          >
            Participant gave up
          </button>
        )}
      </div>
    </div>
  );
}
