import { Box, Container, Typography, Stack } from '@mui/material';
import { Business, School, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const Section = () => {
  return (
    <Box py={{ xs: 6, md: 10 }} px={2} bgcolor="white" color="black">
      <Container maxWidth="lg" sx={{ overflowX: 'hidden' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems="flex-start"
          flexWrap="nowrap"
          columnGap={{ xs: 4, md: 10 }}
          rowGap={{ xs: 4, md: 0 }}
        >
          {/* Left Column */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ flex: '1 1 50%'}}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom  sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
              Empowering Enterprises, Students, and Professionals
            </Typography>
            <Typography variant="h6" gutterBottom  sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              10+ years in delivering innovative and practical tech solutions
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
              At <strong>Tectject</strong>, we work with enterprise clients to modernize their digital infrastructure,
              assist students with real-world final-year projects, and help professionals stand out with stunning,
              responsive portfolios.
            </Typography>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ flex: '1 1 48%'}}
          >
            <Typography variant="h4" fontWeight="medium" gutterBottom sx={{ fontSize: { xs: '1.4rem', md: '2rem' } }}>
              Our Core Services
            </Typography>

            <Stack spacing={3} mt={4}>
              {[
                { icon: <Business sx={{ color: 'primary.main' }} />, text: 'Enterprise Software Development' },
                { icon: <School sx={{ color: 'primary.main' }} />, text: 'Major & Minor Final Year Projects' },
                { icon: <Person sx={{ color: 'primary.main' }} />, text: 'Professional Portfolio Websites' },
                { icon: <Business sx={{ color: 'primary.main' }} />, text: 'Custom APIs & Backend Systems' },
                { icon: <Person sx={{ color: 'primary.main' }} />, text: 'UI/UX Design & Web Development' },
              ].map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  {item.icon}
                  <Typography fontSize={{ xs: '0.95rem', md: '1rem' }}>{item.text}</Typography>
                </Stack>
              ))}
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Section;
