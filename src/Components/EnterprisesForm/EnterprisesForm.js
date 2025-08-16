import React, { useState } from 'react';
import {
  Grid, Paper, Typography, TextField, FormControlLabel,
  Checkbox, Button, Box
} from '@mui/material';
import './EnterprisesForm.css'; // import external CSS
import { purchaseProject } from '../../Services/EnterpriseService';

export default function EnterprisesForm({ enterpriseId : propEnterpriseId }) {
  const [form, setForm] = useState({
    projectName: '',
    licenseType: '',
    requirementDetails: '',
    priceQuoted: '',
    ndaSigned: false,
    paymentCompleted: false,
    ndaFile: null,
      paymentScreenshot: null,
    enterpriseName: '',
  });
  const enterpriseId = localStorage.getItem('enterpriseId')

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (files ? files[0] : value)
    }));
  };

 const handleSubmit = async () => {
  const missingFields = [];
  if (!form.enterpriseName) missingFields.push("Enterprise Name");
  if (!form.projectName) missingFields.push("Project Name");
  if (!form.requirementDetails) missingFields.push("Requirement Details");
  if (!form.priceQuoted) missingFields.push("Price Quoted");

  if (missingFields.length > 0) {
    alert(`Please fill the following required field(s):\n- ${missingFields.join("\n- ")}`);
    return;
  }

  const enterpriseId = localStorage.getItem('enterpriseId');

  if (!enterpriseId) {
    alert("User ID (EnterpriseId) not found in localStorage.");
    return;
  }

  const formData = new FormData();
  formData.append('EnterpriseId', enterpriseId);
  formData.append('EnterpriseName', form.enterpriseName);
  formData.append('ProjectName', form.projectName);
  formData.append('LicenseType', form.licenseType);
  formData.append('RequirementDetails', form.requirementDetails);
  formData.append('PriceQuoted', form.priceQuoted);
  formData.append('NDASigned', form.ndaSigned);
  formData.append('PaymentCompleted', form.paymentCompleted);
  formData.append('NdaFile', form.ndaFile);
formData.append('PurchaseOrder', form.paymentScreenshot); // ✅ exact match to C# DTO
;
 

  try {
    await purchaseProject(formData);
    alert('Purchase submitted successfully!');
  } catch (err) {
    alert('Submission failed. See console for details.');
    console.error(err);
  }
};


  return (
    <div className="form-background">
      <Paper className="glass-form" elevation={8}>
        <Typography variant="h5" color="white" gutterBottom>
          Enterprise Project Purchase
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Enterprise Name"
              fullWidth
              required
              name="enterpriseName"
              value={form.enterpriseName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Project Name"
              fullWidth
              required
              name="projectName"
              value={form.projectName}
              onChange={handleChange}
              helperText="Enter manually"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="License Type"
              fullWidth
              name="licenseType"
              value={form.licenseType}
              onChange={handleChange}
              placeholder="Linked / Unlimited / Exclusive"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price Quoted"
              fullWidth
              required
              name="priceQuoted"
              type="number"
              value={form.priceQuoted}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Requirement Details"
              fullWidth
              required
              multiline
              rows={3}
              name="requirementDetails"
              value={form.requirementDetails}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.ndaSigned}
                  onChange={handleChange}
                  name="ndaSigned"
                />
              }
              label="NDA Signed"
            />
            <input
              type="file"
              name="ndaFile"
              accept=".pdf,image/*"
              onChange={handleChange}
              style={{ marginTop: 8 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.paymentCompleted}
                  onChange={handleChange}
                  name="paymentCompleted"
                />
              }
              label="Payment Completed"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Upload PaymentScreenshot 
            </Typography>
            <input
              type="file"
              name="paymentScreenshot"
              accept=".pdf,image/*"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
            >
              Submit Purchase
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
