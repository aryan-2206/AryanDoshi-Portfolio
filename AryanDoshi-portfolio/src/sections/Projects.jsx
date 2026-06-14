import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import smartcv from "../assets/smartcv.png";
// import swms from "../assets/swms.png";
import fmv from "../assets/fmv.jpg";
import imgcaption from "../assets/imgcaption.png";
import ednadesk from "../assets/ednadesk.jpeg";
import ednamob from "../assets/ednamob.jpeg";
// import equitydesk from "../assets/equitydesk.png";
// import equitymob from "../assets/equitymob.png";
import banquetdesk from "../assets/banquetdesk.png";
import banquetmob from "../assets/banquetmob.jpeg";

const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    // setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);
  
  const projects = useMemo(
    () => [
      {
        title: "Banquet IntelliManager",
        link: "https://github.com/aryan-2206/Banquet_Management_System",
        description:
        "A full-stack banquet operations platform unifying Sales, Finance, Kitchen, Guest Relations, and Admin under a single real-time command center. Features WhatsApp automation via Twilio for guest ticketing and installment reminders, live WebSocket sync between GRE QR scanning and kitchen dashboards, JWT-based role-based access control across seven modules, and an AI-powered post-event audit engine that generates executive summaries for cost and yield optimization.",
        skills: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT", "Twilio", "REST APIs"],
        bgColor: "#7c3aed",
        image: isMobile ? banquetmob : banquetdesk,
      },
      {
        title: "FakeMyVoice",
        link: "https://github.com/nihira20/Fake_My_Voice",
        description:
          "A deep learning-based voice cloning system built with Tacotron2 for spectrogram generation and WaveGlow as the neural vocoder. Given a short audio sample, the pipeline synthesizes highly realistic speech that mimics the target speaker's voice characteristics.",
        skills: ["Python", "PyTorch", "Tacotron2", "WaveGlow", "Librosa", "Torchaudio", "Speech Synthesis"],
        bgColor: "#3884d3",
        image: isMobile ? fmv : fmv,
      },
      {
        title: "SmartCV — AI Resume Builder",
        link: "https://smart-cv-an-ai-powered-resume-build.vercel.app/",
        description:
        "SmartCV streamlines resume creation and optimization using NLP techniques like TF-IDF and Cosine Similarity to match resumes against job descriptions. It provides actionable feedback through a full-stack platform featuring JWT authentication and a responsive React UI.",
        skills: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "NLP", "TF-IDF", "Tailwind CSS"],
        bgColor: "#0d4d3d",
        image: isMobile ? smartcv : smartcv,
      },
      {
        title: "Image Captioning Model",
        link: "https://github.com/aryan-2206/Image_Caption_Generator",
        description:
        "An end-to-end captioning model combining CNN visual feature extraction with LSTM and Attention mechanisms to generate descriptive captions. Trained on MS-COCO and evaluated with BLEU scores, it bridges Computer Vision and NLP to produce contextual image descriptions.",
        skills: ["Python", "PyTorch", "CNN", "LSTM", "Attention Mechanism", "MS-COCO", "Deep Learning"],
        bgColor: "#dc9317",
        image: isMobile ? imgcaption : imgcaption,
      },
      // {
      //   title: "Equity Research AI Agent",
      //   link: "https://github.com/DataHack4-0/Ctrl--Alt--De-Dragon",
      //   description:
      //   "An agentic AI system performing automated equity research on Indian listed companies. LangGraph orchestrates specialized agents — news intelligence, knowledge graphs, and adversarial bull/bear analysis — to produce evidence-backed investment theses streamed live to a dynamic dashboard.",
      //   skills: ["Python", "LangGraph", "LLMs", "AI Agents", "Financial Analysis", "RAG", "NLP"],
      //   bgColor: "#ef4444",
      //   image: isMobile ? equitymob : equitydesk,
      // },
      {
        title: "eDNA Biodiversity Pipeline",
        link: "https://github.com/d-mahi14/eDNA-project",
        description:
        "A bioinformatics pipeline that analyses environmental DNA samples to assess ecosystem biodiversity. Variational Autoencoders reduce dimensionality, UMAP handles visualization, and HDBSCAN clusters species distributions — all surfaced through an interactive Flask web interface.",
        skills: ["Python", "TensorFlow", "Flask", "VAE", "HDBSCAN", "UMAP", "Bioinformatics", "ML"],
        bgColor: "#14b8a6",
        image: isMobile ? ednamob : ednadesk,
      },
      // {
      //   title: "Smart City Waste Management",
      //   link: "https://github.com/aryan-2206/Smart-City-Waste-Recycling-And-Management-System",
      //   description:
      //     "A full-stack MERN solution connecting citizens, waste collectors, and municipal authorities via real-time dashboards. The platform handles bin tracking, scheduled pickups, and recycling metrics with an intuitive interface and routing optimization.",
      //   skills: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
      //   bgColor: "#8b5cf6",
      //   image: isMobile ? swms : swms,
      // },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = thresholds.findIndex((t) => v <= t);
    setActiveIndex(index === -1 ? thresholds.length - 1 : index);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* ── Section heading ── */}
        <h2 className="text-3xl font-semibold text-center pt-6 pb-3 shrink-0 z-10">
          My Work
        </h2>

        {/* ── Main card area ── fills remaining height ── */}
        <div className="flex-1 relative flex items-center justify-center px-4 md:px-10 pb-6 min-h-0">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`absolute inset-0 flex items-center justify-center px-4 md:px-10 pb-6 transition-opacity duration-500 ${
                i === activeIndex ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
            >
              {/* ── DESKTOP: two-column ── */}
              {!isMobile && (
                <div className="w-full max-w-6xl h-full flex flex-row gap-8 items-center">
                  {/* Left column — title + skills + desc + button */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.div
                        key={project.title + "-left"}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex flex-col justify-center gap-4 shrink-0"
                        style={{ width: "40%" }}
                      >
                        <h3
                          className="italic font-bold text-white/95 leading-tight"
                          style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)" }}
                        >
                          {project.title}
                        </h3>

                        {/* Skills pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: "rgba(255,255,255,0.18)",
                                border: "1px solid rgba(255,255,255,0.3)",
                                backdropFilter: "blur(6px)",
                                color: "rgba(255,255,255,0.95)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-white/75 text-sm leading-relaxed">
                          {project.description}
                        </p>

                        {/* Button */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-start inline-block px-6 py-2.5 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
                          aria-label={`View ${project.title}`}
                        >
                          View Project
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right column — image */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.div
                        key={project.title + "-img"}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex-1 rounded-xl overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] min-h-0"
                        style={{
                          height: "min(62vh, 520px)",
                          zIndex: 10,
                          transition: "box-shadow 250ms ease",
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{
                            filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                            transition: "filter 200ms ease",
                          }}
                          loading="lazy"
                        />
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── MOBILE: single-column stacked ── */}
              {isMobile && (
                <div className="w-full max-w-lg flex flex-col gap-3 items-center">
                  {/* Title */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.h3
                        key={project.title + "-m-title"}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-center italic font-bold text-white/95 text-xl leading-tight px-2"
                      >
                        {project.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>

                  {/* Image */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.div
                        key={project.title + "-m-img"}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full rounded-lg overflow-hidden bg-black/20 shadow-2xl"
                        style={{ height: "32vw", minHeight: "140px", maxHeight: "210px" }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skills pills */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.div
                        key={project.title + "-m-skills"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="flex flex-wrap justify-center gap-1.5 w-full px-2"
                      >
                        {project.skills.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: "rgba(255,255,255,0.18)",
                              border: "1px solid rgba(255,255,255,0.3)",
                              backdropFilter: "blur(6px)",
                              color: "rgba(255,255,255,0.95)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Description (2 lines on mobile) */}
                  <AnimatePresence mode="wait">
                    {i === activeIndex && (
                      <motion.p
                        key={project.title + "-m-desc"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                        className="text-center text-white/75 text-xs leading-relaxed px-2"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all text-sm"
                    aria-label={`View ${project.title}`}
                  >
                    View Project
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}