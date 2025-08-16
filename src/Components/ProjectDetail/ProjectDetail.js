import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const project = state?.project;

  if (!project) {
    return (
      <motion.div
        className="project-detail-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p>Project data not available. Please go back and try again.</p>
        <button onClick={() => navigate("/home")} className="back-btn">← Back</button>
      </motion.div>
    );
  }

  const handleBuyClick = () => {
  navigate('/studentpurchase', { state: { project } });
  };

  return (
    <div>
    <motion.div
      className="project-detail-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.button
        onClick={() => navigate(-1)}
        className="back-btn"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ← Back
      </motion.button>

      <motion.h2
        className="detail-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {project.projectName}
      </motion.h2>

      <motion.img
        src={`data:image/jpeg;base64,${project.demoPicBase64}`}
        alt={project.projectName}
        className="detail-img"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      />

      <motion.div
        className="detail-info"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {[
          { label: "📁 Domain", value: project.projectDomain },
          { label: "📌 Level", value: project.projectLevel },
          { label: "💰 Rate", value: `₹${project.projectRate}` },
          { label: "🛠 Stack", value: project.stackDescription },
          { label: "📝 Description", value: project.projectDescription },
        ].map((item, index) => (
          <motion.p
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <strong>{item.label}:</strong> {item.value}
          </motion.p>
        ))}

        <motion.p
          className="support-para"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          📚 We also provide complete project documentation, PPT, and support for demo/viva preparation to help you present confidently.
        </motion.p>

        <motion.div
          className="button-group"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <a
            href={project.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="preview-link"
          >
            🔗 Preview Project
          </a>

          <motion.button
            className="buy-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyClick}
          >
            🛒 Buy Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
   <motion.div
  className="contact-section-upgraded"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <motion.h3
    className="contact-heading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    ✨ Need Help? We're Just a Message Away!
  </motion.h3>

  <div className="contact-cards-container">
    {[
      {
        icon: '📞',
        title: 'Call Us',
        content: '+91 98765 43210',
      },
      {
        icon: '📧',
        title: 'Email Us',
        content: 'tecject@gmail.com',
      },
      {
        icon: '📍',
        title: 'Visit Us',
        content: 'Chennai, Tamil Nadu',
      },
      {
        icon: '🕒',
        title: 'Working Hours',
        content: 'Sun – Sat: 9 AM – 7 PM',
      },
    ].map((item, index) => (
      <motion.div
        className="contact-card"
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.2 }}
      >
        <div className="icon">{item.icon}</div>
        <h4>{item.title}</h4>
        <p>{item.content}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

    </div>
    
  );
};

export default ProjectDetail;
