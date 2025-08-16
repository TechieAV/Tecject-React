import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { motion } from "framer-motion";

const footerData = {
  Services: [
    "Enterprise Software Development",
    "Custom API & Backend Systems",
    "Cloud Deployment",
    "Technical Support",
    "Mobile App Development",
    "UI/UX Design",
    "Web Development",
  ],
  StudentSupport: [
    "Final Year Major Projects",
    "Mini Projects for B.Tech / MCA",
    "Real-Time Application Projects",
    "Project Documentation Assistance",
    "Optimized Code for Scoring High",
  ],
  ProfessionalSupport: [
    "Responsive Portfolio Websites",
    "Personal Branding",
    "Modern Tech Stack Integration",
    "Job-Oriented Design Approach",
  ],
  Company: ["About Us", "Our Approach", "Contact", "Privacy Policy"],
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: { xs: 3, md: 10 },
        py: 6,
        borderTop: "1px solid #ccc"      }}
    >
      <Grid container spacing={{ xs: 1.5, sm: 4, md: 13 }}>
  {[
    { title: "Services for Enterprises", items: footerData.Services },
    { title: "Services for Students", items: footerData.StudentSupport },
    { title: "Support for Professionals", items: footerData.ProfessionalSupport },
  ].map((section, index) => (
    <Grid
      item
      xs={6} // two columns per row on mobile
      sm={4}  // three columns on tablet
      md={3}  // four columns on desktop
      key={section.title}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={index}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: "#aaa",
            mb: { xs: 1, md: 2 },
            fontSize: { xs: "0.75rem", md: "0.9rem" },
          }}
        >
          {section.title}
        </Typography>
        {section.items.map((item) => (
          <Typography
            key={item}
            variant="body2"
            sx={{
              mb: { xs: 0.5, md: 1 },
              fontSize: { xs: "0.7rem", md: "0.85rem" },
              transition: "color 0.3s",
              "&:hover": { color: "#1e90ff", cursor: "pointer" },
            }}
          >
            {item}
          </Typography>
        ))}
      </motion.div>
    </Grid>
  ))}

  {/* Contact & Company */}
  <Grid item xs={6} sm={4} md={3}>
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={3}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: "#aaa",
          mb: { xs: 1, md: 2 },
          fontSize: { xs: "0.75rem", md: "0.9rem" },
        }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: { xs: 0.5, md: 1 },
          fontSize: { xs: "0.7rem", md: "0.85rem" },
          transition: "color 0.3s",
          "&:hover": { color: "#1e90ff", cursor: "pointer" },
        }}
      >
        +91-98765-43210
      </Typography>
      <Link
        href="mailto:support@tecject.in"
        underline="hover"
        color="inherit"
        sx={{
          display: "inline-block",
          mb: { xs: 1, md: 3 },
          fontSize: { xs: "0.7rem", md: "0.85rem" },
          transition: "color 0.3s",
          "&:hover": { color: "#1e90ff" },
        }}
      >
        support@tecject.in
      </Link>

      <Typography
        variant="subtitle2"
        sx={{
          color: "#aaa",
          mb: { xs: 1, md: 2 },
          fontSize: { xs: "0.75rem", md: "0.9rem" },
        }}
      >
        Tecject
      </Typography>
      {footerData.Company.map((item) => (
        <Typography
          key={item}
          variant="body2"
          sx={{
            mb: { xs: 0.5, md: 1 },
            fontSize: { xs: "0.7rem", md: "0.85rem" },
            transition: "color 0.3s",
            "&:hover": { color: "#1e90ff", cursor: "pointer" },
          }}
        >
          {item}
        </Typography>
      ))}
    </motion.div>
  </Grid>
</Grid>

    </Box>
  );
};

export default Footer;
