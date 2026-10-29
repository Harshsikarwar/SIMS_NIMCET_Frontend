
import Link from "next/link";
import "./NimcetOverview.css";

const overviewCards = [
  {
    number: "01",
    title: "Understand the Exam",
    description:
      "Explore the exam pattern, syllabus, eligibility criteria, and admission process using official information.",
    icon: "book",
  },
  {
    number: "02",
    title: "Explore MCA Opportunities",
    description:
      "Learn how NIMCET can provide a pathway to MCA programmes at participating NITs and IIITs.",
    icon: "target",
  },
  {
    number: "03",
    title: "Prepare with a Plan",
    description:
      "Build your preparation around concept revision, question practice, mock tests, and performance analysis.",
    icon: "chart",
  },
];

function OverviewIcon({ type={} }) {
  if (type === "book") {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 7v14" />
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23Z" />
        <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5a2.5 2.5 0 0 1 2.5 2Z" />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  }

  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 15v3" />
      <path d="M12 10v8" />
      <path d="M17 6v12" />
    </svg>
  );
}

export default function NimcetOverview() {
  return (
    <section
      className="nimcet-overview"
      id="nimcet-overview"
      aria-labelledby="nimcet-overview-title"
    >
      <div className="nimcet-overview__container">
        {/* Introduction */}
        <div className="nimcet-overview__intro">
          <div className="nimcet-overview__content">
            <span className="nimcet-overview__eyebrow">
              <span className="nimcet-overview__eyebrow-line" />
              GET TO KNOW NIMCET
            </span>

            <h2 id="nimcet-overview-title">
              Your next chapter
              <br />
              starts with <span>the right direction.</span>
            </h2>

            <p className="nimcet-overview__description">
              NIMCET stands for NIT MCA Common Entrance Test.
              It is a national-level entrance examination for
              admission to MCA programmes at participating NITs
              and IIITs. Understanding the exam is the first step
              towards preparing with confidence.
            </p>

            <Link
              href="/nimcet-guide"
              className="nimcet-overview__button"
            >
              Explore NIMCET Guide
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* Decorative visual */}
          <div
            className="nimcet-overview__visual"
            aria-hidden="true"
          >
            <div className="nimcet-overview__orbit nimcet-overview__orbit--one" />
            <div className="nimcet-overview__orbit nimcet-overview__orbit--two" />

            <div className="nimcet-overview__exam-card">
              <span className="nimcet-overview__card-label">
                THE EXAM
              </span>

              <div className="nimcet-overview__monogram">N</div>

              <h3>NIMCET</h3>
              <p>NIT MCA Common Entrance Test</p>

              <div className="nimcet-overview__card-footer">
                <span>Learn</span>
                <span className="nimcet-overview__card-dot" />
                <span>Prepare</span>
                <span className="nimcet-overview__card-dot" />
                <span>Progress</span>
              </div>
            </div>

            <span className="nimcet-overview__floating-mark nimcet-overview__floating-mark--top">
              N
            </span>

            <span className="nimcet-overview__floating-mark nimcet-overview__floating-mark--bottom">
              +
            </span>
          </div>
        </div>

        {/* Overview cards heading */}
        <div className="nimcet-overview__section-heading">
          <div>
            <span className="nimcet-overview__mini-label">
              START WITH THE BASICS
            </span>
            <h3>What you should know</h3>
          </div>

          <p>
            Understand the examination, explore the opportunities,
            and develop a structured preparation strategy.
          </p>
        </div>

        {/* Overview cards */}
        <div className="nimcet-overview__grid">
          {overviewCards.map((card, index) => (
            <article
              className="nimcet-overview__info-card"
              key={card.number}
              style={{
                animationDelay: `${180 + index * 120}ms`,
              }}
            >
              <div className="nimcet-overview__card-top">
                <div className="nimcet-overview__icon">
                  <OverviewIcon type={card.icon} />
                </div>

                <span className="nimcet-overview__number">
                  {card.number}
                </span>
              </div>

              <h4>{card.title}</h4>
              <p>{card.description}</p>

              <span className="nimcet-overview__card-line" />
            </article>
          ))}
        </div>

        {/* Official information */}
        <div className="nimcet-overview__note">
          <span
            className="nimcet-overview__note-symbol"
            aria-hidden="true"
          >
            i
          </span>

          <p>
            Always verify the latest eligibility, syllabus, dates,
            and admission rules through the official notification.
          </p>

          <a
            href="https://nimcet.admissions.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Official website
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
