import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          404 · PAGE NOT FOUND
        </p>
        <h1
          style={{
            fontSize: "clamp(5rem, 15vw, 10rem)",
            fontWeight: 900,
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", maxWidth: 400 }}>
          Looks like this page doesn't exist. Let's get you back on track.
        </p>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            color: "#000",
            fontWeight: 700,
            borderRadius: 999,
            fontSize: "1rem",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          ← Go Home
        </a>
      </motion.div>
    </div>
  );
}
