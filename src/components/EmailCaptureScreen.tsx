import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/data/questions";

interface Props {
  onSubmit: (firstName: string, lastName: string, email: string, businessName: string, industry: string) => void;
}

const EmailCaptureScreen = ({ onSubmit }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName) return;
    onSubmit(firstName, lastName, email, businessName, industry);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 900 }}>
            Section 1 complete.
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7]" style={{ fontFamily: "var(--font-body)" }}>
            You're halfway through.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.7]" style={{ fontFamily: "var(--font-body)" }}>
            Before we move into the AI Security & Governance section, enter your email so we can send you your complete results when you're done.
          </p>
          <p className="text-primary text-[13px]" style={{ fontFamily: "var(--font-mono)" }}>
            Your responses so far are saved.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] text-muted-foreground uppercase mb-2" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>FIRST NAME</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div>
            <label className="block text-[9px] text-muted-foreground uppercase mb-2" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>LAST NAME</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div>
            <label className="block text-[9px] text-muted-foreground uppercase mb-2" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div>
            <label className="block text-[9px] text-muted-foreground uppercase mb-2" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>BUSINESS NAME (OPTIONAL)</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
          <div>
            <label className="block text-[9px] text-muted-foreground uppercase mb-2" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em" }}>INDUSTRY (OPTIONAL)</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="">Select...</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md hover:brightness-110 transition-all uppercase text-[18px]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.12em" }}
          >
            Continue to Section 2 <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCaptureScreen;
