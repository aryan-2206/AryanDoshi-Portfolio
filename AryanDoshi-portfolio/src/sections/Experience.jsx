import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { experiences } from "../data/content";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

// Import logos
import bnyLogo from "../assets/logos/bny.png";
import amaanitvamLogo from "../assets/logos/amaanitvam.png";
import projectxLogo from "../assets/logos/projectx.png";
import hacktoberfestLogo from "../assets/logos/hacktoberfest.png";

const LOGOS = {
  bny: bnyLogo,
  amaanitvam: amaanitvamLogo,
  projectx: projectxLogo,
  hacktoberfest: hacktoberfestLogo,
};

function ExperienceCard({ exp, index, isOpen, onToggle }) {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ position: "relative" }}
    >
      {/* Timeline dot */}
      <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 0 3px var(--bg-1), 0 0 0 5px ${exp.color}` }} />

      <div
        className="card"
        style={{
          marginLeft: "2rem",
          cursor: "pointer",
          borderColor: isOpen ? exp.color + "55" : "var(--border)",
          transition: "all 0.3s",
        }}
        onClick={onToggle}
      >
        {/* Card header */}
        <div style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Logo */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "var(--bg-3)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {LOGOS[exp.logo] ? (
              <img
                src={LOGOS[exp.logo]}
                alt={`${exp.org} logo`}
                style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 8 }}
              />
            ) : (
              <span style={{ fontSize: "1.5rem" }}>🏢</span>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                {exp.role}
              </h3>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {exp.period}
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginTop: "0.2rem", flexWrap: "wrap" }}>
              <span style={{ color: exp.color, fontWeight: 600, fontSize: "0.9rem" }}>{exp.org}</span>
              <span
                style={{
                  fontSize: "0.68rem",
                  background: exp.color + "22",
                  border: `1px solid ${exp.color}44`,
                  color: exp.color,
                  borderRadius: 999,
                  padding: "0.1rem 0.6rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {exp.type}
              </span>
            </div>
          </div>

          {/* Chevron */}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <FiChevronDown size={18} style={{ color: "var(--text-muted)" }} />
          </motion.div>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 1.5rem 1.5rem",
                  borderTop: `1px solid ${exp.color}22`,
                  marginTop: 0,
                  paddingTop: "1rem",
                }}
              >
                {/* Bullet points */}
                {exp.bullets.length > 0 && (
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ color: exp.color, flexShrink: 0, marginTop: "0.3em", fontSize: "0.6rem" }}>●</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                {exp.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.72rem",
                          fontFamily: "var(--font-mono)",
                          background: "var(--bg-card)",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          padding: "0.2rem 0.6rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0); // First card open by default
  const [headerRef, headerVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      style={{ background: "var(--bg-0)", position: "relative", overflow: "hidden" }}
    >
      {/* Orb */}
      <div className="orb" style={{ width: 350, height: 350, top: "20%", right: "5%", background: "radial-gradient(circle, rgba(0,217,255,0.08), transparent 70%)" }} />

      <div className="section-wrapper">
        <div ref={headerRef}>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "0.75rem" }}
          >
            // work_experience
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: "3rem" }}
          >
            Where I've <span className="gradient-text">Worked</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "0.5rem" }}>
          {/* Vertical line */}
          <div className="timeline-line">
            <motion.div
              className="timeline-line-fill"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
              style={{ height: "100%" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
