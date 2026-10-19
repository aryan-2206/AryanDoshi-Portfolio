import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { volunteering } from "../data/content";
import { FiCalendar } from "react-icons/fi";
import technovanza from "../assets/technovanza.jpg";
import agastya from "../assets/agastya.jpg";
import ParticlesBackground from "../components/ParticlesBackground";

export default function BeyondCode() {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="beyond-code"
      style={{ background: "var(--bg-0)", position: "relative", overflow: "hidden" }}
    >
      <ParticlesBackground />
      <div className="orb" style={{ width: 350, height: 350, top: "20%", left: "10%", background: "radial-gradient(circle, rgba(199,125,255,0.08), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref} style={{ position: "relative", zIndex: 2 }}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // beyond_code
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "2.5rem" }}
        >
          Leadership &amp; <span className="gradient-text">Volunteering</span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {volunteering.map((item, i) => (
            <motion.div
              key={item.org}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card"
              style={{ padding: "1.75rem", borderColor: item.color + "33", overflow: "hidden" }}
            >
              {/* Image placeholder or real image */}
              <div
                style={{
                  height: 160,
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: "1.25rem",
                  background: item.color + "15",
                  border: `1px solid ${item.color}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.image === "technovanza" ? (
                  <img
                    src={technovanza}
                    alt={item.org}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                ) : item.image === "agastya" ? (
                  <img
                    src={agastya}
                    alt={item.org}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                ) : (
                  <div style={{ textAlign: "center", padding: "1rem" }}>
                    <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>
                      {i === 0 ? "🤖" : "🌱"}
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        color: "var(--text-muted)",
                        background: "var(--bg-3)",
                        padding: "0.3rem 0.75rem",
                        borderRadius: 999,
                        border: "1px dashed var(--border)",
                      }}
                    >
                      {i === 1 ? "[ PHOTO PLACEHOLDER ]" : "[ IMAGE PLACEHOLDER ]"}
                    </span>
                  </div>
                )}
              </div>

              {/* Period badge */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.6rem" }}>
                <FiCalendar size={13} style={{ color: "var(--text-muted)" }} />
                <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {item.period}
                </span>
              </div>

              {/* Role & org */}
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                {item.role}
              </h3>
              <p style={{ fontWeight: 600, fontSize: "0.88rem", color: item.color, marginBottom: "0.75rem" }}>
                {item.org}
              </p>

              {/* Description */}
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-mono)",
                      background: item.color + "15",
                      border: `1px solid ${item.color}33`,
                      color: item.color,
                      borderRadius: 6,
                      padding: "0.2rem 0.55rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
