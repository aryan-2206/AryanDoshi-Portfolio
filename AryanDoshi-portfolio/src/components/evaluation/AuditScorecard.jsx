import { Gauge, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";

const LIGHTHOUSE_METRICS = {
  performance: { score: null, date: "Not measured" },
  accessibility: { score: null, date: "Not measured" },
  bestPractices: { score: null, date: "Not measured" },
  seo: { score: null, date: "Not measured" },
};

const WCAG_CHECKLIST = [
  {
    id: "contrast",
    criterion: "WCAG 1.4.3 Contrast (Minimum)",
    status: "Not tested",
    detail: "Check text contrast ratios with an accessibility audit.",
  },
  {
    id: "focus",
    criterion: "WCAG 2.4.7 Focus Visible",
    status: "Not tested",
    detail: "Check that all interactive elements have visible focus indicators.",
  },
  {
    id: "focus-obscured",
    criterion: "WCAG 2.4.11 Focus Not Obscured (Minimum)",
    status: "Not tested",
    detail: "Check that focused controls are not entirely hidden by author-created content.",
  },
  {
    id: "bypass",
    criterion: "WCAG 2.4.1 Bypass Blocks",
    status: "Not tested",
    detail: "Check that a skip link lets keyboard users bypass repeated content.",
  },
  {
    id: "headings",
    criterion: "WCAG 1.3.1 Info and Relationships",
    status: "Not tested",
    detail: "Check that headings describe the page structure without skipping levels.",
  },
  {
    id: "dialog",
    criterion: "WCAG 1.3.4 Orientation",
    status: "Not tested",
    detail: "Check that content works in both portrait and landscape orientations.",
  },
  {
    id: "target-size",
    criterion: "WCAG 2.5.8 Target Size (Minimum)",
    status: "Not tested",
    detail: "Check pointer targets for the 24 by 24 CSS pixel minimum or a documented exception.",
  },
  {
    id: "motion",
    criterion: "Reduced Motion (supplemental check)",
    status: "Not tested",
    detail: "Check that interaction-triggered motion respects reduced-motion preferences.",
  },
];

function CircularGauge({ score, label, icon: Icon, color }) {
  const displayScore = score == null ? "—" : score;
  const percentage = score == null ? 0 : score;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="var(--bg-3)"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.5s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={20} style={{ color: color }} />
        </div>
      </div>
      <div
        style={{
          fontSize: "1.25rem",
          fontWeight: 900,
          fontFamily: "var(--font-mono)",
          color: "var(--text-primary)",
          marginTop: "0.5rem",
        }}
      >
        {displayScore}
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    "Pass": { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)", icon: CheckCircle2 },
    "Fail": { color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)", icon: XCircle },
    "Partial": { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)", icon: AlertCircle },
    "Not tested": { color: "var(--text-muted)", bg: "var(--bg-3)", icon: Clock },
  };

  const config = statusConfig[status] || statusConfig["Not tested"];
  const Icon = config.icon;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        padding: "0.25rem 0.6rem",
        borderRadius: 6,
        background: config.bg,
        color: config.color,
        fontSize: "0.75rem",
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
      }}
    >
      <Icon size={12} />
      {status}
    </span>
  );
}

export default function AuditScorecard() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
      {/* Lighthouse Audit */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
          Google Lighthouse Audit Metrics
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <CircularGauge
            score={LIGHTHOUSE_METRICS.performance.score}
            label="Performance"
            icon={Gauge}
            color="#6366f1"
          />
          <CircularGauge
            score={LIGHTHOUSE_METRICS.accessibility.score}
            label="Accessibility"
            icon={CheckCircle2}
            color="#10b981"
          />
          <CircularGauge
            score={LIGHTHOUSE_METRICS.bestPractices.score}
            label="Best Practices"
            icon={AlertCircle}
            color="#f59e0b"
          />
          <CircularGauge
            score={LIGHTHOUSE_METRICS.seo.score}
            label="SEO"
            icon={Gauge}
            color="#a855f7"
          />
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem", fontFamily: "var(--font-mono)" }}>
          Audit status: {LIGHTHOUSE_METRICS.performance.date}
        </p>
      </div>

      {/* WCAG 2.2 AA Compliance */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
          Accessibility Audit Checklist · WCAG 2.2 AA and supplemental checks
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {WCAG_CHECKLIST.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "1rem",
                borderRadius: 8,
                background: "var(--bg-3)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {item.criterion}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
