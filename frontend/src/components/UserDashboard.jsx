import { useState } from "react";
import "../styles/code123.css";

export default function Dashboard() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className="cd-dashboard-page">
      <div className="cd-container">
        <h1 className="cd-form-title"><em>Dashboard</em></h1>
        <hr />

        <div className="cd-dashboard-content">
          <div className="cd-left-section">
            <h2 className="cd-form2-title">NovaByte Collective</h2>
            <h3 className="cd-form3-title">Leader Name: Alexander Pratama</h3>

            <div className="cd-info-grid">
              <div>
                <p>Birth Place: Jakarta</p>
                <p>Whatsapp: +62 812-3456-7890</p>
                <p>Line ID: alexanderpratama</p>
              </div>
              <div>
                <p>Birth Date: 12 January 2006</p>
                <p>Email: alex@email.com</p>
                <p>Github: alexanderpratama</p>
              </div>
            </div>
          </div>

          <div className="cd-right-section">
            <h2 className="cd-form2-title">Documents</h2>
            <div className="cd-doc-wrapper">
              <div className="cd-doc-card" onClick={() => setShowPDF(true)}>
                View Your CV ↗
              </div>
              <div className="cd-doc-card" onClick={() => setShowPDF(true)}>
                View Your Card ↗
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="cd-tl-section">
      <div className="cd-tl" id="tl">
        <div className="cd-tl-line"></div>

              <div className="cd-tl-item">
                <h3>March 1<br />2025</h3>
                <div className="cd-dot"></div>
                <p>Open Registration</p>
                <span className="cd-desc">
                  Registration officially opens. Participants can form teams and secure their spot in the hackathon.
                </span>
              </div>

              <div className="cd-tl-item">
                <h3>March 20<br />2025</h3>
                <div className="cd-dot"></div>
                <p>Close Registration</p>
                <span className="cd-desc">
                  Last day to register. All participants and teams must be confirmed before this date.
                </span>
              </div>

              <div className="cd-tl-item">
                <h3>March 23<br />2025</h3>
                <div className="cd-dot"></div>
                <p>Technical Meeting</p>
                <span className="cd-desc">
                  An official briefing covering rules, judging criteria, technical guidelines, and Q&A.
                </span>
              </div>

              <div className="cd-tl-item">
                <h3>April 4<br />2025</h3>
                <div className="cd-dot"></div>
                <p>Competition Day</p>
                <span className="cd-desc">
                  The main event. Participants build, test, and present their solutions to the judges.
                </span>
              </div>
      </div>
      </div>


      {showPDF && (
        <div className="cd-pdf-overlay">
          <div className="cd-pdf-modal">
            <iframe src="/cv.pdf" title="CV" />
            <button className="cd-close-btn" onClick={() => setShowPDF(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}