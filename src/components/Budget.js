import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { financeManager, CATEGORIES } from '../utils/financeManager';
import BudgetDialog from './BudgetDialog';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BudgetCategory = ({ category, amount, spent }) => {
  const progress = (spent / amount) * 100;
  const remaining = amount - spent;

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {category}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(progress, 100)} 
          color={progress > 100 ? 'error' : 'primary'}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Budget
          </Typography>
          <Typography variant="body1">
            ${amount}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Spent
          </Typography>
          <Typography variant="body1">
            ${spent}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">
            Remaining
          </Typography>
          <Typography variant="body1" color={remaining < 0 ? 'error.main' : 'success.main'}>
            ${remaining}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBudget, setEditBudget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Get budgets and calculate their progress
    const budgetsWithProgress = financeManager.calculateBudgetProgress();
    setBudgets(budgetsWithProgress);
  }, []);

  const handleAddClick = () => {
    setEditBudget(null);
    setDialogOpen(true);
  };

  const handleSaveBudget = (data) => {
    try {
      if (editBudget) {
        financeManager.updateBudget(editBudget.id, data);
      } else {
        financeManager.addBudget(data);
      }
      setBudgets(financeManager.getBudgets());
      setSnackbar({
        open: true,
        message: `Budget ${editBudget ? 'updated' : 'added'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving budget: ' + error.message,
        severity: 'error'
      });
    }
  };

  // Prepare data for chart
  const chartData = budgets.map(budget => ({
    name: CATEGORIES[budget.category]?.name || budget.category,
    Budget: budget.amount,
    Spent: budget.spent || 0,
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Budget</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Budget
        </Button>
      </Box>

      {budgets.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No budgets set yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your first budget to start tracking your spending!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {budgets.map((budget) => (
            <Grid item xs={12} md={6} key={budget.id}>
              <BudgetCategory {...budget} />
            </Grid>
          ))}
        </Grid>
      )}

      <BudgetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveBudget}
        initialData={editBudget}
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

export default Budget;