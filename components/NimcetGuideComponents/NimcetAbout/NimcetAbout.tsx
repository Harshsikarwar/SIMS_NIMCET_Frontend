
import Link from "next/link";
import "./NimcetAbout.css";

const highlights = [
  {
    number: "01",
    title: "National-Level Entrance",
    description:
      "NIMCET is a national-level entrance examination for admission to MCA programmes.",
  },
  {
    number: "02",
    title: "NIT Admissions",
    description:
      "It provides an opportunity to pursue MCA at NITs and other participating institutes.",
  },
  {
    number: "03",
    title: "Career Opportunities",
    description:
      "An MCA degree can help build a strong foundation for careers in software development, IT and technology.",
  },
];

export default function NimcetAbout() {
  return (
    <section className="about-nimcet" id="about-nimcet">
      <div className="about-container">

        <div className="about-heading">
          <span className="about-eyebrow">
            KNOW ABOUT THE EXAMINATION
          </span>

          <h2>
            What is <span>NIMCET?</span>
          </h2>

          <p className="about-intro">
            Your pathway towards a promising career in
            computer applications and technology.
          </p>
        </div>

        <div className="about-content">
          <div className="about-description">
            <span className="about-label">ABOUT NIMCET</span>

            <h3>
              Take the first step towards your
              <span> MCA journey.</span>
            </h3>

            <p>
              NIMCET (NIT MCA Common Entrance Test) is a
              national-level entrance examination conducted
              for admission to Master of Computer Applications
              (MCA) programmes offered by participating
              National Institutes of Technology (NITs) and
              other participating institutes.
            </p>

            <p>
              It is an opportunity for students interested in
              computer science, programming, software
              development and advanced technology to pursue
              postgraduate education at reputed institutions.
            </p>

            <Link href="https://nimcet.admissions.nic.in/" target="_blank">
              Explore Official Website <span>↗</span>
            </Link>
          </div>

          <div className="about-visual">
            <div className="about-visual-top">
              <span>NIMCET</span>
              <span>YOUR NEXT CHAPTER</span>
            </div>

            <div className="about-big-text">MCA</div>

            <div className="about-visual-bottom">
              <div>
                <strong>Think.</strong>
                <strong>Learn.</strong>
                <strong>Achieve.</strong>
              </div>
              <span className="about-arrow">↗</span>
            </div>
          </div>
        </div>

        <div className="about-highlights">
          {highlights.map((item, index) => (
            <div
              className="about-highlight-card"
              key={item.number}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="highlight-number">{item.number}</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
