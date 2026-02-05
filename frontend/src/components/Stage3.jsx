import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import UploadBox from "./UploadBox";
import { API_BASE } from "../lib/apiBase";

export default function Stage3() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const teamType = localStorage.getItem("teamType");
  const leaderData = JSON.parse(localStorage.getItem("leaderData") || "{}");
  const [cvFile, setCvFile] = useState(null);
  const [cardFile, setCardFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Missing team token. Please restart registration.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      Object.entries(leaderData).forEach(([k, v]) => form.append(k, v));
      form.append("cv", cvFile);
      if (cardFile) {
        if (teamType === "BINUSIAN") form.append("flazz", cardFile);
        else form.append("idCard", cardFile);
      }

      const res = await fetch(`${API_BASE}/api/leader`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (!res.ok) throw new Error("Upload failed");
      navigate("/register/complete");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-step active">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title"><em>Upload Documents</em></h1>
          <Stepper step={3} />
          {error && <div style={{ color: "salmon" }}>{error}</div>}
          <button className="continue-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
}
