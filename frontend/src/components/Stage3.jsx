import { useState } from "react";
import Stepper from "./Stepper";
import UploadBox from "./UploadBox";
import uploadIcon from "../assets/upload-btn.svg";
import { API_BASE } from "../lib/apiBase";

export default function Stage3({ token, leaderData, onComplete, teamType }) {
  const [cvFile, setCvFile] = useState(null);
  const [cardFile, setCardFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Missing team token. Please complete registration step first.");
      return;
    }
    if (!cvFile) {
      setError("Please attach CV file.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("fullName", leaderData.fullName);
      form.append("email", leaderData.email);
      form.append("whatsapp", leaderData.whatsapp);
      form.append("lineId", leaderData.lineId);
      form.append("github", leaderData.github);
      form.append("birthPlace", leaderData.birthPlace);
      form.append("birthDate", leaderData.birthDate);
      form.append("cv", cvFile);

      // send flazz for BINUSIAN, idCard for NON_BINUSIAN (backend expects either)
      if (cardFile) {
        if (teamType === "BINUSIAN") form.append("flazz", cardFile);
        else form.append("idCard", cardFile);
      }

      const res = await fetch(`${API_BASE}/api/leader`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type for FormData
        },
        body: form,
      });

      const body = await res.json();
      if (!res.ok) {
        setError(
          body.message ||
            (body.errors && body.errors.join(", ")) ||
            "Upload failed",
        );
        setLoading(false);
        return;
      }
      onComplete();
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-step active" id="step-3">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <h1 className="form-title">
            <em>Upload Documents</em>
          </h1>
          <Stepper step={3} />
          <div className="input-group">
            <UploadBox
              title="Upload your Curriculum Vitae"
              description="Upload Curriculum Vitae .pdf .jpg .jpeg .png"
              selectedFile={cvFile}
              onFileSelect={setCvFile}
              icon={uploadIcon}
            />
          </div>
          <div className="input-group">
            <UploadBox
              title="Upload your Binusian Card"
              description="Upload Flazz Card .pdf .jpg .jpeg .png"
              selectedFile={cardFile}
              onFileSelect={setCardFile}
              icon={uploadIcon}
            />
          </div>
          {error && <div style={{ color: "salmon" }}>{error}</div>}
          <div className="button-wrapper">
            <button className="continue-btn" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
