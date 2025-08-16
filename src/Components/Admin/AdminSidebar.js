import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Sidebar menu options with icons
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Enterprise Details', icon: <BusinessIcon /> },
  { text: 'Add Project', icon: <AddBoxIcon /> },
  { text: 'Update Project', icon: <EditIcon /> },
  { text: 'View Orders', icon: <VisibilityIcon /> },
  { text: 'Reports', icon: <AssessmentIcon /> },
  {text: 'Enterprises Purchase Details', icon:<AssessmentIcon/>}
];

/**
 * AdminSidebar component - Renders the permanent sidebar for the admin panel.
 *
 * Props:
 * - selected: currently selected menu item
 * - onSelect: function to handle selection changes
 */
const AdminSidebar = ({ selected, onSelect }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="#0D1B2A" sx={{ pb: 1 }}>
          ASPIREKART
        </Typography>
        <Typography variant="subtitle2" color="#1976D2">
          Admin Panel
        </Typography>
      </Box>

      <Divider />

      {/* Sidebar Navigation */}
      <List>
        {menuItems.map(({ text, icon }) => (
          <ListItem
            button
            key={text}
            onClick={() => onSelect(text)}
            selected={selected === text}
            sx={{
              backgroundColor: selected === text ? '#E3F2FD' : 'inherit',
              borderLeft: selected === text ? '4px solid #1976D2' : 'none',
              '&:hover': {
                backgroundColor: '#f5faff',
              },
            }}
          >
            <ListItemIcon sx={{ color: selected === text ? '#1976D2' : '#0D1B2A' }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontWeight: selected === text ? 'bold' : 'normal',
                color: selected === text ? '#0D1B2A' : '#333',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
