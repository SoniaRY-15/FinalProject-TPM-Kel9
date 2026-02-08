import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css";
import { API_BASE } from "../lib/apiBase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/team/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamName.trim(),
          password: password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error messages from backend
        setError(
          result.message ||
            (Array.isArray(result.errors)
              ? result.errors.join(", ")
              : "Login failed"),
        );
        setLoading(false);
        return;
      }

      // Store token in localStorage
      if (result.data && result.data.token) {
        localStorage.setItem("token", result.data.token);

        // Redirect to user dashboard
        navigate("/user-dashboard");
      } else {
        setError("No token received from server");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lp-container lp-form-step active" id="step-1">
        <div className="lp-input-wrapper">
          <h1 className="lp-form-title">
            <em>Welcome to Hackathon'25</em>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="lp-input-group">
              <input
                type="text"
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="lp-input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div style={{ color: "salmon", marginTop: 8, marginBottom: 8 }}>
                {error}
              </div>
            )}

            <div className="lp-button-wrapper">
              <button
                type="submit"
                className="lp-login-btn"
                disabled={loading || !teamName || !password}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>

          <div className="lp-signup-wrapper">
            <span className="lp-signup-text">Don't have an account?</span>
            <a href="/register" className="lp-signup-link">
              Register now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
