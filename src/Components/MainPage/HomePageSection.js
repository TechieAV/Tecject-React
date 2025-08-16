import React from 'react';
import { motion } from 'framer-motion';
import './HomePageSection.css';
import diseaseImage from "../../assets/Home/disease-prediction.png";
import realEstateImage from "../../assets/Login/Homogo.jpg";
import giftshopImage from "../../assets/Login/giftshop.webp";

const HomePageSection = () => {
  const cards = [
    {
      title: 'AI-Based Disease Prediction System Using ML',
      image: diseaseImage,
      subtitle: 'Healthcare / AI',
    },
    {
      title: 'Modern Real Estate Listing & Booking Website',
      image: realEstateImage,
      subtitle: 'Real Estate',
    },
    {
      title: 'Personalized Gift Shop E-commerce Platform',
      image: giftshopImage,
      subtitle: 'E-commerce',
    },
  ];

  return (
    <motion.div
      className="homepage-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Crafting Success for Clients Over Years Through Startup IT Services</h1>
        <p
  style={{
    fontSize: '1.25rem', // larger font size
    fontFamily: '"Times New Roman", Times, serif', // classic font style
    lineHeight: '1.8',
    color: '#333',
    marginTop: '1rem'
  }}
>
  As a <span className="highlight">web development-first company</span>, we bring ideas to life by delivering complete digital ecosystems — from intuitive <strong>frontend interfaces</strong> to resilient <strong>backend infrastructure</strong>, and flawless <strong>cloud deployment</strong>. Whether you're building a startup MVP or scaling an enterprise platform, we engineer products that are fast, secure, and future-ready.
  <br /><br />
  <em>"We don’t just develop software — we architect digital experiences that leave a lasting impact."</em>
</p>


      </motion.div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <motion.div
            className="card"
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.6, type: 'spring' }}
            viewport={{ once: true }}
          >
            <img src={card.image} alt={card.title} />
            <h4>{card.subtitle}</h4>
            <h3 className="link">{card.title}</h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomePageSection;
