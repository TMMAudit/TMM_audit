import type { DomainInfo } from "@/data/questions";

interface DomainScore {
  domain: DomainInfo;
  raw: number;
  pct: number;
}

interface Props {
  sectionNumber: 1 | 2;
  sectionLabel: string;
  raw: number;
  max: number;
  pct: number;
  tier: string;
  tierCopy: string;
  domainScores: DomainScore[];
  priorityGaps: DomainInfo[];
}

const SectionResultsScreen = ({
  sectionNumber,
  sectionLabel,
  raw,
  max,
  pct,
  tier,
  tierCopy,
  domainScores,
  priorityGaps,
}: Props) => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Score */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            {sectionLabel}
          </p>
          <div className="text-6xl md:text-7xl text-primary" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
            {raw}<span className="text-muted-foreground text-2xl" style={{ fontFamily: "var(--font-mono)" }}>/{max}</span>
          </div>
          <p className="text-muted-foreground text-sm" style={{ fontFamily: "var(--font-mono)" }}>{pct}%</p>
          <div className="inline-block px-4 py-2 rounded-full bg-secondary text-foreground text-lg" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
            {tier}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Domain Breakdown */}
        <div className="space-y-4">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            DOMAIN BREAKDOWN
          </p>
          <div className="space-y-3">
            {domainScores.map(({ domain, raw: dRaw, pct: dPct }) => (
              <div key={domain.key} className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground text-sm" style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
                    {domain.name}
                  </span>
                  <span className="text-primary text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                    {dRaw}/{domain.maxScore} ({dPct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${dPct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Gaps */}
        {priorityGaps.length > 0 && (
          <>
            <div className="h-px bg-border" />
            <div className="space-y-3">
              <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
                YOUR PRIORITY GAPS
              </p>
              <ul className="space-y-2">
                {priorityGaps.map((d) => (
                  <li key={d.key} className="flex items-center gap-2">
                    <span className="text-primary" style={{ fontFamily: "var(--font-mono)" }}>•</span>
                    <span className="text-foreground text-sm" style={{ fontFamily: "var(--font-body)" }}>{d.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <div className="h-px bg-border" />

        {/* Tier Description */}
        <div className="space-y-3">
          <p className="text-muted-foreground text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
            WHAT THIS MEANS
          </p>
          <p className="text-secondary-foreground text-[15px] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
            {tierCopy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionResultsScreen;
