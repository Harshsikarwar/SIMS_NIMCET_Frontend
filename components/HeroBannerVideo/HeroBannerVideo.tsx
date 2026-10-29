
"use client";

import "./HeroBannerVideo.css";

export default function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="SIMS NIMCET course">
      <video
        className="hero-banner-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/nimcet-hero.png"
        aria-label="SIMS Raipur NIMCET course promotional video"
      >
        <source
          src="/videos/nimcetHeroVideo.mp4"
          type="video/mp4"
        />
        Your browser does not support video playback.
      </video>

      {/* Optional clickable enquiry button */}
      <a href="/enquiry" className="hero-enquiry-button">
        Enquire Now <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
