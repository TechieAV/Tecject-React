import React from "react";
import { Box, Typography, Grid, Container, Card, CardContent, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CustomizedPortfolioSlider from "./CustomizedPortfolioSlider";
import heroImage from "../../assets/Portfolio/BgImage.png";
import { useRef } from "react";


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const samplePortfolios = [
  {
    title: "Full Stack Developer Portfolio",
    description: "Modern React + Node.js portfolio with blogging and GitHub integration.",
    image: require("../../assets/Portfolio/portfolio1.png"),
  },
  {
    title: "Data Scientist Portfolio",
    description: "Beautiful layout with project visuals, Jupyter links, and Tableau dashboards.",
    image: require("../../assets/Portfolio/portfolio2.webp"),
  },
  {
    title: "UI/UX Designer Portfolio",
    description: "Figma showcase with animations, client testimonials, and Dribbble sync.",
    image: require("../../assets/Portfolio/portfolio3.png"),
  },
  {
    title: "Chartered Accountant Portfolio",
    description: "Professional layout highlighting certifications, client testimonials, and services offered.",
    image: require("../../assets/Portfolio/Charted Accountants.jpg"),
  },
  {
    title: "Designer Portfolio",
    description: "Creative and colorful UI to showcase design projects and client feedback.",
    image: require("../../assets/Portfolio/Designer.webp"),
  },
  {
    title: "Manager Portfolio",
    description: "Elegant layout focusing on leadership achievements, project stats, and teams led.",
    image: require("../../assets/Portfolio/Manager.webp"),
  },
  {
    title: "Freelancer Portfolio",
    description: "Minimal design with project-based pricing, reviews, and service categories.",
    image: require("../../assets/Portfolio/Freelancer.webp"),
  },
  {
    title: "Social Media Manager Portfolio",
    description: "Dynamic site featuring campaign results, engagement metrics, and client brands.",
    image: require("../../assets/Portfolio/Social Media Manager.webp"),
  },
  {
  title: "Marketing Specialist Portfolio",
  description: "Interactive layout with campaign stats, email funnel designs, and ROI graphs.",
  image: require("../../assets/Portfolio/Customized portfolio.webp"),
},
];

const ProfessionalsPage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);


  return (
    <Box sx={{ bgcolor: "#f5f7fa", fontFamily: "sans-serif" }}>
      {/* Hero Section */}
<Box
  sx={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    py: { xs: 8, sm: 10, md: 14 },
    px: { xs: 2, sm: 4 },
    textAlign: "center"
  }}
>
  <Container>
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" }
        }}
      >
        Build Your Personal Brand with a Stunning Portfolio
      </Typography>
      <Typography
        variant="h6"
        paragraph
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" }
        }}
      >
        Let us design a digital presence that speaks your skills.
      </Typography>

      {/* Buttons stack on mobile */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth={{ xs: true, sm: false }}
          onClick={() => navigate("/contact")}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth={{ xs: true, sm: false }}
          onClick={() => {
            sliderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          View Samples
        </Button>
      </Stack>
    </motion.div>
  </Container>
</Box>

{/* Portfolio Grid */}
 <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, my: 4 }}>
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 9 }}
        justifyContent="center"
          mt={3}

        mb={{ xs: 9, sm: 12, md: 16 }}
      >
        {samplePortfolios.map((item, index) => (
          <Grid
            item
            xs={6}   // Mobile: 1 column
            sm={6}    // Tablet: 2 columns
            md={4}    // Laptop: 3 columns
            lg={3}    // Desktop: 4 columns
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileTap={{ scale: 1.03 }} 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ width: "100%", maxWidth: 320 }}
            >
              <Card
                sx={{
                  height: "100%",
                  minHeight: { xs: 280, sm: 320, md: 300, lg: 360 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: 5,
                }}
                whileTap={{ scale: 1.03 }} 
              >
                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: { xs: 150, sm: 170, md: 180 },
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                {/* Content */}
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>



      {/* Promotion content */}
<Container sx={{ mt: -10, mb: 8, position: "relative", zIndex: 2 }}>
  <motion.div
    variants={fadeIn}
    initial="hidden"
    animate="visible"
  >
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 11,
        p: 4,
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        textAlign: "center",
        backgroundImage: "linear-gradient(145deg, #0f2027, #08303cff, #56b0d7ff)",
        color: "#fff",
        transform: "rotateX(0deg)",
        transition: "transform 0.4s ease",
        "&:hover": {
          transform: "scale(1.02) rotateX(2deg)",
        },
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }}>
        Want a Portfolio That Reflects *Your* Style?
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#ddd" }}>
        We craft premium, tailor-made portfolio websites — you choose the theme, colors, and tone. <br />
        Boost your professional identity with a design that speaks *you*.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#ffffff",
          color: "#0f2027",
          fontWeight: "bold",
          px: 5,
          py: 1.5,
          borderRadius: 50,
          boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#f1f1f1",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => navigate("/contact")}
      >
        Design My Portfolio
      </Button>
    </Box>
  </motion.div>
</Container>

{/* Slide that custom sample */}
<Box ref={sliderRef}>
  <CustomizedPortfolioSlider portfolios={samplePortfolios.slice(0, 6)} />
</Box>



      {/* Call to Action */}
      <Box sx={{ bgcolor: "#000", color: "white", py: 8, textAlign: "center" }}>
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Ready to Launch Your Personal Portfolio Website?
          </Typography>
          <Button variant="contained" color="secondary" onClick={() => navigate("/contact")}>
            Let’s Talk
          </Button>
          <p>Contact : +91 9345202170</p>
        </motion.div>
      </Box>
      <Box height={50}></Box>
      
    </Box>
  );
};

export default ProfessionalsPage;
