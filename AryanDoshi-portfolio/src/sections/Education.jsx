// now making a proper education section, with timeline and all that like when user scrolls, the education window should be highlighted and the timeline should move accordingly, also add some animations and stuff, like the education line loads when user scroll up and down and cards load accordingly
// total three educations, school, junior college and btech college
// gokuldham high school (1st to 10th standard - 2012 to 2022, grade 92.83% icse), then prakash clg of commerce and science (2022-2024, grade 87.83% hsc) and veermata jijabai technological institute (2024-2028, currently in 3rd year, grade 8.53 cgpa till now) and add some animations and stuff, like the education line loads when user scroll up and down and cards load accordingly

import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { motion, useTransform, useMotionValue, useScroll } from "framer-motion";
import { useMemo } from "react";

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
    courses: ['Data Structures And Algorithms', 'Database Management', 'Operating Systems', 'Artificial Intelligence', 'Linear Algebra', 'Discrete Mathematics', 'Linux']
  }
];

function EducationItem({edu, idx, start, end, scrollYProgress, layout}) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [idx%2===0?30:-30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]); //for mobile
  if(layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        {/* //glowing circle */}
        <motion.div className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.1)]"
        style={{scale, opacity}}
        >
        </motion.div>
        {/* vertical line */}
        <motion.div className={`absolute ${idx === 0 ? '-top-8' : '-bottom-8'} w-[3px] bg-white/40`}
        style={{height: 40, opacity}}
        >
        </motion.div>
        <motion.article className={`absolute ${idx%2 === 0? "bottom-12": "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
        style={{opacity, y, maxWidth: "90vw"}}
        transition={{duration: 0.4, delay: idx*0.15}}
        >
          <p className="text-sm text-blue-400 font-semibold">{edu.desc}</p>
          <h3 className="text-xl font-semibold">{edu.title}</h3>
          <p className="text-md text-gray-400">{edu.period}</p>
          <p className="text-lg font-bold text-blue-400">{edu.grade}</p>
          <ul className="mt-1 space-y-2">
            {edu.courses.map((course, i) => (
              <li key={i} className="flex items-center mb-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="-mb-2">{course}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    )
  }
  // mobile layout
  return (
    <div className="relative flex items-start">
      <motion.div className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.1)]"
      style={{scale, opacity}}
      >

      </motion.div>
      <motion.article className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
      style={{opacity, x}}
      transition={{duration: 0.4, delay: idx*0.15}}
      >
        <p className="text-sm text-blue-400 font-semibold break-words">{edu.desc}</p>
        <h3 className="text-lg font-semibold break-words">{edu.title}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">{edu.period}</p>
        <p className="text-md font-bold text-blue-400">{edu.grade}</p>
        <ul className="mt-4 space-y-2">
          {edu.courses.map((course, i) => (
            <li key={i} className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="-mb-2">{course}</span>
            </li>
          ))}
        </ul> 
      </motion.article>
    </div>
  )
}

export default function Education() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 160*educations.length : 120*educations.length; //each education takes 100vh, for mobile 160vh
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => educations.map((_, i) => (i+1)/educations.length), []);
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="education" className="relative bg-black text-white">
      <div ref={sectionRef}
      style={{height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh"}}
      className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Education</h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left "
                style={{width: lineSize}}
                ></motion.div>
                </div>
                {/* mapping education cards */}
                <div className="relative flex justify-between mt-0">
                  {educations.map((edu, i) => (
                    <EducationItem
                    key={i}
                    edu={edu}
                    idx={i}
                    start={i === 0 ? 0: thresholds[i-1]}
                    end={thresholds[i]}
                    scrollYProgress={scrollYProgress}
                    layout="desktop"
                    />
                  )
                  )}
                </div>
              </div>
            )}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top "
                style={{height: lineSize}}
                >

                </motion.div>
                </div>
                <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                  {educations.map((edu, i) => (
                    <EducationItem
                    key={i}
                    edu={edu}
                    idx={i}
                    start={i === 0 ? 0: thresholds[i-1]}
                    end={thresholds[i]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </section>
  )
}