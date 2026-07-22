import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { questions, s1Domains, s2Domains } from "@/data/questions";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight, LogIn, LogOut, RefreshCw } from "lucide-react";

interface Submission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string | null;
  email: string;
  business_name: string | null;
  industry: string | null;
  responses: Record<string, number>;
  section1_raw: number;
  section1_pct: number;
  section1_tier: string;
  section2_raw: number;
  section2_pct: number;
  section2_tier: string;
  composite_raw: number;
  composite_pct: number;
  composite_tier: string;
  lowest_s1_domain: string;
  lowest_s2_domain: string;
  s1_one_thing_domain: string | null;
  s1_one_thing_statement: string | null;
  s2_one_thing_domain: string | null;
  s2_one_thing_statement: string | null;
}

interface SessionRow {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  business_name: string | null;
  industry: string | null;
  responses: Record<string, number> | null;
  current_question_index: number;
  current_screen: string;
  completed: boolean;
  completed_assessment_id: string | null;
}

const allDomains = [...s1Domains, ...s2Domains];
const TOTAL_QUESTIONS = questions.length;

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [fetchingSessions, setFetchingSessions] = useState(false);
  const [sessionFilter, setSessionFilter] = useState<"all" | "incomplete" | "with_email">("incomplete");
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError("");
    setForgotMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Invalid credentials");
  };

  const handleForgotPassword = async () => {
    setError("");
    setForgotMessage("");
    if (!email) { setError("Enter your email first"); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setForgotMessage("Password reset link sent. Check your email.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSubmissions([]);
  };

  const fetchSubmissions = useCallback(async () => {
    setFetching(true);
    // Try new table first, fall back to old
    const { data, error } = await supabase
      .from("assessments" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // Fall back to old table
      const { data: oldData } = await supabase
        .from("diagnostic_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      setSubmissions((oldData as any) || []);
    } else {
      setSubmissions((data as any) || []);
    }
    setFetching(false);
  }, []);

  const fetchSessions = useCallback(async () => {
    setFetchingSessions(true);
    const { data, error } = await (supabase.from as any)("assessment_sessions")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("fetch sessions error", error);
      setSessions([]);
    } else {
      setSessions((data as any) || []);
    }
    setFetchingSessions(false);
  }, []);

  useEffect(() => {
    if (session) {
      fetchSubmissions();
      fetchSessions();
    }
  }, [session, fetchSubmissions, fetchSessions]);

  const filteredSessions = sessions.filter((s) => {
    if (sessionFilter === "incomplete") return !s.completed;
    if (sessionFilter === "with_email") return !!s.email;
    return true;
  });

  const getAnswerText = (questionId: number, score: number) => {
    const q = questions.find((q) => q.id === questionId);
    if (!q) return "Unknown";
    const answer = q.answers.find((a) => a.score === score);
    return answer?.text || "Unknown";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 px-6">
          <div className="text-center space-y-2">
            <p className="text-[9px] text-primary tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>ADMIN ACCESS</p>
            <h1 className="text-3xl text-foreground uppercase" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>ASSESSMENT DASHBOARD</h1>
          </div>
          <div className="space-y-3">
            <Input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted border-border" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="bg-muted border-border" />
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            {forgotMessage && <p className="text-primary text-sm text-center">{forgotMessage}</p>}
            <Button onClick={handleLogin} className="w-full"><LogIn className="mr-2 h-4 w-4" />ACCESS DASHBOARD</Button>
            <button type="button" onClick={handleForgotPassword} className="w-full text-xs text-muted-foreground hover:text-primary transition-colors text-center" style={{ fontFamily: "var(--font-mono)" }}>FORGOT PASSWORD?</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-primary tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "var(--font-mono)" }}>AI READINESS ASSESSMENT</p>
            <h1 className="text-3xl text-foreground uppercase" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>ADMIN DASHBOARD</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => { fetchSubmissions(); fetchSessions(); }} disabled={fetching || fetchingSessions}>
              <RefreshCw className={`h-4 w-4 mr-1 ${(fetching || fetchingSessions) ? "animate-spin" : ""}`} />REFRESH
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" />LOGOUT</Button>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="submissions">Submissions ({submissions.length})</TabsTrigger>
            <TabsTrigger value="sessions">Sessions ({sessions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            {submissions.length === 0 && !fetching ? (
              <div className="text-center py-20 text-muted-foreground">
                <p style={{ fontFamily: "var(--font-body)" }}>No submissions yet.</p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="w-8"></TableHead>
                      {["DATE", "NAME", "EMAIL", "S1", "S2", "COMPOSITE", "TIER"].map((h) => (
                        <TableHead key={h} style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground">{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub) => (
                      <>
                        <TableRow key={sub.id} className="cursor-pointer border-border hover:bg-muted/30" onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}>
                          <TableCell className="w-8">
                            {expandedId === sub.id ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                          <TableCell style={{ fontFamily: "var(--font-body)" }}>{sub.first_name} {sub.last_name || ""}</TableCell>
                          <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{sub.email}</TableCell>
                          <TableCell><span className="text-primary font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{sub.section1_raw ?? (sub as any).total_score}/108</span></TableCell>
                          <TableCell><span className="text-primary font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{sub.section2_raw ?? "-"}/99</span></TableCell>
                          <TableCell><span className="text-primary font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{sub.composite_raw ?? "-"}/207</span></TableCell>
                          <TableCell><span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded" style={{ fontFamily: "var(--font-mono)" }}>{sub.composite_tier ?? (sub as any).stage}</span></TableCell>
                        </TableRow>
                        {expandedId === sub.id && (
                          <TableRow key={`${sub.id}-detail`} className="border-border">
                            <TableCell colSpan={8} className="bg-muted/20 p-6">
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {questions.map((q) => {
                                    const score = sub.responses?.[String(q.id)] ?? sub.responses?.[q.id] ?? null;
                                    return (
                                      <div key={q.id} className="border border-border rounded p-3 bg-background">
                                        <div className="flex items-start gap-2">
                                          <span className="text-[9px] text-primary tracking-[0.12em] uppercase shrink-0 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>Q{q.id}</span>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "var(--font-mono)" }}>{q.domain}</p>
                                            {score !== null ? (
                                              <p className="text-sm text-foreground" style={{ fontFamily: "var(--font-body)" }}>
                                                <span className="text-primary font-bold mr-1">{score}</span>
                                                {getAnswerText(q.id, score as number)}
                                              </p>
                                            ) : (
                                              <p className="text-sm text-muted-foreground italic">No response</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="flex items-center gap-2">
              {([
                { k: "incomplete", label: "Incomplete only" },
                { k: "with_email", label: "Has email" },
                { k: "all", label: "All" },
              ] as const).map((opt) => (
                <button
                  key={opt.k}
                  onClick={() => setSessionFilter(opt.k)}
                  className={`px-3 py-1.5 rounded text-xs uppercase border transition-colors ${
                    sessionFilter === opt.k
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:text-foreground"
                  }`}
                  style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
                >
                  {opt.label}
                </button>
              ))}
              <span className="text-muted-foreground text-xs ml-auto" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredSessions.length} shown
              </span>
            </div>

            {filteredSessions.length === 0 && !fetchingSessions ? (
              <div className="text-center py-20 text-muted-foreground">
                <p style={{ fontFamily: "var(--font-body)" }}>No sessions match this filter.</p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="w-8"></TableHead>
                      {["UPDATED", "EMAIL", "NAME", "SCREEN", "PROGRESS", "STATUS"].map((h) => (
                        <TableHead key={h} style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] tracking-[0.14em] uppercase text-muted-foreground">{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((s) => {
                      const answered = s.responses ? Object.keys(s.responses).length : 0;
                      const pct = Math.round((answered / TOTAL_QUESTIONS) * 100);
                      return (
                        <>
                          <TableRow
                            key={s.id}
                            className="cursor-pointer border-border hover:bg-muted/30"
                            onClick={() => setExpandedSessionId(expandedSessionId === s.id ? null : s.id)}
                          >
                            <TableCell className="w-8">
                              {expandedSessionId === s.id ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                              {new Date(s.updated_at).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                              {s.email || <span className="text-muted-foreground italic">no email</span>}
                            </TableCell>
                            <TableCell style={{ fontFamily: "var(--font-body)" }}>
                              {[s.first_name, s.last_name].filter(Boolean).join(" ") || <span className="text-muted-foreground italic">,</span>}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>
                              {s.current_screen} (Q{s.current_question_index + 1})
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-muted rounded overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-mono)" }}>{answered}/{TOTAL_QUESTIONS}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`text-xs px-2 py-0.5 rounded ${s.completed ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`} style={{ fontFamily: "var(--font-mono)" }}>
                                {s.completed ? "COMPLETED" : "IN PROGRESS"}
                              </span>
                            </TableCell>
                          </TableRow>
                          {expandedSessionId === s.id && (
                            <TableRow key={`${s.id}-detail`} className="border-border">
                              <TableCell colSpan={7} className="bg-muted/20 p-6">
                                <div className="space-y-3 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div><span className="text-muted-foreground">Business:</span> {s.business_name || ","}</div>
                                    <div><span className="text-muted-foreground">Industry:</span> {s.industry || ","}</div>
                                    <div><span className="text-muted-foreground">Created:</span> {new Date(s.created_at).toLocaleString()}</div>
                                    <div><span className="text-muted-foreground">Session ID:</span> {s.id.slice(0, 8)}…</div>
                                  </div>
                                  <pre className="bg-background border border-border rounded p-3 overflow-x-auto max-h-72 text-[11px]">
{JSON.stringify(s.responses || {}, null, 2)}
                                  </pre>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
