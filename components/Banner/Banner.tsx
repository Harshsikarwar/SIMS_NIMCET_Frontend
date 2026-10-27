
import Link from "next/link";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="sims-banner">
      <div className="banner-container">
        {/* Left content */}
        <div className="banner-content">
          <div className="banner-badge">
            <span className="badge-dot" />
            YOUR JOURNEY TO NIT STARTS HERE
          </div>

          <h1>
            Crack NIMCET.
            <br />
            <span>Shape Your Future.</span>
          </h1>

          <p className="banner-description">
            Your dream of studying MCA at NITs starts with
            the right preparation. Learn smarter, practice
            better, and move closer to your goal with SIMS.
          </p>

          <div className="banner-actions">
            <Link
              href="/test-series"
              className="banner-btn banner-btn-primary"
            >
              Explore Test Series
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/nimcet-guide"
              className="banner-btn banner-btn-secondary"
            >
              NIMCET Guide
            </Link>
          </div>

          <div className="banner-note">
            <span className="banner-check">✓</span>
            Prepare with purpose. Practice with confidence.
          </div>
        </div>

        {/* Right decorative visual */}
        <div className="banner-visual" aria-hidden="true">
          <div className="visual-circle" />

          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="visual-card">
            <div className="visual-card-top">
              <span className="visual-card-label">
                YOUR NEXT CHAPTER
              </span>
              <span className="visual-star">✦</span>
            </div>

            <div className="visual-main-title">
              MCA
              <span>AT NIT</span>
            </div>

            <div className="visual-divider" />

            <div className="visual-progress-label">
              <span>Dream it.</span>
              <span>Achieve it.</span>
            </div>

            <div className="visual-progress">
              <span />
            </div>

            <div className="visual-card-footer">
              <span>SIMS-NIMCET</span>
              <span className="visual-arrow">↗</span>
            </div>
          </div>

          <div className="floating-note floating-note-top">
            <span className="floating-icon">✦</span>
            <span>
              <strong>Learn</strong>
              <small>with clarity</small>
            </span>
          </div>

          <div className="floating-note floating-note-bottom">
            <span className="floating-check">✓</span>
            <span>
              <strong>Practice</strong>
              <small>with confidence</small>
            </span>
          </div>

          <span className="decor-star decor-star-one">✦</span>
          <span className="decor-star decor-star-two">✳</span>
        </div>
      </div>

      {/* Bottom curved edge */}
      <div className="banner-bottom">
        <span />
      </div>
    </section>
  );
}
