import React, { useRef, useEffect, useMemo } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

const educations = [
  {
    desc: "Schooling",
    title: "Gokuldham High School & Junior College",
    period: "2012 - 2022",
    grade: "92.83% (ICSE)",
    courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'Social Studies']
  },
  {
    desc: "Higher Secondary Education",
    title: "Prakash College of Commerce and Science",
    period: "2022 - 2024",
    grade: "87.83% (HSC)",
    courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science']
  },
  {
    desc: "Undergraduate Education",
    title: "Veermata Jijabai Technological Institute",
    period: "B.Tech in Computer Engineering | 2024 - 2028",
    grade: "8.53 CGPA (Currently in 3rd Year)",
    courses: ['Data Structures And Algorithms', 'DBMS', 'Operating Systems', 'Artificial Intelligence', 'Linear Algebra', 'Discrete Mathematics', 'Linux']
  }
];

/* ── Coursework pills — two size variants ── */
function CoursePills({ courses, compact = false }) {
  return (
    <div className={compact ? "mt-2" : "mt-3"}>
      <span className={`${compact ? "text-[9px]" : "text-xs"} text-gray-400 uppercase tracking-widest font-semibold`}>
        Coursework
      </span>
      <div className={`flex flex-wrap ${compact ? "gap-1 mt-1" : "gap-1.5 mt-1.5"}`}>
        {courses.map((course, i) => (
          <span
            key={i}
            className={
              compact
                ? "text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-medium"
                : "text-xs px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-medium"
            }
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   DESKTOP CARD
   ══════════════════════════════════════
   3-keyframe transforms guarantee:
   • Scroll DOWN → cards appear left-to-right
   • Scroll UP   → cards disappear right-to-left
   • Card 0 vanishes exactly when section un-sticks (start=0)

   FIX: removed maxWidth:"28vw" (was squeezing cards on mid-size screens
   and pushing them taller, causing overflow-clip on the sticky container).
   FIX: sticky container no longer has overflow-hidden (which was clipping
   the 3rd card that extends above the timeline row).
*/
function DesktopCard({ edu, idx, start, end, scrollYProgress }) {
  const enterY = idx % 2 === 0 ? 44 : -44;

  const opacity = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);
  const y       = useTransform(scrollYProgress, [start, end, 1], [enterY, 0, 0]);
  const scale   = useTransform(scrollYProgress, [start, end, 1], [0.86, 1, 1]);

  return (
    <div className="relative flex flex-1 justify-center items-center min-w-0">
      {/* Glowing dot */}
      <motion.div
        className="z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_14px_5px_rgba(255,255,255,0.5)]"
        style={{ scale, opacity }}
      />
      {/* Vertical connector to card */}
      <motion.div
        className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-0.75 bg-white/40 rounded`}
        style={{ height: 36, opacity }}
      />
      {/* Card — fixed 300px, no vw clamping that could squish it */}
      <motion.article
        className={`absolute ${idx % 2 === 0 ? "bottom-12" : "top-12"} bg-gray-900/85 backdrop-blur-md border border-gray-700/60 rounded-2xl p-6 w-75 shadow-xl`}
        style={{ opacity, y, scale }}
      >
        <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{edu.desc}</p>
        <h3 className="text-base font-bold mt-1 leading-snug">{edu.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{edu.period}</p>
        <p className="text-sm font-bold text-blue-300 mt-1">{edu.grade}</p>
        <CoursePills courses={edu.courses} />
      </motion.article>
    </div>
  );
}

/* ══════════════════════════════════════
   MOBILE STICKY CARD
   ══════════════════════════════════════
   Scroll-progress driven (same 3-keyframe pattern as desktop).
   Cards start invisible (opacity=0, scale=0.94, x=-18) so they don't
   cause layout overflow even though they exist in normal flow.
   The tiny compact size ensures all 3 fit in h-screen.
*/
function MobileStickyCard({ edu, start, end, scrollYProgress }) {
  const opacity  = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);
  const x        = useTransform(scrollYProgress, [start, end, 1], [-18, 0, 0]);
  const scale    = useTransform(scrollYProgress, [start, end, 1], [0.94, 1, 1]);
  const dotScale = useTransform(scrollYProgress, [start, end, 1], [0, 1, 1]);

  return (
    <div className="relative flex items-start">
      {/* Timeline dot */}
      <motion.div
        className="absolute -left-5.75 top-3 z-10 w-5 h-5 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.5)] shrink-0"
        style={{ scale: dotScale, opacity }}
      />
      {/* Card */}
      <motion.article
        className="bg-gray-900/85 backdrop-blur-md border border-gray-700/60 rounded-xl p-3 w-full shadow-lg"
        style={{ opacity, x, scale }}
      >
        <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider leading-none">{edu.desc}</p>
        <h3 className="text-[13px] font-bold mt-1 leading-snug">{edu.title}</h3>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{edu.period}</p>
        <p className="text-xs font-bold text-blue-300 mt-0.5">{edu.grade}</p>
        <CoursePills courses={edu.courses} compact />
      </motion.article>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════ */
export default function Education() {
  const sectionRef = useRef(null);

  // Initialise from window immediately to avoid height flash on mobile
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const n = educations.length;

  // Mobile gets 100vh per card; desktop 120vh per card
  const SCENE_HEIGHT_VH = isMobile ? 100 * n : 120 * n;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Cards appear sequentially in the first 50% of scroll:
  //   card 0 → [0,     0.167]
  //   card 1 → [0.167, 0.333]
  //   card 2 → [0.333, 0.5  ]
  // After 0.5 all cards stay visible (hold time).
  // On the way back up they vanish right-to-left automatically. ✓
  const thresholds = useMemo(() =>
    educations.map((_, i) => ({
      start: i * (0.5 / n),
      end:   (i + 1) * (0.5 / n),
    })), [n]);

  // Desktop horizontal line: fills 0→100% in sync with cards appearing,
  // retracts right-to-left on scroll up.
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"], { clamp: true });

  // Mobile vertical line: same timing
  const mobileLineScaleY = useTransform(scrollYProgress, [0, 0.5], [0, 1], { clamp: true });

  return (
    <section id="education" className="relative bg-black text-white">
      <div
        ref={sectionRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        {/*
          IMPORTANT: NO overflow-hidden on the sticky container.
          Desktop cards are absolutely positioned above/below the timeline row and
          overflow-hidden was clipping the 3rd card (VJTI). Cards start at opacity=0
          so they're invisible before their animation window — no clipping needed.
        */}
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-6 text-center">Education</h2>

          <div className="flex flex-1 items-center justify-center px-4 pb-8">

            {/* ══ DESKTOP ══ */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                {/* Horizontal timeline track */}
                <div className="relative h-1.25 bg-white/15 rounded overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-1.25 bg-white rounded"
                    style={{ width: lineWidth }}
                  />
                </div>
                {/* Cards */}
                <div className="relative flex justify-between">
                  {educations.map((edu, i) => (
                    <DesktopCard
                      key={i}
                      edu={edu}
                      idx={i}
                      start={thresholds[i].start}
                      end={thresholds[i].end}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ══ MOBILE (sticky, cards appear one-by-one via scroll progress) ══ */}
            {isMobile && (
              <div className="relative w-full max-w-sm">
                {/* Vertical timeline track */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/15 rounded overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-white rounded origin-top"
                    style={{ scaleY: mobileLineScaleY, height: "100%" }}
                  />
                </div>

                {/* Cards — in normal flow but start invisible; compact to fit h-screen */}
                <div className="ml-8 flex flex-col gap-3">
                  {educations.map((edu, i) => (
                    <MobileStickyCard
                      key={i}
                      edu={edu}
                      idx={i}
                      start={thresholds[i].start}
                      end={thresholds[i].end}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}