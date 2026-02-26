'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaReact, FaNode, FaGitAlt, FaDocker, FaLinux, FaAws } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript, SiNextdotjs, SiExpress } from 'react-icons/si';
import { useRef } from 'react';

// 3D Animated Background - Geometric Twisted Spinner
const AnimatedBackground3D = ({ scrollProgress }) => {
  const rotation = useTransform(scrollProgress, [0, 1], [0, 360]);
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
        }}
      />

      {/* Twisted 3D Object */}
      <motion.div
        className="relative w-96 h-96"
        style={{
          rotateX: useTransform(scrollProgress, [0, 1], [-20, 20]),
          rotateY: rotation,
          rotateZ: useTransform(scrollProgress, [0, 1], [-30, 30]),
        }}
      >
        {/* Geometric twisted ribbon 1 - Top */}
        <motion.div
          className="absolute top-0 left-1/2 w-56 h-24 -translate-x-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(168, 85, 247, 0.4) 100%)',
            borderRadius: '12px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.25)',
            skewY: useTransform(scrollProgress, [0, 1], [-15, 15]),
          }}
        />

        {/* Geometric twisted ribbon 2 - Right */}
        <motion.div
          className="absolute top-1/2 right-0 w-24 h-56 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.3) 0%, rgba(168, 85, 247, 0.35) 50%, rgba(236, 72, 153, 0.3) 100%)',
            borderRadius: '12px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)',
            skewX: useTransform(scrollProgress, [0, 1], [15, -15]),
          }}
        />

        {/* Geometric twisted ribbon 3 - Left */}
        <motion.div
          className="absolute top-1/2 left-0 w-24 h-56 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.35) 0%, rgba(236, 72, 153, 0.3) 50%, rgba(168, 85, 247, 0.35) 100%)',
            borderRadius: '12px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)',
            skewX: useTransform(scrollProgress, [0, 1], [-15, 15]),
          }}
        />

        {/* Geometric twisted ribbon 4 - Bottom */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-56 h-24 -translate-x-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.35) 0%, rgba(168, 85, 247, 0.4) 50%, rgba(236, 72, 153, 0.35) 100%)',
            borderRadius: '12px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.25)',
            skewY: useTransform(scrollProgress, [0, 1], [15, -15]),
          }}
        />

        {/* Center core */}
        <motion.div
          className="absolute inset-0 m-auto w-32 h-32 rounded-lg"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 100%)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />
      </motion.div>

      {/* Orbiting rings for extra depth */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-purple-500/20"
        style={{ rotateZ: rotation }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full border border-pink-500/15"
        style={{ rotateZ: useTransform(scrollProgress, [0, 1], [0, -720]) }}
      />
    </motion.div>
  );
};

// Skill Badge Component
const SkillBadge = ({ name, icon: Icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="group"
    >
      <div className="relative px-6 py-4 rounded-full glass glass-hover cursor-pointer overflow-hidden backdrop-blur-xl border border-purple-500/30">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/20 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge Content */}
        <div className="relative flex items-center gap-3 z-10">
          <motion.div
            whileHover={{ rotate: 30 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {Icon && <Icon className="text-lg text-purple-400 group-hover:text-pink-300 transition-colors" />}
          </motion.div>
          <span className="font-semibold text-sm text-gray-100 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
          style={{
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1)',
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const skills = [
    { name: 'ReactJS', icon: FaReact },
    { name: 'NextJS', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'NodeJS', icon: FaNode },
    { name: 'ExpressJS', icon: SiExpress },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Git', icon: FaGitAlt },
    { name: 'Docker', icon: FaDocker },
    { name: 'AWS', icon: FaAws },
    { name: 'Linux', icon: FaLinux },
    { name: 'Problem Solving', icon: FaReact },
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen bg-black/80 overflow-hidden py-20 md:py-32"
    >
      {/* Animated 3D Background */}
      <AnimatedBackground3D scrollProgress={scrollYProgress} />

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base font-semibold text-purple-400 mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            My Skillset
          </motion.p>

          {/* Main Heading with Gradient */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display leading-tight">
            The Magic{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Behind
            </span>
          </h2>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A curated collection of technologies that power modern, scalable, and beautiful digital experiences
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {skills.map((skill, index) => (
            <SkillBadge
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              delay={index * 0.05}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default Skills;
