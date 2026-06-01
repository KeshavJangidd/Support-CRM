import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";


export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // this is for the fade in animations when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // console.log("element is visible!", entry.target); // debug
          }
        });
      },
      { threshold: 0.1 }
    );

    // observe all elements with the fade-up class
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-root">
      {/* background decorations */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-overlay" />
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="particle" style={{ "--i": i }} />
        ))}
      </div>

      {/* hero section */}
      <section className="hero" ref={heroRef}>
        <div className="badge fade-up">✦ Next-Gen Customer Support</div>

        <h1 className="hero-title fade-up">
          Support
          <span className="title-accent"> CRM</span>
        </h1>

        <p className="hero-sub fade-up">
          Manage support tickets efficiently with a clean,<br />
          modern dashboard built for speed and clarity.
        </p>

        {/* buttons */}
        <div className="hero-btns fade-up">
          <button className="cta-btn" onClick={() => navigate("/create")}>
            <span className="btn-glow" />
            <span className="btn-icon">✦</span>
            Create New Ticket
            <span className="btn-arrow">→</span>
          </button>
          <button className="cta-outline-btn" onClick={() => navigate("/tickets")}>
            View All Tickets →
          </button>
        </div>

        {/* stats bar - just placeholder numbers for now */}
        <div className="stats-bar fade-up">
          <div className="stat">
            <span className="stat-num">12k+</span>
            <span className="stat-label">Tickets Resolved</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">98%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">&lt;2h</span>
            <span className="stat-label">Avg Response Time</span>
          </div>
        </div>
      </section>

      {/* feature cards */}
      <section className="features">
        <div className="feature-card fade-up" style={{ "--delay": "0s" }}>
          <div className="card-icon-wrap"><span className="card-icon">📋</span></div>
          <div className="card-tag">Core</div>
          <h3 className="card-title">Tickets</h3>
          <p className="card-desc">Track and manage every customer request in one unified, intelligent workspace.</p>
          <div className="card-line" />
        </div>
        <div className="feature-card fade-up" style={{ "--delay": "0.15s" }}>
          <div className="card-icon-wrap"><span className="card-icon">⚡</span></div>
          <div className="card-tag">Workflow</div>
          <h3 className="card-title">Fast Workflow</h3>
          <p className="card-desc">Resolve issues at lightning speed with smart routing and automated prioritization.</p>
          <div className="card-line" />
        </div>
        <div className="feature-card fade-up" style={{ "--delay": "0.3s" }}>
          <div className="card-icon-wrap"><span className="card-icon">📊</span></div>
          <div className="card-tag">Analytics</div>
          <h3 className="card-title">Insights</h3>
          <p className="card-desc">Monitor ticket status, team performance, and activity trends in real time.</p>
          <div className="card-line" />
        </div>
      </section>

      {/* bottom call to action */}
      <section className="bottom-cta fade-up">
        <div className="bottom-cta-inner">
          <span className="bottom-cta-text">Ready to streamline your support?</span>
          <button className="cta-outline-btn" onClick={() => navigate("/create")}>
            Get Started Free →
          </button>
        </div>
      </section>
    </div>
  );
}
