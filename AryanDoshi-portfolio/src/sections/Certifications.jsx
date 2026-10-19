import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { certifications } from "../data/content";
import { FiExternalLink, FiAward } from "react-icons/fi";
import nvidiaCert from "../assets/logos/nvidia_cert.png";
import adobeHackathon from "../assets/adobe_hackathon.jpg";
import hacktoberfestSupercontributor from "../assets/hacktoberfest_supercontributor.png";

const CERT_IMAGES = {
  nvidia_cert: nvidiaCert,
  adobe_hackathon: adobeHackathon,
  hacktoberfest_supercontributor: hacktoberfestSupercontributor,
};

export default function Certifications() {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}
    >
      <div className="orb" style={{ width: 350, height: 350, bottom: "0", right: "10%", background: "radial-gradient(circle, rgba(118,185,0,0.08), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // credentials
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "2.5rem" }}
        >
          Certifications &amp; <span className="gradient-text">Achievements</span>
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card"
              style={{
                padding: "1.75rem",
                borderColor: cert.color + "44",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Top glow strip */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: cert.color,
                }}
              />

              {/* Issuer badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", gap: "1rem" }}>
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: cert.color + "18",
                      border: `1px solid ${cert.color}44`,
                      borderRadius: 999,
                      padding: "0.25rem 0.8rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: cert.color,
                    }}
                  >
                    <FiAward size={12} /> {cert.issuer}
                  </span>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    Issued {cert.date}
                  </p>
                </div>
              </div>

              {/* Certificate image */}
              {CERT_IMAGES[cert.image] && (
                <div
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: "1.25rem",
                    border: "1px solid var(--border)",
                    background: "#fff",
                  }}
                >
                  <img
                    src={CERT_IMAGES[cert.image]}
                    alt={`${cert.issuer} ${cert.title} certificate`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    loading="lazy"
                  />
                </div>
              )}

              {/* Title */}
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                {cert.title}
              </h3>

              {/* Credential ID */}
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                ID: {cert.credentialId}
              </p>

              {/* Verify link */}
              <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.85rem", padding: "0.55rem 1.25rem", borderColor: cert.color + "55", color: cert.color }}
              >
                Verify Credential <FiExternalLink size={13} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
