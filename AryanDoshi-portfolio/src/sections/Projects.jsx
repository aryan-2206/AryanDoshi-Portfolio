import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    if(typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return isMobile;
}


export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(() => [
  {
    title: "SmartCV - AI Powered Resume Builder",
    link: "https://smart-cv-an-ai-powered-resume-build.vercel.app/",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "REST APIs",
      "NLP",
      "TF-IDF",
      "Cosine Similarity",
    ],
    bgColor: "#0d4d3d",
    image: isMobile ? photo1 : img1,
  },
  {
    title: "FakeMyVoice",
    link: "https://github.com/nihira20/Fake_My_Voice",
    skills: [
      "Python",
      "PyTorch",
      "Deep Learning",
      "Tacotron2",
      "WaveGlow",
      "Librosa",
      "NumPy",
      "Torchaudio",
      "Speech Synthesis",
      "Voice Cloning",
    ],
    bgColor: "#3884d3",
    image: isMobile ? photo2 : img2,
  },
  {
    title: "Image Captioning Model",
    link: "https://github.com/aryan-2206/Image_Caption_Generator",
    skills: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "CNN",
      "LSTM",
      "Attention Mechanism",
      "NLP",
      "MS-COCO",
      "BLEU Score",
      "Deep Learning",
    ],
    bgColor: "#dc9317",
    image: isMobile ? photo3 : img3,
  },
  {
    title: "Smart City Waste Management System",
    link: "https://github.com/aryan-2206/Smart-City-Waste-Recycling-And-Management-System",
    skills: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Tailwind CSS",
    ],
    bgColor: "#8b5cf6",
    image: isMobile ? photo3 : img3,
  },
  {
    title: "Equity Research AI Agent",
    link: "https://github.com/DataHack4-0/Ctrl--Alt--De-Dragon",
    skills: [
      "Python",
      "AI Agents",
      "LLMs",
      "Financial Analysis",
      "Machine Learning",
      "Data Analysis",
      "NLP",
      "Automation",
    ],
    bgColor: "#ef4444",
    image: isMobile ? photo3 : img3,
  },
  {
    title: "eDNA Biodiversity Analysis Pipeline",
    link: "https://github.com/d-mahi14/eDNA-project",
    skills: [
      "Python",
      "TensorFlow",
      "Flask",
      "Variational Autoencoders",
      "HDBSCAN",
      "UMAP",
      "Bioinformatics",
      "Machine Learning",
      "Data Visualization",
      "Biodiversity Analysis",
    ],
    bgColor: "#14b8a6",
    image: isMobile ? photo3 : img3,
  },
], [isMobile]);

  const {scrollYProgress} = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })
  const thresholds = projects.map((_, i) => (i+1)/projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = thresholds.findIndex((t) => v <= t);
    setActiveIndex(index === -1 ? thresholds.length - 1 : index);
  });
  const activeProject = projects[activeIndex];
  return (
    <section id="projects" 
    ref = {sceneRef} 
    className="relative text-white"
    style={{
      height: `${projects.length * 100}vh`,
      backgroundColor: activeProject.bgColor,
      transition: "background-color 400ms ease"
    }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>My Work</h2>
        <div className={`relative w-full h-full flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, i) => (
            <div key={project.title} className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 
            ${i === activeIndex ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"}`}
            style={{width: "85%", maxWidth: "1200px"}}
            >
              <AnimatePresence>
                {i === activeIndex && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}