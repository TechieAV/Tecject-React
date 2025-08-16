import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Divider, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getReceiptsByUser, updateReceiptPayment } from '../../Services/ReceiptService';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function StudentReceipts() {
  const userId = localStorage.getItem('Id');
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [uploadingFor, setUploadingFor] = useState(null);
  const [paymentProof, setPaymentProof] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (userId) {
      loadReceipts();
    }
  }, [userId]);

  const loadReceipts = async () => {
    const res = await getReceiptsByUser(userId);
    setReceipts(res);
  };

  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleClose = () => {
    setSelectedReceipt(null);
  };

  const handlePayNow = (receipt) => {
    setUploadingFor(receipt);
    setPaymentDialog(true);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleUploadPayment = async () => {
    if (!paymentProof) return alert("Please upload a screenshot");

    const base64 = await convertToBase64(paymentProof);

    await updateReceiptPayment(uploadingFor.receiptId, {
      priceQuoted: uploadingFor.priceQuoted,
      paymentCompleted: true,
      paymentProofBase64: base64
    });

    setPaymentDialog(false);
    setPaymentProof(null);
    setUploadingFor(null);
    await loadReceipts();
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
        Your Project Receipts
      </Typography>

      <Paper elevation={3} sx={{ mt: 2, overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Receipt ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No receipts found</TableCell>
              </TableRow>
            ) : (
              receipts.map((r) => (
                <TableRow key={r.receiptId}>
                  <TableCell>{r.receiptId}</TableCell>
                  <TableCell>{new Date(r.date).toLocaleString()}</TableCell>
                  <TableCell>{r.projectName}</TableCell>
                  <TableCell>{r.projectType}</TableCell>
                  <TableCell>₹{r.priceQuoted}</TableCell>
                  <TableCell>
                    {r.paymentCompleted ? (
                      <span style={{ color: 'green' }}>✅ Paid</span>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handlePayNow(r)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" onClick={() => handleView(r)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Receipt View Dialog */}
      <Dialog open={!!selectedReceipt} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2ecc71' }}>
          🧾 Receipt Details
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          {selectedReceipt && (
            <>
              <Typography align="center" color="textSecondary" variant="body2">
                Receipt ID: <strong>{selectedReceipt.receiptId}</strong><br />
                Date: {new Date(selectedReceipt.date).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography><strong>Project Name:</strong> {selectedReceipt.projectName}</Typography>
              <Typography><strong>Project Type:</strong> {selectedReceipt.projectType}</Typography>
              <Typography><strong>Price Quoted:</strong> ₹{selectedReceipt.priceQuoted}</Typography>
              <Typography>
                <strong>Payment Completed:</strong>{' '}
                {selectedReceipt.paymentCompleted ? (
                  <span style={{ color: 'green' }}>✅ Yes</span>
                ) : (
                  <span style={{ color: 'red' }}>❌ No</span>
                )}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography align="center" sx={{ fontStyle: 'italic', color: 'gray' }}>
                Thank you for your purchase!<br />
                Your project will be delivered within 7 hours.
              </Typography>
              <Typography variant="caption" align="center" display="block" sx={{ mt: 2, color: '#aaa' }}>
                — ProjectDesk Team —
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: isMobile ? "column" : "row", gap: 1, p: 2 }}>
          <Button fullWidth={isMobile} onClick={handleClose} variant="contained" color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pay Now Dialog */}
      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Pay Now
          <IconButton onClick={() => setPaymentDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', px: { xs: 2, sm: 3 } }}>
          <img
            src="/qr-code-placeholder.png"
            alt="QR Code"
            style={{ width: '100%', maxWidth: '300px', marginBottom: '1rem', borderRadius: 8 }}
          />
          <Typography variant="body2" gutterBottom>
            Scan the QR and upload your payment screenshot below.
          </Typography>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPaymentProof(e.target.files[0])}
            style={{ marginTop: '0.5rem' }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: isMobile ? "column" : "row", gap: 1, p: 2 }}>
          <Button fullWidth={isMobile} onClick={() => setPaymentDialog(false)}>Cancel</Button>
          <Button
            fullWidth={isMobile}
            variant="contained"
            onClick={handleUploadPayment}
            disabled={!paymentProof}
          >
            Upload & Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
