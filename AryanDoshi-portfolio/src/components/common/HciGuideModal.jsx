import Modal from "./Modal";
import { ShieldCheck, Keyboard, ArrowRight, Target, Layers, Eye } from "lucide-react";

export default function HciGuideModal({ isOpen, onClose }) {
  const scrollToEvaluation = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById("evaluation");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="HCI Design System & Evaluator Guide" size="lg">
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            padding: "1.25rem",
            borderRadius: 8,
            background: "var(--bg-3)",
            border: "1px solid var(--border)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <ShieldCheck size={20} style={{ color: "var(--accent)" }} />
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Project Objective
            </h4>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            This portfolio serves as both a personal showcase and an HCI evaluation case study. 
            It implements Nielsen's 10 heuristics, supports SUS questionnaire completion, 
            provides 5 structured usability tasks, and documents WCAG 2.2 AA compliance efforts.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
            KEYBOARD SHORTCUTS
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)"
                }}
              >
                Ctrl+K
              </kbd>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Command Palette</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)"
                }}
              >
                ?
              </kbd>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>This Guide</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)"
                }}
              >
                D
              </kbd>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Toggle Dark Mode</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)"
                }}
              >
                Esc
              </kbd>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Dismiss Modals</span>
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
            HCI PRINCIPLES IMPLEMENTED
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            <div
              style={{
                padding: "1rem",
                borderRadius: 8,
                background: "var(--bg-3)",
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Target size={18} style={{ color: "var(--accent)" }} />
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Fitts's Law
                </h5>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Primary CTAs are 44x44px minimum touch targets. Important actions are positioned for easy access.
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: 8,
                background: "var(--bg-3)",
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Layers size={18} style={{ color: "var(--accent)" }} />
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Hick's Law
                </h5>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Navigation limited to 6 top-level items. Complex details hidden behind modals (progressive disclosure).
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: 8,
                background: "var(--bg-3)",
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Keyboard size={18} style={{ color: "var(--accent)" }} />
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Miller's Law
                </h5>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Skills organized into 5 chunks of 4-5 items each. Usability suite limited to 5 structured tasks.
              </p>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: 8,
                background: "var(--bg-3)",
                border: "1px solid var(--border)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Eye size={18} style={{ color: "var(--accent)" }} />
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  Gestalt & WCAG 2.2 AA
                </h5>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Color contrast ≥ 4.5:1. Focus-visible rings on interactive elements. Motion respects prefers-reduced-motion.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToEvaluation}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "0.875rem",
            borderRadius: 8,
            border: "none",
            background: "var(--accent)",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Jump to Usability Evaluation & SUS Lab
          <ArrowRight size={16} />
        </button>
      </div>
    </Modal>
  );
}
