import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FAQSection from "../FAQSection/FAQSection";
import Footer from "../MainPage/Footer";
import enterpriseBg from "../../assets/Home/Enterprise.jpg";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const services = [
  {
    title: "Enterprise Websites",
    description:
      "Custom, scalable websites built for your enterprise's specific needs.",
    image: require("../../assets/Login/website_sample.jpg"),
    link: "/estimate/website",
  },
  {
    title: "Mobile Applications",
    description:
      "Android/iOS apps that enhance your reach and operational efficiency.",
    image: require("../../assets/Login/mobile_app.webp"),
    link: "/estimate/mobile",
  },
  {
    title: "Bug Fixing / Support",
    description:
      "Resolve issues and optimize your existing software infrastructure.",
    image: require("../../assets/Login/bug_fixing.webp"),
    link: "/estimate/bug-fix",
  },
];

const methodologySteps = [
  { icon: <WorkOutlineIcon color="primary" fontSize="large" />, title: "Discovery & Requirement Analysis" },
  { icon: <DesignServicesIcon color="primary" fontSize="large" />, title: "Wireframing, Design & Prototyping" },
  { icon: <DeveloperModeIcon color="primary" fontSize="large" />, title: "Agile Development (Sprint-based)" },
  { icon: <BugReportIcon color="primary" fontSize="large" />, title: "QA Testing & Bug Resolution" },
  { icon: <CloudDoneIcon color="primary" fontSize="large" />, title: "Final Deployment & Training" },
];

const supportSteps = [
  { icon: <SupportAgentIcon color="primary" fontSize="large" />, title: "24/7 Technical Assistance" },
  { icon: <BugReportIcon color="primary" fontSize="large" />, title: "Performance Monitoring" },
  { icon: <CloudDoneIcon color="primary" fontSize="large" />, title: "Security Patching & Bug Fixes" },
  { icon: <DesignServicesIcon color="primary" fontSize="large" />, title: "Feature Enhancements on Demand" },
  { icon: <WorkOutlineIcon color="primary" fontSize="large" />, title: "SLA-based Maintenance" },
];

const EnterpriseSection = () => {
  const navigate = useNavigate();

  return (
    <Box fontFamily="sans-serif">
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${enterpriseBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: 14,
            px: 2,
            textAlign: "center",
          }}
        >
          <Container>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Empowering Enterprises with Scalable Tech Solutions
              </Typography>
              <Typography variant="h6" paragraph>
                Explore our services including custom website development, mobile apps,
                and technical support tailored for your business.
              </Typography>
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button variant="contained" color="primary" onClick={() => navigate("/enterprisesForm")}>Submit Requirements</Button>
                <Button variant="outlined" color="inherit" onClick={() => navigate("/about")}>View Our Projects</Button>
              </Stack>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

     

      {/* Services Section */}
      <Box py={10} px={2} bgcolor="#f4f6f8">
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            Our Core Services for Enterprises
          </Typography>

          <Grid container spacing={4} mt={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
                  <Card
                    elevation={4}
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
                    }}
                  >
                    <CardMedia component="img" height="160" image={service.image} alt={service.title} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>{service.description}</Typography>
                      <Button variant="outlined" size="small" color="primary" onClick={() => navigate(service.link)}>Get Estimation</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

       {/* Company Pitch Section */}
      <Box py={8} bgcolor="#ffffff">
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
              Why Choose <span style={{ color: '#1976d2' }}>Tecject</span>?
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph textAlign="center">
              At Tecject, we transform your ideas into reality using cutting-edge technologies,
              a customer-first mindset, and scalable engineering practices. From startups to enterprises,
              we provide full-cycle digital solutions that ensure your growth and success.
            </Typography>
            <Typography variant="subtitle1" fontStyle="italic" color="textPrimary" textAlign="center">
              "We don't just build apps and websites – we build trust, reliability, and long-term partnerships."
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Methodology Section */}
      <Box py={10} px={2}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
            How We Work
          </Typography>

          <Grid container spacing={4} justifyContent="center" mt={2}>
  {methodologySteps.map((step, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={index}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Paper
          sx={{
            width: { xs: 260, sm: 280, md: 280 }, // fixed width for different breakpoints
            height: { xs: 100, sm: 120, md: 130 }, // fixed height for different breakpoints
            p: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            boxShadow: 4,
            transition: "transform 0.3s ease-in-out",
            backgroundColor: "#fff",
          }}
          elevation={3}
        >
          <Box sx={{ mb: 1, fontSize: 40, color: "primary.main" }}>
            {step.icon}
          </Box>
          <Typography fontWeight="bold" fontSize={{ xs: "0.95rem", sm: "1rem" }}>
            {step.title}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  ))}
</Grid>


          {/* Ongoing Support Section */}
          <Box mt={10} py={8} px={2} sx={{ background: "linear-gradient(to bottom, #8c8b93ff, #ffffff)", borderRadius: 2 }}>
            <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom color="white">
              Ongoing Support
            </Typography>
          <Grid
  container
  spacing={4}
  justifyContent="center"
  mt={2}
>
  {supportSteps.map((step, index) => (
    <Grid item key={index}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileTap={{ scale: 1.05 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <Paper
          sx={{
            width: { xs: 260, sm: 280, md: 280 }, // fixed width for different breakpoints
            height: { xs: 100, sm: 120, md: 130 }, // fixed height for different breakpoints
            p: 3,
            textAlign: "center",
            backgroundColor: "#edebeb23",
            color: "white",
            boxShadow: 3,
            border: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          elevation={0}
        >
          {React.cloneElement(step.icon, { sx: { color: "#90caf9", fontSize: 40 } })}
          <Typography fontWeight="bold" mt={2}>
            {step.title}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  ))}
</Grid>


          </Box>
        </Container>
      </Box>

      <FAQSection />
    </Box>
  );
};

export default EnterpriseSection;
