import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LogoLoop from './components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiCplusplus, SiArduino, SiFramer, SiNodedotjs } from 'react-icons/si';
import './index.css';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org" },
  { node: <SiArduino />, title: "Arduino", href: "https://www.arduino.cc" },
  { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
];

function App() {

  // Custom Parallax Mouse Tracker
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Update global CSS variables for the background parallax
      document.documentElement.style.setProperty('--mouse-x', `${x}`);
      document.documentElement.style.setProperty('--mouse-y', `${y}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-container comic-cursor">
      {/* Dynamic Background Parallax Layer */}
      <div className="spider-parallax-bg"></div>

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <div style={{ height: '150px', position: 'relative', overflow: 'hidden', margin: '2rem 0', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={50}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          ariaLabel="Technology partners"
        />
      </div>
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
