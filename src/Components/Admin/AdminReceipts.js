import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider
} from '@mui/material';
import { getAllReceipts } from '../../Services/ReceiptService';

export default function AdminReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const loadReceipts = async () => {
    try {
      const data = await getAllReceipts();
      setReceipts(data);
    } catch (error) {
      console.error("Failed to load receipts", error);
    }
  };

  useEffect(() => {
    loadReceipts();
  }, []);

  const handleView = (receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleClose = () => {
    setSelectedReceipt(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🧾 Admin - All Project Receipts
      </Typography>

      <Paper elevation={4} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Receipt ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price (₹)</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">No receipts found</TableCell>
              </TableRow>
            ) : (
              receipts.map((r) => (
                <TableRow key={r.receiptId}>
                  <TableCell>{r.receiptId}</TableCell>
                  <TableCell>{new Date(r.date).toLocaleString()}</TableCell>
                  <TableCell>{r.userId}</TableCell>
                  <TableCell>{r.projectName}</TableCell>
                  <TableCell>{r.projectType}</TableCell>
                  <TableCell>₹{r.priceQuoted}</TableCell>
                  <TableCell>
                    {r.paymentCompleted ? (
                      <span style={{ color: 'green' }}>✅ Paid</span>
                    ) : (
                      <span style={{ color: 'red' }}>❌ Not Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleView(r)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Receipt Detail Modal */}
      <Dialog open={!!selectedReceipt} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Receipt Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedReceipt && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Receipt ID: {selectedReceipt.receiptId}
              </Typography>
              <Typography>Date: {new Date(selectedReceipt.date).toLocaleString()}</Typography>
              <Typography>User ID: {selectedReceipt.userId}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography>Project: {selectedReceipt.projectName}</Typography>
              <Typography>Type: {selectedReceipt.projectType}</Typography>
              <Typography>Quoted Price: ₹{selectedReceipt.priceQuoted}</Typography>
              <Typography sx={{ mt: 1 }}>
                Payment Status: {selectedReceipt.paymentCompleted
                  ? <span style={{ color: 'green' }}>✅ Paid</span>
                  : <span style={{ color: 'red' }}>❌ Not Paid</span>}
              </Typography>

              {selectedReceipt.paymentProofBase64 && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Uploaded Payment Proof:</Typography>
                  <img
                    src={selectedReceipt.paymentProofBase64}
                    alt="Payment Screenshot"
                    style={{ width: '100%', borderRadius: 8, marginTop: 8 }}
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
