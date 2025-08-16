import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CustomProjectCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate(); // <-- Hook from React Router

  const handleContactClick = () => {
    navigate("/contact"); // <-- Replace with your desired route
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        marginTop: "2rem",
        marginBottom: "2rem",
        flexWrap: "wrap",
      }}
    >
      {/* Left Image */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
        alt="Contact"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1, rotate: 360 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />

      {/* Card */}
      <Card
        className="text-center"
        style={{
          background: "linear-gradient(135deg, #000000, #3a3a3a)",
          color: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
          maxWidth: "700px",
          width: "100%",
          minWidth: "300px",
        }}
      >
        <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>
          Need a Customized Mini Project?
        </h3>
        <p style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
          If you’re looking for a personalized or custom mini project, feel free to reach out!
        </p>
        <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
          📞 Contact: <strong>9345202170</strong>
        </p>
        <p style={{ fontSize: "0.95rem" }}>
          📱 Connect via social media or messaging platforms for more info.
        </p>
        <Button
          variant="light"
          className="mt-3 px-4 py-2 fw-semibold"
          style={{
            color: "#2d3748",
            fontWeight: "600",
            borderRadius: "9999px",
            boxShadow: "0 2px 6px rgba(255,255,255,0.1)",
          }}
          onClick={handleContactClick}
        >
          📞 Contact Now
        </Button>
      </Card>

      {/* Right Image */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2950/2950651.png"
        alt="Message"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1, rotate: 360 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />
    </motion.div>
  );
};

export default CustomProjectCard;
