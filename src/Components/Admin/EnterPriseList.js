import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllEnterprises } from '../../Services/EnterpriseService';

export default function EnterpriseList() {
  const [enterprises, setEnterprises] = useState([]);

  useEffect(() => {
    getAllEnterprises().then(setEnterprises);
  }, []);

  const subheadingStyle = {
    color: '#003366',
    fontWeight: 600,
    mb: 1,
  };

  const fieldRow = (label, value) => (
    <Typography sx={{ mb: 0.5 }}>
      <strong>{label}:</strong>{' '}
      <Typography component="span" color="text.secondary">{value || 'N/A'}</Typography>
    </Typography>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Enterprises
      </Typography>

      {enterprises.map((e) => (
        <Accordion key={e.enterpriseId} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{e.companyName}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              {/* Contact Info */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={subheadingStyle}>Contact Information</Typography>
                  {fieldRow('Name', e.contactPersonName)}
                  {fieldRow('Email', e.contactEmail)}
                  {fieldRow('Phone', e.contactPhone)}
                  {fieldRow('Designation', e.designation)}
                </Paper>
              </Grid>

              {/* Company Info */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={subheadingStyle}>Company Details</Typography>
                  {fieldRow('Type', e.companyType)}
                  {fieldRow('Industry', e.industry)}
                  {fieldRow('Registration ', e.registrationNumber)}
                  {fieldRow('Website', e.websiteUrl)}
                </Paper>
              </Grid>

              {/* Address Info */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={subheadingStyle}>Address</Typography>
                  {fieldRow('Company Address', e.companyAddress)}
                  {fieldRow('Billing Address', e.billingAddress)}
                  {fieldRow('Location', `${e.city}, ${e.state}, ${e.country} - ${e.zipCode}`)}
                </Paper>
              </Grid>

              {/* Tax Info */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography sx={subheadingStyle}>Tax Information</Typography>
                  {fieldRow('GSTIN', e.gstin)}
                  {fieldRow('PAN', e.pan)}
                </Paper>
              </Grid>

              {/* Purchases */}
              {e.purchases?.length > 0 && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography sx={subheadingStyle}>Purchases</Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Project</strong></TableCell>
                          <TableCell><strong>Requirement</strong></TableCell>
                          <TableCell><strong>Price</strong></TableCell>
                          <TableCell><strong>Paid</strong></TableCell>
                          <TableCell><strong>Reached By</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {e.purchases.map((p) => (
                          <TableRow key={p.purchaseId}>
                            <TableCell>{p.project?.projectName}</TableCell>
                            <TableCell>{p.requirementDetails}</TableCell>
                            <TableCell>₹{p.priceQuoted}</TableCell>
                            <TableCell>{p.paymentCompleted ? '✅' : '❌'}</TableCell>
                            <TableCell>{p.licenseType}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
