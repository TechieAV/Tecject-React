import React, { useRef,useState } from "react";
import { motion, useInView } from "framer-motion";
import "./ProjectCard.css";

export const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleViewClick = () => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    if (isLogin) {
      window.open(project.github, "_blank");
    } else {
      setSnackbarVisible(true);
      setTimeout(() => {
        setSnackbarVisible(false);
      }, 3000); // Hide after 3 seconds
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`project-card ${project.level.toLowerCase()} p-4 rounded-lg shadow-md`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut"
      }}
    >
      {/* Flex Row: Content left, Button right */}
      <div className="flex justify-between items-end gap-4">
        <div>
          <h3 className="project-title text-white text-lg font-semibold mb-2">
            {project.title}
          </h3>
          <p className="project-summary text-white text-sm">
            {project.summary}
          </p>
        

        <button
          onClick={handleViewClick}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid black",
            color: "black",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontWeight: 600,
            cursor: "pointer",
            height: "fit-content",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#2d3748";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.color = "black";
          }}
        >
          🔗 View
        </button>

        {/* Snackbar */}
          {snackbarVisible && (
            <div
              style={{
                marginTop: "12px",
                backgroundColor: "#ad0f0fff",
                color: "white",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: "500",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                transition: "opacity 0.3s ease"
              }}
            >
              ⚠️ Please login to view the project
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
