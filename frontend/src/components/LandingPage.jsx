import { useState, useEffect } from "react";
import { API_BASE } from "../lib/apiBase";

export default function LandingPage({ onNavigateToRegister }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [landingData, setLandingData] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  // Fetch landing page data from backend
  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/landing`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch landing data");
        }

        setLandingData(result.data);
        setError("");
      } catch (err) {
        console.error("Error fetching landing data:", err);
        setError(err.message || "Failed to load landing page");
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      setContactError("All fields are required");
      return;
    }

    try {
      setContactLoading(true);
      setContactError("");
      setContactSuccess("");

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      setContactSuccess("Message sent successfully!");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => setContactSuccess(""), 3000);
    } catch (err) {
      console.error("Error sending contact form:", err);
      setContactError(err.message || "Failed to send message");
    } finally {
      setContactLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="landing-page">
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "#fff" }}
        >
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-page">
        <div
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

  if (!landingData) {
    return (
      <div className="landing-page">
        <div
          style={{ textAlign: "center", padding: "100px 20px", color: "#fff" }}
        >
          <h2>No data available</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {landingData.hero?.eventName || "Hackathon '25"}{" "}
            <em className="em1">'</em>
          </h1>
          <div className="hero-tagline">
            <p style={{ marginLeft: "-35px" }}>
              <em className="em1">"</em>
              {landingData.hero?.eventTheme?.split(" Sustainable")[0] ||
                "Innovating for a"}
            </p>
            <p>
              Sustainable{" "}
              {landingData.hero?.eventTheme?.split("Sustainable ")[1] ||
                "Future"}
              <em className="em1">"</em>
            </p>
          </div>
        </div>
        <div className="hero-video">
          <div className="video-placeholder">
            <div className="play-button">▶</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about-section" id="about">
        <h2 className="section-title" style={{ fontSize: "30px" }}>
          About
        </h2>
        <p className="about-text" style={{ textAlign: "justify" }}>
          {landingData.about?.description ||
            "Hackathon merupakan sebuah kegiatan kolaboratif..."}
        </p>
        <a
          href={landingData.about?.guidebook?.pdfUrl || "#"}
          className="download-link"
        >
          Download Guidebook
        </a>
      </section>

      {/* Prize */}
      <section className="prize-section" id="prizes">
        <h2 className="section-title">Champion Prize</h2>
        <div className="prize-cards">
          {landingData.championPrizes?.prizes?.map((prize, index) => (
            <div
              key={index}
              className={`prize-card ${
                prize.position === "1st"
                  ? "first-place"
                  : prize.position === "2nd"
                    ? "second-place"
                    : "third-place"
              }`}
            >
              <div className="prize-number">
                {prize.position?.split("")[0]}
                {prize.position?.includes("st") && <sup>st</sup>}
                {prize.position?.includes("nd") && <sup>nd</sup>}
                {prize.position?.includes("rd") && <sup>rd</sup>}
              </div>
              <div className="prize-label">{prize.placeLabel || "Place"}</div>
              <div className="prize-amount">{prize.rewardMoney}</div>
              <div className="prize-extras">
                {prize.benefits?.join(" & ") || "Merchandise & Certificate"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-grid">
          {landingData.faq?.faqList?.map((item, index) => (
            <div
              key={index}
              className="faq-item"
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{item.question}</span>
                <span className="faq-arrow">&lt;</span>
              </div>
              {expandedFaq === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" id="timeline">
        <h2 className="section-title">Timeline</h2>
        <div className="timeline">
          {landingData.timeline?.events?.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">
                <div>{event.date}</div>
                <div>{event.year}</div>
              </div>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.meetingLink && (
                  <p className="timeline-note">
                    <em>Meeting Link: {event.meetingLink}</em>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsor */}
      <section className="sponsor-section">
        <h2
          className="section-title"
          style={{
            display: "inline-block",
            padding: "0px",
            textDecoration: "underline solid 2px #00FF59",
          }}
        >
          Sponsor
        </h2>
        <div className="sponsor-scroll-wrapper">
          <div className="sponsor-logos">
            {landingData.sponsors?.list?.map((sponsor, index) => (
              <div
                key={index}
                className={`sponsor-logo ${sponsor.logo?.split(".")[0]}`}
                title={sponsor.name}
              ></div>
            ))}
            {/* Repeat for scroll effect */}
            {landingData.sponsors?.list?.map((sponsor, index) => (
              <div
                key={`repeat-${index}`}
                className={`sponsor-logo ${sponsor.logo?.split(".")[0]}`}
                title={sponsor.name}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title" style={{ justifySelf: "start" }}>
          Contact Us
        </h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleContactChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={contactForm.subject}
              onChange={handleContactChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={contactForm.message}
              onChange={handleContactChange}
              style={{ height: "200px" }}
              required
            ></textarea>
          </div>
          {contactError && (
            <div style={{ color: "salmon", marginTop: 8 }}>{contactError}</div>
          )}
          {contactSuccess && (
            <div style={{ color: "#00FF59", marginTop: 8 }}>
              {contactSuccess}
            </div>
          )}
          <div className="form-submit">
            <button
              type="submit"
              className="submit-btn"
              disabled={contactLoading}
            >
              {contactLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </section>

      {/* Socials */}
      <section className="social-section">
        <h3>Follow us on</h3>
        <div className="social-links">
          <a
            href={landingData.socialMedia?.instagram || "#"}
            className="social insta"
            target="_blank"
            rel="noopener noreferrer"
          >
            @technoscapebncc
          </a>
          <a
            href={`mailto:${landingData.socialMedia?.email || "#"}`}
            className="social email"
          >
            {landingData.socialMedia?.email || "technoscape@bncc.net"}
          </a>
          <a
            href={landingData.socialMedia?.twitter || "#"}
            className="social x"
            target="_blank"
            rel="noopener noreferrer"
          >
            @BNCC_Binus
          </a>
          <a
            href={landingData.socialMedia?.facebook || "#"}
            className="social facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bina Nusantara Computer Club
          </a>
          <a
            href={landingData.socialMedia?.linkedin || "#"}
            className="social linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bina Nusantara Computer Club
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <a href={landingData.footer?.links?.privacyPolicy || "#"}>
            Privacy Policy
          </a>
          <p>
            {landingData.footer?.text ||
              "Powered and Organized by Bina Nusantara Computer Club"}
          </p>
          <a href={landingData.footer?.links?.termsOfService || "#"}>
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
