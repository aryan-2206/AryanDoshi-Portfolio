import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiCommand } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme.jsx";
import { useActiveSection } from "../hooks/useInView";
import Logo from "../assets/Logo.png";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Blog", id: "blog" },
  { label: "HCI Evaluation", id: "evaluation" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ onCommandOpen, onHciGuideOpen }) {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollWidth, setScrollWidth] = useState(0);
  const lastY = useRef(0);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  // Scroll progress + hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollWidth(total > 0 ? (y / total) * 100 : 0);
      setScrolled(y > 20);

      if (y > lastY.current + 8 && y > 200) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Keyboard: Escape closes menu; Ctrl/Cmd+K opens command palette
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onCommandOpen?.();
      }
      const target = e.target;
      const isTyping = target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (!isTyping && !e.ctrlKey && !e.metaKey && !e.altKey && !e.repeat && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCommandOpen, toggle]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${scrollWidth}%` }}
        aria-hidden="true"
      />

      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${hidden && !menuOpen ? "hidden-nav" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1rem,4vw,2rem)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none" }}
            aria-label="Go to top"
          >
            <img src={Logo} alt="" aria-hidden="true" style={{ width: 32, height: 32 }} />
            <span
              style={{
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-mono)",
                display: "none",
              }}
              className="logo-text"
            >
              aryan.doshi
            </span>
          </button>

          {/* Desktop nav links */}
          <ul
            role="list"
            style={{
              display: "flex",
              gap: "0.15rem",
              listStyle: "none",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  aria-current={active === id ? "page" : undefined}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0.4rem 0.85rem",
                    borderRadius: 8,
                    fontSize: "0.85rem",
                    fontWeight: active === id ? 700 : 500,
                    color: active === id ? "var(--accent)" : "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s, background 0.2s",
                    cursor: "pointer",
                    position: "relative",
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) => {
                    if (active !== id) e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (active !== id) e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 8,
                        background: "var(--accent-dim)",
                        border: "1px solid var(--border-accent)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Command palette trigger */}
            <button
              onClick={onCommandOpen}
              title="Command Palette (Ctrl+K)"
              aria-label="Open command palette"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "0.45rem 0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                minHeight: 44,
                transition: "border-color 0.2s, color 0.2s",
              }}
              className="cmd-trigger"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-accent)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <FiCommand size={14} />
              <span className="cmd-hint">⌘K</span>
            </button>

            {/* HCI Guide trigger */}
            <button
              onClick={onHciGuideOpen}
              title="HCI Guide (?)"
              aria-label="Open HCI guide"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-accent)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>?</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
              className="hamburger"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              zIndex: 899,
              background: "rgba(5,8,16,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem",
            }}
            className="mobile-menu"
          >
            <ul role="list" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV_ITEMS.map(({ label, id }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => scrollTo(id)}
                    style={{
                      background: active === id ? "var(--accent-dim)" : "none",
                      border: active === id ? "1px solid var(--border-accent)" : "1px solid transparent",
                      borderRadius: 10,
                      width: "100%",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: active === id ? "var(--accent)" : "var(--text-secondary)",
                      fontWeight: active === id ? 700 : 500,
                      fontSize: "1.05rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      minHeight: 44,
                    }}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Contact CTA in mobile menu */}
            <div style={{ marginTop: "1rem", padding: "0 0.25rem" }}>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Let's Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .hamburger { display: none !important; }
          .logo-text { display: block !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .cmd-trigger .cmd-hint { display: none; }
        }
        @media (max-width: 640px) {
          .cmd-trigger { display: none !important; }
        }
      `}</style>
    </>
  );
}
