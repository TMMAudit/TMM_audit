import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  AssessmentScreen,
  UserInfo,
  getOrCreateSessionId,
  readSnapshot,
  writeSnapshot,
} from "@/lib/sessionStore";

export interface SessionState {
  responses: Record<number, number>;
  currentQuestionIndex: number;
  currentScreen: AssessmentScreen;
  userInfo: UserInfo;
  completed: boolean;
  completedAssessmentId?: string | null;
}

const FLUSH_FN = "session-flush";
const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const FLUSH_URL = PROJECT_ID
  ? `https://${PROJECT_ID}.supabase.co/functions/v1/${FLUSH_FN}`
  : "";

function buildPayload(sessionId: string, state: Partial<SessionState>) {
  const payload: Record<string, unknown> = { id: sessionId };
  if (state.responses !== undefined) payload.responses = state.responses;
  if (state.currentQuestionIndex !== undefined)
    payload.current_question_index = state.currentQuestionIndex;
  if (state.currentScreen !== undefined) payload.current_screen = state.currentScreen;
  if (state.completed !== undefined) payload.completed = state.completed;
  if (state.completedAssessmentId !== undefined)
    payload.completed_assessment_id = state.completedAssessmentId;
  if (state.userInfo) {
    const { firstName, lastName, email, businessName, industry } = state.userInfo;
    if (firstName) payload.first_name = firstName;
    if (lastName !== undefined) payload.last_name = lastName || null;
    if (email) payload.email = email;
    if (businessName !== undefined) payload.business_name = businessName || null;
    if (industry !== undefined) payload.industry = industry || null;
  }
  return payload;
}

export function useAssessmentSession() {
  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const latestStateRef = useRef<SessionState>({
    responses: {},
    currentQuestionIndex: 0,
    currentScreen: "landing",
    userInfo: { firstName: "", lastName: "", email: "", businessName: "", industry: "" },
    completed: false,
    completedAssessmentId: null,
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insertedRef = useRef(false);

  const flushToServer = useCallback(async () => {
    const id = sessionIdRef.current;
    const payload = buildPayload(id, latestStateRef.current);
    payload.user_agent = typeof navigator !== "undefined" ? navigator.userAgent : null;
    payload.referrer = typeof document !== "undefined" ? document.referrer : null;

    try {
      if (!insertedRef.current) {
        // Try insert first; if conflict on PK, fall back to update.
        const { error } = await (supabase.from as any)("assessment_sessions").insert(payload);
        if (!error) {
          insertedRef.current = true;
          return;
        }
        // 23505 = unique_violation (already created in another tab/session)
        insertedRef.current = true;
      }
      const { id: _id, ...updateFields } = payload;
      await (supabase.from as any)("assessment_sessions")
        .update(updateFields)
        .eq("id", id);
    } catch (e) {
      console.warn("session save failed", e);
    }
  }, []);

  const saveProgress = useCallback(
    (partial: Partial<SessionState>) => {
      // Merge into latest state
      latestStateRef.current = {
        ...latestStateRef.current,
        ...partial,
        userInfo: partial.userInfo
          ? { ...latestStateRef.current.userInfo, ...partial.userInfo }
          : latestStateRef.current.userInfo,
      };

      // Sync localStorage snapshot
      writeSnapshot({
        sessionId: sessionIdRef.current,
        responses: latestStateRef.current.responses,
        currentQuestionIndex: latestStateRef.current.currentQuestionIndex,
        currentScreen: latestStateRef.current.currentScreen,
        userInfo: latestStateRef.current.userInfo,
        completed: latestStateRef.current.completed,
        updatedAt: new Date().toISOString(),
      });

      // Debounced server upsert
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        flushToServer();
      }, 800);
    },
    [flushToServer],
  );

  // Flush on tab close via sendBeacon
  useEffect(() => {
    const handler = () => {
      try {
        if (!FLUSH_URL) return;
        const payload = buildPayload(sessionIdRef.current, latestStateRef.current);
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon(FLUSH_URL, blob);
      } catch {
        /* noop */
      }
    };
    window.addEventListener("beforeunload", handler);
    window.addEventListener("pagehide", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      window.removeEventListener("pagehide", handler);
    };
  }, []);

  // Hydrate from existing snapshot if matching session id
  useEffect(() => {
    const snap = readSnapshot();
    if (snap && snap.sessionId === sessionIdRef.current) {
      latestStateRef.current = {
        responses: snap.responses,
        currentQuestionIndex: snap.currentQuestionIndex,
        currentScreen: snap.currentScreen,
        userInfo: snap.userInfo,
        completed: snap.completed,
        completedAssessmentId: null,
      };
      insertedRef.current = true; // assume row exists
    }
  }, []);

  return {
    sessionId: sessionIdRef.current,
    saveProgress,
    flushToServer,
  };
}
