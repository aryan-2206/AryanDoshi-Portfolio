import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Play, CheckCircle2, AlertCircle, ArrowRight, Clock, Minus, Plus, Star, ExternalLink } from "lucide-react";
import { useUsabilityStore } from "../../hooks/useUsabilityStore";
import tasksData from "../../data/usabilityTasks.json";

function TaskCard({ task, isActive, isAnotherTaskActive, onStart, onComplete }) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errors, setErrors] = useState(0);
  const [satisfaction, setSatisfaction] = useState(null);
  const intervalRef = useRef(null);

  const session = useUsabilityStore((state) => state.taskSessions[task.id]);
  const updateTaskSession = useUsabilityStore((state) => state.updateTaskSession);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    onStart();
  };

  const handleComplete = (success) => {
    setIsRunning(false);
    updateTaskSession(task.id, {
      completed: true,
      success,
      durationSeconds: timer,
      errorsCount: errors,
      satisfaction,
      testedAt: new Date().toISOString(),
    });
    onComplete(timer, success);
  };

  const handleJumpToSection = () => {
    const element = document.querySelector(task.targetPath);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isCompleted = session?.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: "1.5rem",
        borderRadius: 16,
        border: isCompleted
          ? "2px solid rgba(16, 185, 129, 0.5)"
          : isActive
          ? "2px solid rgba(99, 102, 241, 0.5)"
          : "1px solid var(--border)",
        background: "var(--bg-card)",
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "1.5rem",
        transition: "all 0.3s",
      }}
    >
      {/* Left: Task Info */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              padding: "0.25rem 0.6rem",
              borderRadius: 6,
              background: "var(--accent-dim)",
              border: "1px solid var(--border-accent)",
              color: "var(--accent)",
            }}
          >
            Task {task.id}
          </span>
          {isCompleted && (
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                padding: "0.25rem 0.6rem",
                borderRadius: 6,
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <CheckCircle2 size={12} /> Completed
            </span>
          )}
        </div>

        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
          {task.title}
        </h3>

        <p
          style={{
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}
        >
          HCI Principle: {task.hciPrinciple}
        </p>

        <div
          style={{
            padding: "1rem",
            borderRadius: 8,
            background: "var(--bg-3)",
            border: "1px solid var(--border)",
            marginBottom: "1rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Scenario
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
              {task.scenario}
            </p>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Goal
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
              {task.goal}
            </p>
          </div>
          <div>
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Success Criteria
            </span>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
              {task.successCriteria}
            </p>
          </div>
        </div>
      </div>

      {/* Right: Control Panel */}
      <div
        style={{
          padding: "1.25rem",
          borderRadius: 12,
          background: "var(--bg-3)",
          border: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!isCompleted ? (
          <>
            {!isRunning ? (
              <button
                onClick={handleStart}
                disabled={isAnotherTaskActive}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem",
                  borderRadius: 8,
                  border: "none",
                  background: "var(--accent)",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                <Play size={16} /> Start Task Timer
              </button>
            ) : (
              <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => handleComplete(true)}
                  disabled={satisfaction === null}
                  style={{ padding: "0.7rem 0.5rem", borderRadius: 8, border: "none", background: "#10b981", color: "white", fontSize: "0.8rem", fontWeight: 700, cursor: satisfaction === null ? "not-allowed" : "pointer", opacity: satisfaction === null ? 0.5 : 1 }}
                >
                  <CheckCircle2 size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Success
                </button>
                <button
                  type="button"
                  onClick={() => handleComplete(false)}
                  disabled={satisfaction === null}
                  style={{ padding: "0.7rem 0.5rem", borderRadius: 8, border: "1px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: "0.8rem", fontWeight: 700, cursor: satisfaction === null ? "not-allowed" : "pointer", opacity: satisfaction === null ? 0.5 : 1 }}
                >
                  Could not complete
                </button>
              </div>
              {satisfaction === null && (
                <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Choose a satisfaction rating before recording the task result.
                </p>
              )}
              </>
            )}

            <button
              onClick={handleJumpToSection}
              aria-label="Jump to section"
              style={{
                alignSelf: "center",
                padding: "0.5rem",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => (e.target.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.borderColor = "var(--border)")}
            >
              <ArrowRight size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={16} style={{ color: "var(--text-muted)" }} />
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Time on task:</span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: isRunning ? "var(--accent)" : "var(--text-primary)",
                }}
              >
                {isRunning ? `${timer}s` : isCompleted ? `${session?.durationSeconds}s` : "Pending"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Errors:</span>
              <button
                onClick={() => setErrors(Math.max(0, errors - 1))}
                disabled={!isRunning}
                aria-label="Decrease errors"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-muted)",
                  cursor: isRunning ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isRunning ? 1 : 0.5,
                }}
              >
                <Minus size={14} />
              </button>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  minWidth: "24px",
                  textAlign: "center",
                }}
              >
                {errors}
              </span>
              <button
                onClick={() => setErrors(errors + 1)}
                disabled={!isRunning}
                aria-label="Increase errors"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--text-muted)",
                  cursor: isRunning ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isRunning ? 1 : 0.5,
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem", display: "block" }}>
                How satisfied was the participant? (1-5):
              </span>
              <div role="radiogroup" aria-label={`Satisfaction rating for task ${task.id}`} style={{ display: "flex", gap: "0.25rem" }}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSatisfaction(rating)}
                    aria-label={`Rate ${rating} stars`}
                    aria-checked={satisfaction === rating}
                    disabled={!isRunning}
                    style={{
                      padding: "0.25rem",
                      borderRadius: 4,
                      border: "none",
                      background: "transparent",
                      cursor: isRunning ? "pointer" : "not-allowed",
                      opacity: isRunning ? 1 : 0.5,
                      color: satisfaction === rating ? "#f59e0b" : "var(--text-muted)",
                    }}
                  >
                    <Star
                      size={18}
                      fill={satisfaction === rating ? "#f59e0b" : "none"}
                      style={{ transition: "all 0.2s" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem" }}>
              {session?.success ? (
                <CheckCircle2 size={32} style={{ color: "#10b981", marginBottom: "0.5rem" }} />
              ) : (
                <AlertCircle size={32} style={{ color: "#f59e0b", marginBottom: "0.5rem" }} />
              )}
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
              {session?.success ? "Successful" : "Not successful"} · Result recorded
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Time: {session?.durationSeconds}s | Errors: {session?.errorsCount} | Satisfaction: {session?.satisfaction}/5
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function UserTestingSuite() {
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleStartTask = (taskId) => {
    setActiveTaskId(taskId);
    setToastMessage("Task timer started. Navigate to the section and complete the task.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCompleteTask = (time, success) => {
    setActiveTaskId(null);
    setToastMessage(`${success ? "Successful" : "Unsuccessful"} task recorded in ${time}s.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      {/* Overview Card */}
      <div
        className="card"
        style={{
          padding: "1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          background: "rgba(99, 102, 241, 0.05)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck size={24} style={{ color: "#6366f1" }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            Interactive 5-Task User Evaluation Suite
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            Complete structured usability tasks to measure task success rates, time-on-task, error counts, and user satisfaction.
            Start each task timer, navigate to the relevant section, and mark complete when done.
          </p>
        </div>
        {activeTaskId !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 999,
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              color: "#6366f1",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
            }}
          >
            Active Timer Running
          </motion.div>
        )}
      </div>

      {/* Task Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tasksData.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isActive={activeTaskId === task.id}
            isAnotherTaskActive={activeTaskId !== null && activeTaskId !== task.id}
            onStart={() => handleStartTask(task.id)}
            onComplete={handleCompleteTask}
          />
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              padding: "1rem 1.5rem",
              borderRadius: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              zIndex: 10000,
            }}
          >
            <p style={{ fontSize: "0.875rem", color: "var(--text-primary)" }}>{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
