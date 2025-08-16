import React from "react";
import { Button, Typography, Box, Grid, Container, Stack, Card, CardContent } from "@mui/material";
import { Business, School, Person, CheckCircleOutline } from "@mui/icons-material";
import image from '../../assets/Home/MainPage.jpg';
import "../MainPage/mainPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import FAQSection from "../FAQSection/FAQSection";
import  Session  from "../MainPage/Session.js";
import { motion } from "framer-motion";
import HomePageSection from "./HomePageSection.js";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeInSlow = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5, // slower (default is ~0.5–0.8)
      ease: "easeOut",
    },
  },
};


const MainPage = () => {
    const navigate = useNavigate();
  return (
    <Box fontFamily="sans-serif">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>

      {/* Hero Section */}
      <Box
        sx={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    overflowX: "hidden",
    py: { xs: 8, sm: 10, md: 14 }, // smaller padding for mobile
    px: { xs: 2, sm: 4, md: 6 },
    textAlign: "center",
    minHeight: { xs: "70vh", md: "70vh" }, // makes sure it's tall enough
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }}
      >
        <Container className="fade-in-up"
  maxWidth={false} // removes the fixed breakpoint max-width
  sx={{
    px: { xs: 2, sm: 4, md: 6 }, // padding adjusts by device size
    width: "100%", // full width on mobile, narrower on bigger screens
    overflow:"hidden"
  }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{
        fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem", lg: "3.2rem" },
        lineHeight: 1.2
      }}>
            Welcome to Tecject – Your Trusted Enterprise Tech Partner
          </Typography>
          <Typography variant="h6" paragraph sx={{
        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
        maxWidth: "800px",
        mx: "auto"
      }}>
            We specialize in building enterprise software, final year major projects, mini-projects, and personal portfolios for professionals.
          </Typography>
<Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="center"
      className="zoom-in stack-buttons"
      sx={{ mt: 2 }}
    ><Button variant="contained" color="primary" size="large" onClick={() => navigate("/login")}
            sx={{ width: { xs: "100%", sm: "auto" } }}
>
  Start Your Project
</Button>
            <Button variant="outlined" color="inherit"  size="large"
        sx={{ width: { xs: "100%", sm: "auto" } }}>View Our Work</Button>
          </Stack>
        </Container>
      </Box>
      </motion.div>



      {/* About Section */}
<Session/>




{/* Cards Section */}
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }} // triggers when 30% is visible
>
<Box py={10} px={2} bgcolor="#f4f6f8">
  <Container>
    <Typography
      variant="h4"
      textAlign="center"
      fontWeight="bold"
      gutterBottom
      className="fade-in-up"
    >
      Tailored Solutions For Every Need
    </Typography>

   <Grid container spacing={4} justifyContent="center" alignItems="stretch" mt={4}>
  {[
    {
      icon: <Business fontSize="large" color="primary" />,
      title: "Enterprises",
      text: "Scalable, reliable digital products tailored to your industry.",
      link: "/enterprises"
    },
    {
      icon: <School fontSize="large" color="primary" />,
      title: "Students",
      text: "Final year and mini-projects that deliver real-world impact.",
      link: "/home"
    },
    {
      icon: <Person fontSize="large" color="primary" />,
      title: "Professionals",
      text: "Showcase your skills with a powerful portfolio site.",
      link: "/professionals"
    }
  ].map((card, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      display="flex"
      justifyContent="center"
      key={index}
    >
      <Link to={card.link} style={{ textDecoration: 'none' }}>
        <Card
          elevation={6}
          className="animated-card card-mobile card-tablet card-laptop card-desktop"
          sx={{
            width: "100%",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: 10
            }
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {card.icon}
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.text}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  ))}
</Grid>


  </Container>
</Box>
</motion.div>
 
 <motion.div
  variants={fadeInSlow}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }} // triggers when 30% is visible
>
{/* Commitment Section */}
<Box py={10} px={2} bgcolor="#000" color="#fff">
  <Container>
    <Typography
      variant="h4"
      fontWeight="bold"
      textAlign="center"
      gutterBottom
      sx={{ fontSize: "2.2rem" }}
      className="fade-in-up"
    >
      Our Commitment as a Startup IT Solutions & Services Partner
    </Typography>

    <Grid container spacing={4} alignItems="center" mt={4}>
      {/* Left Points */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} columnGap={13}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              {[
                "Transparent Communication",
                "Agile Development",
                "User-Centric Design",
                "Scalability & Flexibility",
              ].map((text, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  key={index}
                  className="fade-in-up"
                >
                  <CheckCircleOutline color="success" />
                  <Typography sx={{ fontSize: "1.1rem" }}>{text}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} columnGap={13}>
            <Stack spacing={2}>
              {[
                "On-Time Delivery",
                "Transparent Execution",
                "Market Research & Analysis",
                "Feedback Integration",
              ].map((text, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  key={index}
                  className="fade-in-up"
                >
                  <CheckCircleOutline color="success" />
                  <Typography sx={{ fontSize: "1.1rem" }}>{text}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Image */}
      <Grid item xs={12} md={6} sx={{ pl: { md: 6, xs: 0 }, mt: { xs: 4, md: 0 } }}>

        <Box
          component="img"
          src={require('../../assets/Home/TecjectProcess.png')}
          alt="Tecject Process"
          className="responsive-img"
          sx={{
    width: { xs: "100%", sm: "80%", md: "100%" },
    maxWidth: { md: 350, lg: 400 },
    maxHeight: { xs: "auto", md: 300 },
    borderRadius: 2,
    boxShadow: 4,
    animation: "zoomIn 1s ease",
    margin: "0 auto",
    display: "block"
  }}
        />
      </Grid>
    </Grid>
  </Container>
</Box>
</motion.div>
<HomePageSection/>

<FAQSection/>
    </Box>
  );
};

export default MainPage;
