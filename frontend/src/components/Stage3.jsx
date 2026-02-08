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

    if (!cvFile) {
      setError("CV wajib diupload");
      return;
    }

    if (teamType === "BINUSIAN" && !cardFile) {
      setError("Flazz Card wajib diupload untuk BINUSIAN");
      return;
    }

    if (teamType === "NON_BINUSIAN" && !cardFile) {
      setError("ID Card wajib diupload untuk NON BINUSIAN");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const form = new FormData();

      // Add leader data
      Object.entries(leaderData).forEach(([k, v]) => {
        form.append(k, v);
      });

      // Add files
      form.append("cv", cvFile);

      if (cardFile) {
        if (teamType === "BINUSIAN") {
          form.append("flazz", cardFile);
        } else {
          form.append("idCard", cardFile);
        }
      }

      const res = await fetch(`${API_BASE}/api/leader`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.message || "Upload failed");
        setLoading(false);
        return;
      }

      // Clear only registration-specific data, KEEP the token
      localStorage.removeItem("teamId");
      localStorage.removeItem("teamType");
      localStorage.removeItem("leaderData");

      // Token stays so user can access dashboard directly
      navigate("/register/complete");
    } catch (err) {
      setError(err.message || "Network error");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-step active">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title">
            <em>Upload Documents</em>
          </h1>
          <Stepper step={3} />

          {error && (
            <div style={{ color: "salmon", marginTop: 8, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <UploadBox
            title="Upload CV"
            description="Drag or click to upload CV (PDF, JPG, PNG)"
            onFileSelect={setCvFile}
            selectedFile={cvFile}
          />

          {teamType === "BINUSIAN" ? (
            <UploadBox
              title="Upload Flazz Card"
              description="Upload your Flazz Card (PDF, JPG, PNG)"
              onFileSelect={setCardFile}
              selectedFile={cardFile}
            />
          ) : (
            <UploadBox
              title="Upload ID Card"
              description="Upload your ID Card (PDF, JPG, PNG)"
              onFileSelect={setCardFile}
              selectedFile={cardFile}
            />
          )}

          <div className="button-wrapper">
            <button className="continue-btn" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
