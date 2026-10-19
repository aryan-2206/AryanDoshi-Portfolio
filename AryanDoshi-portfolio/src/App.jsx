import { useState, useEffect } from "react";
import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import IntroAnimations from "./components/IntroAnimations";
import BackToTop from "./components/BackToTop";
import FeedbackWidget from "./components/FeedbackWidget";
import HciGuideModal from "./components/common/HciGuideModal";
import { ToastProvider } from "./components/common/Toast";
import EvaluationDashboard from "./components/evaluation/EvaluationDashboard";

import Home from "./sections/Home";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Publication from "./sections/Publication";
import Skills from "./sections/Skills";
import CompetitiveProgramming from "./sections/CompetitiveProgramming";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import BeyondCode from "./sections/BeyondCode";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [hciGuideOpen, setHciGuideOpen] = useState(false);

  // Keep the portfolio available even if an animation exit callback is interrupted.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIntroFinished(true), 5000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Global Ctrl+K listener
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target;
        const isTyping = target instanceof HTMLElement &&
          (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
        if (!isTyping) {
          e.preventDefault();
          setHciGuideOpen((v) => !v);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        {!introFinished && (
          <IntroAnimations onFinish={() => setIntroFinished(true)} />
        )}
        <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
        <Navbar
          onCommandOpen={() => setCmdOpen(true)}
          onHciGuideOpen={() => setHciGuideOpen(true)}
        />
        <main id="main-content">
          <Home />
          <About />
          <Experience />
          <Projects />
          <Publication />
          <Skills />
          <CompetitiveProgramming />
          <Education />
          <Certifications />
          <BeyondCode />
          <Blog />
          <EvaluationDashboard />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <FeedbackWidget />
        <HciGuideModal isOpen={hciGuideOpen} onClose={() => setHciGuideOpen(false)} />
      </ToastProvider>
    </ThemeProvider>
  );
}
