import { useState } from "react";
import type { FlowId } from "../../lib/counterbalance";
import { extractParticipantNumber, getFlowOrder } from "../../lib/counterbalance";
import type { TapKind } from "../../lib/metrics";
import { completeFlow, giveUp, recordTap as recordTapMetric, startTiming } from "../../lib/metrics";
import { computeSUS } from "../../lib/sus";
import type { PreferenceChoice, TestSession } from "../../lib/session";
import { createTestSession, loadSessions, saveSession } from "../../lib/session";
import type { TestStep } from "./types";

export function useTestSession() {
  const [step, setStep] = useState<TestStep>({ kind: "setup" });
  const [session, setSession] = useState<TestSession | null>(null);

  function startSetup(participantIdRaw: string) {
    const participantId = participantIdRaw.trim();
    if (!participantId) return;
    const fallbackIndex = loadSessions().length + 1;
    const participantNumber = extractParticipantNumber(participantId, fallbackIndex);
    const order = getFlowOrder(participantNumber);
    setSession(createTestSession(participantId, participantNumber, order));
    setStep({ kind: "instructions", flowIndex: 0 });
  }

  function beginFlow() {
    setStep((prevStep) => {
      if (prevStep.kind !== "instructions") return prevStep;
      return { kind: "running", flowIndex: prevStep.flowIndex };
    });
    setSession((prev) => {
      if (!prev || step.kind !== "instructions") return prev;
      const flowId = prev.order[step.flowIndex];
      return { ...prev, results: { ...prev.results, [flowId]: startTiming(prev.results[flowId]) } };
    });
  }

  function recordTap(flowId: FlowId, kind: TapKind) {
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, results: { ...prev.results, [flowId]: recordTapMetric(prev.results[flowId], kind) } };
    });
  }

  function reachedPlaced(flowId: FlowId) {
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, results: { ...prev.results, [flowId]: completeFlow(prev.results[flowId]) } };
    });
  }

  function giveUpFlow(flowId: FlowId) {
    setSession((prev) => {
      if (!prev) return prev;
      return { ...prev, results: { ...prev.results, [flowId]: giveUp(prev.results[flowId]) } };
    });
    setStep((prev) => (prev.kind === "running" ? { kind: "sus", flowIndex: prev.flowIndex } : prev));
  }

  function doneTapped() {
    setStep((prev) => (prev.kind === "running" ? { kind: "sus", flowIndex: prev.flowIndex } : prev));
  }

  function submitSus(flowId: FlowId, answers: number[]) {
    const score = computeSUS(answers);
    setSession((prev) => {
      if (!prev) return prev;
      const updated: TestSession = {
        ...prev,
        results: {
          ...prev.results,
          [flowId]: { ...prev.results[flowId], susAnswers: answers, susScore: score },
        },
      };
      saveSession(updated);
      return updated;
    });
    setStep((prev) => {
      if (prev.kind !== "sus") return prev;
      return prev.flowIndex === 0 ? { kind: "instructions", flowIndex: 1 } : { kind: "preference" };
    });
  }

  function submitPreference(choice: PreferenceChoice, reason: string) {
    setSession((prev) => {
      if (!prev) return prev;
      const updated: TestSession = { ...prev, preference: { choice, reason }, completedAt: new Date().toISOString() };
      saveSession(updated);
      return updated;
    });
    setStep({ kind: "done" });
  }

  function reset() {
    setSession(null);
    setStep({ kind: "setup" });
  }

  return {
    step,
    session,
    actions: {
      startSetup,
      beginFlow,
      recordTap,
      reachedPlaced,
      giveUpFlow,
      doneTapped,
      submitSus,
      submitPreference,
      reset,
    },
  };
}
