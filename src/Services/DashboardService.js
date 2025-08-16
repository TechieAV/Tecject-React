import axios from 'axios';
import axiosInstance from './axiosInstance';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/Dashboard`; // adjust if needed

export const getDashboardSummary = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/summary`);
  return response.data;
};

export const getMonthlySales = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/sales`);
  return response.data;
};

export const getRecentActivity = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/activity`);
  return response.data;
};
