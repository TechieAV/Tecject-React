import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getProjectPurchaseReport } from '../../Services/reportService';


const ReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'purchaseType', headerName: 'Type', width: 120 },
    { field: 'purchaserName', headerName: 'Purchaser', width: 180 },
    { field: 'purchaserType', headerName: 'Role', width: 130 },
    { field: 'collegeOrCompany', headerName: 'Institution', width: 200 },
    { field: 'projectName', headerName: 'Project', width: 200 },
    { field: 'projectType', headerName: 'Category', width: 140 },
    {
      field: 'priceQuoted',
      headerName: 'Price (₹)',
      width: 120,
      type: 'number',
      valueFormatter: ({ value }) => `₹${value}`
    },
    {
      field: 'paymentCompleted',
      headerName: 'Paid',
      width: 100,
      renderCell: (params) => (
        params.value ? '✅' : '❌'
      ),
    },
    {
      field: 'requirementDetails',
      headerName: 'Requirements',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'purchaseDate',
      headerName: 'Date',
      width: 160,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    getProjectPurchaseReport()
      .then(data => setReportData(data.map((row, index) => ({ id: index + 1, ...row }))))
      .catch(err => console.error('Failed to load report', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📊 Project Purchase Report
      </Typography>

      <Paper elevation={4} sx={{ p: 2, mt: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={reportData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
             sx={{
    borderRadius: 2,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#1976d2',
      color: 'black',
      fontWeight: 'bold',
      minHeight: '56px',
      maxHeight: '56px',
    },
    '& .MuiDataGrid-cell': {
      minHeight: '52px',
      maxHeight: '52px',
      alignItems: 'center',
    },
    '& .MuiDataGrid-row': {
      maxHeight: '52px !important',
    },
  }}
            />
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default ReportPage;
