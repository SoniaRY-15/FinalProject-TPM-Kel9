import { useState } from "react";

export default function LandingPage({ onNavigateToRegister }) {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Hackathon <em className="em1">'</em>25</h1>
          <div className="hero-tagline">
            <p style={{marginLeft: "-35px"}}><em className="em1">"</em>Innovating for a</p>
            <p>Sustainable Future<em className="em1">"</em></p>
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
        <h2 className="section-title" style={{fontSize: "30px"}}>About</h2>
        <p className="about-text" style={{textAlign: "justify"}}>
            Hackathon merupakan sebuah kegiatan kolaboratif yang mempertemukan individu atau tim dalam waktu terbatas untuk merancang dan mengembangkan solusi inovatif berbasis teknologi terhadap suatu permasalahan tertentu. Melalui hackathon, peserta tidak hanya dituntut memiliki kemampuan teknis, tetapi juga kemampuan berpikir kritis, bekerja sama lintas bidang, serta menyampaikan ide secara terstruktur dalam bentuk prototipe atau konsep solusi.
        </p>
        <a href="#" className="download-link">Download Guidebook </a>
      </section>

      {/* Prize */}
      <section className="prize-section" id="prizes">
        <h2 className="section-title">Champion Prize</h2>
        <div className="prize-cards">
          <div className="prize-card second-place">
            <div className="prize-number">2<sup>nd</sup></div>
            <div className="prize-label">Place</div>
            <div className="prize-amount">Rp 15.000.000</div>
            <div className="prize-extras">Merchandise & Certificate</div>
          </div>
          
          <div className="prize-card first-place">
            <div className="prize-number">1<sup>st</sup></div>
            <div className="prize-label">Place</div>
            <div className="prize-amount">Rp 20.000.000</div>
            <div className="prize-extras">Merchandise & Certificate</div>
          </div>
          
          <div className="prize-card third-place">
            <div className="prize-number">3<sup>rd</sup></div>
            <div className="prize-label">Place</div>
            <div className="prize-amount">Rp 10.000.000</div>
            <div className="prize-extras">Merchandise & Certificate</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <h2 className="section-title">FAQ</h2>
        <div className="faq-grid">
          <div className="faq-item" onClick={() => toggleFaq(0)}>
            <div className="faq-question">
              <span>Apa itu Hackathon?</span>
              <span className="faq-arrow">&lt;</span>
            </div>
            {expandedFaq === 0 && (
              <div className="faq-answer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dicta, nesciunt architecto exercitationem rerum alias atque, molestiae vero voluptate mollitia fugiat porro at non omnis quaerat fuga voluptates recusandae quas!
              </div>
            )}
          </div>
          
          <div className="faq-item" onClick={() => toggleFaq(1)}>
            <div className="faq-question">
              <span>Siapa yang dapat berpartisipasi dalam Hackathon?</span>
              <span className="faq-arrow">&lt;</span>
            </div>
            {expandedFaq === 1 && (
              <div className="faq-answer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi veritatis corrupti praesentium sapiente id tempora deleniti cum magni hic fugiat sequi, dolorem repudiandae laboriosam, esse ad fuga alias, provident tempore!
              </div>
            )}
          </div>
          
          <div className="faq-item" onClick={() => toggleFaq(2)}>
            <div className="faq-question">
              <span>Bagaimana pembentukan tim dilakukan?</span>
              <span className="faq-arrow">&lt;</span>
            </div>
            {expandedFaq === 2 && (
              <div className="faq-answer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus enim consequuntur magni mollitia maxime eveniet vel saepe ab iure dolore ut fugit corporis libero alias esse, consectetur dignissimos ad itaque?
              </div>
            )}
          </div>
          
          <div className="faq-item" onClick={() => toggleFaq(3)}>
            <div className="faq-question">
              <span>Siapa yang dapat berpartisipasi dalam Hackathon?</span>
              <span className="faq-arrow">&lt;</span>
            </div>
            {expandedFaq === 3 && (
              <div className="faq-answer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dolor rem ex id quisquam autem recusandae placeat in eligendi, fugiat quasi eaque quas sunt repudiandae amet harum itaque dolore asperiores!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section" id="timeline">
        <h2 className="section-title">Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">
              <div>March 1</div>
              <div>2025</div>
            </div>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Open Registration</h3>
              <p>Registration officially opens. Participants can form teams and secure their spot in the hackathon.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-date">
              <div>March 20</div>
              <div>2025</div>
            </div>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Close Registration</h3>
              <p>Last day to register. All participants and teams must be confirmed before this date.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-date">
              <div>March 23</div>
              <div>2025</div>
            </div>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Technical Meeting</h3>
              <p>An official briefing covering rules, judging criteria, technical guidelines, and Q&A.</p>
              <p className="timeline-note"><em>Meeting Link: To be announced</em></p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-date">
              <div>April 4</div>
              <div>2025</div>
            </div>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>Competition Day</h3>
              <p>The main event. Participants build, test, and present their solutions to the judges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor */}
      <section className="sponsor-section">
        <h2 className="section-title" style={{display: "inline-block", padding: "0px", textDecoration: "underline solid 2px #00FF59"}}>Sponsor</h2>
        <div className="sponsor-scroll-wrapper">
          <div className="sponsor-logos">
            <div className="sponsor-logo microsoft"></div>
            <div className="sponsor-logo tiketcom"></div>
            <div className="sponsor-logo intel"></div>
            <div className="sponsor-logo gojek"></div>
            <div className="sponsor-logo tokopedia"></div>
            <div className="sponsor-logo shopee"></div>
            <div className="sponsor-logo logitech"></div>
            <div className="sponsor-logo favesolution"></div>
            <div className="sponsor-logo kompas"></div>
            <div className="sponsor-logo dicoding"></div>
            <div className="sponsor-logo astro"></div>
            <div className="sponsor-logo axioo"></div>
            <div className="sponsor-logo dell"></div>
            <div className="sponsor-logo sandisk"></div>

            <div className="sponsor-logo microsoft"></div>
            <div className="sponsor-logo tiketcom"></div>
            <div className="sponsor-logo intel"></div>
            <div className="sponsor-logo gojek"></div>
            <div className="sponsor-logo tokopedia"></div>
            <div className="sponsor-logo shopee"></div>
            <div className="sponsor-logo logitech"></div>
            <div className="sponsor-logo favesolution"></div>
            <div className="sponsor-logo kompas"></div>
            <div className="sponsor-logo dicoding"></div>
            <div className="sponsor-logo astro"></div>
            <div className="sponsor-logo axioo"></div>
            <div className="sponsor-logo dell"></div>
            <div className="sponsor-logo sandisk"></div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title" style={{justifySelf: "start"}}>Contact Us</h2>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your Email" />
            </div>
          </div>
          <div className="form-group">
            <label>Message</label>
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" style={{height: "200px"}}></textarea>
          </div>
          <div className="form-submit">
            <button type="submit" className="submit-btn">Button </button>
          </div>
        </form>
      </section>

      {/* Socials */}
      <section className="social-section">
        <h3>Follow us on</h3>
        <div className="social-links">
          <a href="#" className="social insta">@technoscapebncc</a>
          <a href="#" className="social email">technoscape@bncc.net</a>
          <a href="#" className="social x">@BNCC_Binus</a>
          <a href="#" className="social facebook">Bina Nusantara Computer Club</a>
          <a href="#" className="social linkedin">Bina Nusantara Computer Club</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <a href="#">Privacy Policy</a>
          <p>Powered and Organized by Bina Nusantara Computer Club</p>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}