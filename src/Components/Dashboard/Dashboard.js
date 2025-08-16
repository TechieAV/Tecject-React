import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { getDashboardSummary, getMonthlySales, getRecentActivity } from '../../Services/DashboardService';
import './Dashboard.css'; // Make sure this path is correct

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, salesRes, activityRes] = await Promise.all([
          getDashboardSummary(),
          getMonthlySales(),
          getRecentActivity()
        ]);

        const summaryFormatted = [
          {
            label: 'Total Projects',
            value: summaryRes.totalProjects,
            icon: <InsightsIcon />,
            color: '#1976d2'
          },
          {
            label: 'Users',
            value: summaryRes.totalUsers,
            icon: <PeopleIcon />,
            color: '#9c27b0'
          },
          {
            label: 'Revenue (₹)',
            value: summaryRes.totalRevenue.toLocaleString(),
            icon: <AttachMoneyIcon />,
            color: '#2e7d32'
          }
        ];

        setSummary(summaryFormatted);
        setSalesData(salesRes);
        setRecentActivity(
          activityRes.map(a => `${a.description} on ${new Date(a.timestamp).toLocaleDateString()}`)
        );
      } catch (error) {
        console.error('Dashboard load error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box className="dashboard-container">
      <Typography className="dashboard-header">📊 Dashboard</Typography>

     <Grid container spacing={10} mx-auto className="summary-card-wrapper" alignItems="stretch">
  {summary.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card className="summary-card">
        <Avatar className="summary-avatar" style={{ backgroundColor: item.color }}>
          {item.icon}
        </Avatar>
        <CardContent className="summary-text">
          <Typography variant="h6">{item.label}</Typography>
          <Typography variant="h5">{item.value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

{/* 👇 Add extra spacing before the next section */}
<Grid container spacing={3} className="bottom-section-wrapper">
  <Grid item xs={12} md={8} mt={5}>
    <Card className="chart-card">
      <Typography className="chart-title" gutterBottom>
        Monthly Sales Overview
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </Grid>

  <Grid item xs={12} md={4} mt={5}>
    <Card className="activity-card">
      <Typography className="activity-title" gutterBottom>
        Recent Activity
      </Typography>
      <List dense className="activity-list">
        {recentActivity.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Card>
  </Grid>
</Grid>

    </Box>
  );
};

export default Dashboard;
