import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`; 

// Login API
export const login = async (username, password) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/Auth/login`, { username, password });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/Auth/forgot-password`, { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (email, resetToken, newPassword) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/Auth/reset-password`, {
    email,
    resetToken,
    newPassword,
  });
  return response.data;
};

// Refresh Token
export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post(`${API_BASE_URL}/Auth/refresh-token`, { refreshToken });
  return response.data;
};

export const registerUser = async (userData) => {
  return axiosInstance.post(`${API_BASE_URL}/UserDetails/register`, userData);
};