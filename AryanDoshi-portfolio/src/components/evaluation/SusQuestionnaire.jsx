import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useUsabilityStore, SUS_QUESTIONS } from "../../hooks/useUsabilityStore";
import { useToast } from "../common/Toast";
import confetti from "canvas-confetti";

export default function SusQuestionnaire() {
  const { susAnswers, susScore, susGrade, updateSusAnswer } = useUsabilityStore();
  const { addToast } = useToast();
  const [completedCount, setCompletedCount] = useState(0);
  const [hasConfetti, setHasConfetti] = useState(false);

  useEffect(() => {
    const count = Object.values(susAnswers).filter((v) => v !== null && v !== undefined).length;
    setCompletedCount(count);

    if (count === 10 && !hasConfetti) {
      setHasConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      addToast("SUS Questionnaire Complete! Score calculated.", "success", 3000);
    }
  }, [susAnswers, hasConfetti, addToast]);

  const handleAnswer = (questionIndex, value) => {
    updateSusAnswer(questionIndex, value);
  };

  const percentage = susScore !== null ? susScore : 0;
  const isAboveBenchmark = susScore !== null && susScore >= 68;

  return (
    <div>
      <div
        className="card"
        style={{
          padding: "1.5rem",
          marginBottom: "2rem",
          background: "linear-gradient(135deg, var(--accent-dim), rgba(99, 102, 241, 0.1))",
          border: "1px solid var(--border-accent)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <Award size={24} style={{ color: "var(--accent)" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Live System Usability Scale (SUS) Score
              </h3>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              The SUS questionnaire (Brooke, 1996) is a 10-item scale for measuring usability. 
              Items 1, 3, 5, 7, 9 are positive statements; items 2, 4, 6, 8, 10 are negative (inverted).
            </p>
            <p style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--accent)", background: "var(--bg-3)", padding: "0.4rem 0.6rem", borderRadius: 6, display: "inline-block" }}>
              Formula: ((Sum of Odd - 5) + (25 - Sum of Even)) × 2.5
            </p>
          </div>

          <div
            style={{
              padding: "1.25rem",
              borderRadius: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              minWidth: "200px",
              textAlign: "center"
            }}
          >
            <p style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              Score
            </p>
            <p style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "var(--font-mono)", color: susScore !== null ? susGrade.color : "var(--text-muted)", marginBottom: "0.25rem" }}>
              {susScore !== null ? susScore : "--"}
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              / 100
            </p>
            {susGrade.grade && (
              <span
                style={{
                  display: "inline-block",
                  padding: "0.3rem 0.8rem",
                  borderRadius: 999,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  background: `${susGrade.color}20`,
                  color: susGrade.color,
                  border: `1px solid ${susGrade.color}40`
                }}
              >
                Grade: {susGrade.grade}
              </span>
            )}
            {susGrade.label && (
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                {susGrade.label}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
          Progress: {completedCount} of 10 items completed
        </p>
        
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              height: "8px",
              borderRadius: 4,
              background: "var(--bg-3)",
              overflow: "hidden",
              position: "relative"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(completedCount / 10) * 100}%`,
                background: "linear-gradient(90deg, var(--accent), #818cf8)",
                borderRadius: 4,
                transition: "width 0.3s ease"
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "68%",
                top: "0",
                bottom: "0",
                width: "2px",
                background: "#f59e0b",
                zIndex: 1
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <span>0 (Unacceptable)</span>
          <span style={{ color: "#f59e0b" }}>Industry Average: 68.0</span>
          <span style={{ color: "#10b981" }}>Target Grade A+: &gt; 85.0</span>
          <span>100 (Perfect)</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {SUS_QUESTIONS.map((question) => {
          const isOdd = question.id % 2 === 1;
          const isAnswered = susAnswers[question.id] !== null && susAnswers[question.id] !== undefined;

          return (
            <div
              key={question.id}
              className="card"
              style={{
                padding: "1.25rem",
                border: isAnswered ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                background: isAnswered ? "var(--accent-dim)" : "var(--bg-card)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span
                      style={{
                        padding: "0.2rem 0.5rem",
                        borderRadius: 4,
                        fontSize: "0.7rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        background: isOdd ? "rgba(16, 185, 129, 0.2)" : "rgba(249, 115, 22, 0.2)",
                        color: isOdd ? "#10b981" : "#f97316"
                      }}
                    >
                      {isOdd ? "Positive Statement (Odd)" : "Negative Inverted (Even)"}
                    </span>
                    {isAnswered && (
                      <span
                        style={{
                          padding: "0.2rem 0.5rem",
                          borderRadius: 4,
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          background: "var(--bg-3)",
                          color: "var(--text-muted)"
                        }}
                      >
                        Answered ({susAnswers[question.id]})
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
                    {question.id}. {question.text}
                  </p>
                </div>
              </div>

              <div
                role="radiogroup"
                aria-label={`SUS Question ${question.id}`}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}
              >
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Strongly Disagree</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    role="radio"
                    onClick={() => handleAnswer(question.id, value)}
                    aria-label={`Rate ${value}: ${value === 1 ? 'Strongly Disagree' : value === 5 ? 'Strongly Agree' : value}`}
                    aria-checked={susAnswers[question.id] === value}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: susAnswers[question.id] === value
                        ? "var(--accent-dim)" 
                        : "var(--bg-3)",
                      color: susAnswers[question.id] === value
                        ? "var(--accent)" 
                        : "var(--text-muted)",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {value}
                  </button>
                ))}
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Strongly Agree</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
