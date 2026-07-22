import { useRef } from "react";
import logo from "@/assets/xc-logo.png";
import { ArrowRight } from "lucide-react";

interface Props {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: Props) => {
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    tapCountRef.current += 1;
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      window.location.href = "/admin";
      return;
    }
    tapTimeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0;
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Execution Club" className="h-8 w-8" onClick={handleLogoClick} />
          <span
            className="font-bold text-foreground tracking-widest text-sm uppercase"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}
          >
            Execution Club
          </span>
        </div>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-xs uppercase hover:brightness-110 transition-all"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.08em" }}
        >
          Start Assessment <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6 pt-[100px] pb-24 relative overflow-hidden">
        {/* Background Node Map SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.08 }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <circle cx="200" cy="300" r="6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="400" cy="150" r="8" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="600" cy="400" r="10" stroke="hsl(var(--primary))" strokeWidth="2" />
          <circle cx="800" cy="200" r="7" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="1000" cy="350" r="6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="350" cy="500" r="5" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="700" cy="600" r="9" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="900" cy="500" r="6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <circle cx="150" cy="550" r="4" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="500" cy="250" r="5" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="1050" cy="550" r="7" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <line x1="200" y1="300" x2="400" y2="150" stroke="hsl(var(--primary))" strokeWidth="0.8" />
          <line x1="400" y1="150" x2="600" y2="400" stroke="hsl(var(--primary))" strokeWidth="0.8" />
          <line x1="600" y1="400" x2="800" y2="200" stroke="hsl(var(--primary))" strokeWidth="0.8" />
          <line x1="800" y1="200" x2="1000" y2="350" stroke="hsl(var(--primary))" strokeWidth="0.8" />
          <line x1="200" y1="300" x2="350" y2="500" stroke="hsl(var(--primary))" strokeWidth="0.6" />
          <line x1="600" y1="400" x2="700" y2="600" stroke="hsl(var(--primary))" strokeWidth="0.6" />
          <line x1="700" y1="600" x2="900" y2="500" stroke="hsl(var(--primary))" strokeWidth="0.6" />
          <line x1="900" y1="500" x2="1000" y2="350" stroke="hsl(var(--primary))" strokeWidth="0.6" />
          <line x1="400" y1="150" x2="500" y2="250" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="500" y1="250" x2="600" y2="400" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="150" y1="550" x2="350" y2="500" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="1000" y1="350" x2="1050" y2="550" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          <line x1="900" y1="500" x2="1050" y2="550" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        </svg>

        <div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, hsl(145 100% 42% / 0.06) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-3xl w-full text-center relative z-10">
          {/* Eyebrow */}
          <p
            className="text-primary text-[10px] uppercase mb-10 tracking-[0.2em]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            THE XECUTION CLUB™ AI READINESS ASSESSMENT
          </p>

          {/* Headline */}
          <h1
            className="text-[36px] md:text-[60px] lg:text-[72px] text-foreground"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            69 questions. Two sections.
            <br />
            <span className="block mt-2 text-primary">
              One score that tells you exactly where you stand.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-muted-foreground text-[17px] md:text-[19px] max-w-[600px] mx-auto leading-[1.75] mt-[60px]"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Most founders are asking the wrong question. They're asking how to use AI in their business. The real question is whether their business, and the person running it, is ready to use AI without multiplying what's already broken.
          </p>
          <p
            className="text-primary text-[17px] md:text-[19px] mt-4"
            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
          >
            This assessment measures both.
          </p>

          {/* CTA */}
          <div className="mt-10 relative">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, hsl(145 100% 42% / 0.12) 0%, transparent 70%)",
              }}
            />
            <button
              onClick={onStart}
              className="relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-12 py-6 rounded-md shadow-[0_0_20px_hsl(145,100%,42%,0.2)] hover:brightness-110 hover:shadow-[0_0_40px_hsl(145,100%,42%,0.35)] hover:-translate-y-0.5 transition-all uppercase text-[18px] md:text-[20px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.1em" }}
            >
              Start Assessment <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Proof Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-[60px] py-10 max-w-2xl mx-auto">
            {[
              { num: "69", label: "Questions", sub: "Targeted diagnostic across your founder infrastructure and AI systems" },
              { num: "9", label: "Domains", sub: "Identity, Language, Literacy, Operations, AI Security & Governance" },
              { num: "35", label: "Minutes", sub: "Honest. Thorough. Worth every one." },
              { num: "2", label: "Scores + 1 Composite", sub: "Section results, priority gaps, and your ONE THING to fix first" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span
                  className="text-primary text-[44px] md:text-[54px]"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
                >
                  {stat.num}
                </span>
                <span
                  className="text-foreground text-xs uppercase mt-1 tracking-wide"
                  style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
                >
                  {stat.label}
                </span>
                <span
                  className="text-muted-foreground text-[10px] mt-1.5 leading-snug"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="text-muted-foreground text-sm mt-[70px] italic"
            style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
          >
            Before AI multiplies anything, we need to know what we're multiplying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
