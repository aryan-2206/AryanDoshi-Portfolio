import React, { useRef, useEffect, useMemo } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { educations, academicStats } from "../data/content";

/* ── Coursework pills ── */
function CoursePills({ courses, compact = false }) {
  return (
    <div style={{ marginTop: compact ? "0.4rem" : "0.6rem" }}>
      <span style={{ fontSize: compact ? "0.62rem" : "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-mono)" }}>
        Coursework
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: compact ? "0.2rem" : "0.3rem", marginTop: "0.3rem" }}>
        {courses.map((course, i) => (
          <span
            key={i}
            style={{
              fontSize: compact ? "0.62rem" : "0.72rem",
              padding: compact ? "0.1rem 0.4rem" : "0.2rem 0.55rem",
              borderRadius: 999,
              background: "rgba(0,217,255,0.1)",
              border: "1px solid rgba(0,217,255,0.25)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
            }}
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Desktop card ── */
function DesktopCard({ edu, idx, start, end, scrollYProgress }) {
  const enterY = idx % 2 === 0 ? 44 : -44;
  const opacity = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [start, end, 1], [enterY, 0, 0]);
  const scale = useTransform(scrollYProgress, [start, end, 1], [0.86, 1, 1]);

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minWidth: 0 }}>
      <motion.div
        style={{
          scale,
          opacity,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 12px 4px rgba(0,217,255,0.5)",
          zIndex: 10,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          [idx % 2 === 0 ? "bottom" : "top"]: -8,
          width: 1,
          height: 36,
          background: "rgba(0,217,255,0.35)",
          opacity,
        }}
      />
      <motion.article
        className="card"
        style={{
          position: "absolute",
          [idx % 2 === 0 ? "bottom" : "top"]: 20,
          opacity,
          y,
          scale,
          width: 260,
          padding: "1.25rem",
          borderColor: "rgba(0,217,255,0.2)",
        }}
      >
        <p style={{ fontSize: "0.68rem", color: "var(--accent)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{edu.desc}</p>
        <h3 style={{ fontSize: "0.88rem", fontWeight: 700, marginTop: "0.3rem", lineHeight: 1.3, color: "var(--text-primary)" }}>{edu.title}</h3>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.25rem", fontFamily: "var(--font-mono)" }}>{edu.period}</p>
        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)", marginTop: "0.3rem" }}>{edu.grade}</p>
        <CoursePills courses={edu.courses} />
      </motion.article>
    </div>
  );
}

/* ── Mobile card ── */
function MobileStickyCard({ edu, start, end, scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [start, end, 1], [-18, 0, 0]);
  const scale = useTransform(scrollYProgress, [start, end, 1], [0.94, 1, 1]);
  const dotScale = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
      <motion.div
        style={{
          position: "absolute",
          left: -20,
          top: 16,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 8px rgba(0,217,255,0.5)",
          flexShrink: 0,
          scale: dotScale,
          opacity,
        }}
      />
      <motion.article
        className="card"
        style={{
          opacity,
          x,
          scale,
          width: "100%",
          padding: "1rem",
          borderColor: "rgba(0,217,255,0.2)",
        }}
      >
        <p style={{ fontSize: "0.65rem", color: "var(--accent)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{edu.desc}</p>
        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, marginTop: "0.2rem", lineHeight: 1.3, color: "var(--text-primary)" }}>{edu.title}</h3>
        <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.2rem", fontFamily: "var(--font-mono)" }}>{edu.period}</p>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", marginTop: "0.2rem" }}>{edu.grade}</p>
        <CoursePills courses={edu.courses} compact />
      </motion.article>
    </div>
  );
}

/* ── Academic stat cards ── */
function StatCards() {
  const [ref, visible] = useInView({ threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "0.75rem",
        padding: "2rem clamp(1rem,5vw,2rem)",
        maxWidth: 1200,
        margin: "0 auto",
        background: "var(--bg-0)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {academicStats.map((s) => (
        <div
          key={s.label}
          className="card"
          style={{ padding: "1rem", textAlign: "center" }}
        >
          <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{s.value}</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const n = educations.length;
  const SCENE_HEIGHT_VH = isMobile ? 100 * n : 120 * n;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(() =>
    educations.map((_, i) => ({
      start: i * (0.5 / n),
      end: (i + 1) * (0.5 / n),
    })), [n]);

  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"], { clamp: true });
  const mobileLineScaleY = useTransform(scrollYProgress, [0, 0.5], [0, 1], { clamp: true });

  return (
    <>
      <section
        id="education"
        style={{ position: "relative", background: "var(--bg-0)", color: "var(--text-primary)" }}
      >
        <div ref={sectionRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh", position: "relative" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ padding: "2rem clamp(1rem,5vw,2rem) 0", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <p className="section-subtitle" style={{ marginBottom: "0.4rem" }}>// academic_journey</p>
              <h2 className="section-title">
                Education <span className="gradient-text">&amp; Academics</span>
              </h2>
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(1rem,5vw,2rem) 2rem" }}>

              {/* Desktop */}
              {!isMobile && (
                <div style={{ position: "relative", width: "100%", maxWidth: 1100 }}>
                  <div style={{ position: "relative", height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
                    <motion.div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: lineWidth,
                        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                        borderRadius: 1,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                    {educations.map((edu, i) => (
                      <DesktopCard
                        key={i}
                        edu={edu}
                        idx={i}
                        start={thresholds[i].start}
                        end={thresholds[i].end}
                        scrollYProgress={scrollYProgress}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile */}
              {isMobile && (
                <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
                    <motion.div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom, var(--accent), var(--accent2))",
                        transformOrigin: "top",
                        scaleY: mobileLineScaleY,
                      }}
                    />
                  </div>
                  <div style={{ marginLeft: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {educations.map((edu, i) => (
                      <MobileStickyCard
                        key={i}
                        edu={edu}
                        start={thresholds[i].start}
                        end={thresholds[i].end}
                        scrollYProgress={scrollYProgress}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Academic stat cards below the sticky section */}
      <StatCards />
    </>
  );
}