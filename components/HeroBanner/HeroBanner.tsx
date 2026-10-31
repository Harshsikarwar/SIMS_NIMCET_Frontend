
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./HeroBanner.css";

interface HeroSlide {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
  imageClass: string;
  imageCaption: string;
}

const slides: HeroSlide[] = [
  {
    id: "discount",
    label: "SPECIAL OFFER",
    eyebrow: "NIMCET 2027",
    title: "Your Dream NIT.",
    highlight: "One Step Closer.",
    description:
      "Make your preparation count with our special NIMCET preparation offer.",
    buttonText: "Explore Test Series",
    buttonLink: "/test-series",
    image: "/images/nimcet-books.png",
    imageAlt: "A collection of colourful educational books",
    imageClass: "books-image",
    imageCaption: "PREPARE WITH PURPOSE",
  },
  {
    id: "batch",
    label: "NEW BATCH",
    eyebrow: "ADMISSIONS OPENING SOON",
    title: "A New Beginning.",
    highlight: "Aiming for NIT.",
    description:
      "Structured classes, expert guidance and focused practice for your NIMCET journey.",
    buttonText: "Enquire Now",
    buttonLink: "#contact",
    image: "/images/discount-students.png",
    imageAlt: "Students studying together in a classroom",
    imageClass: "classroom-image",
    imageCaption: "YOUR JOURNEY STARTS HERE",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((previous) => (previous + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [paused]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setActiveSlide(index);
    }
  };

  const goToNext = () => {
    setActiveSlide((previous) => (previous + 1) % slides.length);
  };

  const goToPrevious = () => {
    setActiveSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const slide = slides[activeSlide] ?? slides[0]!;

  return (
    <section
      className="sims-hero"
      aria-label="SIMS NIMCET announcements"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setPaused(false);
        }
      }}
    >

      {/* Main slider */}
      <div className="sims-hero-main" key={slide.id}>
        <div className="sims-hero-copy">
          <div className="sims-hero-eyebrow">
            <span className="eyebrow-line" />
            {slide.eyebrow}
          </div>

          <span className="sims-hero-label">{slide.label}</span>

          <h1>
            {slide.title}
            <span>{slide.highlight}</span>
          </h1>

          <p>{slide.description}</p>

          <div className="sims-hero-actions">
            <Link
              href={slide.buttonLink}
              className="sims-hero-cta"
            >
              {slide.buttonText}
              <span aria-hidden="true">↗</span>
            </Link>

            <span className="sims-hero-note">
              <span className="note-check">✓</span>
              Learn. Practice. Achieve.
            </span>
          </div>

          <div className="sims-hero-bottom-copy">
            <span>01 — LEARN</span>
            <span>02 — PRACTICE</span>
            <span>03 — SUCCEED</span>
          </div>
        </div>

        {/* Image area */}
        <div className={`sims-hero-art ${slide.imageClass}`}>
          <div className="art-background-shape" />
          <div className="art-circle art-circle-one" />
          <div className="art-circle art-circle-two" />

          <div className="hero-image-frame">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={activeSlide === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="hero-main-image"
            />
          </div>

          <div className="art-floating-label">
            <span className="floating-label-icon">✦</span>
            <span>{slide.imageCaption}</span>
          </div>

          <div className="art-index">
            0{activeSlide + 1}
            <span> / 02</span>
          </div>
        </div>
      </div>

      {/* Bottom slider navigation */}
      <div className="sims-hero-footer">
        <div className="hero-footer-caption">
          <span>SIMS RAIPUR</span>
          <span className="footer-divider">/</span>
          <span>YOUR NIMCET JOURNEY</span>
        </div>

        <div className="hero-slider-navigation">
          <button
            type="button"
            className="hero-nav-arrow"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="hero-progress">
            {slides.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`hero-progress-item ${
                  activeSlide === index ? "selected" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${item.label} slide`}
                aria-current={activeSlide === index ? "true" : undefined}
              >
                <span>{index === 0 ? "OFFER" : "NEW BATCH"}</span>
                <i />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="hero-nav-arrow"
            onClick={goToNext}
            aria-label="Next slide"
          >
            →
          </button>

          <button
            type="button"
            className="hero-pause"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Resume slider" : "Pause slider"}
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
    </section>
  );
}
