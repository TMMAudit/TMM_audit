import { useState, useCallback, useEffect, useMemo } from "react";
import { usePaywallAccess } from "@/hooks/usePaywallAccess";
import PaywallView from "@/components/PaywallView";
import LoadingScreen from "@/components/LoadingScreen";
import LandingScreen from "@/components/LandingScreen";
import FramingScreen from "@/components/FramingScreen";
import SectionHeaderScreen from "@/components/SectionHeaderScreen";
import DomainIntroScreen from "@/components/DomainIntroScreen";
import QuestionScreen from "@/components/QuestionScreen";
import EmailCaptureScreen from "@/components/EmailCaptureScreen";
import SectionResultsScreen from "@/components/SectionResultsScreen";
import OneThingScreen from "@/components/OneThingScreen";
import CompositeResultsScreen from "@/components/CompositeResultsScreen";
import { supabase } from "@/integrations/supabase/client";
import { useAssessmentSession } from "@/hooks/useAssessmentSession";
import { readSnapshot, clearSnapshot, AssessmentScreen } from "@/lib/sessionStore";
import {
  questions,
  s1Domains,
  s2Domains,
  S1_MAX,
  S2_MAX,
  COMPOSITE_MAX,
  calcSectionRaw,
  calcDomainScores,
  getS1Tier,
  getS2Tier,
  getCompositeTier,
  getLowestDomain,
  getPriorityGaps,
  s1TierCopy,
  s2TierCopy,
  compositeTierCopy,
  isDomainStart,
  getDomainForQuestion,
  oneThingStatements,
} from "@/data/questions";

type Screen = AssessmentScreen;

const Index = () => {
  const { hasAccess, checking } = usePaywallAccess();
  const { saveProgress } = useAssessmentSession();

  const [screen, setScreen] = useState<Screen>("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", email: "", businessName: "", industry: "" });
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  // On mount, detect resumable snapshot
  useEffect(() => {
    const snap = readSnapshot();
    if (snap && !snap.completed && snap.currentScreen !== "landing") {
      setShowResumePrompt(true);
    }
  }, []);

  const handleResume = useCallback(() => {
    const snap = readSnapshot();
    if (!snap) {
      setShowResumePrompt(false);
      return;
    }
    setResponses(snap.responses || {});
    setQuestionIndex(snap.currentQuestionIndex || 0);
    setUserInfo(snap.userInfo || { firstName: "", lastName: "", email: "", businessName: "", industry: "" });
    setScreen(snap.currentScreen);
    setShowResumePrompt(false);
  }, []);

  const handleStartOver = useCallback(() => {
    clearSnapshot();
    setShowResumePrompt(false);
    // Force a reload so the session hook regenerates a fresh sessionId
    window.location.reload();
  }, []);

  // Computed scores
  const s1Raw = calcSectionRaw(responses, 1);
  const s1Pct = Math.round((s1Raw / S1_MAX) * 100);
  const s1Tier = getS1Tier(s1Pct);
  const s1DomainScores = calcDomainScores(responses, s1Domains);
  const s1Gaps = getPriorityGaps(s1DomainScores);
  const s1Lowest = getLowestDomain(s1DomainScores);

  const s2Raw = calcSectionRaw(responses, 2);
  const s2Pct = Math.round((s2Raw / S2_MAX) * 100);
  const s2Tier = getS2Tier(s2Pct);
  const s2DomainScores = calcDomainScores(responses, s2Domains);
  const s2Gaps = getPriorityGaps(s2DomainScores);
  const s2Lowest = getLowestDomain(s2DomainScores);

  const compositeRaw = s1Raw + s2Raw;
  const compositePct = Math.round((compositeRaw / COMPOSITE_MAX) * 100);
  const compTier = getCompositeTier(compositePct);

  const imbalanceFlag = (() => {
    const diff = Math.abs(s1Pct - s2Pct);
    if (diff <= 25) return null;
    if (s1Pct > s2Pct) return "Your two sections are significantly out of balance. High Founder Intelligence + Low Security: You have the clarity but the infrastructure is exposed. AI is multiplying risk right now, not results. Address security first.";
    return "Your two sections are significantly out of balance. Low Founder Intelligence + High Security: The governance is solid but what it's protecting isn't fully formed yet. Identity and language work comes next.";
  })();

  // Helper to advance screens AND auto-save
  const goToScreen = useCallback((next: Screen, extra?: { questionIndex?: number }) => {
    setScreen(next);
    if (extra?.questionIndex !== undefined) setQuestionIndex(extra.questionIndex);
    saveProgress({
      currentScreen: next,
      currentQuestionIndex: extra?.questionIndex ?? questionIndex,
    });
  }, [saveProgress, questionIndex]);

  const handleAnswer = useCallback((questionId: number, answerScore: number) => {
    const newResponses = { ...responses, [questionId]: answerScore };
    setResponses(newResponses);

    const nextIndex = questionIndex + 1;

    // End of Section 1 (Q36 = index 35)
    if (questionIndex === 35) {
      setScreen("email");
      saveProgress({ responses: newResponses, currentQuestionIndex: questionIndex, currentScreen: "email" });
      return;
    }

    // End of Section 2
    if (nextIndex >= questions.length) {
      setScreen("s2results");
      saveProgress({ responses: newResponses, currentQuestionIndex: questionIndex, currentScreen: "s2results" });
      return;
    }

    if (isDomainStart(nextIndex)) {
      setQuestionIndex(nextIndex);
      const nextScreen: Screen = questions[nextIndex].section === 1 ? "domainIntro" : "s2domainIntro";
      setScreen(nextScreen);
      saveProgress({ responses: newResponses, currentQuestionIndex: nextIndex, currentScreen: nextScreen });
      return;
    }

    setQuestionIndex(nextIndex);
    saveProgress({ responses: newResponses, currentQuestionIndex: nextIndex, currentScreen: "question" });
  }, [responses, questionIndex, saveProgress]);

  const handleEmailSubmit = useCallback((firstName: string, lastName: string, email: string, businessName: string, industry: string) => {
    const info = { firstName, lastName, email, businessName, industry };
    setUserInfo(info);
    setScreen("s1results");
    saveProgress({ userInfo: info, currentScreen: "s1results" });
  }, [saveProgress]);

  const handleS1OneThingContinue = useCallback(() => {
    setScreen("s2header");
    saveProgress({ currentScreen: "s2header" });
  }, [saveProgress]);

  const handleS2OneThingContinue = useCallback(async () => {
    try {
      const s1Statement = oneThingStatements[s1Lowest.key] || "";
      const s2Statement = oneThingStatements[s2Lowest.key] || "";

      const { error } = await (supabase.from as any)("assessments").insert({
        first_name: userInfo.firstName,
        last_name: userInfo.lastName || null,
        email: userInfo.email,
        business_name: userInfo.businessName || null,
        industry: userInfo.industry || null,
        responses: responses as any,
        section1_raw: s1Raw,
        section1_pct: s1Pct,
        section1_tier: s1Tier,
        section2_raw: s2Raw,
        section2_pct: s2Pct,
        section2_tier: s2Tier,
        composite_raw: compositeRaw,
        composite_pct: compositePct,
        composite_tier: compTier,
        s1_one_thing_domain: s1Lowest.name,
        s1_one_thing_statement: s1Statement,
        s2_one_thing_domain: s2Lowest.name,
        s2_one_thing_statement: s2Statement,
        lowest_s1_domain: s1Lowest.name,
        lowest_s2_domain: s2Lowest.name,
      });

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        saveProgress({
          completed: true,
          currentScreen: "composite",
        });
      }
    } catch (e) {
      console.error("Failed to save assessment:", e);
    }

    setScreen("composite");
  }, [responses, userInfo, s1Raw, s1Pct, s1Tier, s2Raw, s2Pct, s2Tier, compositeRaw, compositePct, compTier, s1Lowest, s2Lowest, saveProgress]);

  const currentDomain = getDomainForQuestion(questionIndex);

  if (checking) return <LoadingScreen />;
  if (!hasAccess) return <PaywallView />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showResumePrompt && screen === "landing" && (
        <div className="fixed top-0 inset-x-0 z-50 bg-primary/10 border-b border-primary/40 backdrop-blur">
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-foreground text-sm" style={{ fontFamily: "var(--font-body)" }}>
              You have an assessment in progress. Resume where you left off?
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResume}
                className="bg-primary text-primary-foreground px-4 py-2 rounded text-xs uppercase hover:brightness-110"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                Resume
              </button>
              <button
                onClick={handleStartOver}
                className="border border-border text-muted-foreground px-4 py-2 rounded text-xs uppercase hover:text-foreground"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.1em" }}
              >
                Start over
              </button>
            </div>
          </div>
        </div>
      )}
      {screen === "landing" && <LandingScreen onStart={() => goToScreen("framing")} />}
      {screen === "framing" && <FramingScreen onContinue={() => goToScreen("s1header")} />}
      {screen === "s1header" && (
        <SectionHeaderScreen
          sectionNumber={1}
          headline="Founder Intelligence"
          body="This section measures how clearly you're built as a leader, your identity, self-awareness, language, and how you learn and apply new knowledge including AI."
          questionCount={36}
          ctaLabel="Begin Section 1"
          onContinue={() => goToScreen("domainIntro", { questionIndex: 0 })}
        />
      )}
      {screen === "domainIntro" && currentDomain && (
        <DomainIntroScreen
          domain={currentDomain}
          onContinue={() => goToScreen("question")}
        />
      )}
      {screen === "question" && (
        <QuestionScreen questionIndex={questionIndex} onAnswer={handleAnswer} />
      )}
      {screen === "email" && <EmailCaptureScreen onSubmit={handleEmailSubmit} />}
      {screen === "s1results" && (
        <SectionResultsScreen
          sectionNumber={1}
          sectionLabel="SECTION 1 · FOUNDER INTELLIGENCE"
          raw={s1Raw}
          max={S1_MAX}
          pct={s1Pct}
          tier={s1Tier}
          tierCopy={s1TierCopy[s1Tier] || ""}
          domainScores={s1DomainScores}
          priorityGaps={s1Gaps}
        />
      )}
      {screen === "s1results" && (
        <div className="flex justify-center pb-12">
          <button
            onClick={() => goToScreen("s1onething")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[16px]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
          >
            Continue →
          </button>
        </div>
      )}
      {screen === "s1onething" && (
        <OneThingScreen
          lowestDomainName={s1Lowest.name}
          oneThingStatement={oneThingStatements[s1Lowest.key] || ""}
          ctaLabel="Continue to Section 2"
          onContinue={handleS1OneThingContinue}
        />
      )}
      {screen === "s2header" && (
        <SectionHeaderScreen
          sectionNumber={2}
          headline="AI Security & Governance"
          body="This section measures how safely and responsibly your business uses AI tools right now."
          questionCount={33}
          ctaLabel="Begin Section 2"
          onContinue={() => goToScreen("s2domainIntro", { questionIndex: 36 })}
        />
      )}
      {screen === "s2domainIntro" && currentDomain && (
        <DomainIntroScreen
          domain={currentDomain}
          onContinue={() => goToScreen("question")}
        />
      )}
      {screen === "s2results" && (
        <>
          <SectionResultsScreen
            sectionNumber={2}
            sectionLabel="SECTION 2 · AI SECURITY & GOVERNANCE"
            raw={s2Raw}
            max={S2_MAX}
            pct={s2Pct}
            tier={s2Tier}
            tierCopy={s2TierCopy[s2Tier] || ""}
            domainScores={s2DomainScores}
            priorityGaps={s2Gaps}
          />
          <div className="flex justify-center pb-12">
            <button
              onClick={() => goToScreen("s2onething")}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[16px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
            >
              Continue →
            </button>
          </div>
        </>
      )}
      {screen === "s2onething" && (
        <OneThingScreen
          lowestDomainName={s2Lowest.name}
          oneThingStatement={oneThingStatements[s2Lowest.key] || ""}
          ctaLabel="See My Full Composite Score"
          onContinue={handleS2OneThingContinue}
        />
      )}
      {screen === "composite" && (() => {
        const s1LowestScore = s1DomainScores.find(ds => ds.domain.key === s1Lowest.key);
        const s2LowestScore = s2DomainScores.find(ds => ds.domain.key === s2Lowest.key);
        const s1LowestPct = s1LowestScore?.pct ?? 100;
        const s2LowestPct = s2LowestScore?.pct ?? 100;
        const overallLowest = s1LowestPct <= s2LowestPct ? s1Lowest : s2Lowest;
        const overallOneThingStatement = oneThingStatements[overallLowest.key] || "";
        return (
          <CompositeResultsScreen
            s1Raw={s1Raw}
            s1Pct={s1Pct}
            s1Tier={s1Tier}
            s2Raw={s2Raw}
            s2Pct={s2Pct}
            s2Tier={s2Tier}
            compositeRaw={compositeRaw}
            compositePct={compositePct}
            compositeTier={compTier}
            compositeTierCopy={compositeTierCopy[compTier] || ""}
            imbalanceFlag={imbalanceFlag}
            overallLowestDomainName={overallLowest.name}
            overallOneThingStatement={overallOneThingStatement}
          />
        );
      })()}
    </div>
  );
};

export default Index;
