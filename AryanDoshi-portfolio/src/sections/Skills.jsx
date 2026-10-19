import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import React from "react";
import { useInView } from "../hooks/useInView";
import { skillGroups } from "../data/content";

// Devicon URLs map
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const SKILL_ICONS = {
  "Python": `${DEVICON_BASE}/python/python-original.svg`,
  "JavaScript": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  "C++": `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
  "FastAPI": `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Express": `${DEVICON_BASE}/express/express-original.svg`,
  "React": `${DEVICON_BASE}/react/react-original.svg`,
  "PostgreSQL": `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  "MongoDB": `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  "PyTorch": `${DEVICON_BASE}/pytorch/pytorch-original.svg`,
  "Git": `${DEVICON_BASE}/git/git-original.svg`,
};

// Scrolling ticker for all skills
const ALL_SKILLS_FLAT = skillGroups.flatMap((g) => g.skills.map((s) => ({ skill: s, color: g.color, group: g.group })));
const REPEATED = [...ALL_SKILLS_FLAT, ...ALL_SKILLS_FLAT];

function SkillTicker() {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const dirRef = useRef(-1);
  const activeRef = useRef(true);

  useEffect(() => {
    const el = document.getElementById("skills");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { activeRef.current = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onWheel = (e) => { if (activeRef.current) dirRef.current = e.deltaY > 0 ? -1 : 1; };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const SPEED = 55;
    let last = performance.now();
    let id;
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + dirRef.current * SPEED * dt;
      const loop = (trackRef.current?.scrollWidth ?? 0) / 2;
      if (loop) {
        if (next < -loop) next += loop;
        else if (next > 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [x]);

  return (
    <div style={{ overflow: "hidden", width: "100%", padding: "1rem 0" }}>
      <motion.div
        ref={trackRef}
        style={{ x, display: "flex", gap: "1.5rem", whiteSpace: "nowrap", willChange: "transform" }}
      >
        {REPEATED.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--bg-card)",
              border: `1px solid ${item.color}33`,
              borderRadius: 999,
              padding: "0.4rem 0.9rem",
              flexShrink: 0,
            }}
          >
            {SKILL_ICONS[item.skill] && (
              <img src={SKILL_ICONS[item.skill]} alt="" aria-hidden="true" style={{ width: 18, height: 18, objectFit: "contain" }} loading="lazy" />
            )}
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: item.color, fontFamily: "var(--font-mono)" }}>
              {item.skill}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Skill group card
function SkillGroupCard({ group, index }) {
  const [ref, visible] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="card"
      style={{ padding: "1.5rem", height: "100%" }}
    >
      {/* Group header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
        <div style={{ width: 3, height: 20, background: group.color, borderRadius: 2 }} />
        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
          {group.group}
        </h3>
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {group.skills.map((skill) => (
          <div
            key={skill}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              background: group.color + "15",
              border: `1px solid ${group.color}33`,
              borderRadius: 8,
              padding: "0.4rem 0.75rem",
              transition: "background 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = group.color + "28";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = group.color + "15";
              e.currentTarget.style.transform = "none";
            }}
          >
            {SKILL_ICONS[skill] && (
              <img src={SKILL_ICONS[skill]} alt="" aria-hidden="true" style={{ width: 16, height: 16, objectFit: "contain" }} loading="lazy" />
            )}
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: group.color }}>
              {skill}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [headerRef, headerVisible] = useInView({ threshold: 0.1 });

  return (
    <section
      id="skills"
      style={{ background: "var(--bg-0)", position: "relative", overflow: "hidden" }}
    >
      <div className="orb" style={{ width: 400, height: 400, bottom: "0", left: "20%", background: "radial-gradient(circle, rgba(0,245,160,0.07), transparent 70%)" }} />

      <div className="section-wrapper" ref={headerRef}>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "0.75rem" }}
        >
          // tech_stack
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "2.5rem" }}
        >
          Skills &amp; <span className="gradient-text">Technologies</span>
        </motion.h2>

        {/* Skill group cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.group} group={group} index={i} />
          ))}
        </div>

        {/* Scrolling ticker */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            All technologies · scroll to change direction
          </p>
          <SkillTicker />
        </div>
      </div>
    </section>
  );
}