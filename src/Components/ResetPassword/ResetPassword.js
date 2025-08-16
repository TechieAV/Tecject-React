import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { resetPassword } from '../../Services/authService'; // <-- Use service

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const emailFromQuery = query.get('email');
    const tokenFromQuery = query.get('token');
    if (emailFromQuery && tokenFromQuery) {
      setEmail(emailFromQuery);
      setResetToken(tokenFromQuery);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      await resetPassword(email, resetToken, newPassword); // <-- Use service
      setMessage('Password reset successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err?.response?.data || 'Reset failed');
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="overlay" />
      <Paper elevation={4} className="reset-card">
        <Typography variant="h5" fontWeight="600" gutterBottom>
          Reset Your Password
        </Typography>
        <form onSubmit={handleSubmit} className="reset-form">
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {message && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="reset-button"
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ResetPassword;
