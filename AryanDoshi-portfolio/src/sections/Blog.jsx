import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { blogPosts } from "../data/content";
import { FiSearch, FiClock, FiTag, FiX, FiArrowLeft } from "react-icons/fi";

// Parse simple markdown-ish text to React elements
function PostContent({ text }) {
  const lines = text.trim().split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <h3 key={i} style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.5rem", marginTop: i > 0 ? "1.5rem" : 0 }}>
          {line.slice(2, -2)}
        </h3>
      );
    } else if (line.trim() === "") {
      elements.push(<br key={i} />);
    } else {
      // inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "0.6rem" }}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={j} style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    }
    i++;
  }
  return <div>{elements}</div>;
}

// Post modal
function PostModal({ post, onClose }) {
  return (
    <AnimatePresence>
      {post && (
        <>
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
            style={{ textAlign: "left" }}
          >
            {/* Close / back */}
            <button
              onClick={onClose}
              aria-label="Close post"
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: "none", border: "none", color: "var(--text-muted)",
                fontSize: "0.85rem", cursor: "pointer", marginBottom: "1.25rem",
                fontFamily: "var(--font-sans)",
              }}
            >
              <FiArrowLeft size={15} /> Back to blog
            </button>

            {/* Tags + read time */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem", alignItems: "center" }}>
              {post.tags.map((t) => (
                <span key={t} className="pill" style={{ fontSize: "0.7rem" }}>{t}</span>
              ))}
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <FiClock size={12} /> {post.readTime}
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(1.15rem, 3vw, 1.6rem)", fontWeight: 800, lineHeight: 1.3, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              {post.title}
            </h2>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "1.5rem" }}>
              {post.date} · by Aryan Doshi
            </p>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <PostContent text={post.content} />
            </div>

            <button onClick={onClose} style={{ marginTop: "2rem" }} className="btn-outline">
              <FiX size={14} /> Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Blog card
function BlogCard({ post, index, onClick }) {
  const [ref, visible] = useInView({ threshold: 0.1 });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card"
      style={{ padding: "1.5rem", cursor: "pointer", display: "flex", flexDirection: "column", gap: "0.75rem" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Read: ${post.title}`}
      whileHover={{ y: -4 }}
      component="article"
    >
      {/* Tags row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {post.tags.map((t) => (
          <span key={t} className="pill" style={{ fontSize: "0.68rem" }}>{t}</span>
        ))}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.4, color: "var(--text-primary)" }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
          {post.date}
        </span>
        <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <FiClock size={12} /> {post.readTime}
        </span>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const [ref, visible] = useInView({ threshold: 0.05 });
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [openPost, setOpenPost] = useState(null);

  const allTags = useMemo(() => [...new Set(blogPosts.flatMap((p) => p.tags))], []);

  const filtered = useMemo(() =>
    blogPosts.filter((p) => {
      const matchQ = query === "" || p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchTag = !activeTag || p.tags.includes(activeTag);
      return matchQ && matchTag;
    }), [query, activeTag]);

  return (
    <section id="blog" style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 380, height: 380, top: "20%", right: "5%", background: "radial-gradient(circle, rgba(0,217,255,0.07), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref}>
        <motion.p className="section-subtitle" initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "0.75rem" }}>
          // writing
        </motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: "2rem" }}>
          Blog &amp; <span className="gradient-text">Articles</span>
        </motion.h2>

        {/* Search + tag filter */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: 440 }}>
            <FiSearch size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              aria-label="Search blog posts"
              className="form-input"
              style={{ paddingLeft: "2.5rem" }}
            />
          </div>

          {/* Tag chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <FiTag size={12} />
            </span>
            <button
              onClick={() => setActiveTag(null)}
              style={{
                padding: "0.25rem 0.75rem", borderRadius: 999, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                background: !activeTag ? "var(--accent-dim)" : "var(--bg-card)",
                border: !activeTag ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                color: !activeTag ? "var(--accent)" : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  padding: "0.25rem 0.75rem", borderRadius: 999, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                  background: activeTag === tag ? "var(--accent-dim)" : "var(--bg-card)",
                  border: activeTag === tag ? "1px solid var(--border-accent)" : "1px solid var(--border)",
                  color: activeTag === tag ? "var(--accent)" : "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem 0" }}>No posts match your search.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} onClick={() => setOpenPost(post)} />
            ))}
          </div>
        )}
      </div>

      {/* Post modal */}
      <PostModal post={openPost} onClose={() => setOpenPost(null)} />
    </section>
  );
}
