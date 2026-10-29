
import "./HeroBanner.css";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <Link
        href="/test-series"
        className="hero-banner-link"
        aria-label="Get 50% off on SIMS Raipur test series"
      >
        <img
          src="/images/SIMSRaipurDiwaliDiscount.png"
          alt="SIMS Raipur Diwali Special — 50% off on Test Series"
          className="hero-banner-image"
        />
      </Link>
    </section>
  );
}
