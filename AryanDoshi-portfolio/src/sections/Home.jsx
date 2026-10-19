import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import ParticlesBackground from "../components/ParticlesBackground";
import avator from "../assets/avator.png";
import { personal, roles, heroStats } from "../data/content";

const socials = [
  { Icon: FaLinkedin, link: personal.linkedin, label: "LinkedIn" },
  { Icon: FaGithub, link: personal.github, label: "GitHub" },
  { Icon: FaEnvelope, link: `mailto:${personal.email}`, label: "Email" },
  { Icon: SiLeetcode, link: personal.leetcode, label: "LeetCode" },
  { Icon: SiCodechef, link: personal.codechef, label: "CodeChef" },
  { Icon: SiCodeforces, link: personal.codeforces, label: "Codeforces" },
];

// ── Typewriter ──────────────────────────────────────────
function Typewriter({ roles }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex((v) => v + 1);
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 38 : 60
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        color: "var(--accent)",
        fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        minHeight: "1.5em",
      }}
    >
      {roles[index].substring(0, subIndex)}
      <span className="cursor-blink" style={{ display: "inline-block", width: 2, height: "1em", background: "var(--accent)", marginLeft: 2 }} />
    </span>
  );
}

// ── Neural canvas (lightweight cursor-reactive) ─────────
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let nodes = [];
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const count = Math.floor((W * H) / 14000);
      nodes = Array.from({ length: Math.max(24, Math.min(count, 60)) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 1.5,
      }));
    };

    const LINK_DIST = 140;
    const MOUSE_DIST = 180;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // Draw links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,217,255,${0.18 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse attraction lines
      for (const n of nodes) {
        const dx = mouse.current.x - n.x;
        const dy = mouse.current.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(199,125,255,${0.35 * (1 - d / MOUSE_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,217,255,0.6)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(0,217,255,0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    draw();
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}

// ── Native animated counter ───────────────────────────────
function useAnimatedCount(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);
  return count;
}

// ── Stat counter card ────────────────────────────────────
function StatCard({ value, suffix, label, delay }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isDecimal = !Number.isInteger(value);
  const animated = useAnimatedCount(value, 1800, started);
  const display = isDecimal ? animated.toFixed(2) : Math.floor(animated);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 1.0, duration: 0.5 }}
      style={{
        textAlign: "center",
        padding: "0.75rem 1rem",
        borderRadius: 12,
        background: "rgba(0,217,255,0.06)",
        border: "1px solid rgba(0,217,255,0.15)",
        minWidth: 100,
        flex: "0 0 auto",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 800,
          fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
          color: "var(--accent)",
          lineHeight: 1.1,
        }}
      >
        {display}{suffix}
      </div>
      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem", fontWeight: 600, letterSpacing: "0.04em" }}>
        {label}
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────
export default function Home() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--bg-0)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Neural network canvas background */}
      <NeuralCanvas />

      {/* Glow orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: "-10%", left: "-5%", background: "radial-gradient(circle, rgba(0,217,255,0.15), transparent 70%)" }} />
      <div className="orb" style={{ width: 500, height: 500, bottom: "0%", right: "-5%", background: "radial-gradient(circle, rgba(199,125,255,0.12), transparent 70%)", animationDelay: "3s" }} />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "6rem clamp(1rem,5vw,2rem) 4rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* BNY Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 1rem",
                borderRadius: 999,
                background: "rgba(0,180,216,0.12)",
                border: "1px solid rgba(0,180,216,0.35)",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
                color: "#00b4d8",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00b4d8", display: "inline-block", boxShadow: "0 0 6px #00b4d8" }} />
              {personal.badge}
            </span>
          </motion.div>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <Typewriter roles={roles} />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "var(--text-primary)",
            }}
          >
            {personal.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            Computer Engineering student at <strong style={{ color: "var(--text-primary)" }}>VJTI Mumbai</strong>. Building AI-powered backend services, RAG pipelines, and LLM agents. 900+ DSA problems solved.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
          >
            <a href={personal.resume} download="Aryan_Doshi_Resume.pdf" className="btn-primary">
              <FiDownload size={16} /> Download Resume
            </a>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              View Projects <FiArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              Contact
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            {socials.map(({ Icon, label, link }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="has-tooltip"
                style={{
                  position: "relative",
                  color: "var(--text-muted)",
                  fontSize: "1.35rem",
                  transition: "color 0.2s, transform 0.2s",
                  display: "inline-flex",
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <Icon />
                <span className="tooltip">{label}</span>
              </a>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}
          >
            {heroStats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>

        {/* Right column — avatar */}
        <motion.div
          className="hero-avatar"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
        >
          {/* Glow ring */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "conic-gradient(from 0deg, var(--accent), var(--accent2), var(--green), var(--accent))",
              borderRadius: "50%",
              filter: "blur(60px)",
              opacity: 0.25,
              animation: "pulse-orb 5s ease-in-out infinite alternate",
            }}
          />
          <img
            src={avator}
            alt="Aryan Doshi"
            style={{
              position: "relative",
              width: "min(90%, 420px)",
              height: "auto",
              filter: "drop-shadow(0 24px 60px rgba(0,217,255,0.2))",
              userSelect: "none",
            }}
            loading="eager"
          />
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
            min-height: 100vh;
            padding-top: 5rem !important;
            padding-bottom: 3rem !important;
          }
          .hero-avatar { justify-content: flex-end !important; }
        }
        @media (max-width: 899px) {
          .hero-avatar { display: none !important; }
        }
      `}</style>
    </section>
  );
}