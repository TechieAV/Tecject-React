import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Paper,
  Link,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllEnterprisePurchases } from '../../Services/EnterpriseService';

export default function EnterprisePurchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getAllEnterprisePurchases().then(setPurchases);
  }, []);

  const subheadingStyle = {
    color: '#003366',
    fontWeight: 600,
    fontSize: '0.95rem',
    mb: 0.5,
  };

  const fieldRow = (label, value) => (
    <Typography sx={{ mb: 0.3, fontSize: '0.875rem' }}>
      <strong>{label}:</strong>{' '}
      <Typography component="span" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
        {value || 'N/A'}
      </Typography>
    </Typography>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Purchased Projects
      </Typography>

      {purchases.map((p) => (
        <Accordion key={p.purchaseId} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {p.enterprise?.companyName || 'Unknown Enterprise'}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 1.5 }}>
                  <Typography sx={subheadingStyle}>Enterprise Info</Typography>
                  {fieldRow('Company Name', p.enterprise?.companyName)}
                  {fieldRow('Enterprise ID', p.enterprise?.enterpriseId)}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 1.5 }}>
                  <Typography sx={subheadingStyle}>Purchase Info</Typography>
                  {fieldRow('Requirement', p.requirementDetails)}
                  {fieldRow('License Type', p.licenseType)}
                  {fieldRow('Paid', p.paymentCompleted ? '✅ Yes' : '❌ No')}
                  {fieldRow('NDA', p.ndaSigned ? '✅ Yes' : '❌ No')}
                  {fieldRow('Date', new Date(p.purchaseDate).toLocaleDateString())}
                  {fieldRow('Price', `₹${p.priceQuoted}`)}
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 1.5 }}>
                  <Typography sx={subheadingStyle}>Documents</Typography>
                  {p.ndaFileBase64 ? (
                    <Link
                      href={`data:application/pdf;base64,${p.ndaFileBase64}`}
                      download="NDA.pdf"
                      underline="hover"
                      sx={{ display: 'block', mb: 0.5, fontSize: '0.85rem' }}
                    >
                      📄 Download NDA
                    </Link>
                  ) : (
                    <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      NDA not uploaded
                    </Typography>
                  )}
                  {p.purchaseOrderBase64 ? (
                    <Link
                      href={`data:application/pdf;base64,${p.purchaseOrderBase64}`}
                      download="PurchaseOrder.pdf"
                      underline="hover"
                      sx={{ fontSize: '0.85rem' }}
                    >
                      📄 Download Purchase Order
                    </Link>
                  ) : (
                    <Typography color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      Purchase Order not uploaded
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
