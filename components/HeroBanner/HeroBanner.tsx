
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./HeroBanner.css";

const banners = [
  {
    id: 1,
    src: "/images/TestSeriesBanner.png",
    alt: "NIMCET 2027 special discount offer",
  },
  {
    id: 2,
    src: "/images/NewAdmissionBanner.png",
    alt: "NIMCET 2027 new batch announcement",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<number[]>([]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const handleImageError = (id: number) => {
    setFailedImages((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? banners.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % banners.length);
  };

  return (
    <section
      className="hero-banner-slider"
      aria-label="SIMS promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-banner-track">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`hero-banner-slide ${
              activeSlide === index ? "active" : ""
            }`}
            aria-hidden={activeSlide !== index}
          >
            {failedImages.includes(banner.id) ? (
              <div className="hero-banner-fallback">
                Banner image unavailable.
              </div>
            ) : (
              <Image
                src={banner.src}
                alt={banner.alt}
                width={1920}
                height={1200}
                priority={index === 0}
                sizes="100vw"
                className="hero-banner-image"
                onError={() => handleImageError(banner.id)}
              />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hero-banner-arrow previous"
        onClick={previousSlide}
        aria-label="Previous banner"
      >
        &#10094;
      </button>

      <button
        type="button"
        className="hero-banner-arrow next"
        onClick={nextSlide}
        aria-label="Next banner"
      >
        &#10095;
      </button>
    </section>
  );
}