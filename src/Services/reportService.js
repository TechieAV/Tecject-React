import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/Report`;

export const getProjectPurchaseReport = async () => {
  try {
    const response = await axiosInstance.get(`${API_BASE}/project-purchases`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error; // surface to UI
  }
};
