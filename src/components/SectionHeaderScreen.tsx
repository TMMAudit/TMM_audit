import { ArrowRight } from "lucide-react";

interface Props {
  sectionNumber: 1 | 2;
  headline: string;
  body: string;
  questionCount: number;
  ctaLabel: string;
  onContinue: () => void;
}

const SectionHeaderScreen = ({ sectionNumber, headline, body, questionCount, ctaLabel, onContinue }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-primary text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
          SECTION {sectionNumber} OF 2
        </p>
        <h2 className="text-[36px] md:text-[48px] text-foreground leading-[0.95]" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
          {headline}
        </h2>
        <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-[480px] mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          {questionCount} questions. {body}
        </p>
        {sectionNumber === 2 && (
          <p className="text-muted-foreground text-[13px] leading-[1.7] max-w-[480px] mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            The same scoring applies: 0 (Not yet) → 3 (Consistent).
          </p>
        )}
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[16px]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
        >
          {ctaLabel} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SectionHeaderScreen;
