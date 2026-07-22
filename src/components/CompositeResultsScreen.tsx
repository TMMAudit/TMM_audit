import { useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/xc-logo.png";

interface Props {
  s1Raw: number;
  s1Pct: number;
  s1Tier: string;
  s2Raw: number;
  s2Pct: number;
  s2Tier: string;
  compositeRaw: number;
  compositePct: number;
  compositeTier: string;
  compositeTierCopy: string;
  imbalanceFlag: string | null;
  overallLowestDomainName: string;
  overallOneThingStatement: string;
}

const CompositeResultsScreen = ({
  s1Raw, s1Pct, s1Tier,
  s2Raw, s2Pct, s2Tier,
  compositeRaw, compositePct, compositeTier, compositeTierCopy,
  imbalanceFlag,
  overallLowestDomainName,
  overallOneThingStatement,
  
}: Props) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Headline */}
        <div className="text-center space-y-2">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            YOUR AI READINESS SCORE
          </p>
        </div>

        {/* Section Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-6 text-center space-y-2">
            <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}>SECTION 1 · FOUNDER INTELLIGENCE</p>
            <div className="text-4xl text-primary" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
              {s1Raw}<span className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-mono)" }}>/108</span>
            </div>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>{s1Pct}%</p>
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-foreground text-sm" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              {s1Tier}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center space-y-2">
            <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}>SECTION 2 · AI SECURITY & GOVERNANCE</p>
            <div className="text-4xl text-primary" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
              {s2Raw}<span className="text-muted-foreground text-lg" style={{ fontFamily: "var(--font-mono)" }}>/99</span>
            </div>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>{s2Pct}%</p>
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-foreground text-sm" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              {s2Tier}
            </div>
          </div>
        </div>

        {/* Composite */}
        <div className="text-center space-y-4 py-6">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            COMPOSITE SCORE
          </p>
          <div className="text-7xl md:text-8xl text-primary" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
            {compositeRaw}
          </div>
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>out of 207 · {compositePct}%</p>
          <div className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-lg" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
            {compositeTier}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Composite Tier Copy */}
        <p className="text-secondary-foreground text-[15px] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
          {compositeTierCopy}
        </p>

        {/* Imbalance Flag */}
        {imbalanceFlag && (
          <>
            <div className="h-px bg-border" />
            <div className="bg-card border border-primary/30 rounded-lg p-6 space-y-2">
              <p className="text-primary text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
                IMBALANCE DETECTED
              </p>
              <p className="text-secondary-foreground text-[15px] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
                {imbalanceFlag}
              </p>
            </div>
          </>
        )}

        <div className="h-px bg-border" />

        {/* ONE THING Reveal */}
        <div className="text-center space-y-6 py-8">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[16px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
            >
              Reveal Your One Thing <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="text-left space-y-6">
              <div className="space-y-4">
                <p className="text-primary text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
                  THE ONE THING
                </p>
                <p className="text-muted-foreground text-[14px] italic leading-[1.7]" style={{ fontFamily: "var(--font-body)" }}>
                  "What's the ONE Thing I can do, such that by doing it everything else will become easier or unnecessary?", Gary Keller
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
                  Your highest-leverage gap
                </p>
                <p className="text-primary text-xl" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
                  {overallLowestDomainName}
                </p>
              </div>

              <p className="text-foreground text-[15px] leading-[1.8]" style={{ fontFamily: "var(--font-body)" }}>
                {overallOneThingStatement}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border flex flex-col items-center gap-3">
          <img src={logo} alt="Execution Club" className="h-8 w-8" />
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>© 2026 The Xecution Club™</p>
        </footer>
      </div>
    </div>
  );
};

export default CompositeResultsScreen;
