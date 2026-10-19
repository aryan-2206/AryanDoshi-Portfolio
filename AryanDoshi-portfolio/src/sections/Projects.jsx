import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { projects as projectData } from "../data/content";
import { FiGithub, FiExternalLink, FiSearch } from "react-icons/fi";

// Import project images
import smartcv from "../assets/smartcv.png";
import fmv from "../assets/fmv.jpg";
import imgcaption from "../assets/imgcaption.png";
import equitydesk from "../assets/equitydesk.png";
import equitymob from "../assets/equitymob.png";
import banquetdesk from "../assets/banquetdesk.png";
import banquetmob from "../assets/banquetmob.jpeg";

const IMAGE_MAP = {
  smartcv, fmv, imgcaption,
  equitydesk, equitymob,
  banquetdesk, banquetmob,
};

const FILTERS = ["All", "AI-ML", "Full-Stack", "Backend", "Deep Learning"];

const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
};

// Resolve image key to imported asset
function resolveImg(key) {
  return IMAGE_MAP[key] ?? null;
}

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filtered list (for non-scroll mode if desired); for scroll mode we use all
  const displayProjects = useMemo(() => {
    return projectData.map((p) => ({
      ...p,
      image: resolveImg(isMobile && p.imageMobile ? p.imageMobile : p.image),
    }));
  }, [isMobile]);

  const filteredProjects = useMemo(() => {
    return displayProjects.filter((p) => {
      const matchFilter = filter === "All" || p.categories.includes(filter);
      const matchSearch = search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        p.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchFilter && matchSearch;
    });
  }, [displayProjects, filter, search]);

  // Scroll-driven active index (over ALL projects for the color-change BG)
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const thresholds = displayProjects.map((_, i) => (i + 1) / displayProjects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = thresholds.findIndex((t) => v <= t);
    setActiveIndex(index === -1 ? thresholds.length - 1 : index);
  });

  const activeProject = displayProjects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      style={{
        position: "relative",
        color: "var(--text-primary)",
        height: `${displayProjects.length * 100}vh`,
        backgroundColor: activeProject?.accentColor + "18" ?? "var(--bg-0)",
        transition: "background-color 500ms ease",
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header + filter row */}
        <div style={{ padding: "1.5rem clamp(1rem,5vw,2rem) 0.5rem", background: "var(--bg-0)", borderBottom: "1px solid var(--border)", zIndex: 10, flexShrink: 0 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p className="section-subtitle" style={{ marginBottom: "0.25rem" }}>// my_work</p>
                <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Featured <span className="gradient-text">Projects</span>
                </h2>
              </div>

              {/* Filter chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
                {/* Search input */}
                <div style={{ position: "relative" }}>
                  <FiSearch size={13} style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search…"
                    aria-label="Search projects"
                    style={{
                      paddingLeft: "1.8rem",
                      paddingRight: "0.6rem",
                      height: 34,
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      color: "var(--text-primary)",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-sans)",
                      width: 130,
                    }}
                  />
                </div>
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: "0.3rem 0.85rem",
                      borderRadius: 999,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                      background: filter === f ? "var(--accent-dim)" : "var(--bg-card)",
                      border: filter === f ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                      color: filter === f ? "var(--accent)" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      minHeight: 34,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project display area */}
        <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem clamp(1rem,5vw,2rem) 1.5rem", minHeight: 0 }}>
          {filteredProjects.map((project) => {
            const trueIndex = displayProjects.findIndex((p) => p.id === project.id);
            const isActive = trueIndex === activeIndex;

            return (
              <div
                key={project.id}
                style={{
                  position: "absolute",
                  inset: "1rem clamp(1rem,5vw,2rem) 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "opacity 0.4s ease",
                }}
              >
                {!isMobile ? (
                  // Desktop layout
                  <div style={{ width: "100%", maxWidth: 1100, display: "flex", flexDirection: "row", gap: "3rem", alignItems: "center", height: "100%" }}>
                    {/* Left */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={project.id + "-left"}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.4 }}
                          style={{ flex: "0 0 42%", display: "flex", flexDirection: "column", gap: "1rem" }}
                        >
                          {/* Category pills */}
                          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                            {project.categories.map((c) => (
                              <span key={c} style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", background: project.accentColor + "20", border: `1px solid ${project.accentColor}44`, color: project.accentColor, borderRadius: 999, padding: "0.15rem 0.6rem", fontWeight: 700 }}>{c}</span>
                            ))}
                            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginLeft: "auto" }}>{project.period}</span>
                          </div>

                          <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, lineHeight: 1.15, color: "var(--text-primary)" }}>
                            {project.title}
                            <br />
                            <span style={{ fontSize: "0.6em", fontWeight: 600, color: project.accentColor }}>{project.subtitle}</span>
                          </h3>

                          {/* Skills */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                            {project.skills.map((s) => (
                              <span key={s} style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "0.2rem 0.55rem", color: "rgba(255,255,255,0.8)" }}>{s}</span>
                            ))}
                          </div>

                          {/* Description */}
                          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                            {project.description}
                          </p>

                          {/* Highlights */}
                          {project.highlights && (
                            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                              {project.highlights.slice(0, 3).map((h, i) => (
                                <li key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                                  <span style={{ color: project.accentColor, flexShrink: 0, fontSize: "0.6rem", marginTop: "0.35em" }}>●</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Action buttons */}
                          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.55rem 1.25rem" }}>
                                <FiGithub size={15} /> GitHub
                              </a>
                            )}
                            {project.demo && (
                              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.85rem", padding: "0.55rem 1.25rem" }}>
                                <FiExternalLink size={15} /> Live Demo
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Right — image */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={project.id + "-img"}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            flex: 1,
                            borderRadius: 16,
                            overflow: "hidden",
                            height: "min(60vh, 480px)",
                            boxShadow: `0 24px 60px ${project.accentColor}22`,
                            border: `1px solid ${project.accentColor}33`,
                          }}
                        >
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              loading="lazy"
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", background: project.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: "4rem" }}>🚀</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Mobile layout
                  <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div key={project.id + "-mob"} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
                          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, textAlign: "center", lineHeight: 1.3 }}>{project.title}</h3>
                          {project.image && (
                            <div style={{ width: "100%", borderRadius: 12, overflow: "hidden", height: "28vw", minHeight: 120, maxHeight: 200 }}>
                              <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                            </div>
                          )}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center" }}>
                            {project.skills.slice(0, 5).map((s) => (
                              <span key={s} style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, padding: "0.15rem 0.5rem", color: "rgba(255,255,255,0.85)" }}>{s}</span>
                            ))}
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.6, WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", display: "-webkit-box" }}>{project.description}</p>
                          <div style={{ display: "flex", gap: "0.6rem" }}>
                            {project.github && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}><FiGithub size={13} /> GitHub</a>
                            )}
                            {project.demo && (
                              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}><FiExternalLink size={13} /> Demo</a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}

          {/* Scroll indicator dots */}
          <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {displayProjects.map((p, i) => (
              <div key={p.id} style={{ width: 6, height: 6, borderRadius: "50%", background: i === activeIndex ? "var(--accent)" : "var(--border)", transition: "background 0.3s", boxShadow: i === activeIndex ? "0 0 8px var(--accent)" : "none" }} />
            ))}
          </div>

          {/* Scroll hint (first project) */}
          {activeIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ position: "absolute", bottom: "0.5rem", left: "50%", transform: "translateX(-50%)", fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}
            >
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 1.5, height: 18, background: "var(--text-muted)", borderRadius: 1 }} />
              scroll to explore
            </motion.div>
          )}
        </div>

        {/* Project counter */}
        <div style={{ position: "absolute", bottom: "2rem", left: "clamp(1rem,5vw,2rem)", fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          <span style={{ color: "var(--accent)", fontWeight: 700 }}>{String(activeIndex + 1).padStart(2, "0")}</span>
          {" / "}
          {String(displayProjects.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}