
import Image from "next/image";
import Link from "next/link";
import "./NimcetOverview.css";

const benefits = [
  {
    number: "01",
    title: "NIT Admission",
    description:
      "Get an opportunity to pursue MCA at participating National Institutes of Technology.",
  },
  {
    number: "02",
    title: "National Level Exam",
    description:
      "Compete with candidates from across India through a common entrance examination.",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "Build a strong foundation for advanced learning and future opportunities in technology.",
  },
  {
    number: "04",
    title: "Recognised Institutes",
    description:
      "Explore MCA education at reputed participating NIT institutions.",
  },
];

export default function NimcetOverview() {
  // Change this path to use your own image.
  const overviewImage = "/images/NIMCETStudyDeskSetup.png";

  return (
    <section className="nimcet-overview">
      <div className="nimcet-overview-container">

        {/* Upper section */}
        <div className="nimcet-overview-main">

          {/* Left content */}
          <div className="nimcet-overview-content">
            <span className="nimcet-overview-label">
              GET TO KNOW NIMCET
            </span>

            <h2>
              What is <span>NIMCET?</span>
            </h2>

            <p>
              NIMCET (NIT MCA Common Entrance Test) is a national-level
              entrance examination for admission to the Master of
              Computer Applications (MCA) programme offered by
              participating National Institutes of Technology.
            </p>

            <p>
              It provides aspiring students with an opportunity to
              pursue postgraduate education in computer applications
              at participating NITs through a common admission process.
            </p>

            <div className="nimcet-overview-highlight">
              <strong>Your pathway to MCA at NITs.</strong>
              <span>Understand the exam and prepare with confidence.</span>
            </div>
          </div>

          {/* Right image */}
          <div className="nimcet-overview-image">
            <Image
              src={overviewImage}
              alt="NIMCET examination and MCA preparation"
              width={650}
              height={480}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="nimcet-overview-img"
            />
          </div>
        </div>

        {/* Lower section */}
        <div className="nimcet-overview-benefits">
          <div className="nimcet-benefits-heading">
            <span>WHY NIMCET?</span>
            <h3>What makes it worth preparing for?</h3>
          </div>

          <div className="nimcet-benefits-grid">
            {benefits.map((benefit) => (
              <article
                className="nimcet-benefit-card"
                key={benefit.number}
              >
                <span className="nimcet-benefit-number">
                  {benefit.number}
                </span>

                <h4>{benefit.title}</h4>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Footer links */}
        <footer className="nimcet-overview-footer">
          <div>
            <span>READY TO EXPLORE?</span>
            <h3>Know more about NIMCET.</h3>
          </div>

          <div className="nimcet-overview-links">
            <a
              href="https://nimcet.admissions.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="nimcet-official-link"
            >
              Official Website ↗
            </a>

            <Link
              href="/nimcet-guide"
              className="nimcet-guide-link"
            >
              Explore NIMCET Guide →
            </Link>
          </div>
        </footer>

      </div>
    </section>
  );
}
