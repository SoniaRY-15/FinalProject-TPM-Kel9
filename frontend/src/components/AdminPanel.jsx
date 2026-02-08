import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminpanel.css";
import { API_BASE } from "../lib/apiBase";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState(""); // For immediate UI feedback
  const [searchTerm, setSearchTerm] = useState(""); // For actual search
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch participants from backend
  const fetchParticipants = async (
    search = "",
    sort = "createdAt",
    order = "desc",
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Build query params
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("sortBy", sort);
      params.append("sortOrder", order);

      const response = await fetch(
        `${API_BASE}/api/admin/participants?${params.toString()}`,
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
        throw new Error(result.message || "Failed to fetch participants");
      }

      // Transform data from database format to table format
      const formattedData = result.data.map((team) => ({
        id: team.id,
        team: team.name,
        type: team.type,
        leader: team.leader?.fullName || "N/A",
        email: team.leader?.email || "N/A",
        whatsapp: team.leader?.whatsapp || "N/A",
        lineId: team.leader?.lineId || "N/A",
        github: team.leader?.github || "N/A",
        birthPlace: team.leader?.birthPlace || "N/A",
        birthDate: team.leader?.birthDate || "N/A",
        createdAt: team.createdAt,
      }));

      setParticipants(formattedData);
      setError("");
    } catch (err) {
      console.error("Error fetching participants:", err);
      setError(err.message || "Failed to load participants");
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

  // Debounce search - only fetch after user stops typing for 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch when searchTerm actually changes
  useEffect(() => {
    fetchParticipants(searchTerm, sortBy, sortOrder);
  }, [searchTerm, sortBy, sortOrder]);

  // Fetch on mount
  useEffect(() => {
    fetchParticipants("", sortBy, sortOrder);
  }, []);

  const handleEdit = (teamId) => {
    navigate(`/editor/${teamId}`);
  };

  const handleDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/admin/participants/${teamId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete team");
      }

      fetchParticipants(searchTerm, sortBy, sortOrder);
      alert("Team deleted successfully");
    } catch (err) {
      console.error("Error deleting team:", err);
      alert(err.message || "Failed to delete team");
    }
  };

  if (loading) {
    return (
      <div className="ap-participants-section">
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "#fff" }}
        >
          <h2>Loading participants...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ap-participants-section">
        <div
          style={{
            textAlign: "center",
            padding: "100px 20px",
            color: "#ff6b6b",
          }}
        >
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => fetchParticipants(searchTerm, sortBy, sortOrder)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ap-participants-section">
        <div className="ap-participants-header">
          <h2 className="ap-participants-title">All Participants</h2>

          <div className="ap-search-wrapper">
            <svg className="ap-search-icon" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1="16"
                y1="16"
                x2="21"
                y2="21"
                stroke="white"
                strokeWidth="2"
              />
            </svg>

            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <svg className="ap-filter-icon" viewBox="0 0 24 24">
              <path d="M3 5h18l-7 8v5l-4 2v-7z" fill="white" />
            </svg>
          </div>
        </div>

        <div className="ap-participants-table">
          <div className="ap-table-header">
            <div>Team name</div>
            <div>Leader</div>
            <div>Type</div>
            <div></div>
          </div>

          {participants.length > 0 ? (
            participants.map((item) => (
              <div className="ap-participant-row" key={item.id}>
                <div className="ap-col team">{item.team}</div>
                <div className="ap-col leader">{item.leader}</div>
                <div className="ap-col type">
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor:
                        item.type === "BINUSIAN" ? "#00FF59" : "#FF6B9D",
                      color: item.type === "BINUSIAN" ? "#000" : "#fff",
                    }}
                  >
                    {item.type}
                  </span>
                </div>
                <div className="ap-col action">
                  <button
                    className="ap-edit-btn"
                    onClick={() => handleEdit(item.id)}
                    title="Edit team"
                  >
                    ✎
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="ap-participant-row">
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#999",
                  width: "100%",
                }}
              >
                No participants found
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center", color: "#fff" }}>
          <p>Total: {participants.length} team(s)</p>
        </div>
      </div>
    </>
  );
}
