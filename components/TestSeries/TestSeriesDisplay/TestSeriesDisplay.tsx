"use client";
import "./TestSeriesDisplay.css";

interface TestPackage {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  badge?: string;
  popular?: boolean;
  cbtTests: number;
  pdfMaterials: number;
  features: string[];
}

const packages: TestPackage[] = [
  {
    id: 1,
    name: "Basic Test Series",
    subtitle: "Build your preparation foundation",
    price: 499,
    originalPrice: 999,
    cbtTests: 15,
    pdfMaterials: 25,
    features: [
      "15 CBT Mock Tests",
      "25 PDF Practice Sets",
      "Topic-wise Question Papers",
      "Detailed Answer Solutions",
      "Performance Reports",
    ],
  },
  {
    id: 2,
    name: "Complete Test Series",
    subtitle: "Complete practice for NIMCET 2027",
    price: 999,
    originalPrice: 1999,
    badge: "MOST POPULAR",
    popular: true,
    cbtTests: 35,
    pdfMaterials: 60,
    features: [
      "35 CBT Mock Tests",
      "60 PDF Practice Sets",
      "Weekly Review Tests (WRT)",
      "Unit Wise Tests (UWT)",
      "Full Length Tests (FLT)",
      "Detailed Solutions",
      "Performance Analysis",
    ],
  },
  {
    id: 3,
    name: "Premium Test Series",
    subtitle: "Maximum practice and exam readiness",
    price: 1499,
    originalPrice: 2999,
    badge: "BEST VALUE",
    cbtTests: 60,
    pdfMaterials: 100,
    features: [
      "60 CBT Mock Tests",
      "100 PDF Practice Sets",
      "Weekly Review Tests (WRT)",
      "Unit Wise Tests (UWT)",
      "Full Length Tests (FLT)",
      "Detailed Solutions",
      "Performance Analysis",
      "Previous Year Questions",
      "Access to All Test Updates",
    ],
  },
];

export default function TestSeriesDisplay() {
  const handlePurchase = (packageName: string) => {
    // Replace with your payment or checkout route.
    console.log("Selected package:", packageName);
  };

  return (
    <section className="nimcet-packages" id="test-series">
      <div className="packages-container">

        <div className="packages-heading">
          <span className="packages-eyebrow">
            NIMCET 2027 TEST SERIES
          </span>

          <h2>
            Prepare Smarter.
            <span> Practice Better.</span>
          </h2>

          <p>
            Get access to exam-oriented CBT mock tests and
            downloadable PDF resources designed to strengthen
            your NIMCET preparation.
          </p>
        </div>

        <div className="package-benefits">
          <div>
            <span className="benefit-symbol">⌨</span>
            <div>
              <strong>CBT Mock Tests</strong>
              <small>Real exam-like practice</small>
            </div>
          </div>

          <div>
            <span className="benefit-symbol">PDF</span>
            <div>
              <strong>Study Materials</strong>
              <small>Downloadable resources</small>
            </div>
          </div>

          <div>
            <span className="benefit-symbol">✓</span>
            <div>
              <strong>Solutions</strong>
              <small>Learn from every question</small>
            </div>
          </div>
        </div>

        <div className="packages-grid">
          {packages.map((item) => (
            <article
              className={`package-card ${
                item.popular ? "popular-package" : ""
              }`}
              key={item.id}
            >
              {item.badge && (
                <div className="package-badge">
                  {item.badge}
                </div>
              )}

              <div className="package-info">
                <span className="package-number">
                  PACKAGE 0{item.id}
                </span>

                <h3>{item.name}</h3>
                <p>{item.subtitle}</p>
              </div>

              <div className="package-price">
                <div>
                  <span className="currency">₹</span>
                  <strong>{item.price}</strong>
                </div>

                <del>₹{item.originalPrice}</del>

                <span className="discount">
                  {Math.round(
                    (1 - item.price / item.originalPrice) * 100
                  )}% OFF
                </span>
              </div>

              <div className="package-includes">
                <div>
                  <span className="include-icon">⌨</span>
                  <div>
                    <strong>{item.cbtTests} CBT Tests</strong>
                    <small>Online mock examinations</small>
                  </div>
                </div>

                <div>
                  <span className="include-icon pdf-icon">PDF</span>
                  <div>
                    <strong>{item.pdfMaterials} PDF Materials</strong>
                    <small>Practice papers and solutions</small>
                  </div>
                </div>
              </div>

              <div className="package-divider" />

              <h4>What's Included</h4>

              <ul className="package-features">
                {item.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="package-button"
                onClick={() => handlePurchase(item.name)}
              >
                Get This Package <span>↗</span>
              </button>

              <div className="package-footer">
                Secure access to your learning resources
              </div>
            </article>
          ))}
        </div>

        <div className="packages-bottom">
          <span>Need help choosing?</span>
          <p>
            Contact our team to find the right test series for your
            preparation.
          </p>
        </div>

      </div>
    </section>
  );
}
