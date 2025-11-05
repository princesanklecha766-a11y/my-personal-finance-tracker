import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { financeManager } from '../utils/financeManager';
import SavingsDialog from './SavingsDialog';

const SavingsCard = ({ title, amount, category, date }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" color="primary" gutterBottom>
        ${amount}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {category}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Date: {new Date(date).toLocaleDateString()}
      </Typography>
    </CardContent>
  </Card>
);

const SavingsCalculator = () => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Typography variant="h6" gutterBottom>
      Savings Calculator
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
      Calculate how your savings can grow over time with regular deposits and compound interest.
    </Typography>
    {/* TODO: Add calculator form */}
  </Paper>
);

const Savings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Get real data from financeManager
  const savings = financeManager.getFinancialSummary();
  const savingsData = {
    total: savings.savings || 0,
    monthly: savings.income ? (savings.income * 0.2) : 0, // 20% of income
    interest: 2.5, // This could be configurable in the future
  };

  const handleAddClick = () => {
    setEditEntry(null);
    setDialogOpen(true);
  };

  const handleSaveSavings = (data) => {
    try {
      if (editEntry) {
        // Update existing entry
        financeManager.updateTransaction({
          ...data,
          type: 'savings',
          id: editEntry.id,
        });
      } else {
        // Add new entry
        financeManager.addTransaction({
          ...data,
          type: 'savings',
        });
      }
      setSnackbar({
        open: true,
        message: `Savings entry ${editEntry ? 'updated' : 'added'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving entry: ' + error.message,
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Savings</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Savings Entry
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SavingsCalculator />
        </Grid>

        <Grid item xs={12} md={4}>
          <SavingsCard
            title="Total Savings"
            amount={savingsData.total}
            category="All"
            date={new Date()}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SavingsCard
            title="Monthly Average"
            amount={savingsData.monthly}
            category="Monthly"
            date={new Date()}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SavingsCard
            title="Interest Rate"
            amount={savingsData.interest}
            category="APY"
            date={new Date()}
          />
        </Grid>
      </Grid>

      <SavingsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveSavings}
        initialData={editEntry}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Savings;