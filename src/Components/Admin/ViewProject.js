import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getAllProjects,
  deleteProject,
  updateProject
} from '../../Services/AdminService';

export default function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleView = (project) => {
    setEditMode(false);
    setSelectedProject(project);
    setFormData(project);
    setDialogOpen(true);
  };

  const handleEdit = (project) => {
    setEditMode(true);
    setSelectedProject(project);
    setFormData(project);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProject(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProject(formData.projectGuidId, formData);
      fetchProjects();
      handleDialogClose();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Projects
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Domain</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((proj) => (
            <TableRow key={proj.projectGuidId}>
              <TableCell>{proj.projectName}</TableCell>
              <TableCell>{proj.projectDomain}</TableCell>
              <TableCell>₹{proj.projectRate}</TableCell>
              <TableCell>{proj.projectLevel}</TableCell>
              <TableCell>{proj.currentStatus}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleView(proj)} color="primary">
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => handleEdit(proj)} color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(proj.projectGuidId)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View/Edit Modal */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? "Edit Project" : "Project Details"}</DialogTitle>
        <DialogContent dividers>
          {selectedProject && (
            <Grid container spacing={2}>
              {[
                { label: 'Name', key: 'projectName' },
                { label: 'Domain', key: 'projectDomain' },
                { label: 'Rate', key: 'projectRate', type: 'number' },
                { label: 'Level', key: 'projectLevel' },
                { label: 'Status', key: 'currentStatus' },
                { label: 'Sold Count', key: 'totalNumberOfTimeSold', type: 'number' },
                { label: 'Preview Link', key: 'previewLink' },
              ].map(({ label, key, type = 'text' }) => (
                <Grid item xs={6} key={key}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      label={label}
                      name={key}
                      value={formData[key] || ''}
                      type={type}
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography><strong>{label}:</strong> {selectedProject[key]}</Typography>
                  )}
                </Grid>
              ))}

              <Grid item xs={12}>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Description"
                    name="projectDescription"
                    multiline
                    rows={3}
                    value={formData.projectDescription || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography><strong>Description:</strong> {selectedProject.projectDescription}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Stack Description"
                    name="stackDescription"
                    multiline
                    rows={2}
                    value={formData.stackDescription || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <Typography><strong>Stack Description:</strong> {selectedProject.stackDescription}</Typography>
                )}
              </Grid>

              {selectedProject.demoPicBase64 && (
                <Grid item xs={6}>
                  <Typography><strong>Demo Image:</strong></Typography>
                  <img
                    src={`data:image/jpeg;base64,${selectedProject.demoPicBase64}`}
                    alt="Demo"
                    style={{ maxWidth: '100%', marginTop: '10px' }}
                  />
                </Grid>
              )}

              {selectedProject.sampleFileBase64 && (
                <Grid item xs={6}>
                  <Typography><strong>Sample File:</strong></Typography>
                  <a
                    href={`data:application/octet-stream;base64,${selectedProject.sampleFileBase64}`}
                    download="sample-file"
                  >
                    Download
                  </a>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {editMode && (
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Save
            </Button>
          )}
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
