// footer section

import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  //linkedin, github, email, instagram ,leetcode, codechef, codeforces
  {Icon : FaLinkedin, link: "https://www.linkedin.com/in/aryandoshi2206", label: "LinkedIn"},
  {Icon : FaGithub, link: "https://www.github.com/aryan-2206", label: "GitHub"},
  {Icon : FaEnvelope, link: "mailto:aryandoshi22@gmail.com", label: "Email"},
  {Icon : FaInstagram, link: "https://www.instagram.com/aryandoshi_/", label: "Instagram"},
]
// we create the same glow variants as in home section for icons

const glowVariants = {
  initial: {scale:1, y:0, filter : "drop-shadow(0 0 10px rgba(0,0,0,0))"},
  hover: {
    scale:1.2, y: -3,
    filter: "drop-shadow(0 0 8px rgba(213,88,204,0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
    transition: {type: "spring", stiffness: 300, damping: 15}
  },
  tap: {scale : 0.95, y:0, transition: {duration: 0.08}}
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />
      <motion.div className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      >
        <h1 className="font-semibold leading-none text-white text-center select-none"
        style={{
          fontSize:"clamp(3rem,5vw,14rem)",
          letterSpacing:"0.02em",
          lineHeight:0.9,
          padding:"0 3vw",
          whiteSpace:"nowrap",
          textShadow:"0 2px 18px rgba(0,0,0,0.45)"
        }}
        >Aryan Doshi</h1>
        <div className="h-0.75 w-24 md:w-32 rounded-full bg-linear-to-r from-[#0d58cc] via-cyan-300 to-emerald-400"/>
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({Icon, label, link}) => (
            <motion.a 
              key={label}
              aria-label={label}
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="relative group text-gray-300 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 text-sm rounded-md bg-white text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {label}
              </span>
            </motion.a>
          ))}

        </div>
        <p className="text-gray-300 italic max-w-xl">"Success is when preparation meets opportunity."</p>
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Aryan Doshi. All rights reserved.</p>
      </motion.div>


    </footer>
  )
}