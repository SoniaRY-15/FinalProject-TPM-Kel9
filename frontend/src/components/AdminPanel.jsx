import { Link } from "react-router-dom";
import "../styles/adminpanel.css";

export default function AdminPanel() {

  return (
    <>
      <div className="ap-participants-section">
        <div className="ap-participants-header">
          <h2 className="ap-participants-title">All Participants</h2>

          <div className="ap-search-wrapper">
            <svg className="ap-search-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" fill="none" />
              <line x1="16" y1="16" x2="21" y2="21" stroke="white" strokeWidth="2" />
            </svg>

            <input type="text" placeholder="Search" />

            <svg className="ap-filter-icon" viewBox="0 0 24 24">
              <path d="M3 5h18l-7 8v5l-4 2v-7z" fill="white" />
            </svg>
          </div>
        </div>

        <div className="ap-participants-table">
          <div className="ap-table-header">
            <div>Team name</div>
            <div>Leader</div>
            <div>Members</div>
            <div></div>
          </div>

          {[
            {
              team: "NovaByte Collective",
              leader: "Alexander Pratama",
              members: ["Irwansya Rizya", "Tiara Anugeri", "Stephanie Zahra"],
            },
            {
              team: "NovaLabs",
              leader: "Kevin Santoso",
              members: ["Michelle Hartono", "Bryan Wijaya", "Felicia Lim"],
            },
            {
              team: "ByteForge",
              leader: "Daniel Saputra",
              members: ["Andini Rahma", "Farhan Akmal", "Citra Wulandari"],
            },
            {
              team: "QuantumWorks",
              leader: "Jonathan Lee",
              members: ["Vanessa Tan", "Michael Chandra", "Olivia Setiawan"],
            },
            {
              team: "PixelCraft",
              leader: "Aditya Nugroho",
              members: ["Sekar Ayu", "Dimas Prakoso", "Laila Zahra"],
            },
            {
              team: "CodeVenture",
              leader: "Samuel Hidayat",
              members: ["Jessica Tan", "Reza Fauzan", "Maya Kusuma"],
            },
            {
              team: "NeuralNest",
              leader: "Ivan Putra",
              members: ["Clarissa Ong", "Hendry Kurniawan", "Nadine Putri"],
            },
            {
              team: "LogicLoop",
              leader: "Bima Arya",
              members: ["Shinta Maharani", "Arief Ramadhan", "Zahra Nabilah"],
            },
          ].map((item, index) => (
            <div className="ap-participant-row" key={index}>
              <div className="ap-col team">{item.team}</div>
              <div className="ap-col leader">{item.leader}</div>
              <div className="ap-col members">
                {item.members.map((m, i) => (
                  <span key={i}>
                    {m}
                    <br />
                  </span>
                ))}
              </div>
              <div className="ap-col action">
                <Link to="/editor"><button className="ap-edit-btn">✎</button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

