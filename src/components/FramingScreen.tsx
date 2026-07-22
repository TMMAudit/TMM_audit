import { ArrowRight } from "lucide-react";

interface Props {
  onContinue: () => void;
}

const FramingScreen = ({ onContinue }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl space-y-8">
        <h2 className="text-[36px] text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
          Before we start.
        </h2>

        <p className="text-muted-foreground text-[15px] leading-[1.75] max-w-[540px]" style={{ fontFamily: "var(--font-body)" }}>
          This assessment works in two parts.
        </p>

        <p className="text-muted-foreground text-[15px] leading-[1.75] max-w-[540px]" style={{ fontFamily: "var(--font-body)" }}>
          <strong className="text-foreground">Section 1</strong> measures you, how clearly you operate as a founder, whether your identity and language are working for you, and how intentionally you learn and apply new knowledge including AI.
        </p>

        <p className="text-muted-foreground text-[15px] leading-[1.75] max-w-[540px]" style={{ fontFamily: "var(--font-body)" }}>
          <strong className="text-foreground">Section 2</strong> measures your business, how safely and responsibly your team is using AI tools right now.
        </p>

        <p className="text-primary text-[15px] leading-[1.75] max-w-[540px]" style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>
          Be honest. This is most useful when it reflects reality, not where you hope to be.
        </p>

        <div className="space-y-3 pt-2">
          <p className="text-muted-foreground text-[9px] uppercase mb-3" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}>
            SCORING SCALE
          </p>
          {[
            { score: "0", label: "Not yet", desc: "Nothing is in place." },
            { score: "1", label: "Informal", desc: "Something exists but it's not documented or consistent." },
            { score: "2", label: "Written down", desc: "You have a process, but it's not always followed." },
            { score: "3", label: "Consistent", desc: "Documented, applied the same way every time, and reviewed regularly." },
          ].map((item) => (
            <div key={item.score} className="flex items-start gap-3 text-muted-foreground text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
              <span className="text-primary font-bold shrink-0" style={{ fontFamily: "var(--font-mono)" }}>{item.score}</span>
              <span><strong className="text-foreground">{item.label}.</strong> {item.desc}</span>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-[14px] leading-[1.75]" style={{ fontFamily: "var(--font-body)" }}>
          Any score of 0 or 1 is a gap. Your results will tell you which ones to fix first.
        </p>

        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[18px]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
        >
          Let's go <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FramingScreen;
