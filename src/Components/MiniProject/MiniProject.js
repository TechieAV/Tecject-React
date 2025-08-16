import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../../data/projects.js";
import { ProjectCard } from "../MiniProject/ProjectCard.js";
import bgimg from "../../assets/MiniProject.jpg";
import { Card, Button } from "react-bootstrap";
import CustomProjectCard from "./CustomeProjectCard.js";


// Animate section block and titles on scroll
const Section = ({ title, projects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="py-8 px-4 md:px-12 bg-white rounded-xl shadow-lg mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-white bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded-md inline-block"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
};

const MiniProject = () => {
  const advancedProjects = projects.filter(p => p.level === "Advanced").slice(0, 15);
  const intermediateProjects = projects.filter(p => p.level === "Intermediate").slice(0, 15);
  const beginnerProjects = projects.filter(p => p.level === "Beginner").slice(0, 15);

  // Ref for the banner section
  const bannerRef = useRef(null);
  const isBannerInView = useInView(bannerRef, { once: true, margin: "-100px" });

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      
      {/* Banner Section */}
     <motion.div
  ref={bannerRef}
  style={{
    backgroundImage: `linear-gradient(135deg, rgba(3, 79, 76, 0.9), rgba(0, 4, 40, 0.9)), url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px',
    marginBottom: '40px',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    borderRadius: '1rem',
    color: '#ffffff',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  }}
  initial={{ opacity: 0, y: -30 }}
  animate={isBannerInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
    Techject Mini Project Portal 2024
  </h2>
  <p style={{ fontSize: '18px', marginBottom: '24px' }}>
    Explore 25+ curated mini projects using Python, React, .NET and more!
  </p>
  <div style={{
    padding: '20px',
    borderRadius: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  }}>
    <h3 style={{ fontSize: '22px', marginBottom: '12px', color: '#ffffff' }}>
      🎥 Free Webinar on Mini Projects
    </h3>
    <p style={{ fontSize: '16px', marginBottom: '20px', color: '#ffffff' }}>
      Discover how to plan, build, and present real-world mini projects in AI, ML, IoT and more!
    </p>
    <button
      onClick={() => window.open("https://youtu.be/nTM-Q_SyA_A")}
      style={{
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '9999px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.style.color = '#4c51bf'; // Indigo
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'white';
      }}
    >
      📺 Watch Webinar
    </button>
  </div>
</motion.div>


      {/* Project Sections */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-1">
          <Section title="🌱 Beginner Projects" projects={beginnerProjects} />
          <Section title="⚙️ Intermediate Projects" projects={intermediateProjects} />
          <Section title="🔥 Advanced Projects" projects={advancedProjects} />
        </div>
      </main>

     <div className="d-flex justify-content-center my-5">
  <CustomProjectCard/>
</div>




    </div>
  );
};

export default MiniProject;
