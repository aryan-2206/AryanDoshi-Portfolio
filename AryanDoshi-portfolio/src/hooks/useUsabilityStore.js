import { create } from "zustand";
import { persist } from "zustand/middleware";

const TOTAL_TASKS = 5;

export const SUS_QUESTIONS = [
  { id: 1, text: "I think that I would like to use this system frequently.", type: "positive" },
  { id: 2, text: "I found the system unnecessarily complex.", type: "negative" },
  { id: 3, text: "I thought the system was easy to use.", type: "positive" },
  { id: 4, text: "I think that I would need the support of a technical person to be able to use this system.", type: "negative" },
  { id: 5, text: "I found the various functions in this system were well integrated.", type: "positive" },
  { id: 6, text: "I thought there was too much inconsistency in this system.", type: "negative" },
  { id: 7, text: "I would imagine that most people would learn to use this system very quickly.", type: "positive" },
  { id: 8, text: "I found the system very cumbersome to use.", type: "negative" },
  { id: 9, text: "I felt very confident using the system.", type: "positive" },
  { id: 10, text: "I needed to learn a lot of things before I could get going with this system.", type: "negative" },
];

function calculateSusScore(answers) {
  if (SUS_QUESTIONS.some(({ id }) => answers[id] == null)) return null;

  const contribution = SUS_QUESTIONS.reduce((sum, { id }) => {
    const rating = answers[id];
    return sum + (id % 2 === 1 ? rating - 1 : 5 - rating);
  }, 0);

  return Math.round(contribution * 2.5 * 10) / 10;
}

function getSusGrade(score) {
  if (score === null) return { grade: "Pending", label: "Awaiting responses", color: "#9ca3af" };
  if (score >= 85.5) return { grade: "A+", label: "Best Imaginable (Excellent)", color: "#10b981" };
  if (score >= 80.3) return { grade: "A", label: "Excellent", color: "#34d399" };
  if (score >= 74) return { grade: "B", label: "Good", color: "#60a5fa" };
  if (score >= 68) return { grade: "C", label: "Average / OK (Benchmark)", color: "#facc15" };
  if (score >= 51) return { grade: "D", label: "Poor", color: "#fb923c" };
  return { grade: "F", label: "Awful", color: "#ef4444" };
}

function deriveMetrics(susAnswers, taskSessions) {
  const susScore = calculateSusScore(susAnswers);
  const completedTasks = Object.values(taskSessions).filter((task) => task.completed);
  const tasksWithOutcome = completedTasks.filter((task) => typeof task.success === "boolean");
  const successfulTasks = tasksWithOutcome.filter((task) => task.success);

  return {
    susScore,
    susGrade: getSusGrade(susScore),
    stats: {
      completionRate: (completedTasks.length / TOTAL_TASKS) * 100,
      successRate: tasksWithOutcome.length
        ? (successfulTasks.length / tasksWithOutcome.length) * 100
        : null,
      completedCount: completedTasks.length,
      recordedOutcomeCount: tasksWithOutcome.length,
      successfulCount: successfulTasks.length,
      totalTasks: TOTAL_TASKS,
      avgTime: completedTasks.length
        ? completedTasks.reduce((sum, task) => sum + (task.durationSeconds || 0), 0) / completedTasks.length
        : 0,
      totalErrors: completedTasks.reduce((sum, task) => sum + (task.errorsCount || 0), 0),
      avgSatisfaction: completedTasks.length && completedTasks.every((task) => task.satisfaction != null)
        ? completedTasks.reduce((sum, task) => sum + task.satisfaction, 0) / completedTasks.length
        : null,
    },
  };
}

export const useUsabilityStore = create(
  persist(
    (set, get) => ({
      susAnswers: {},
      taskSessions: {},
      ...deriveMetrics({}, {}),

      updateSusAnswer: (questionId, rating) => {
        const susAnswers = { ...get().susAnswers, [questionId]: rating };
        set({ susAnswers, ...deriveMetrics(susAnswers, get().taskSessions) });
      },

      updateTaskSession: (taskId, updates) => {
        const taskSessions = {
          ...get().taskSessions,
          [taskId]: { ...get().taskSessions[taskId], id: taskId, ...updates },
        };
        set({ taskSessions, ...deriveMetrics(get().susAnswers, taskSessions) });
      },

      resetAllData: () => set({
        susAnswers: {},
        taskSessions: {},
        ...deriveMetrics({}, {}),
      }),
    }),
    {
      name: "aryan_portfolio_usability_v1",
      partialize: ({ susAnswers, taskSessions }) => ({ susAnswers, taskSessions }),
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...persistedState };
        return { ...merged, ...deriveMetrics(merged.susAnswers, merged.taskSessions) };
      },
    },
  ),
);
