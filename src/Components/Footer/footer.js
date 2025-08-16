import React from 'react';
import './footer.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

// Social icons
import Facebook from '../../assets/Footer/Facebook.svg';
import Instagram from '../../assets/Footer/Insta.svg';
import Youtube from '../../assets/Footer/Youtube.svg';
import Twitter from '../../assets/Footer/Twitter.svg';
import Thread from '../../assets/Footer/Thread.svg';
import Mail from '../../assets/Footer/Gmail.webp';

/**
 * Footer Component
 * Displays social media icons and copyright information.
 */
export default function Footer() {
  const socialIcons = [
    { src: Facebook, alt: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61579113406204' },
    { src: Instagram, alt: 'Instagram', link: 'https://www.instagram.com/tec_ject' },
    { src: Youtube, alt: 'YouTube', link: 'https://www.youtube.com/channel/UCYOITWh-HjjqEa6UYVsvXIw' },
    { src: Twitter, alt: 'Twitter', link: 'https://www.twitter.com' },
    {
  src: Mail,
  alt: 'Mail',
  link: 'mailto:tecject@gmail.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more...'
},
  ];

  return (
    <footer className="card-grid-reviews" style={{ backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          {/* Social Media Icons */}
          <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
            {socialIcons.map(({ src, alt, link }) => (
              <a key={alt} href={link} target="_blank" rel="noopener noreferrer">
                <img
                  src={src}
                  alt={`${alt} Icon`}
                  style={{ height: 40, cursor: 'pointer' }}
                />
              </a>
            ))}
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" mt={2}>
            © {new Date().getFullYear()} UnKnown. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </footer>
  );
}
