import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { personal } from "../data/content";

const NAV_SECTIONS = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Publication", "publication"],
  ["Skills", "skills"],
  ["Education", "education"],
  ["Blog", "blog"],
  ["Contact", "contact"],
  ["HCI & Usability", "evaluation"],
];

const SOCIALS = [
  { Icon: FaLinkedin, label: "LinkedIn", link: personal.linkedin },
  { Icon: FaGithub, label: "GitHub", link: personal.github },
  { Icon: FaEnvelope, label: "Email", link: `mailto:${personal.email}` },
  { Icon: FaInstagram, label: "Instagram", link: personal.instagram },
  { Icon: SiLeetcode, label: "LeetCode", link: personal.leetcode },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-0)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 200, background: "radial-gradient(ellipse at bottom, rgba(0,217,255,0.06), transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4rem clamp(1rem,5vw,2rem) 2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          position: "relative",
          zIndex: 1,
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <p
            style={{
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: "0.75rem",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Aryan Doshi
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 280, marginBottom: "1.25rem" }}>
            Backend &amp; AI Systems Developer · CS @ VJTI '28 · Incoming SDE Intern @ BNY
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {SOCIALS.map(({ Icon, label, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 38, height: 38,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  transition: "color 0.2s, border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            Quick Links
          </p>
          <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
            {NAV_SECTIONS.map(([label, id]) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-secondary)", fontSize: "0.875rem",
                    fontFamily: "var(--font-sans)", padding: "0.2rem 0",
                    transition: "color 0.2s",
                    textAlign: "left",
                    minHeight: 36,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
            Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <a href={`mailto:${personal.email}`} style={{ color: "var(--text-secondary)", fontSize: "0.875rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
            >{personal.email}</a>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{personal.location}</p>
            <a href={personal.resume} download className="btn-outline" style={{ marginTop: "0.5rem", fontSize: "0.82rem", padding: "0.5rem 1rem", display: "inline-flex", width: "fit-content" }}>
              Download Resume
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)", maxWidth: 1200, margin: "0 auto", padding: "1.25rem clamp(1rem,5vw,2rem)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", position: "relative", zIndex: 1 }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
          © {new Date().getFullYear()} Aryan Doshi · Built with React + Vite + Framer Motion
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontFamily: "var(--font-mono)", fontStyle: "italic" }}>
          "Success is when preparation meets opportunity."
        </p>
      </div>

      <style>{`
        @media (min-width: 720px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
