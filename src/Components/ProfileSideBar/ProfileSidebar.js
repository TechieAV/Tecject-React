// src/components/ProfileSidebar.jsx
import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { getUserProfile, updateUserProfile } from '../../Services/userService';
import './ProfileSidebar.css';

const ProfileSidebar = ({ open, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const userId = localStorage.getItem('Id');

  useEffect(() => {
    if (open && userId) {
      fetchProfile();
    }
  }, [open, userId]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getUserProfile(userId);
      setProfileData(data);
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => setEditing((prev) => !prev);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(userId, formData);
      setEditing(false);
      fetchProfile();
      showSnackbar('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Update failed:', error);
      showSnackbar('Failed to update profile.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const hiddenFields = [
    'id',
    'password',
    'role',
    'refreshToken',
    'refreshTokenExpiry',
    'resetToken',
    'resetTokenExpiry',
  ];

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box className="profile-drawer" sx={{ width: 350, p: 2, backgroundColor: '#1e1e2f', color: 'white' }}>
          {/* Header */}
          <Box className="profile-header" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">My Profile</Typography>
            <Box>
              <IconButton aria-label="edit-profile" size="small" onClick={handleEditToggle}>
                <EditIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton onClick={onClose} size="small">
                <CloseIcon sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: 'gray', mb: 2 }} />

          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress size={28} sx={{ color: 'white' }} />
            </Box>
          ) : profileData ? (
            <>
              <List sx={{ px: 1 }}>
                {Object.entries(profileData).map(([key, value]) => {
                  if (hiddenFields.includes(key)) return null;

                  return (
                    <ListItem key={key} disableGutters sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      {editing ? (
                        <TextField
                          fullWidth
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          value={formData[key] || ''}
                          onChange={(e) => handleChange(key, e.target.value)}
                          InputLabelProps={{ style: { color: 'white' } }}
                          InputProps={{ style: { color: 'white' } }}
                          variant="outlined"
                          size="small"
                          sx={{
                          mb: 2,
                          '& .MuiOutlinedInput-root': {
                              boxShadow: '3px 3px 6px white',
                            borderRadius: '2px',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'white',
                          },
                        }}
                        />
                      ) : (
                        <ListItemText
                          primary={key.charAt(0).toUpperCase() + key.slice(1)}
                          secondary={value}
                          primaryTypographyProps={{ className: 'profile-label' }}
                          secondaryTypographyProps={{ className: 'profile-value' }}
                        />
                      )}
                    </ListItem>
                  );
                })}
              </List>

              {editing && (
                <Box textAlign="center" mt={2}>
                  <Button variant="contained" onClick={handleSave}
                  sx={{
                    backgroundColor:'#ffffff',
                    color: ' #191970',
                    fontWeight:'bold',
                    '&:hover':{
                      backgroundColor:'#e0e4e9ff',
                    },
                  }}>
                    Save
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <Typography color="white">No profile data.</Typography>
          )}
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileSidebar;
