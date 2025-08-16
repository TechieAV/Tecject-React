import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Grid
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';
import StudyImage from '../../assets/Login/ProjectManagement.webp';
import { login } from '../../Services/authService';
import { enterpriseLogin } from '../../Services/EnterpriseService'; // ✅ Add Enterprise Login API
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isEnterprise, setIsEnterprise] = useState(false); // ✅ Flag for login mode
  const navigate=useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      setSnackbar({
        open: true,
        message: '❌ Username and password are required.',
        severity: 'error',
      });
      return;
    }

    try {
      const res = isEnterprise
        ? await enterpriseLogin(loginData.username, loginData.password)
        : await login(loginData.username, loginData.password);

      // Store session info
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('username', res.username);
      localStorage.setItem('role', res.role);
      localStorage.setItem('Id', res.id);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('loginType', isEnterprise ? 'enterprise' : 'user');
      if (isEnterprise) {
        const data = res.data;
  localStorage.setItem('enterpriseId', res.enterpriseId);

}

      window.dispatchEvent(new Event('loginChange'));

      setSnackbar({
        open: true,
        message: '✅ Login successful!',
        severity: 'success',
      });

      setTimeout(() => {
  if (isEnterprise) {
    navigate('/enterprises');
  } else if (res.role ==='Admin')
  {
    navigate('/admin');
  }
  else {
    navigate('/home');
  }
}, 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.response?.data?.message || '❌ Login failed.',
        severity: 'error',
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left Panel */}
        <div className="login-left">
          <img src={StudyImage} alt="Study Illustration" className="login-image" />
          <Typography variant="h5" fontWeight={600} sx={{ color: '#E0E0E0' }}>
            Tecject = Technology + Project
          </Typography>
          <Typography variant="body2" className="login-subtext" sx={{ color: '#E0E0E0' }}>
            Empowering innovation through technology-driven projects
          </Typography>
        </div>

        {/* Right Panel */}
        <div className="login-right">
          <Typography component="h1" variant="h4" fontWeight={700}>
            TEC<span className="highlight">JECT</span>
          </Typography>

          {/* ✅ Toggle between User and Enterprise */}
          <ToggleButtonGroup
            value={isEnterprise ? 'enterprise' : 'user'}
            exclusive
            onChange={(e, value) => {
              if (value !== null) setIsEnterprise(value === 'enterprise');
            }}
            sx={{ my: 2 }}
          >
            <ToggleButton value="user">Student Login</ToggleButton>
            <ToggleButton value="enterprise">Enterprise Login</ToggleButton>
          </ToggleButtonGroup>

          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label={isEnterprise ? 'Enterprise Username' : 'Username or Email'}
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />

            <div className="forgot-link">
              <Link href="/forgot-password" variant="body2" color="primary">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth variant="contained" className="login-button">
              {isEnterprise ? 'Enterprise Sign In' : 'Sign In'}
            </Button>

            {!isEnterprise && (
              <>
                <Divider className="login-divider">or</Divider>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FcGoogle size={22} />}
                  className="google-button"
                  href="http://localhost:5202/api/auth/google-login"
                >
                  Sign in with Google
                </Button>
              </>
            )}

            <div className="create-account">
              <Typography variant="body2">
                Are you new?{' '}
                <Link href={isEnterprise ? '/enterprise-register' : '/register'} color="primary">
                  Create an Account
                </Link>
              </Typography>
              <Grid item xs={12} mt={2}>
                {isEnterprise && (<>
  <Button
    fullWidth
    variant="outlined"
    onClick={() => navigate('/EnterpriseRegister')}
  >
    Register Enterprise
  </Button>
  </>)}
</Grid>

            </div>
          </form>
        </div>
      </div>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '30px' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default Login;
