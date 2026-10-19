import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { about, personal } from "../data/content";
import profile from "../assets/profile.jpg";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

// Terminal-style "currently" block
function Terminal({ text }) {
  return (
    <div
      style={{
        background: "var(--bg-1)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: "0.85rem",
      }}
    >
      {/* Terminal bar */}
      <div
        style={{
          background: "var(--bg-3)",
          padding: "0.5rem 1rem",
          display: "flex",
          gap: "0.4rem",
          alignItems: "center",
        }}
      >
        {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, display: "inline-block" }} />
        ))}
        <span style={{ marginLeft: "0.5rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>aryan@portfolio ~ </span>
      </div>
      {/* Content */}
      <div style={{ padding: "1rem 1.25rem" }}>
        <p style={{ color: "var(--text-muted)" }}>
          <span style={{ color: "var(--green)" }}>aryan@vjti</span>
          <span style={{ color: "var(--text-muted)" }}>:</span>
          <span style={{ color: "#00b4d8" }}>~</span>
          <span style={{ color: "var(--text-muted)" }}>$ </span>
          <span style={{ color: "var(--text-primary)" }}>cat currently.txt</span>
        </p>
        <p style={{ marginTop: "0.5rem", color: "var(--accent)", lineHeight: 1.6 }}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="about"
      style={{
        background: "var(--bg-1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow orbs */}
      <div className="orb" style={{ width: 400, height: 400, top: 0, right: "10%", background: "radial-gradient(circle, rgba(199,125,255,0.12), transparent 70%)" }} />
      <div className="orb" style={{ width: 300, height: 300, bottom: 0, left: "5%", background: "radial-gradient(circle, rgba(0,217,255,0.1), transparent 70%)", animationDelay: "2s" }} />

      <div className="section-wrapper" ref={ref}>
        {/* Eyebrow */}
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // who_am_i
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "3rem" }}
        >
          About{" "}
          <span className="gradient-text">Me</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "min(100%, 280px)" }}>
              {/* Glow ring */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: 24,
                  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                  zIndex: 0,
                }}
              />
              <img
                src={profile}
                alt="Aryan Doshi — profile photo"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  borderRadius: 22,
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                  aspectRatio: "3/4",
                }}
              />
              {/* Floating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--bg-2)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: 999,
                  padding: "0.35rem 1rem",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  zIndex: 2,
                  boxShadow: "var(--accent-glow)",
                }}
              >
                📍 Mumbai, India
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Bio */}
            <div>
              {about.bio.trim().split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.8,
                    fontSize: "1rem",
                    marginBottom: i < 1 ? "1rem" : 0,
                  }}
                >
                  {para.trim()}
                </p>
              ))}
            </div>

            {/* Terminal block */}
            <Terminal text={about.currently} />

            {/* Tech pills */}
            <div>
              <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Tech I work with
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {about.techPills.map((pill) => (
                  <span key={pill} className="pill">{pill}</span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View Projects <FiArrowRight size={15} />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                Contact
              </button>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
                LinkedIn <FiExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .about-grid {
            grid-template-columns: 0.7fr 1.3fr !important;
          }
        }
      `}</style>
    </section>
  );
}