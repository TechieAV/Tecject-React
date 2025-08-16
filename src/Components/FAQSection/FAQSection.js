import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const faqData = [
  {
    question: "What are the services provided to enterprises?",
    answer:
      "We provide official websites, mobile applications, cloud deployment, and ongoing technical support tailored for enterprise needs.",
  },
  {
    question: "What services are available for students?",
    answer:
      "We deliver mini and main projects for B.Tech, BE (CSE/IT), MCA, BCA, ME (CSE), M.Tech students — crafted to be optimized, practical, and highly scorable.",
  },
  {
    question: "How is Tecject useful for professionals?",
    answer:
      "We build modern, attractive portfolios that significantly improve your chances of getting hired or noticed by employers.",
  },
];

const FAQSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        px: { xs: 2, md: 10 },
        py: 8,
        gap: 6,
        alignItems: "flex-start",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1, minWidth: "250px" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: isMobile ? "2rem" : "2.5rem" }}
          gutterBottom
        >
          Frequently <br /> Asked Questions
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Still have questions?
        </Typography>
        <Button
  variant="contained"
  color="primary"
  endIcon={<ArrowForwardIosIcon />}
  onClick={() => navigate('/contact')}
  sx={{
    textTransform: "none",
    px: 3,
    py: 1.5,
    borderRadius: 2,
    fontSize: "1rem",
    fontWeight: 600,
  }}
>
  Let’s Talk
</Button>

      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 2 }}>
        {faqData.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQSection;
