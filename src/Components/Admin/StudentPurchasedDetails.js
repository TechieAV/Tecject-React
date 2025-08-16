import React, { useEffect, useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, IconButton, Tooltip,
  Box, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getAllStudentPurchases } from '../../Services/StudentPurchase';

export default function StudentPurchaseTable({ onEdit }) {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await getAllStudentPurchases();
      setPurchases(data || []);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ color: 'navy', mb: 2 }}>
        Student Purchase Details
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>College</strong></TableCell>
              <TableCell><strong>Year</strong></TableCell>
              <TableCell><strong>Course</strong></TableCell>
              <TableCell><strong>Project Type</strong></TableCell>
              <TableCell><strong>Project Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Payment</strong></TableCell>
              <TableCell><strong>Requirement</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.studentPurchaseId} hover>
                <TableCell>{purchase.userDetails?.name || 'N/A'}</TableCell>
                <TableCell>{purchase.collegeName || 'N/A'}</TableCell>
                <TableCell>{purchase.currentYear || 'N/A'}</TableCell>
                <TableCell>{purchase.interestedCourse || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={purchase.projectType}
                    color={
                      purchase.projectType === 'Main Project' ? 'primary'
                      : purchase.projectType === 'Mini Project' ? 'secondary'
                      : 'default'
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {purchase.projectType === 'Main Project'
                    ? (purchase.project?.projectName || 'N/A')
                    : purchase.project?.projectName || 'Manual Entry'}
                </TableCell>
                <TableCell>₹{purchase.priceQuoted || 0}</TableCell>
                <TableCell>
                  {purchase.paymentCompleted
                    ? <Chip label="Paid" color="success" size="small" />
                    : <Chip label="Pending" color="warning" size="small" />}
                </TableCell>
                <TableCell>{purchase.requirementDetails || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(purchase)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {purchases.length === 0 && (
              <TableRow>
                <TableCell colSpan={10}>
                  <Box textAlign="center" py={2}>
                    <Typography variant="body1" color="text.secondary">
                      No purchases available.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
