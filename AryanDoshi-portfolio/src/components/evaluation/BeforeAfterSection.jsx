import { Sparkles, XCircle, CheckCircle2 } from "lucide-react";

const IMPROVEMENTS = [
  {
    id: 1,
    area: "HCI Evaluation Tabs",
    heuristic: "Help Users Recover from Errors",
    before: "Opening the 5-Task User Tests or SUS Questionnaire panel caused a rendering error, so users could not access either instrument.",
    after: "Fixed the missing animation import, corrected the SUS question rendering, and verified both panels open and display their content.",
    outcome: null,
  },
  {
    id: 2,
    area: "Modal Dismissal & Keyboard Navigation",
    heuristic: "User Control & Freedom, WCAG 2.1.2",
    before: "Modals could only be closed by clicking the X button. No keyboard support for navigation or dismissal. Screen reader announcements were missing.",
    after: "Added Escape key to dismiss all modals. Implemented focus trap that returns focus to trigger element. Added aria-live regions for announcements. All interactive elements are keyboard accessible.",
    outcome: null,
  },
  {
    id: 3,
    area: "Skills Representation",
    heuristic: "Miller's Law (7±2 chunks)",
    before: "Skills displayed as percentage bars with 20+ items in a single list. Cognitive overload made it difficult to quickly assess competency areas.",
    after: "Reorganized skills into 5 domain chunks (Backend, Frontend, AI/ML, DevOps, Tools). Each chunk shows 4-5 key skills with qualitative tier indicators (Expert/Proficient/Familiar) instead of arbitrary percentages.",
    outcome: null,
  },
  {
    id: 4,
    area: "Contact Form Validation & State",
    heuristic: "Error Prevention & Recovery",
    before: "Form showed errors only on submission. No inline validation. Users had to resubmit multiple times to fix all issues. No draft saving.",
    after: "Implemented real-time regex validation with specific error messages. Character counters for text fields. Submit button disabled until valid. Draft auto-saved to localStorage. Success state with undo option.",
    outcome: null,
  },
  {
    id: 5,
    area: "Power-User Shortcuts",
    heuristic: "Flexibility & Efficiency of Use",
    before: "All navigation required scrolling and clicking. No keyboard shortcuts for frequent actions. Power users couldn't bypass visual navigation.",
    after: "Added Command Palette (Ctrl/Cmd+K) for instant navigation to any section. Keyboard shortcuts: D for theme toggle, ? for HCI guide, Esc to dismiss overlays. Back-to-top button for quick return.",
    outcome: null,
  },
];

export default function BeforeAfterSection() {
  return (
    <div>
      {/* Banner */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          background: "rgba(168, 85, 247, 0.1)",
          border: "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: 12,
          marginBottom: "1.5rem",
        }}
      >
        <Sparkles size={20} style={{ color: "#a855f7", flexShrink: 0, marginTop: "2px" }} />
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            Iterative Usability Refinements
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            These are draft examples of possible usability refinements. Confirm each "before" state and "after" change
            against the actual portfolio before presenting it as an evaluated result. No user-testing outcomes have been entered.
          </p>
        </div>
      </div>

      {/* Improvement Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {IMPROVEMENTS.map((improvement) => (
          <div
            key={improvement.id}
            className="card"
            style={{
              padding: "1.5rem",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {improvement.id}
              </span>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {improvement.area}
              </h3>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-mono)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: 6,
                  background: "var(--bg-3)",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                {improvement.heuristic}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Before */}
              <div
                style={{
                  padding: "1rem",
                  borderRadius: 8,
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <XCircle size={16} style={{ color: "#ef4444" }} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#ef4444",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Before (Defect Identified)
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {improvement.before}
                </p>
              </div>

              {/* After */}
              <div
                style={{
                  padding: "1rem",
                  borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <CheckCircle2 size={16} style={{ color: "#10b981" }} />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#10b981",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    After (HCI Remediation)
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {improvement.after}
                </p>
              </div>
            </div>

            {/* Measured Outcome */}
            {improvement.outcome && (
              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border)",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Measured Outcome: </span>
                {improvement.outcome}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
