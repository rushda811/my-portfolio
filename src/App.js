import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./index.css";
import myPhoto from "./assets/myphoto.jpeg";

/* ===== Custom Cursor ===== */
const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <motion.div
        animate={{ x: pos.x - 12, y: pos.y - 12 }}
        className="fixed w-6 h-6 bg-purple-400 rounded-full pointer-events-none z-50 shadow-lg"
      />
      <motion.div
        animate={{ x: pos.x - 24, y: pos.y - 24 }}
        className="fixed w-12 h-12 border-2 border-purple-400 rounded-full pointer-events-none z-40 opacity-50 animate-pulse"
      />
    </>
  );
};

/* ===== Glow Text ===== */
const GlowText = ({ text, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-xl ${className}`}
  >
    {text}
  </span>
);

/* ===== Cinematic About Section ===== */
const About = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  // Heading zoom effect on scroll
  const headingScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  const headingScaleSpring = useSpring(headingScale, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-32 overflow-hidden bg-[#070311]">
      {/* Floating Glow Orbs */}
      <motion.div
        className="absolute top-[-8rem] left-[-6rem] w-[20rem] h-[20rem] bg-purple-700/30 rounded-full blur-[150px]"
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute bottom-[-8rem] right-[-6rem] w-[20rem] h-[20rem] bg-blue-600/30 rounded-full blur-[150px]"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />

      {/* Left Text */}
      <motion.div
        initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="md:w-1/2 z-10"
      >
        <motion.h2
          style={{ scale: headingScaleSpring , fontFamily: "'Bitcount Grid Double Ink', sans-serif" }}
          className="text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400"
        >
          <GlowText text="About Me"/>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-300 text-lg leading-relaxed max-w-lg"
        >
          Hello, I’m <span className="text-purple-400 font-semibold">Fathima Rushda</span> — a passionate
          <span className="text-cyan-400"> Full-Stack Developer </span>
          turning ideas into interactive web experiences. My designs combine 
          <span className="text-pink-400"> smooth motion</span>, <span className="text-blue-400">parallax depth</span>, and
          <span className="text-purple-400"> futuristic UI</span> for interfaces that feel alive.
        </motion.p>

        <motion.div
          className="flex gap-6 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://github.com/rushda811"
            className="px-6 py-2 bg-purple-600/20 border border-purple-400/50 rounded-full text-purple-300 hover:bg-purple-600/40 hover:scale-105 transition-all"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fathimarushdap"
            className="px-6 py-2 bg-blue-600/20 border border-blue-400/50 rounded-full text-blue-300 hover:bg-blue-600/40 hover:scale-105 transition-all"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Right Image Frame */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative md:w-1/2 flex justify-center mt-16 md:mt-0 perspective-[1200px]"
      >
        <motion.div
          className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(147,51,234,0.5)] border border-purple-500/40 bg-white/5 backdrop-blur-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 80, damping: 10 }}
        >
          <img
            src={myPhoto}
            alt="Ro"
            className="w-full h-full object-cover opacity-95"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};


/* ===== App Component ===== */
const App = () => {
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 3000], [1, 1.05]);
  const bgScaleSpring = useSpring(bgScale, { stiffness: 50, damping: 20 });

  const stars = Array.from({ length: 50 });

  return (
    <motion.div
      style={{ scale: bgScaleSpring }}
      className="relative font-sans text-white cursor-none overflow-x-hidden bg-gradient-to-b from-[#0a0a10] to-[#1f0f3a] min-h-screen"
    >
      <Cursor />

      {/* Star Background */}
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 5 + Math.random() * 5 }}
        />
      ))}
      {/* ===== Hero Section ===== */}

  <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
    <motion.div
      className="absolute w-[28rem] h-[28rem] bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 rounded-full opacity-30 blur-[180px]"
      animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
    />

    <motion.h1
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
      className="name text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_40px_rgba(147,51,234,0.8)]"
    >
      Fathima Rushda
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="subtitle text-gray-300 text-lg md:text-xl"
    >
      Full-Stack Web Developer | React & Django Developer
    </motion.p>
&nbsp; &nbsp;
       <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="subtitle text-gray-300 text-lg md:text-xl"
    >
      Scroll down to explore more!
    </motion.p>

    <motion.div
      className="mt-10 flex gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
    </motion.div>
  </section>


      {/* About Section */}
      <About />



{/* ===== Futuristic Skills Section ===== */}
<section className="min-h-screen flex flex-col justify-center items-center px-8 py-20 gap-16 relative bg-[#0a001a] overflow-hidden">
  <h2
    className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]"
    style={{ fontFamily: "'Bitcount Grid Double Ink', sans-serif" }}
  >
    <GlowText text="Skills" />
  </h2>

  {/* Zig-Zag Skill Orbs */}
  <div className="relative w-full h-[40rem] flex flex-wrap justify-center items-center">
    {[
      "React", "Django", "Python", "JavaScript",
      "CSS", "HTML", "Tailwind", "Git", "SQL", "REST API"
    ].map((skill, i) => {
      const size = 100 + Math.random() * 50;
      const xPos = 10 + (i % 5) * 18 + Math.random() * 5; // divide width into 5 segments
      const yPos = i % 2 === 0 ? 20 + Math.random() * 5 : 40 + Math.random() * 5; // zig-zag top positions
      const floatDuration = 6 + Math.random() * 4;

      return (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-full shadow-2xl cursor-pointer"
          style={{
            width: size,
            height: size,
            top: `${yPos}%`,
            left: `${xPos}%`,
            background: "radial-gradient(circle, rgba(168,85,247,0.6), rgba(58,123,213,0.3))",
            color: "#fff",
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "'Bitcount Grid Double Ink', sans-serif",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.1)",
          }}
          animate={{
            y: ["0%", "-10%", "0%"],
            x: ["0%", "5%", "0%"],
            rotate: [0, 15, 0],
            boxShadow: [
              "0 0 20px rgba(168,85,247,0.4)",
              "0 0 40px rgba(58,123,213,0.6)",
              "0 0 20px rgba(168,85,247,0.4)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: floatDuration,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          whileHover={{
            scale: 1.2,
            boxShadow: "0 0 60px rgba(168,85,247,0.9)",
          }}
        >
          {skill}
        </motion.div>
      );
    })}
  </div>

  {/* Ambient Glow Orbs */}
  {Array.from({ length: 5 }).map((_, idx) => (
    <motion.div
      key={idx}
      className="absolute w-32 h-32 rounded-full blur-3xl"
      style={{
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        background: `radial-gradient(circle, rgba(147,51,234,0.25), transparent)`,
      }}
      animate={{
        x: [-15, 15, -10, 0],
        y: [-10, 10, 5, 0],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        repeat: Infinity,
        duration: 12 + Math.random() * 8,
        ease: "easeInOut",
      }}
    />
  ))}
</section>




{/* ===== Futuristic Projects Section ===== */}
<section
  id="projects"
  className="py-32 px-6 md:px-16 bg-gradient-to-b from-black/40 to-[#0a001a]/80 backdrop-blur-xl rounded-t-[3rem] relative overflow-hidden"
>
  <motion.h2
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="text-5xl md:text-6xl font-extrabold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 drop-shadow-[0_0_30px_rgba(147,51,234,0.6)]"
    style={{ fontFamily: "'Bitcount Grid Double Ink', sans-serif" }}
  >
    <GlowText text="My Projects" />
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
    {[
      {
        title: "Trinity Consular Website :",
        desc: "A fully functional consular services website built for Trinity Consular, providing document  certification, and attestation support. The site includes both static and dynamic pages, enquiry forms, email-based communication, and service workflows for document attestation and validation. It is publicly accessible on Google and actively used by customers.",
      },
      {
        title: "Blockchain based counterfeit medicine authentication system :",
        desc: "A proof-of-concept system to detect counterfeit medicines by combining package serialization (QR), a Flask backend for verification and analytics, and a Solidity smart contract on a Ganache testnet to create an immutable audit trail. Features include batch creation, QR generation, duplicate-scan detection, and an admin dashboard for recalls.",
      },
      {
        title: "My portfolio :",
        desc: "This portfolio is built with React.js and styled using Tailwind CSS along with custom animations. It includes smooth scrolling, neon hover effects, pulse and glow keyframes, and a unique Bitcount font for a modern visual style. The codebase is lightweight, modular, and optimised for fast, responsive performance.",
      },
    ].map((project, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.15 }}
        className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all duration-500"
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 opacity-30 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ repeat: Infinity, duration: 5 + i }}
        />

        {/* Content */}
        <div className="relative p-8 z-10">
          <h3
            className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.6)]"
            style={{ fontFamily: "'Bitcount Grid Double Ink', sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-base">{project.desc}</p>
        </div>

        {/* Animated underline visible on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 w-0"
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    ))}
  </div>
</section>


{/* ===== Contact Section ===== */}
<section  id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 py-20 gap-12 relative overflow-hidden bg-[#0a001a]">
  {/* Background Orbs with Parallax */}
  <motion.div
    className="absolute top-[-14rem] left-[-14rem] w-[28rem] h-[28rem] bg-purple-600 rounded-full blur-[200px] opacity-25"
    animate={{ x: [0, 40, -20, 0], y: [0, 20, -15, 0] }}
    transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute bottom-[-14rem] right-[-14rem] w-[28rem] h-[28rem] bg-pink-500 rounded-full blur-[200px] opacity-25"
    animate={{ x: [0, -40, 20, 0], y: [0, -20, 15, 0] }}
    transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute top-[20%] right-[10%] w-36 h-36 bg-cyan-500 rounded-full blur-3xl opacity-20"
    animate={{ x: [-15, 15, -10, 0], y: [-10, 10, 5, 0] }}
    transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
  />

  {/* Heading */}
  <motion.h2
    initial={{ opacity: 0, y: -60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="text-5xl md:text-6xl font-bold mb-4 text-center"
    style={{ fontFamily: "'Bitcount Grid Double Ink', sans-serif" }}
  >
    <GlowText text="Contact Me" />
  </motion.h2>

  {/* Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: 0.2 }}
    className="text-gray-300 text-lg md:text-xl text-center max-w-md"
  >
    Reach out via email or social links below. I’d love to connect!
  </motion.p>

{/* Social Icons with Gradient Fill */}
<motion.div className="flex gap-16 mt-8 text-6xl md:text-7xl relative">
  {[
    { href: "mailto:fathimarushda811@gmail.com", icon: <FaEnvelope /> },
    { href: "https://linkedin.com/in/fathimarushdap", icon: <FaLinkedin />, target: "_blank" },
    { href: "https://github.com/rushda811", icon: <FaGithub />, target: "_blank" },
  ].map((item, index) => (
    <motion.a
      key={index}
      href={item.href}
      target={item.target || "_self"}
      rel="noopener noreferrer"
      initial={{ scale: 0.7, opacity: 0, y: 40 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 20,
        delay: index * 0.2,
      }}
      className="relative group"
    >
      {/* Icon with SVG Gradient Fill */}
      {React.cloneElement(item.icon, {
        size: 64,
        style: {
          fill: "url(#gradient)", // Apply gradient fill
        },
        className: "relative z-10",
      })}

      {/* Floating Glow */}
      <motion.span
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        animate={{
          scale: [1, 1.25, 1],
          x: [-5, 5, 0],
          y: [-5, 5, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 4 + index,
          ease: "easeInOut",
        }}
      />
    </motion.a>
  ))}

  {/* Define Gradient for SVG */}
  <svg width="0" height="0">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="50%" stopColor="#f50b80ff" />
        <stop offset="100%" stopColor="#1c72bdff" />
      </linearGradient>
    </defs>
  </svg>
</motion.div>


  {/* Floating underline glow */}
  <motion.div
    className="absolute bottom-12 w-56 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 rounded-full blur-2xl opacity-50"
    animate={{ x: [-30, 30, -20, 0] }}
    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  />
</section>


    </motion.div>
  );
};

export default App;
