import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SuccessDialog({
  open,
  onClose,
  onDownload,
  onViewReceipt
}) {
  return (
    <Dialog
  open={open}
  onClose={onClose}
  maxWidth={false} // Disable default maxWidth options
  PaperProps={{
    sx: {
      width: '380px',         // ✅ Custom width
      height: '400px',        // ✅ Custom height
      p: 3,
      borderRadius: 5,
      border: '2px solid #2ecc71',
      boxShadow: '0 4px 12px rgba(106, 202, 97, 0.25)',
      position: 'relative',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between' // Ensures layout spacing
    }
  }}
>

      {/* Close Icon */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#2ecc71',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#2ecc71',
          mt: 5,
        }}
      >
        🎉 Project purchase successful!
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ fontSize: '1rem', fontWeight: 500, mt: 1 }}>
          ⏳ You will receive your project within <strong>7 hours</strong>.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: 'column',
          gap: 1.2,
          mt: 1,
          pb: 2
        }}
      >
        <Button
          variant="outlined"
          color="success"
          sx={{ borderRadius: '30px', px: 3, fontWeight: 'bold' }}
          onClick={onViewReceipt}
        >
          View Receipt
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: '30px', px: 3, fontWeight: 'bold' }}
          onClick={onDownload}
        >
          Download Receipt
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={onClose}
          sx={{ fontWeight: 'bold' }}
        >
          Ok, Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
