const LoadingScreen = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "#0a0a0a" }}
  >
    <span
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: "32px",
        color: "#39ff14",
        letterSpacing: "0.1em",
      }}
    >
      XC
    </span>
  </div>
);

export default LoadingScreen;
