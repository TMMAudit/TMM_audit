// Local persistence for in-progress assessments.
// Synchronous localStorage snapshot, plus helpers to seed and clear it.

const SNAPSHOT_KEY = "xc_audit_progress_v1";
const SESSION_ID_KEY = "xc_session_id";

export type AssessmentScreen =
  | "landing"
  | "framing"
  | "s1header"
  | "domainIntro"
  | "question"
  | "email"
  | "s1results"
  | "s1onething"
  | "s2header"
  | "s2domainIntro"
  | "s2question"
  | "s2results"
  | "s2onething"
  | "composite";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  industry: string;
}

export interface ProgressSnapshot {
  sessionId: string;
  responses: Record<number, number>;
  currentQuestionIndex: number;
  currentScreen: AssessmentScreen;
  userInfo: UserInfo;
  completed: boolean;
  updatedAt: string;
}

function safeGetLocalStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function generateUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (RFC4122 v4-ish)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateSessionId(): string {
  const ls = safeGetLocalStorage();
  if (!ls) return generateUuid();
  let id = ls.getItem(SESSION_ID_KEY);
  if (!id) {
    id = generateUuid();
    ls.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function readSnapshot(): ProgressSnapshot | null {
  const ls = safeGetLocalStorage();
  if (!ls) return null;
  const raw = ls.getItem(SNAPSHOT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ProgressSnapshot;
    if (!parsed.sessionId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeSnapshot(snapshot: ProgressSnapshot): void {
  const ls = safeGetLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota or serialization, ignore */
  }
}

export function clearSnapshot(): void {
  const ls = safeGetLocalStorage();
  if (!ls) return;
  ls.removeItem(SNAPSHOT_KEY);
  ls.removeItem(SESSION_ID_KEY);
}

export function emptyUserInfo(): UserInfo {
  return { firstName: "", lastName: "", email: "", businessName: "", industry: "" };
}
