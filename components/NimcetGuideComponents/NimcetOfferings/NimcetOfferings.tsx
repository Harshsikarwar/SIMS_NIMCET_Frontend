
import "./NimcetOfferings.css";

type IconName =
  | "offline"
  | "online"
  | "book"
  | "video"
  | "doubt"
  | "weekly"
  | "review"
  | "unit"
  | "full";

interface Offering {
  title: string;
  description?: string;
  icon: IconName;
  color: string;
}

const offerings: Offering[] = [
  {
    title: "Offline Classes",
    icon: "offline",
    color: "blue",
  },
  {
    title: "Online Classes",
    icon: "online",
    color: "pink",
  },
  {
    title: "Topic-Wise Complete Study Materials",
    description: "PYQs with detailed solutions",
    icon: "book",
    color: "green",
  },
  {
    title: "Recorded Classes Available",
    icon: "video",
    color: "purple",
  },
  {
    title: "Doubt Classes",
    icon: "doubt",
    color: "orange",
  },
  {
    title: "Weekly 6-Days Classes",
    description: "Consistent learning and practice",
    icon: "weekly",
    color: "pink",
  },
];

const tests: Offering[] = [
  {
    title: "WRT",
    description: "Weekly Review Test",
    icon: "review",
    color: "blue",
  },
  {
    title: "UWT",
    description: "Unit Wise Test",
    icon: "unit",
    color: "orange",
  },
  {
    title: "FLT",
    description: "Full Length Test",
    icon: "full",
    color: "pink",
  },
];

const iconPaths: Record<IconName, string[]> = {
  offline: [
    "M3 4h18v12H3z",
    "M8 20h8",
    "M12 16v4",
    "M7 9h3M7 12h3",
    "M15 9h3M15 12h3",
  ],
  online: [
    "M3 5h18v12H3z",
    "M8 21h8",
    "M12 17v4",
    "M8 10h8",
    "M8 13h5",
  ],
  book: [
    "M12 7c-2-2-5-2-9-1v14c4-1 7-1 9 1",
    "M12 7c2-2 5-2 9-1v14c-4-1-7-1-9 1",
    "M12 7v14",
  ],
  video: [
    "M4 5h16v14H4z",
    "m10 9 5 3-5 3z",
  ],
  doubt: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    "M20 8v6",
    "M20 18h.01",
  ],
  weekly: [
    "M4 4h16v17H4z",
    "M8 8h8M8 12h8M8 16h5",
    "m15 18 2 2 4-5",
  ],
  review: [
    "M6 3h12v18H6z",
    "M9 8h6M9 12h6M9 16h4",
    "M9 3v-1h6v1",
  ],
  unit: [
    "M6 3h12v18H6z",
    "M9 8h6M9 12h6M9 16h6",
  ],
  full: [
    "M4 20V11h4v9",
    "M10 20V5h4v15",
    "M16 20V9h4v11",
    "M2 20h20",
  ],
};

function OfferingIcon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="offering-icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name].map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}

export default function NimcetOfferings() {
  return (
    <section className="nimcet-offerings" id="offerings">
      <div className="offerings-container">
        <div className="offerings-heading">
          <span className="offerings-eyebrow">
            NIMCET 2027 PREPARATION
          </span>

          <h2>
            Everything You Need to
            <span> Crack NIMCET</span>
          </h2>

          <p>
            A complete preparation ecosystem with expert guidance,
            structured learning resources and exam-focused practice.
          </p>
        </div>

        <div className="offerings-highlight">
          <div>
            <span className="highlight-label">NEW BATCH</span>
            <h3>Coming Soon...</h3>
            <p>Start your journey towards NIT with SIMS Raipur.</p>
          </div>

          <div className="demo-highlight">
            <span className="demo-number">3</span>
            <div>
              <strong>Days</strong>
              <span>Demo Classes</span>
            </div>
          </div>
        </div>

        <div className="offerings-grid">
          {offerings.map((item) => (
            <article
              className="offering-card"
              key={item.title}
            >
              <div className={`offering-icon ${item.color}`}>
                <OfferingIcon name={item.icon} />
              </div>

              <div className="offering-content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>

              <span className="offering-arrow">↗</span>
            </article>
          ))}
        </div>

        <div className="tests-section">
          <div className="tests-heading">
            <span>TEST SERIES</span>
            <h3>Practice. Evaluate. Improve.</h3>
            <p>
              Track your preparation with our structured test system.
            </p>
          </div>

          <div className="tests-grid">
            {tests.map((test) => (
              <div className="test-card" key={test.title}>
                <div className={`offering-icon ${test.color}`}>
                  <OfferingIcon name={test.icon} />
                </div>

                <div>
                  <h4>{test.title}</h4>
                  <p>{test.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="offerings-footer">
          <span className="footer-dot" />
          <p>
            Learn with confidence. Prepare with a plan. Aim for NIT.
          </p>
        </div>
      </div>
    </section>
  );
}
