import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bannerImage from '../../assets/Home/tec-removebg-preview.png';
import { getProjectsByDomain } from '../../Services/ProjectService.js';
import ai from "../../assets/Domains/artificial Intelligence.jpg";
import Ml from "../../assets/Domains/Machine Learning.jpg";
import DL from "../../assets/Domains/Deep Learning.jpg";
import CC from "../../assets/Domains/Cloud Computing.jpg";
import WD from "../../assets/Domains/Web Development.jpg";
import DF from "../../assets/Domains/Dotnet framework.jpg";

const Home = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const handleProjectClick = (project) => {
  const isLogin = localStorage.getItem("isLogin") === "true";
  if (isLogin) {
    navigate(`/project/${project.projectGuidId}`, { state: { project } });
  } else {
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  }
};




  const data = [
    { id: 1, title: "Artificial Intelligence", img: ai },
    { id: 2, title: "Machine Learning", img: Ml },
    { id: 3, title: "Deep Learning", img: DL },
    { id: 4, title: "Cloud Computing", img:CC },
    { id: 5, title: "Web Development", img: WD },
    { id: 6, title: "Dotnet Framework", img: DF },
  ];

  useEffect(() => {
    if (selectedDomain) {
      getProjectsByDomain(selectedDomain)
        .then(data => setProjects(data))
        .catch(err => {
          console.error('Failed to fetch projects:', err);
          setProjects([]);
        });
    }
  }, [selectedDomain]);

  return (
    <div className="home">
      {/* Project Center Card */}
      <div
        className="project-banner-card"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 78, 146, 0.9), rgba(0, 4, 40, 0.9)), url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="project-banner-text">
          <h2>Project Center</h2>
          <p>Build, Learn, and Succeed with expertly designed academic projects.</p>
          <ul className="project-banner-list">
            <li>100% Original & High-Quality Code</li>
            <li>Fully Functional & Error-Free</li>
            <li>Easy to Understand & Modify</li>
            <li>Time-Saving & Affordable</li>
            <li>Instant Support</li>
          </ul>
        </div>
      </div>

      {/* Domains */}
      <h3 className="section-title" data-aos="fade-up">Explore Our Domains</h3>
      <div className="card-container">
        {data.map(item => (
          <div
            className="topic-card"
            key={item.id}
            data-aos="zoom-in"
            onClick={() => setSelectedDomain(item.title)}
            style={{ cursor: 'pointer' }}
          >
            <div className="circle-img">
              <img src={item.img} alt={item.title} />
            </div>
            <p className="card-title">{item.title}</p>
          </div>
        ))}
      </div>

      <motion.p
  className="click-hint"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  🔍 Click on the domains to view more projects!
</motion.p>


      {/* Animated Horizontal Line + Dynamic Content */}
      {selectedDomain && (
        <>
          <div className="horizontal-line" data-aos="fade-right"></div>
          <div className="domain-content" data-aos="fade-up">
            <h4>{selectedDomain}</h4>
            <p>You're exploring content for <strong>{selectedDomain}</strong>. Below are the available projects:</p>

            {/* 🔍 Render fetched projects */}
       <div className="project-card-grid">
  {projects.length === 0 ? (
    <p style={{ textAlign: 'center', fontSize: '1rem', marginTop: '1rem' }}>
  No projects available for this domain.
</p>

  ) : (
    projects.map((project, index) => (
     <motion.div
      key={project.projectGuidId || index}
      className="project-card-box"
      onClick={() => handleProjectClick(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >

        <img
          src={`data:image/jpeg;base64,${project.demoPicBase64}`}
          alt={project.projectName}
          className="project-card-img"
        />
        <div className="project-card-content">
          <h4>{project.projectName}</h4>
        </div>
        {snackbarVisible && (
  <div
    style={{
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: 'transparent',
      color: "red",
      border: "1px solid",
       borderColor: "red",
      padding: "12px 20px",
      borderRadius: "8px",
      fontSize: "0.9rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: 1000,
    }}
  >
    ⚠️ Please login to view project details.
  </div>
)}

      </motion.div>
    ))
  )}
</div>



          </div>
        </>
      )}

      {/* Tips for Review */}
      <div className="tips-section" data-aos="fade-up">
        <h4>💡 Tips for Review</h4>
        <ul className="tips-list">
          <li>✔ Choose a project that excites you</li>
          <li>✔ Understand the logic</li>
          <li>✔ Prepare your documentation well</li>
          <li>✔ Practice your viva/demo</li>
          <li>✔ Don’t leave everything to the last minute</li>
        </ul>
        <img
          src="https://projectcentersinchennai.co.in/assets/ImagesDB/Final-Year-Projects-Deliverables.jpg"
          alt="Tips"
          className="tips-img"
        />
      </div>
    </div>
  );
};

export default Home;
