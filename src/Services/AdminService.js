import axiosInstance from './axiosInstance';

import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/admin/projects`; // Update if different

export const uploadProject = async (formData) => {
  try {
    const response = await axiosInstance.post(API_BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// ✅ Get all projects
export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get(API_BASE);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

// ✅ Update a project by ID
export const updateProject = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`${API_BASE}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Failed to update project:', error);
    throw error;
  }
};

// ✅ Delete a project by ID
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete project:', error);
    throw error;
  }
};

// ✅ Get project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch project with ID ${id}:`, error);
    throw error;
  }
};
