import React from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { personal } from "../data/content";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import ParticlesBackground from "../components/ParticlesBackground";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const SOCIALS = [
  { Icon: FaLinkedin, label: "LinkedIn", link: personal.linkedin, color: "#0077b5" },
  { Icon: FaGithub, label: "GitHub", link: personal.github, color: "#e6edf3" },
  { Icon: FaEnvelope, label: "Email", link: `mailto:${personal.email}`, color: "#00d9ff" },
];

const TOPICS = [
  "Internship / Job opportunity",
  "Collaboration / project",
  "Research / paper discussion",
  "Feedback on this portfolio",
  "Other",
];

export default function Contact() {
  const [ref, visible] = useInView({ threshold: 0.1 });
  const [formData, setFormData] = React.useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Enter a valid email";
    if (!formData.topic) errs.topic = "Please select a topic";
    if (!formData.message.trim()) errs.message = "Message is required";
    else if (formData.message.trim().length < 10) errs.message = "Message is too short";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: formData.name,
        email: formData.email,
        service: formData.topic,
        message: formData.message,
      }, PUBLIC_KEY);
      setStatus("success");
      setFormData({ name: "", email: "", topic: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: "0.4rem",
    fontFamily: "var(--font-mono)",
  };

  const errStyle = {
    fontSize: "0.75rem",
    color: "var(--red)",
    marginTop: "0.3rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  };

  return (
    <section id="contact" style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}>
      <ParticlesBackground />
      <div className="orb" style={{ width: 350, height: 350, top: "20%", left: "5%", background: "radial-gradient(circle, rgba(0,217,255,0.08), transparent 70%)" }} />

      <div className="section-wrapper" ref={ref} style={{ position: "relative", zIndex: 2 }}>
        <motion.p className="section-subtitle" initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ marginBottom: "0.75rem" }}>
          // get_in_touch
        </motion.p>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} style={{ marginBottom: "0.75rem" }}>
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} style={{ color: "var(--text-muted)", marginBottom: "3rem", maxWidth: 520, lineHeight: 1.7 }}>
          Open to internship opportunities, research discussions, project collaborations, or just a good conversation about AI and backend systems.
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="contact-grid">
          {/* Left — info + socials */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                { label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { label: "Location", value: personal.location, href: null },
              ].map(({ label, value, href }) => (
                <div key={label} className="card" style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.3rem" }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem" }}>{value}</a>
                  ) : (
                    <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.95rem" }}>{value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Find me on</p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIALS.map(({ Icon, label, link, color }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="card"
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.65rem 1.1rem", borderRadius: 10,
                    color: color, fontWeight: 600, fontSize: "0.85rem",
                    transition: "all 0.2s",
                    minHeight: 44,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" style={labelStyle}>Your Name <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Aryan Doshi"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input${errors.name ? " error" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-err" : undefined}
                />
                {errors.name && <p id="name-err" style={errStyle} role="alert"><FiAlertCircle size={12} /> {errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" style={labelStyle}>Email Address <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input${errors.email ? " error" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
                {errors.email && <p id="email-err" style={errStyle} role="alert"><FiAlertCircle size={12} /> {errors.email}</p>}
              </div>

              {/* Topic */}
              <div>
                <label htmlFor="contact-topic" style={labelStyle}>Topic <span style={{ color: "var(--red)" }}>*</span></label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className={`form-input${errors.topic ? " error" : ""}`}
                  aria-invalid={!!errors.topic}
                  aria-describedby={errors.topic ? "topic-err" : undefined}
                >
                  <option value="">Select a topic…</option>
                  {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.topic && <p id="topic-err" style={errStyle} role="alert"><FiAlertCircle size={12} /> {errors.topic}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-msg" style={labelStyle}>Message <span style={{ color: "var(--red)" }}>*</span></label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={5}
                  placeholder="Write your message here…"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-input${errors.message ? " error" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "msg-err" : undefined}
                  style={{ resize: "vertical" }}
                />
                {errors.message && <p id="msg-err" style={errStyle} role="alert"><FiAlertCircle size={12} /> {errors.message}</p>}
              </div>

              {/* Status feedback */}
              {status === "success" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--green)", fontWeight: 600, fontSize: "0.9rem", background: "rgba(0,245,160,0.08)", border: "1px solid rgba(0,245,160,0.3)", borderRadius: 10, padding: "0.75rem 1rem" }} role="status">
                  <FiCheck size={18} /> Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--red)", fontWeight: 600, fontSize: "0.9rem", background: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 10, padding: "0.75rem 1rem" }} role="alert">
                  <FiAlertCircle size={18} /> Something went wrong. Please try again or email me directly.
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn-primary"
                style={{ justifyContent: "center", opacity: (status === "sending" || status === "success") ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
                whileHover={status === "idle" || status === "error" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : {}}
              >
                {status === "sending" ? (
                  <>Sending…</>
                ) : status === "success" ? (
                  <><FiCheck size={16} /> Sent!</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .contact-grid { grid-template-columns: 1fr 1.5fr !important; }
        }
      `}</style>
    </section>
  );
}