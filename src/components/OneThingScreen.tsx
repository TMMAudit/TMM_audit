import { ArrowRight } from "lucide-react";

interface Props {
  lowestDomainName: string;
  oneThingStatement: string;
  ctaLabel: string;
  onContinue: () => void;
}

const OneThingScreen = ({ lowestDomainName, oneThingStatement, ctaLabel, onContinue }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full space-y-8">
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
            {lowestDomainName}
          </p>
        </div>

        <p className="text-foreground text-[15px] leading-[1.8]" style={{ fontFamily: "var(--font-body)" }}>
          {oneThingStatement}
        </p>

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

export default OneThingScreen;
