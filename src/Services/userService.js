// src/Services/userService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/UserDetails`;

// Get user by ID
export const getUserProfile = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};
