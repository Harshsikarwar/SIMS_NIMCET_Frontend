
"use client";

import { useState } from "react";
import "./NimcetSyllabus.css";

interface SyllabusUnit {
  title: string;
  topics: string[];
}

interface SyllabusSubject {
  id: string;
  number: string;
  name: string;
  questions: number;
  percentage: string;
  description: string;
  units: SyllabusUnit[];
}

const syllabus: SyllabusSubject[] = [
  {
    id: "mathematics",
    number: "01",
    name: "Mathematics",
    questions: 50,
    percentage: "41.67%",
    description:
      "This section evaluates mathematical concepts, numerical skills, analytical thinking and problem-solving abilities.",
    units: [
      {
        title: "Set Theory and Logic",
        topics: [
          "Concepts of Sets",
          "Unions, Intersection and Difference",
          "Symmetric Difference",
          "Cartesian Product",
          "Cardinality",
          "Functions and Relations",
          "Venn Diagrams",
          "Truth Tables",
          "Connectives",
          "Tautology and Contradictions",
        ],
      },
      {
        title: "Probability and Statistics",
        topics: [
          "Basic Concepts of Probability Theory",
          "Averages",
          "Dependent and Independent Events",
          "Bayes' Theorem",
          "Mean, Median and Mode",
          "Mean Deviation",
          "Standard Deviation",
          "Variance",
          "Moments",
          "Frequency Distributions",
        ],
      },
      {
        title: "Algebra",
        topics: [
          "Fundamental Operations in Algebra",
          "Quadratic Equations with Real Coefficients",
          "Relation Between Roots and Coefficients",
          "Symmetric Functions of Roots and Their Sums",
          "Indices, Logarithms and Exponentials",
          "Arithmetic, Geometric and Harmonic Progressions",
          "Finite Sums of Powers of Natural Numbers",
          "Matrices and Determinants",
          "Simultaneous Linear Equations",
          "Permutations and Combinations",
          "Binomial Theorem",
        ],
      },
      {
        title: "Coordinate Geometry",
        topics: [
          "Rectangular Cartesian Coordinates",
          "Distance Formulae",
          "Equation of a Line in Various Forms",
          "Intersection of Lines",
          "Pair of Straight Lines",
          "Equations of a Circle",
          "Parabola, Ellipse and Hyperbola",
          "Section Formula",
          "Tangents and Normals to Circles and Conics",
        ],
      },
      {
        title: "Calculus",
        topics: [
          "Functions on Real Numbers",
          "Limits of Functions",
          "Left and Right Limits",
          "Limits at Infinity",
          "Continuous Functions",
          "Applications of the Intermediate Value Theorem",
          "Differentiation",
          "Applications of Differentiation",
          "Tangents and Normals",
          "Maxima and Minima",
          "Rolle's Theorem",
          "Mean Value Theorem",
          "Integration by Parts",
          "Integration by Substitution",
          "Integration by Partial Fractions",
          "Integration of Odd and Even Functions",
          "Periodic and Definite Integrals",
          "Area Computations",
        ],
      },
      {
        title: "Trigonometry",
        topics: [
          "Trigonometric Functions",
          "Trigonometric Identities",
          "Principal Values of Inverse Trigonometric Functions",
          "Properties of Triangles",
          "Solution of Triangles",
          "Heights and Distances",
          "Trigonometric Equations",
          "General Solutions",
        ],
      },
    ],
  },
  {
    id: "reasoning",
    number: "02",
    name: "Analytical Ability & Logical Reasoning",
    questions: 40,
    percentage: "33.33%",
    description:
      "This section tests logical thinking, analytical ability, reasoning skills, interpretation and problem-solving abilities.",
    units: [
      {
        title: "Verbal and Non-Verbal Reasoning",
        topics: [
          "Verbal Reasoning",
          "Non-verbal Reasoning",
          "Blood Relations",
          "Coding-Decoding",
          "Direction Test",
          "Seating Arrangement",
          "Puzzles",
          "Input-Output",
          "Syllogism",
          "Alphanumeric Series",
          "Mirror Images",
          "Statements and Conclusions",
          "Statements and Arguments",
        ],
      },
      {
        title: "Types of Reasoning",
        topics: [
          "Deductive Reasoning",
          "Inductive Reasoning",
        ],
      },
      {
        title: "Analytical and Numerical Ability",
        topics: [
          "Problem Solving",
          "Critical Thinking",
          "Data Interpretation",
          "Numerical Reasoning",
          "Data Sufficiency",
          "Data Visualization",
        ],
      },
    ],
  },
  {
    id: "computer",
    number: "03",
    name: "Computer Awareness",
    questions: 20,
    percentage: "16.67%",
    description:
      "This section covers computer fundamentals, hardware, software, data representation and internet knowledge.",
    units: [
      {
        title: "Computer Basics",
        topics: [
          "Organization of a Computer",
          "Central Processing Unit (CPU)",
          "Structure of Instructions in CPU",
          "Input and Output Devices",
          "Computer Memory",
          "Backup Devices",
        ],
      },
      {
        title: "Data Representation",
        topics: [
          "Representation of Characters, Integers and Fractions",
          "Binary Representation",
          "Hexadecimal Representation",
          "Binary Arithmetic: Addition, Subtraction, Multiplication and Division",
          "Simple Arithmetic",
          "Two's Complement Arithmetic",
          "Floating Point Representation of Numbers",
          "Boolean Algebra",
        ],
      },
      {
        title: "Computer Hardware",
        topics: [
          "Input Devices: Keyboard, Mouse, Scanner, etc.",
          "Output Devices: Monitor, Printer, Speakers, etc.",
          "Storage Devices: Hard Drives, SSDs, USB Drives, etc.",
          "Memory: RAM, ROM and Cache",
        ],
      },
      {
        title: "Computer Software",
        topics: [
          "Operating Systems: Windows, macOS, Linux and Android",
          "System Software",
          "Utility Programs",
          "Device Drivers",
          "Application Software: Basic Concepts and Tools",
        ],
      },
      {
        title: "Internet and Email",
        topics: [
          "Web Browsing",
          "Understanding How the Internet Works",
          "Navigating the Internet",
          "Sending and Receiving Emails",
          "Managing Emails",
          "Online Security",
          "Basic Awareness of Online Threats and Safety Measures",
        ],
      },
    ],
  },
  {
    id: "english",
    number: "04",
    name: "General English",
    questions: 10,
    percentage: "8.33%",
    description:
      "This section assesses English comprehension, vocabulary, grammar and communication skills.",
    units: [
      {
        title: "English Language and Comprehension",
        topics: [
          "Comprehension of Written Text",
          "Usage of Words and Vocabulary",
          "Grasp of Grammatical Patterns",
          "Usage of Sentence Forms",
          "Sounds and Word Formation Processes",
          "Meaning of Words and Phrases",
          "Technical Writing",
          "Accuracy and Fluency in English Expressions",
        ],
      },
    ],
  },
];

export default function NimcetSyllabus() {
  const [activeSubject, setActiveSubject] =
    useState<string>("mathematics");

  const [expandedUnits, setExpandedUnits] =
    useState<string[]>([]);

  const selectedSubject = syllabus.find(
    (subject) => subject.id === activeSubject
  ) ?? syllabus[0];

  const toggleUnit = (unitKey: string): void => {
    setExpandedUnits((previous) =>
      previous.includes(unitKey)
        ? previous.filter((key) => key !== unitKey)
        : [...previous, unitKey]
    );
  };

  const expandAll = (): void => {
    const allKeys = selectedSubject.units.map(
      (_, index) => `${selectedSubject.id}-${index}`
    );

    setExpandedUnits((previous) => [
      ...new Set([...previous, ...allKeys]),
    ]);
  };

  const collapseAll = (): void => {
    setExpandedUnits((previous) =>
      previous.filter(
        (key) => !key.startsWith(`${selectedSubject.id}-`)
      )
    );
  };

  return (
    <section className="nimcet-syllabus" id="syllabus">
      <div className="syllabus-container">

        <div className="syllabus-heading">
          <span className="syllabus-eyebrow">
            PREPARATION STARTS HERE
          </span>

          <h2>
            NIMCET <span>Complete Syllabus</span>
          </h2>

          <p>
            Explore the complete subject-wise syllabus for
            NIMCET 2026. Understand every topic and organise
            your preparation with a clear learning roadmap.
          </p>

          <div className="syllabus-revision">
            <span className="revision-dot" />
            Revised syllabus effective from 2026
          </div>
        </div>

        <div className="syllabus-summary">
          {[
            { label: "Total Subjects", value: "04" },
            { label: "Total Questions", value: "120" },
            { label: "Mathematics", value: "50" },
            { label: "Reasoning", value: "40" },
          ].map((item) => (
            <div className="summary-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="syllabus-layout">

          <aside className="syllabus-sidebar">
            <div className="sidebar-heading">
              <span>SUBJECTS</span>
              <span>04</span>
            </div>

            {syllabus.map((subject) => (
              <button
                type="button"
                key={subject.id}
                className={`subject-tab ${
                  activeSubject === subject.id ? "active" : ""
                }`}
                onClick={() => setActiveSubject(subject.id)}
              >
                <span className="subject-number">
                  {subject.number}
                </span>

                <span className="subject-tab-info">
                  <strong>{subject.name}</strong>
                  <small>{subject.questions} Questions</small>
                </span>

                <span className="subject-chevron">↗</span>
              </button>
            ))}

            <div className="sidebar-note">
              <span>NOTE</span>
              <p>
                Select a subject to explore its complete
                topic-wise syllabus.
              </p>
            </div>
          </aside>

          <div className="syllabus-main" key={selectedSubject.id}>

            <div className="subject-overview">
              <div>
                <span className="subject-overview-label">
                  SUBJECT {selectedSubject.number}
                </span>

                <h3>{selectedSubject.name}</h3>
                <p>{selectedSubject.description}</p>
              </div>

              <div className="question-count">
                <strong>{selectedSubject.questions}</strong>
                <span>QUESTIONS</span>
              </div>
            </div>

            <div className="subject-weight">
              <div className="weight-label">
                <span>Question distribution</span>
                <strong>{selectedSubject.percentage}</strong>
              </div>

              <div className="weight-track">
                <div
                  className="weight-fill"
                  style={{ width: selectedSubject.percentage }}
                />
              </div>
            </div>

            <div className="unit-heading">
              <div>
                <h4>Topics Covered</h4>
                <p>
                  {selectedSubject.units.length} major topic groups
                </p>
              </div>

              <div className="unit-actions">
                <button type="button" onClick={expandAll}>
                  Expand all
                </button>

                <button type="button" onClick={collapseAll}>
                  Collapse all
                </button>
              </div>
            </div>

            <div className="syllabus-units">
              {selectedSubject.units.map((unit, index) => {
                const unitKey = `${selectedSubject.id}-${index}`;
                const isExpanded = expandedUnits.includes(unitKey);

                return (
                  <div
                    className={`syllabus-unit ${
                      isExpanded ? "unit-expanded" : ""
                    }`}
                    key={unitKey}
                  >
                    <button
                      type="button"
                      className="unit-toggle"
                      onClick={() => toggleUnit(unitKey)}
                      aria-expanded={isExpanded}
                    >
                      <div className="unit-title">
                        <span className="unit-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span>{unit.title}</span>
                      </div>

                      <div className="unit-right">
                        <span className="topic-count">
                          {unit.topics.length} Topics
                        </span>

                        <span className="unit-plus">
                          {isExpanded ? "−" : "+"}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="unit-content">
                        <div className="topic-grid">
                          {unit.topics.map((topic, topicIndex) => (
                            <div
                              className="syllabus-topic"
                              key={`${unitKey}-${topicIndex}`}
                            >
                              <span className="topic-check">✓</span>
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="syllabus-footer-note">
              <span>!</span>
              <p>
                Refer to the official NIMCET information brochure
                for examination rules, marking scheme and further
                updates.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
