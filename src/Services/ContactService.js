// src/services/contactService.js

import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/Contact`;

export const submitConnectForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/connect`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong";
  }
};
