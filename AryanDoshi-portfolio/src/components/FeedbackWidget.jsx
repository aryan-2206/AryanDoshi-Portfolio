import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMessageSquare, FiX, FiStar } from "react-icons/fi";

const STORAGE_KEY = "portfolio_feedback";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (rating === 0) return;
    const entry = {
      rating,
      comment,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    // Store in localStorage array (retrieve via DevTools > Application > LocalStorage)
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <div className="feedback-widget">
      {/* Toggle button */}
      <motion.button
        onClick={() => { setOpen((v) => !v); setSubmitted(false); setRating(0); setComment(""); }}
        aria-label="Give feedback on this portfolio"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--bg-2)",
          border: "1px solid var(--border-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
          cursor: "pointer",
          boxShadow: "var(--accent-glow)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {open ? <FiX size={18} /> : <FiMessageSquare size={18} />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 12px)",
              left: 0,
              width: 280,
              background: "var(--bg-2)",
              border: "1px solid var(--border-accent)",
              borderRadius: 16,
              padding: "1.25rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), var(--accent-glow)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
                <p style={{ fontWeight: 700, color: "var(--text-primary)" }}>Thanks for your feedback!</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                  Your response has been recorded.
                </p>
              </div>
            ) : (
              <>
                <p style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                  How's this portfolio?
                </p>

                {/* Star rating */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      aria-label={`Rate ${star} out of 5`}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: star <= (hovered || rating) ? "#ffd60a" : "var(--border)",
                        fontSize: "1.4rem",
                        transition: "color 0.15s, transform 0.15s",
                        transform: star <= (hovered || rating) ? "scale(1.15)" : "scale(1)",
                        lineHeight: 1,
                        padding: "0.1rem",
                        minWidth: 44,
                        minHeight: 44,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FiStar
                        style={{
                          fill: star <= (hovered || rating) ? "#ffd60a" : "none",
                          stroke: star <= (hovered || rating) ? "#ffd60a" : "var(--text-muted)",
                        }}
                        size={22}
                      />
                    </button>
                  ))}
                </div>

                {/* Comment */}
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Any thoughts? (optional)"
                  aria-label="Feedback comment"
                  rows={3}
                  style={{
                    width: "100%",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "0.6rem 0.75rem",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    resize: "none",
                    fontFamily: "var(--font-sans)",
                    marginBottom: "0.75rem",
                  }}
                />

                <button
                  onClick={submit}
                  disabled={rating === 0}
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    background: rating > 0 ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--bg-3)",
                    border: "none",
                    borderRadius: 10,
                    color: rating > 0 ? "#000" : "var(--text-muted)",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: rating > 0 ? "pointer" : "not-allowed",
                    transition: "background 0.2s",
                  }}
                >
                  Submit Feedback
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
