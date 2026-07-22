import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // User arrived via recovery link, ready to set new password
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully. Redirecting...");
      setTimeout(() => navigate("/admin"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-6">
        <div className="text-center space-y-2">
          <p
            className="text-[9px] text-primary tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ADMIN ACCESS
          </p>
          <h1
            className="text-3xl text-foreground uppercase"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, letterSpacing: "-0.01em" }}
          >
            RESET PASSWORD
          </h1>
        </div>
        <div className="space-y-3">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-muted border-border"
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleReset()}
            className="bg-muted border-border"
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
          {message && <p className="text-primary text-sm text-center">{message}</p>}
          <Button onClick={handleReset} className="w-full" disabled={loading}>
            {loading ? "Updating..." : "SET NEW PASSWORD"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
