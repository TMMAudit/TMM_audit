import { ArrowRight } from "lucide-react";
import type { DomainInfo } from "@/data/questions";

interface Props {
  domain: DomainInfo;
  onContinue: () => void;
}

const DomainIntroScreen = ({ domain, onContinue }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-primary text-[9px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>
          DOMAIN
        </p>
        <h2 className="text-[28px] md:text-[36px] text-foreground leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
          {domain.name}
        </h2>
        <p className="text-muted-foreground text-[15px] leading-[1.7] max-w-[480px] mx-auto" style={{ fontFamily: "var(--font-body)" }}>
          {domain.intro}
        </p>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[14px]"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
        >
          CONTINUE <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DomainIntroScreen;
