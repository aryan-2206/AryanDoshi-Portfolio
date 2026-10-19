import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiArrowRight } from "react-icons/fi";

const COMMANDS = [
  { label: "Home", id: "home", icon: "🏠" },
  { label: "About", id: "about", icon: "👤" },
  { label: "Experience", id: "experience", icon: "💼" },
  { label: "Projects", id: "projects", icon: "🚀" },
  { label: "Publication", id: "publication", icon: "📄" },
  { label: "Skills", id: "skills", icon: "⚡" },
  { label: "Competitive Programming", id: "cp", icon: "🏆" },
  { label: "Education", id: "education", icon: "🎓" },
  { label: "Certifications", id: "certifications", icon: "🏅" },
  { label: "Beyond Code", id: "beyond-code", icon: "🌱" },
  { label: "Blog", id: "blog", icon: "✍️" },
  { label: "HCI & Usability", id: "evaluation", icon: "🎨" },
  { label: "Contact", id: "contact", icon: "📬" },
  { label: "Download Resume", id: "resume", icon: "📎", action: () => window.open("/Resume.pdf", "_blank") },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = (cmd) => {
    if (cmd.action) {
      cmd.action();
    } else {
      const el = document.getElementById(cmd.id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  const onKey = (e) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Palette box */}
          <motion.div
            className="cmd-box"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onKeyDown={onKey}
          >
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <FiSearch size={18} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section…"
                aria-label="Search sections"
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <kbd
                style={{
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              role="listbox"
              style={{
                listStyle: "none",
                padding: "0.5rem",
                maxHeight: "340px",
                overflowY: "auto",
              }}
            >
              {filtered.length === 0 ? (
                <li
                  style={{
                    padding: "1.5rem",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  No results found
                </li>
              ) : (
                filtered.map((cmd, i) => (
                  <li
                    key={cmd.id}
                    role="option"
                    aria-selected={i === selected}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.7rem 1rem",
                      borderRadius: 10,
                      background: i === selected ? "var(--accent-dim)" : "transparent",
                      border: i === selected ? "1px solid var(--border-accent)" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{cmd.icon}</span>
                    <span
                      style={{
                        flex: 1,
                        fontSize: "0.95rem",
                        color: i === selected ? "var(--accent)" : "var(--text-primary)",
                        fontWeight: i === selected ? 600 : 400,
                      }}
                    >
                      {cmd.label}
                    </span>
                    {i === selected && (
                      <FiArrowRight size={15} style={{ color: "var(--accent)" }} />
                    )}
                  </li>
                ))
              )}
            </ul>

            {/* Footer hint */}
            <div
              style={{
                padding: "0.6rem 1.25rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                gap: "1.5rem",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span><kbd style={{fontFamily:"inherit"}}>↑↓</kbd> navigate</span>
              <span><kbd style={{fontFamily:"inherit"}}>↵</kbd> select</span>
              <span><kbd style={{fontFamily:"inherit"}}>esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
