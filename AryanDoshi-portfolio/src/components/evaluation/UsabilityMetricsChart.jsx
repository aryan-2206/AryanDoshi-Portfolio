import { useUsabilityStore } from "../../hooks/useUsabilityStore";
import tasksData from "../../data/usabilityTasks.json";
import { CheckCircle, Clock, Award, AlertCircle } from "lucide-react";

export default function UsabilityMetricsChart() {
  const { stats, susScore, susGrade, taskSessions } = useUsabilityStore();

  const completedTasks = Object.values(taskSessions).filter((t) => t.completed);
  const tasksWithinTarget = completedTasks.filter((t) => {
    const task = tasksData.find((task) => task.id === t.id);
    return task && t.durationSeconds <= task.estimatedTimeSeconds;
  });

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {/* Task Success Rate */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <CheckCircle size={20} style={{ color: "#10b981" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Task Success Rate
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            {stats.successRate == null ? "—" : `${Math.round(stats.successRate)}%`}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {stats.successfulCount} successful of {stats.recordedOutcomeCount} recorded tasks
          </div>
        </div>

        {/* Average Time on Task */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Clock size={20} style={{ color: "#6366f1" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Avg Time on Task
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            {stats.avgTime > 0 ? `${Math.round(stats.avgTime)}s` : "-"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Baseline expected: &lt; 25s
          </div>
        </div>

        {/* SUS Score */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <Award size={20} style={{ color: "#a855f7" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Usability (SUS)
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: susGrade.color, marginBottom: "0.25rem" }}>
            {susScore !== null ? susScore : "-"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Benchmark: 68.0
            {susScore !== null && (
              <span style={{ marginLeft: "0.5rem", color: susScore >= 68 ? "#10b981" : "#ef4444" }}>
                ({susScore >= 68 ? "+" : ""}{Math.round((susScore - 68) / 68 * 100)}%)
              </span>
            )}
          </div>
        </div>

        {/* User Satisfaction */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <AlertCircle size={20} style={{ color: "#f59e0b" }} />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              User Satisfaction
            </span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            {stats.avgSatisfaction !== null ? `${stats.avgSatisfaction.toFixed(1)}` : "-"}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Avg / 5.0 · Cognitive friction errors: {stats.totalErrors}
          </div>
        </div>
      </div>

      {/* Task Completion Time vs Estimated Target */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
          Task Completion Time vs Estimated Target (Seconds)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tasksData.map((task) => {
            const session = taskSessions[task.id];
            const actualTime = session?.durationSeconds;
            const targetTime = task.estimatedTimeSeconds;
            const percentage = actualTime ? Math.min((actualTime / targetTime) * 100, 100) : 0;
            const isWithinTarget = actualTime && actualTime <= targetTime;

            return (
              <div key={task.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                    {task.id}. {task.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-mono)",
                      color: actualTime ? (isWithinTarget ? "#10b981" : "#ef4444") : "var(--text-muted)",
                    }}
                  >
                    {actualTime ? `${actualTime}s / ${targetTime}s` : "Pending"}
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    borderRadius: 4,
                    background: "var(--bg-3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: actualTime ? `${percentage}%` : "0%",
                      background: isWithinTarget
                        ? "linear-gradient(90deg, #10b981, #34d399)"
                        : "linear-gradient(90deg, #ef4444, #f87171)",
                      borderRadius: 4,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {tasksWithinTarget.length} of {completedTasks.length} recorded tasks met their target time
        </div>
      </div>
    </div>
  );
}
