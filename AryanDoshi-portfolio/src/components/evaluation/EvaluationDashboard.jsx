import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Printer, Download, RotateCcw, FileText, Users, BarChart3, Sparkles, Shield, Layout } from "lucide-react";
import { useUsabilityStore } from "../../hooks/useUsabilityStore";
import { useToast } from "../common/Toast";
import HeuristicsTable from "./HeuristicsTable";
import UserTestingSuite from "./UserTestingSuite";
import SusQuestionnaire from "./SusQuestionnaire";
import UsabilityMetricsChart from "./UsabilityMetricsChart";
import BeforeAfterSection from "./BeforeAfterSection";
import AuditScorecard from "./AuditScorecard";

const TABS = [
  { id: "heuristics", label: "10 Heuristics Audit", icon: FileText, badge: "Nielsen" },
  { id: "tasks", label: "5-Task User Tests", icon: Users, badge: "X/5 Done" },
  { id: "sus", label: "SUS Questionnaire", icon: BarChart3, badge: "Score N" },
  { id: "analytics", label: "Analytics & Charts", icon: Layout, badge: "N% Success" },
  { id: "beforeAfter", label: "Before & After Fixes", icon: Sparkles, badge: "N Refinements" },
  { id: "audit", label: "Lighthouse & axe", icon: Shield, badge: "WCAG 2.2 AA" },
];

export default function EvaluationDashboard() {
  const [activeTab, setActiveTab] = useState("heuristics");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { stats, susScore, susGrade, taskSessions, resetAllData } = useUsabilityStore();
  const { addToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const data = {
      project: "Aryan Doshi Portfolio",
      owner: "Aryan Doshi (VJTI Mumbai)",
      evaluatedAt: new Date().toISOString(),
      susScore,
      susGrade,
      taskSessions,
      stats,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `usability-evaluation-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Evaluation data exported successfully!", "success", 2000);
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    addToast("All evaluation data has been reset.", "info", 2000);
  };

  const completedTasks = Object.values(taskSessions).filter((t) => t.completed).length;

  return (
    <section
      id="evaluation"
      style={{
        background: "var(--bg-0)",
        position: "relative",
        borderTop: "1px solid var(--border)",
        scrollMarginTop: "80px",
      }}
    >
      <div className="section-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: 999,
                padding: "0.4rem 1rem",
                marginBottom: "1rem",
              }}
            >
              <Activity size={16} style={{ color: "#10b981" }} />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#10b981",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Academic Usability Engineering Lab
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              Usability Evaluation &amp; <span style={{ color: "var(--accent)" }}>HCI Research</span>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "640px",
              }}
            >
              An HCI evaluation workspace for Nielsen's 10 heuristics, the 10-item System Usability Scale (SUS),
              five structured task walkthroughs, and WCAG accessibility checks. Enter findings from real evaluation sessions, then export the recorded results.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handlePrint}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.borderColor = "var(--border)")}
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button
              onClick={handleExport}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.borderColor = "var(--border)")}
            >
              <Download size={16} /> Export JSON
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: 8,
                border: "1px solid rgba(239, 68, 68, 0.3)",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(239, 68, 68, 0.2)")}
              onMouseLeave={(e) => (e.target.style.background = "rgba(239, 68, 68, 0.1)")}
            >
              <RotateCcw size={16} /> Reset Data
            </button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="HCI evaluation sections"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "0.5rem",
            display: "flex",
            gap: "0.25rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            let badgeText = tab.badge;
            
            if (tab.id === "tasks") badgeText = `${completedTasks}/5 Done`;
            if (tab.id === "sus") badgeText = susScore !== null ? `${susScore}` : "10 Items";
            if (tab.id === "analytics") badgeText = stats.successRate == null ? "Awaiting results" : `${Math.round(stats.successRate)}% Success`;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1rem",
                  borderRadius: 8,
                  border: "none",
                  background: isActive ? "var(--accent-dim)" : "transparent",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  flex: "1",
                  minWidth: "fit-content",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.target.style.background = "var(--bg-3)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.target.style.background = "transparent";
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    padding: "0.15rem 0.5rem",
                    borderRadius: 4,
                    background: isActive ? "rgba(0, 217, 255, 0.2)" : "var(--bg-3)",
                    color: isActive ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  {badgeText}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            id={`panel-${activeTab}`}
          >
            {activeTab === "heuristics" && <HeuristicsTable />}
            {activeTab === "tasks" && <UserTestingSuite />}
            {activeTab === "sus" && <SusQuestionnaire />}
            {activeTab === "analytics" && <UsabilityMetricsChart />}
            {activeTab === "beforeAfter" && <BeforeAfterSection />}
            {activeTab === "audit" && <AuditScorecard />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showResetConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(4px)",
                zIndex: 9999,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "2rem",
                maxWidth: "400px",
                width: "90%",
                zIndex: 10000,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                Reset All Data?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                This will permanently delete all SUS answers, task sessions, and computed metrics. This action cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--bg-3)",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: 8,
                    border: "none",
                    background: "#ef4444",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Reset Data
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
