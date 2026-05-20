import Navbar from "./components/Navbar"
import Home from "./sections/Home"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Education from "./sections/Education"
import Footer from "./sections/Footer"
import Achievements from "./sections/Achievements"
import Contact from "./sections/Contact"
import Projects from "./sections/Projects"
import ParticlesBackground from "./components/ParticlesBackground"
import CustomCursor from "./components/CustomCursor"
import IntroAnimations from "./components/IntroAnimations"
import { useState } from "react"

export default function App() {

  const [introFinished, setIntroFinished] = useState(false);

  return (
  <>
    {!introFinished && <IntroAnimations onFinish={() => setIntroFinished(true)}></IntroAnimations>}
    {introFinished && (

    // <div className="bg-black">
    <div className="relative gradient text-white">
      <CustomCursor></CustomCursor>
      {/* <ParticlesBackground></ParticlesBackground> */}
      <Navbar/>
      <Home></Home>
      <About></About>
      <Education></Education>
      <Skills></Skills>
      <Projects></Projects>
      <Achievements></Achievements>
      <Contact></Contact>
      <Footer></Footer>
    </div>
    )}
  </>
  )
}