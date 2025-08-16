// src/Components/OAuthSuccess.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const username = params.get('username');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      // If token is missing, redirect to login
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{mt:'30px'}}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
        Login with Google successful!
      </Alert>
    </Snackbar>
  );
};

export default OAuthSuccess;
