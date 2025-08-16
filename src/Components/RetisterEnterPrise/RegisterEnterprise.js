import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { registerEnterprise } from '../../Services/EnterpriseService';

export default function RegisterEnterprise() {
  const [enterprise, setEnterprise] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setEnterprise({ ...enterprise, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await registerEnterprise(enterprise);
      alert('Enterprise registered!');
      setEnterprise({ name: '', contactPerson: '', email: '', phone: '', address: '' });
    } catch (err) {
      alert('Failed to register enterprise.');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Register Enterprise</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Enterprise Name" name="name" value={enterprise.name} onChange={handleChange} />
        <TextField label="Contact Person" name="contactPerson" value={enterprise.contactPerson} onChange={handleChange} />
        <TextField label="Email" name="email" value={enterprise.email} onChange={handleChange} />
        <TextField label="Phone" name="phone" value={enterprise.phone} onChange={handleChange} />
        <TextField label="Address" name="address" value={enterprise.address} onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit}>Register</Button>
      </Box>
    </Paper>
  );
}
