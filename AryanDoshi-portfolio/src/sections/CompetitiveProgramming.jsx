import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { cp } from "../data/content";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import codolio from "../assets/codolio.png";

const PLATFORM_ICONS = {
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
};

function PlatformCard({ platform, index }) {
  const [ref, visible] = useInView({ threshold: 0.1 });
  const Icon = PLATFORM_ICONS[platform.icon];

  return (
    <motion.a
      ref={ref}
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform.name} profile — ${platform.handle}`}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card"
      style={{
        display: "block",
        padding: "2rem",
        textDecoration: "none",
        borderColor: platform.color + "44",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
        width: "280px",
      }}
      whileHover={{ y: -4, boxShadow: `0 12px 40px ${platform.color}30` }}
    >
      {/* Corner accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle at top right, ${platform.color}20, transparent 70%)`,
        }}
      />

      {/* Platform icon + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
        {Icon && <Icon size={28} style={{ color: platform.color }} />}
        <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>
          {platform.name}
        </span>
        <FiExternalLink size={14} style={{ color: "var(--text-muted)", marginLeft: "auto" }} />
      </div>

      {/* Handle */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        @{platform.handle}
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
        {platform.badge && (
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>Badge</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: platform.color }}>{platform.badge}</div>
          </div>
        )}
        {platform.problems && (
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>Problems</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)" }}>{platform.problems}</div>
          </div>
        )}
        {platform.rating && (
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" }}>Rating</div>
            <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)" }}>{platform.rating}</div>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function CompetitiveProgramming() {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="cp"
      style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}
    >
      <div className="orb" style={{ width: 350, height: 350, top: "30%", right: "10%", background: "radial-gradient(circle, rgba(255,161,22,0.08), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // competitive_programming
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "1rem" }}
        >
          <span className="gradient-text">{cp.total}</span> Problems Solved
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: "var(--text-muted)", marginBottom: "2.5rem", fontSize: "1rem" }}
        >
          Across LeetCode, Codeforces, and CodeChef — consistently grinding data structures, algorithms, and competitive problem-solving.
        </motion.p>

        {/* Codolio Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center" }}
        >
          <img
            src={codolio}
            alt="Codolio Profile - Coding stats across all platforms"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          />
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
          {cp.platforms.map((platform, i) => (
            <PlatformCard key={platform.name} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
