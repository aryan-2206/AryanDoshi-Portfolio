import { motion, useMotionValue } from "framer-motion";
import React, { useRef } from "react";
import { useEffect } from "react";
import cpimg from "../assets/cpimg.svg";
export default function Skills() {

const skills = [
  //c,c++,python,java,js,react,fastapi,tailwindcss,node,express,mongodb,sql,git,machine learning, deep learning, competitive programming
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", label: "C++"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", label: "Java"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", label: "FastAPI"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", label: "MySQL"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", label: "Machine Learning"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", label: "Deep Learning"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeforces/codeforces-original.svg", label: "Competitive Programming"},
  // {icon: "cpimg.svg", label: "Competitive Programming"},
  {icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind CSS"}
]
const repeated = [...skills, ...skills]; //repeat skills to fill space
// icons moving left to right infinitely and coming back to start when they go out of view
// while scrolling down, move icons right to left and when scrolling up, move icons left to right
const [dir, setdir] = React.useState(-1); //this is right to left
// if skills section is visible , then this becomes true
const [active, setactive] = React.useState(false);
const sectionRef = useRef(null);
const trackref = useRef(null);
const touchY = useRef(null);
const x = useMotionValue(0); // for smooth motion  
// skill section visible or not
useEffect(() => {
  const el = sectionRef.current;
  if(!el) return;
  const io = new IntersectionObserver(([entry]) => {
    setactive(entry.isIntersecting && entry.intersectionRatio > 0.1);
  }
  , {threshold: [0.1]});
  io.observe(el);
  return () => io.disconnect();
  
}, []);
// move icons based on scroll direction
useEffect(() => {
  if(!active) return;
  const onWheel = (e) => {
    setdir(e.deltaY > 0 ? -1 : 1);
  }
  const onTouchStart = (e) => {
    touchY.current = e.touches[0].clientY;
  }
  const onTouchMove = (e) => {
    if(touchY.current == null) return;
    const deltaY = e.touches[0].clientY - touchY.current;
    setdir(deltaY > 0 ? -1 : 1);
    touchY.current = e.touches[0].clientY;
  }
  window.addEventListener("wheel", onWheel, {passive: true});
  window.addEventListener("touchstart", onTouchStart, {passive: true});
  window.addEventListener("touchmove", onTouchMove, {passive: true});
  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  }
}, [active]);

useEffect(() => {
  let id;
  let last = performance.now();
  const SPEED = 80; // adjust this for faster or slower speed
  const tick = (now) => {
    const dt = (now - last)/1000; // delta time in seconds
    last = now;
    let next = x.get() + dir * SPEED * dt; // calculate next position
    const loop = trackref.current?.scrollWidth / 2 || 0; // when to loop back
    if(loop) {
      if(next < -loop) next += loop; // loop back to start
      else if(next > 0) next -= loop; // loop back to end
    }
    x.set(next);
    id = requestAnimationFrame(tick);
  }
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}
, [dir, x]);



  return (
    <section id="skills" 
    ref = {sectionRef}
    className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* //glowing blocks */}
        <div className="absolute top-1/4 left-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute right-1/4 bottom-0 w-75 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"></div>
      </div>
      <motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
      initial={{opacity: 0, y: -30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay:0.1}}
      >
        My Skills
      </motion.h2>
      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
      initial={{opacity: 0, y: -10}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, delay:0.1}}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
      <motion.div
      ref = {trackref}
      className="flex gap-10 text-6xl text-[#1cd8d2]"
      style={{x, whiteSpace: "nowrap", willChange: "transform"}}
      >

        {repeated.map((skill, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-30"
          aria-label={skill.label}
          title={skill.label}
          >
            <span className="hover:scale-125 transition-transform duration-300">
              <img src={skill.icon} alt={skill.label} className="w-15 h-15 object-contain"/>
            </span>
            <p className="text-sm">
              {skill.label}
            </p>
          </div>
        ))}

      </motion.div>
      </div>
    </section>
  )
}