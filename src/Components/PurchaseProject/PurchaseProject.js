import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, TextField, FormControlLabel,
  Checkbox, Button, Box, MenuItem, Dialog, Snackbar, Divider,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useLocation, useNavigate} from 'react-router-dom';
import { getAllProjects } from '../../Services/AdminService';
import { createStudentPurchase } from '../../Services/StudentPurchase';
import '../EnterprisesForm/EnterprisesForm.css'; // ✅ Reusing the design
import SuccessDialog from './SuccessDialog';
import { createReceipt } from '../../Services/ReceiptService';



export default function StudentPurchaseForm({ }) {
  const location = useLocation();
  const incomingProject = location?.state?.project;
  const userId=localStorage.getItem('Id');

  const [receiptMeta, setReceiptMeta] = useState({
  id: '',
  date: '',
  projectName: '',
  type: ''
});

  
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    projectId: '',
    customProjectName: '',
    collegeName: '',
    currentYear: '',
    interestedCourse: '',
    requirementDetails: '',
    priceQuoted: '',
    paymentCompleted: false,
    projectType: '',
    paymentScreenshot: null
    });
    const [receiptText, setReceiptText] = useState('');
const [viewReceiptOpen, setViewReceiptOpen] = useState(false);



    const navigate = useNavigate();
const [successMessageOpen, setSuccessMessageOpen] = useState(false);


  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  useEffect(() => {
    if (incomingProject) {
      setForm(prev => ({
        ...prev,
        projectType: 'Main Project',
        projectId: incomingProject.projectGuidId || '',
        priceQuoted: incomingProject.projectRate || ''
      }));
    }
  }, [incomingProject]);

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (files ? files[0] : value)
    }));
  };

  const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const handleDownloadReceipt = () => {
  // Generate a random receipt ID (e.g., RCT-20250726123456)
  const receiptId = `RCT-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;

  // Resolve project name based on type
  const projectName = form.projectType === 'Main Project'
    ? (projects.find(p => p.projectGuidId === form.projectId)?.projectName || 'Selected Project')
    : form.customProjectName || 'Custom Project';

  const receiptData = `
    🧾 Project Purchase Receipt 🧾

    Receipt ID       : ${receiptId}
    Date             : ${new Date().toLocaleString()}
    
   
    Project Name     : ${projectName}
     Project Type     : ${form.projectType}

    Price Quoted     : ₹${form.priceQuoted}
    Payment Completed: ${form.paymentCompleted ? '✅ Yes' : '❌ No'}

    Thank you for your purchase! We'll deliver your project within 7 hours.

    ~ ProjectDesk Team
  `;

  const blob = new Blob([receiptData], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${receiptId}_Receipt.txt`;
  link.click();
};


const handleViewReceipt = () => {
  const receiptId = `RCT-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;

  const projectName = form.projectType === 'Main Project'
    ? (projects.find(p => p.projectGuidId === form.projectId)?.projectName || 'Selected Project')
    : form.customProjectName || 'Custom Project';

  const receiptData = `
    🧾 Project Purchase Receipt 🧾

    Receipt ID       : ${receiptId}
    Date             : ${new Date().toLocaleString()}

    Project Name     : ${projectName}
    Project Type     : ${form.projectType}
    Price Quoted     : ₹${form.priceQuoted}
    Payment Completed: ${form.paymentCompleted ? '✅ Yes' : '❌ No'}

    Thank you for your purchase!
    We’ll deliver your project within 7 hours.

    ~ ProjectDesk Team
  `;

  // ✅ Set the receiptMeta used by the View dialog
  setReceiptMeta({
    id: receiptId,
    date: new Date().toLocaleString(),
    projectName,
    type: form.projectType,
  });

  setReceiptText(receiptData);
  setViewReceiptOpen(true);
};




const handleSubmit = async () => {
  if (!form.collegeName || !form.currentYear || !form.projectType) {
    alert('Please fill all required fields.');
    return;
  }

  if (form.projectType === 'Main Project' && !form.projectId) {
    alert('Please select a project.');
    return;
  }

  if (form.projectType !== 'Main Project' && !form.customProjectName) {
    alert('Please enter custom project name.');
    return;
  }
  try {
    let paymentBase64 = '';

    if (form.paymentCompleted && form.paymentScreenshot) {
      paymentBase64 = await convertToBase64(form.paymentScreenshot);
    }

    const payload = {
      id: userId, // from localStorage
      collegeName: form.collegeName,
      currentYear: form.currentYear,
      interestedCourse: form.interestedCourse,
      requirementDetails: form.requirementDetails,
      priceQuoted: parseFloat(form.priceQuoted),
      paymentCompleted: form.paymentCompleted,
      projectType: form.projectType,
      paymentBase64: paymentBase64,
      projectId: form.projectType === 'Main Project' ? form.projectId : null
    };

    // ✅ Create purchase first
    await createStudentPurchase(payload);

    // ✅ Then create receipt
    const receiptId = `RCT-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;

    const projectName =
      form.projectType === 'Main Project'
        ? (projects.find(p => p.projectGuidId === form.projectId)?.projectName || 'Selected Project')
        : form.customProjectName || 'Custom Project';

    const receipt = {
      receiptId,
      userId, // This is from localStorage
      date: new Date().toISOString(),
      projectName,
      projectType: form.projectType,
      priceQuoted: parseFloat(form.priceQuoted),
      paymentCompleted: form.paymentCompleted
    };

    await createReceipt(receipt);

    setSuccessMessageOpen(true);
  } catch (err) {
    console.error(err);
    alert('Purchase or receipt creation failed');
  }
};



  return (
    <div>
    <div className="form-background">
      <Paper className="glass-form" elevation={8}>
        <Typography variant="h5" color="white" gutterBottom>
          Student Project Purchase
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="College Name"
              name="collegeName"
              fullWidth
              value={form.collegeName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Current Year"
              name="currentYear"
              fullWidth
              value={form.currentYear}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Interested Course"
              name="interestedCourse"
              fullWidth
              value={form.interestedCourse}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Requirement Details"
              name="requirementDetails"
              fullWidth
              multiline
              rows={3}
              value={form.requirementDetails}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price Quoted"
              name="priceQuoted"
              type="number"
              fullWidth
              value={form.priceQuoted}
              onChange={handleChange}
              InputProps={{ readOnly: true }} 
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Project Type"
              name="projectType"
              fullWidth
              value={form.projectType}
              onChange={handleChange}
              required
            >
              {['Mini Project', 'Main Project', 'Freelance'].map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {form.projectType === 'Main Project' ? (
            <Grid item xs={12}>
              <TextField
                select
                label="Select Project"
                name="projectId"
                fullWidth
                value={form.projectId}
                InputProps={{ readOnly: true }} 
                onChange={handleChange}
                required
              >
                {projects.map(project => (
                  <MenuItem key={project.projectGuidId} value={project.projectGuidId}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                label="Project Name"
                name="customProjectName"
                fullWidth
                value={form.customProjectName}
                 InputProps={{ readOnly: true }} 
                onChange={handleChange}
                required
              />
            </Grid>
          )}

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

          {form.paymentCompleted && (
            <Grid item xs={12}>
              <Typography variant="body2">Upload Payment Screenshot</Typography>
              <input
                type="file"
                name="paymentScreenshot"
                accept="image/*"
                onChange={handleChange}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Submit Purchase
            </Button>
          </Grid>
        </Grid>
      </Paper>

     


    </div>
      <div className="form-background">
      {/* Your form content here */}
      
   <SuccessDialog
  open={successMessageOpen}
  onClose={() => setSuccessMessageOpen(false)}
  onDownload={handleDownloadReceipt}
  onViewReceipt={handleViewReceipt}
/>
<Dialog
  open={viewReceiptOpen}
  onClose={() => setViewReceiptOpen(false)}
  maxWidth="xs"
  fullWidth
  PaperProps={{
    sx: {
      p: 3,
      borderRadius: 4,
      border: '2px solid #2ecc71',
      boxShadow: '0 4px 20px rgba(46, 204, 113, 0.3)',
      backgroundColor: '#fff',
    }
  }}
>
  <DialogTitle
    sx={{
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#2ecc71',
      pb: 0
    }}
  >
    🧾 Project Receipt
  </DialogTitle>

  <DialogContent sx={{ mt: 1 }}>
    <Typography variant="body2" color="textSecondary" align="center">
      Receipt ID: <strong>{receiptMeta.id}</strong><br />
      Date: {receiptMeta.date}
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Box sx={{ mb: 1 }}>
      <Typography><strong>Project Name:</strong> {receiptMeta.projectName}</Typography>
      <Typography><strong>Project Type:</strong> {receiptMeta.type}</Typography>
      <Typography><strong>Price Quoted:</strong> ₹{form.priceQuoted}</Typography>
      <Typography>
        <strong>Payment Completed:</strong>{' '}
        {form.paymentCompleted ? (
          <span style={{ color: 'green' }}>✅ Yes</span>
        ) : (
          <span style={{ color: 'red' }}>❌ No</span>
        )}
      </Typography>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Typography align="center" sx={{ fontStyle: 'italic', color: 'gray' }}>
      Thank you for your purchase! We’ll deliver your project within <strong>7 hours</strong>.
    </Typography>

    <Typography
      variant="caption"
      align="center"
      display="block"
      sx={{ mt: 2, color: '#aaa' }}
    >
      — ProjectDesk Team —
    </Typography>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
    <Button onClick={() => setViewReceiptOpen(false)} variant="contained" color="success">
      Close
    </Button>
  </DialogActions>
</Dialog>


    </div>
    </div>
  );
}
