// components/CustomizedPortfolioSlider.jsx
import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const CustomizedPortfolioSlider = ({ portfolios }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: "95%", mx: "auto", mb: 8 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={600}
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          mb: { xs: 4, md: 6 }
        }}
      >
        Customized Portfolio Highlights
      </Typography>

      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  loop={true}
  spaceBetween={20}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 4000 }}
style={{ padding: "20px 0 50px" }} 
  breakpoints={{
    0: { slidesPerView: 1 },       // Mobile: always 1 full slide
    768: { slidesPerView: 2 },     // Tablets
    1200: { slidesPerView: 3 },    // Laptops
    1600: { slidesPerView: 4 }     // Large desktops
  }}
>
  {portfolios.map((item, index) => (
    <SwiperSlide
      key={index}
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: { xs: 280, sm: 280, md: 360 }, // same width for all mobile
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: 6,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.title}
            sx={{
              width: "100%",
              height: { xs: 160, sm: 160, md: 200 }, // same height for mobile
              objectFit: "cover"
            }}
          />
          <CardContent
            sx={{
              p: { xs: 2, sm: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1rem" } }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.85rem", sm: "0.85rem" } }}
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                alignSelf: "start",
                fontSize: { xs: "0.75rem", sm: "0.75rem" },
                px: 2,
                py: 0.5
              }}
              onClick={() => navigate("/contact")}
            >
              Contact Now
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>

    </Box>
  );
};

export default CustomizedPortfolioSlider;
