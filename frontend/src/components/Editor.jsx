import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editor.css";
import { API_BASE } from "../lib/apiBase";

export default function Editor() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState("NON_BINUSIAN");
  const [leaderName, setLeaderName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [lineId, setLineId] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token || !teamId) {
          navigate("/admin");
          return;
        }

        const response = await fetch(
          `${API_BASE}/api/admin/participants/${teamId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch team details");
        }

        const team = result.data;

        setTeamName(team.name);
        setTeamType(team.type);

        if (team.leader) {
          setLeaderName(team.leader.fullName || "");
          setBirthPlace(team.leader.birthPlace || "");
          setBirthDate(formatDateForInput(team.leader.birthDate) || "");
          setWhatsapp(team.leader.whatsapp || "");
          setEmail(team.leader.email || "");
          setLineId(team.leader.lineId || "");
          setGithub(team.leader.github || "");
        }

        setError("");
      } catch (err) {
        console.error("Error fetching team:", err);
        setError(err.message || "Failed to load team details");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId, navigate]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert("Team name is required");
      return;
    }

    if (!leaderName.trim()) {
      alert("Leader name is required");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const updateData = {
        name: teamName,
        type: teamType,
        fullName: leaderName,
        birthPlace,
        birthDate,
        whatsapp,
        email,
        lineId,
        github: github || null,
      };

      const response = await fetch(
        `${API_BASE}/api/admin/participants/${teamId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save changes");
      }

      alert("Changes saved successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error saving:", err);
      alert(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="ed-editor-page">
        <div className="ed-main-frame">
          <h1 className="ed-editor-title">
            <em>Loading...</em>
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ed-editor-page">
        <div className="ed-main-frame">
          <h1 className="ed-editor-title">
            <em>Error</em>
          </h1>
          <p style={{ color: "#ff6b6b" }}>{error}</p>
          <div className="ed-bottom-actions">
            <button className="ed-button ed-cancel-btn" onClick={handleCancel}>
              Back to Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ed-editor-page">
      <div className="ed-main-frame">
        <h1 className="ed-editor-title">
          <em>Data Editor</em>
        </h1>
        <h2 className="ed-team-name">{teamName}</h2>

        <table className="ed-editor-table">
          <thead>
            <tr>
              <th>Leader Name</th>
              <th>Birth Place</th>
              <th>Birth Date</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Line ID</th>
              <th>Github ID</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={lineId}
                  onChange={(e) => setLineId(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="-"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="ed-team-type-section">
          <label className="ed-team-type-label">
            Team Type:
            <select
              value={teamType}
              onChange={(e) => setTeamType(e.target.value)}
              className="ed-team-type-select"
            >
              <option value="BINUSIAN">BINUSIAN</option>
              <option value="NON_BINUSIAN">NON_BINUSIAN</option>
            </select>
          </label>
        </div>

        <div className="ed-bottom-actions">
          <button
            className="ed-button ed-cancel-btn"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="ed-button ed-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
