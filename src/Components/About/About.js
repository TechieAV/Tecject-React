import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import { getAllProjects } from '../../Services/ProjectService.js';
import FAQSection from '../FAQSection/FAQSection.js';

const About = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects()
      .then(data => setProjects(data))
      .catch(err => {
        console.error('Error fetching projects:', err);
        setProjects([]);
      });
  }, []);

  return (
    <div className="about-container">
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>About Us</h1>
        <p>Your trusted partner in innovative academic solutions.</p>
      </motion.div>

      <motion.div
        className="about-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p>
          We are passionate about empowering students through well-designed, functional, and creative projects across various domains including Machine Learning, AI, Web Development, and more.
        </p>
        <p>
          With a team of experienced developers and mentors, we ensure each project is unique, impactful, and easily deployable. Whether you’re a beginner or looking for an advanced-level final year project, we’ve got something tailored for you.
        </p>
        <p>
          Our mission is to bridge the gap between academic concepts and practical implementation through hands-on project development, mentoring, and real-time support.
        </p>
      </motion.div>

      <motion.div
        className="about-footer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3>Why Choose Us?</h3>
        <ul>
          <li>✅ 100% Original Code</li>
          <li>✅ Real-Time Guidance</li>
          <li>✅ Affordable Pricing</li>
          <li>✅ Demo Support</li>
          <li>✅ Project Deployment Assistance</li>
        </ul>
      </motion.div>

      <motion.div
        className="support-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="support-heading">📞 Technical Support & Assistance</h2>
        <p className="support-intro">
          We understand that building a project isn’t just about writing code — it's about having reliable support at every step. Our expert team is here to guide you through challenges and ensure your project runs smoothly from start to finish.
        </p>

        <div className="support-grid">
          {[
            {
              title: '💻 Remote Troubleshooting',
              desc: 'Remote support via AnyDesk, Zoom, or Google Meet for real-time help.'
            },
            {
              title: '📘 Documentation Help',
              desc: 'Professional documentation with system design and architecture.'
            },
            {
              title: '⚙️ Deployment Support',
              desc: 'Guided hosting support on cloud and local servers.'
            },
            {
              title: '🧑‍🏫 Viva & Demo Prep',
              desc: 'Mock interviews and presentation guidance.'
            },
            {
              title: '🕒 24x7 Chat Support',
              desc: 'Instant help for bugs, code, and submission doubts.'
            },
            {
              title: '🌐 Stack Guidance',
              desc: 'Tech selection help based on your needs and skills.'
            }
          ].map((support, idx) => (
            <div key={idx} className="support-card">
              <h4>{support.title}</h4>
              <p>{support.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <FAQSection/>

      <div className="horizontal-section">
        <h2 className="horizontal-title">🚀 Our Latest Projects</h2>
        <div className="scroll-wrapper">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="scroll-card"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`data:image/jpeg;base64,${project.demoPicBase64}`}
                alt={project.projectName}
                className="scroll-card-img"
              />
              <div className="scroll-card-body">
                <h4>{project.projectName}</h4>
                <p className="domain">{project.projectDomain}</p>
                <p className="desc">{project.projectDescription}</p>
                <a href={project.previewLink} className="preview-button" target="_blank" rel="noreferrer">
                  🔗 Preview
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;