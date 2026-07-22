
const items = [
  "A full written audit report covering identity, systems, infrastructure, offer, and operations",
  "A custom vulnerability and optimization map, specific to your business",
  "A 1:1 session with André on brand literacy and identity alignment",
  "A 1:1 session with Wayne on systems, infrastructure, and operational security",
  "Automatic enrollment in XC Cohort 1, first two months included",
];

const PaywallView = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ghost XC background */}
      <span
        className="pointer-events-none select-none absolute"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(200px, 40vw, 600px)",
          color: "rgba(57,255,20,0.03)",
          right: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 1,
        }}
      >
        XC
      </span>

      <div className="relative z-10 w-full max-w-[640px] mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* [1] Top label */}
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "#39ff14",
          }}
        >
          THE XECUTION CLUB, FULL BUSINESS AUDIT
        </span>

        {/* [2] Main heading */}
        <h1
          className="mt-6"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 8vw, 64px)",
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "#f0f0f0",
          }}
        >
          Know Where You
          <br />
          <span style={{ color: "#39ff14" }}>Stand.</span>
        </h1>

        {/* [3] Body copy */}
        <p
          className="mt-6 max-w-[520px]"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "16px",
            lineHeight: 1.7,
            color: "#aaaaaa",
          }}
        >
          The XC Full Business Audit gives you a complete picture of where your
          business is strong, where it's exposed, and exactly what to build next.
          No fluff. No generic advice. A real operational diagnosis, with the
          expert sessions to back it up.
        </p>

        {/* [4] What's included */}
        <div className="mt-10 w-full text-left">
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#39ff14",
            }}
          >
            WHAT'S INCLUDED
          </span>
          <div
            className="mt-3"
            style={{
              background: "#111111",
              borderLeft: "3px solid #39ff14",
              padding: "24px 28px",
              borderRadius: "4px",
            }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3"
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#f0f0f0",
                  lineHeight: 1.6,
                  marginBottom: i < items.length - 1 ? "12px" : 0,
                }}
              >
                <span style={{ color: "#39ff14", flexShrink: 0 }}>→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* [5] Price + CTA */}
        <div className="mt-10 w-full flex flex-col items-center">
          <button
            onClick={() => {
              window.location.href = STRIPE_LINK;
            }}
            className="mt-4 w-full sm:w-auto"
            style={{
              background: "#39ff14",
              color: "#0a0a0a",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "16px 40px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2ecc10";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#39ff14";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            CLAIM YOUR AUDIT SPOT →
          </button>
        </div>

        {/* [6] Trust line */}
        <p
          className="mt-5"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            color: "#aaaaaa",
            letterSpacing: "0.05em",
          }}
        >
          🔒 Secure checkout via Stripe &nbsp;· &nbsp;Report delivered within 48 hours &nbsp;· &nbsp;Sessions scheduled after enrollment
        </p>

        {/* [7] Bottom tag */}
        <p
          className="mt-16"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "10px",
            color: "#333333",
          }}
        >
          © The Xecution Club, Atlanta GA · xecutionclubatl.com
        </p>
      </div>
    </div>
  );
};

export default PaywallView;
