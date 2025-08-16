// Services/ReceiptService.js
import axios from 'axios';
import axiosInstance from './axiosInstance';

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/Receipt`; // Replace with your backend URL

export const createReceipt = async (receipt) => {
  const response = await axiosInstance.post(`${BASE_URL}/create`, receipt);
  return response.data;
};

export const getReceiptById = async (receiptId) => {
  const response = await axiosInstance.get(`${BASE_URL}/${receiptId}`);
  return response.data;
};

// Add this function if not already present
export const getReceiptsByUser = async (userId)  => {
  const response = await axiosInstance.get(`${BASE_URL}?userId=${userId}`);
  return response.data;
};

export const updateReceiptPayment = async (receiptId, updatedData) => {
  const response = await axiosInstance.put(`${BASE_URL}/update-payment/${receiptId}`, updatedData);
  return response.data;
};

export const getAllReceipts = async () => {
  const response = await axiosInstance.get(`${BASE_URL}`);
  return response.data;
};
