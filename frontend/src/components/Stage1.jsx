import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import { API_BASE } from "../lib/apiBase";

export default function Stage1() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("NON_BINUSIAN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !type) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/team/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, type }),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.message || (body.errors && body.errors.join(", ")) || "Registration failed" );
        setLoading(false);
        return;
      }

      localStorage.setItem("token", body.data.token);
      localStorage.setItem("teamId", body.data.teamId);
      localStorage.setItem("teamType", type);
      navigate("/register/stage2");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-step active" id="step-1">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title">
            <em>Registration Form</em>
          </h1>
          <Stepper step={1} />
          <div className="input-group">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Team Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="input-group">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="BINUSIAN">BINUSIAN</option>
              <option value="NON_BINUSIAN">NON_BINUSIAN</option>
            </select>
          </div>

          {error && (
            <div style={{ color: "salmon", marginTop: 8 }}>{error}</div>
          )}
          <div className="button-wrapper">
            <button className="continue-btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
