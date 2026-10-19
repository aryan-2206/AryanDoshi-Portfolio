import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, ChevronUp, XCircle, CheckCircle2 } from "lucide-react";
import heuristicsData from "../../data/heuristics.json";

const SEVERITY_COLORS = {
  0: "#10b981",
  1: "#3b82f6",
  2: "#f59e0b",
  3: "#ef4444",
  4: "#dc2626"
};

const SEVERITY_LABELS = {
  0: "0 - No Problem",
  1: "1 - Cosmetic",
  2: "2 - Minor",
  3: "3 - Major",
  4: "4 - Critical"
};

export default function HeuristicsTable() {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          borderRadius: 12,
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          marginBottom: "1.5rem"
        }}
      >
        <Info size={20} style={{ color: "#3b82f6", flexShrink: 0 }} />
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text-primary)" }}>Nielsen Heuristic Evaluation Methodology:</strong> 
          This table provides a structured checklist for reviewing the portfolio against Nielsen's 10 heuristics. 
          Severity ratings and findings should be recorded after conducting an audit; no evaluation results have been entered yet.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
          padding: "0.75rem 1rem",
          borderRadius: 8,
          background: "var(--bg-3)",
          fontSize: "0.75rem",
          fontFamily: "var(--font-mono)"
        }}
      >
        <span style={{ color: "var(--text-muted)" }}>Severity Scale:</span>
        {Object.entries(SEVERITY_LABELS).map(([value, label]) => (
          <span key={value} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: SEVERITY_COLORS[value]
              }}
            />
            {label}
          </span>
        ))}
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "var(--bg-3)" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", width: "60px" }}>#</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)" }}>Heuristic</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)" }}>Rule Definition</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", width: "200px" }}>Implementation Location</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", width: "120px" }}>Severity</th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--border)", width: "100px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {heuristicsData.map((heuristic) => {
                const isExpanded = expandedRows[heuristic.id];
                const severityColor = SEVERITY_COLORS[heuristic.severity] ?? "var(--text-muted)";
                
                return (
                  <Fragment key={heuristic.id}>
                    <tr
                      onClick={() => toggleRow(heuristic.id)}
                      style={{ cursor: "pointer", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-3)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      tabIndex={0}
                      role="button"
                      aria-expanded={isExpanded}
                    >
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "0.88rem", fontWeight: 700 }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--accent-dim)",
                            border: "1px solid var(--border-accent)",
                            color: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)"
                          }}
                        >
                          {heuristic.id}
                        </div>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "0.88rem", fontWeight: 600 }}>
                        {heuristic.name}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "0.83rem", maxWidth: "250px" }}>
                        {heuristic.rule}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", color: "var(--accent)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                        {heuristic.location}
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.6rem",
                            borderRadius: 999,
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            background: `${severityColor}20`,
                            color: severityColor,
                            border: `1px solid ${severityColor}40`
                          }}
                        >
                          {heuristic.severityLabel}
                        </span>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            fontSize: "0.75rem",
                            color: heuristic.severity == null ? "var(--text-muted)" : heuristic.severity === 0 ? "#10b981" : "#f59e0b",
                            fontWeight: 600
                          }}
                        >
                          {heuristic.severity == null ? <Info size={14} /> : heuristic.severity === 0 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          {heuristic.severity == null ? "Not assessed" : heuristic.severity === 0 ? "No issue" : "Finding recorded"}
                        </span>
                      </td>
                      <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", width: "40px" }}>
                        {isExpanded ? <ChevronUp size={16} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <td colSpan={7} style={{ padding: 0, borderBottom: "1px solid var(--border)" }}>
                            <div style={{ padding: "1.25rem", background: "var(--bg-3)" }}>
                              <div style={{ marginBottom: "1rem" }}>
                                <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>
                                  Concrete Implementation in this Profile
                                </p>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                                  {heuristic.implementation}
                                </p>
                              </div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ padding: "1rem", borderRadius: 8, background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                                  <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <XCircle size={14} /> Defect Found in Pre-Test
                                  </p>
                                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                    {heuristic.beforeFix}
                                  </p>
                                </div>
                                <div style={{ padding: "1rem", borderRadius: 8, background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                                  <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <CheckCircle2 size={14} /> HCI Solution Implemented
                                  </p>
                                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                                    {heuristic.afterFix}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleRow(heuristic.id);
                                }}
                                style={{
                                  padding: "0.5rem 1rem",
                                  borderRadius: 6,
                                  border: "1px solid var(--border)",
                                  background: "var(--bg-card)",
                                  color: "var(--text-muted)",
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                  fontFamily: "var(--font-mono)"
                                }}
                              >
                                Dismiss
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
