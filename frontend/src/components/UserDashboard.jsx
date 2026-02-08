import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/code123.css";
import { API_BASE } from "../lib/apiBase";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [showPDF, setShowPDF] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
    } catch {
      return dateString;
    }
  };

  // Construct full URL for file - the backend serves /images folder directly
  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return null;

    if (fileUrl.startsWith("/images/")) {
      return `${API_BASE}${fileUrl}`;
    }
    return fileUrl;
  };

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_BASE}/api/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch dashboard data");
        }

        setDashboardData(result.data);
        setError("");
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError(err.message || "Failed to load dashboard");
        if (
          err.message.includes("Unauthorized") ||
          err.message.includes("token")
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleViewFile = (fileUrl, fileType) => {
    const fullUrl = getFileUrl(fileUrl);
    if (!fullUrl) {
      alert("File URL not available");
      return;
    }

    console.log("Viewing file:", fullUrl); // Debug log

    setSelectedFile({
      url: fullUrl,
      type: fileType,
    });
    setShowPDF(true);
  };

  if (loading) {
    return (
      <div className="cd-dashboard-page">
        <div
          className="cd-container"
          style={{ textAlign: "center", padding: "100px 20px", color: "#fff" }}
        >
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cd-dashboard-page">
        <div
          className="cd-container"
          style={{
            textAlign: "center",
            padding: "100px 20px",
            color: "#ff6b6b",
          }}
        >
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="cd-dashboard-page">
        <div
          className="cd-container"
          style={{ textAlign: "center", padding: "100px 20px", color: "#fff" }}
        >
          <h2>No data available</h2>
        </div>
      </div>
    );
  }

  const { team, leader, timeline, contactInfo } = dashboardData;

  return (
    <div className="cd-dashboard-page">
      <div className="cd-container">
        <h1 className="cd-form-title">
          <em>Dashboard</em>
        </h1>
        <hr />

        <div className="cd-dashboard-content">
          <div className="cd-left-section">
            <h2 className="cd-form2-title">{team?.name || "Team Name"}</h2>
            {leader && (
              <>
                <h3 className="cd-form3-title">
                  Leader Name: {leader.fullName}
                </h3>

                <div className="cd-info-grid">
                  <div>
                    <p>Birth Place: {leader.birthPlace}</p>
                    <p>Whatsapp: {leader.whatsapp}</p>
                    <p>Line ID: {leader.lineId}</p>
                  </div>
                  <div>
                    <p>Birth Date: {formatDate(leader.birthDate)}</p>
                    <p>Email: {leader.email}</p>
                    <p>Github: {leader.github || "N/A"}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="cd-right-section">
            <h2 className="cd-form2-title">Documents</h2>
            <div className="cd-doc-wrapper">
              {leader?.cvFileUrl ? (
                <div
                  className="cd-doc-card"
                  onClick={() => handleViewFile(leader.cvFileUrl, "CV")}
                  style={{ cursor: "pointer" }}
                  title={leader.cvFileUrl}
                >
                  View Your CV ↗
                </div>
              ) : (
                <div
                  className="cd-doc-card"
                  style={{ opacity: 0.5, cursor: "not-allowed" }}
                >
                  CV Not Uploaded
                </div>
              )}

              {team?.type === "BINUSIAN" ? (
                leader?.flazzFileUrl ? (
                  <div
                    className="cd-doc-card"
                    onClick={() =>
                      handleViewFile(leader.flazzFileUrl, "Flazz Card")
                    }
                    style={{ cursor: "pointer" }}
                    title={leader.flazzFileUrl}
                  >
                    View Your Flazz Card ↗
                  </div>
                ) : (
                  <div
                    className="cd-doc-card"
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  >
                    Flazz Card Not Uploaded
                  </div>
                )
              ) : leader?.idCardFileUrl ? (
                <div
                  className="cd-doc-card"
                  onClick={() =>
                    handleViewFile(leader.idCardFileUrl, "ID Card")
                  }
                  style={{ cursor: "pointer" }}
                  title={leader.idCardFileUrl}
                >
                  View Your ID Card ↗
                </div>
              ) : (
                <div
                  className="cd-doc-card"
                  style={{ opacity: 0.5, cursor: "not-allowed" }}
                >
                  ID Card Not Uploaded
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="cd-tl-section">
        <div className="cd-tl" id="tl">
          <div className="cd-tl-line"></div>

          {timeline && timeline.length > 0 ? (
            timeline.map((event, index) => (
              <div key={index} className="cd-tl-item">
                <h3>
                  {event.date}
                  <br />
                  {event.year}
                </h3>
                <div className="cd-dot"></div>
                <p>{event.title}</p>
                <span className="cd-desc">{event.description}</span>
                {event.meetingLink && (
                  <p style={{ marginTop: "8px" }}>
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Meeting Link: {event.meetingLink}
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="cd-tl-item">
              <p>No timeline events available</p>
            </div>
          )}
        </div>
      </div>

      {showPDF && selectedFile && (
        <div className="cd-pdf-overlay">
          <div className="cd-pdf-modal">
            {selectedFile.url.endsWith(".pdf") ||
            selectedFile.url.includes("pdf") ? (
              <iframe
                src={selectedFile.url}
                title={selectedFile.type}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src={selectedFile.url}
                alt={selectedFile.type}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            )}
            <button className="cd-close-btn" onClick={() => setShowPDF(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
