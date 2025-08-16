import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { MenuItem } from '@mui/material';
import { uploadProject } from '../../Services/AdminService'; // Your existing service
import ProjectDomainDropdown from './ProjectDomainList'; // Your existing dropdown component

export default function AddProject() {
  const [project, setProject] = useState({
    ProjectName: '',
    ProjectDomain: '',
    ProjectRate: '',
    ProjectLevel: '',
    CurrentStatus: '',
    ProjectDescription: '',
    StackDescription: '',
    PreviewLink: '',
    DemoPic: null,
    SampleFile: null,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProject((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(project).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await uploadProject(formData);
      console.log(result);

      setSnackbar({ open: true, message: '✅ Project added successfully!', severity: 'success' });

      // Reset form
      setProject({
        ProjectName: '',
        ProjectDomain: '',
        ProjectRate: '',
        ProjectLevel: '',
        CurrentStatus: '',
        ProjectDescription: '',
        StackDescription: '',
        PreviewLink: '',
        DemoPic: null,
        SampleFile: null,
      });

      // Optional: clear file input values manually if needed
      document.getElementById('demo-pic').value = '';
      document.getElementById('sample-file').value = '';

    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: '❌ Failed to add project', severity: 'error' });
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, m: 'auto', p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Add New Project</Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Project Name"
          name="ProjectName"
          value={project.ProjectName}
          onChange={handleChange}
          margin="normal"
          required
        />

       <TextField
  select
  fullWidth
  label="Project Domain"
  name="ProjectDomain"
  value={project.ProjectDomain}
  onChange={handleChange}
  margin="normal"
  required
>
  {[
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Cloud Computing",
    "Web Development",
    "Dotnet Framework"
  ].map((domain, index) => (
    <MenuItem key={index} value={domain}>
      {domain}
    </MenuItem>
  ))}
</TextField>


        <TextField
          fullWidth
          label="Rate"
          name="ProjectRate"
          type="number"
          value={project.ProjectRate}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Level"
          name="ProjectLevel"
          value={project.ProjectLevel}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Status"
          name="CurrentStatus"
          value={project.CurrentStatus}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Project Description"
          name="ProjectDescription"
          value={project.ProjectDescription}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Stack Description"
          name="StackDescription"
          value={project.StackDescription}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Preview Link"
          name="PreviewLink"
          value={project.PreviewLink}
          onChange={handleChange}
          margin="normal"
        />

        <Typography variant="body2" sx={{ mt: 2 }}>Upload Demo Image</Typography>
        <input
          type="file"
          id="demo-pic"
          name="DemoPic"
          accept="image/*"
          onChange={handleChange}
          style={{ marginBottom: '16px' }}
        />

        <Typography variant="body2" sx={{ mt: 2 }}>Upload Sample File</Typography>
        <input
          type="file"
          id="sample-file"
          name="SampleFile"
          onChange={handleChange}
          style={{ marginBottom: '16px' }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
