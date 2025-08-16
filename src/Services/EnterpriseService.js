import axios from 'axios';
import axiosInstance from './axiosInstance';


const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/enterprises`;

export const registerEnterprise = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};


export const getAllEnterprises = async () => {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
};

export const purchaseProject = async (formData) => {
  return axiosInstance.post(`${BASE_URL}/purchase`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllEnterprisePurchases = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/purchases`);
  return res.data;
};

export const enterpriseLogin = async (username, password) => {
  const response = await axios.post('http://localhost:5202/api/enterprises/login', {
    userName : username,
    password : password,
  });
  return response.data;
};

