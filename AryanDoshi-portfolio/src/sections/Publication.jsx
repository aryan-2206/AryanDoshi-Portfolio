import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { publication } from "../data/content";
import { FiExternalLink, FiBookOpen, FiUsers } from "react-icons/fi";

export default function Publication() {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="publication"
      style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}
    >
      <div className="orb" style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(199,125,255,0.08), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // research_output
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "2.5rem" }}
        >
          Published <span className="gradient-text">Research</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card"
          style={{
            padding: "2rem",
            borderColor: "rgba(199,125,255,0.3)",
            boxShadow: "0 0 40px rgba(199,125,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative gradient strip */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, var(--accent), var(--accent2))",
            }}
          />

          {/* Journal badge */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span
              style={{
                background: "rgba(199,125,255,0.12)",
                border: "1px solid rgba(199,125,255,0.3)",
                borderRadius: 999,
                padding: "0.3rem 0.9rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                color: "var(--accent2)",
              }}
            >
              📄 {publication.journal}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              {publication.date}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            {publication.title}
          </h3>

          {/* Authors */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              marginBottom: "1.25rem",
              color: "var(--text-muted)",
              fontSize: "0.88rem",
            }}
          >
            <FiUsers size={14} />
            {publication.authors.map((a, i) => (
              <span key={a}>
                <span style={{ color: i === 0 ? "var(--accent)" : "var(--text-secondary)", fontWeight: i === 0 ? 700 : 400 }}>
                  {a}
                </span>
                {i < publication.authors.length - 1 && <span style={{ color: "var(--border)" }}>, </span>}
              </span>
            ))}
          </div>

          {/* Summary box */}
          <div
            style={{
              background: "var(--bg-0)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Plain-language summary
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "0.93rem" }}>
              {publication.summary}
            </p>
          </div>

          {/* Metrics */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {publication.metrics.map((m) => (
              <span key={m} className="pill">{m}</span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: "inline-flex" }}
          >
            <FiBookOpen size={16} />
            Read Paper
            <FiExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
