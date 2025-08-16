import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import './ForgotPassword.css'; // We'll define custom styles here
import ForgotImage from '../../assets/Login/forgotpswd.webp'; // Adjust path if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5202/api/Auth/forgot-password', { email });
      setSnackbar({ open: true, message: 'Reset link sent to your email!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data || 'Failed to send reset link', severity: 'error' });
    }
  };

  return (
    <div className="forgot-wrapper" style={{ backgroundImage: `url(${ForgotImage})` }}>
      <Paper elevation={5} className="forgot-card">
        <Typography variant="h5" fontWeight={600} mb={2}>
          Forgot Password?
        </Typography>
        <Typography variant="body2" mb={3} color="text.secondary">
          Enter your email address. We'll send you a password reset link.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
