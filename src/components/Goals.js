import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { financeManager } from '../utils/financeManager';
import GoalDialog from './GoalDialog';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const GoalCard = ({ title, targetAmount, currentAmount, deadline }) => {
  const progress = (currentAmount / targetAmount) * 100;
  const remaining = targetAmount - currentAmount;
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={Math.min(progress, 100)}
          size={80}
          color={progress >= 100 ? 'success' : 'primary'}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" component="div" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Target
          </Typography>
          <Typography variant="body1">
            ${targetAmount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Saved
          </Typography>
          <Typography variant="body1">
            ${currentAmount}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Remaining
          </Typography>
          <Typography variant="body1">
            ${remaining}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Days Left
          </Typography>
          <Typography variant="body1">
            {daysLeft}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editGoal, setEditGoal] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Get goals and calculate their progress
    const currentGoals = financeManager.getGoals();
    setGoals(currentGoals);
  }, []);

  const updateGoalsList = () => {
    const updatedGoals = financeManager.getGoals();
    setGoals(updatedGoals);
  };

  const handleAddClick = () => {
    setEditGoal(null);
    setDialogOpen(true);
  };

  const handleSaveGoal = (data) => {
    try {
      if (editGoal) {
        financeManager.updateGoal(editGoal.id, data);
      } else {
        financeManager.addGoal(data);
      }
      setDialogOpen(false);
      updateGoalsList();
      setSnackbar({
        open: true,
        message: `Goal ${editGoal ? 'updated' : 'added'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving goal: ' + error.message,
        severity: 'error'
      });
    }
  };

  // Prepare data for pie chart
  const chartData = goals.map(goal => ({
    name: goal.title,
    value: goal.currentAmount,
    target: goal.targetAmount,
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Financial Goals</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Goal
        </Button>
      </Box>

      {goals.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No goals set yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set your first financial goal to start tracking your progress!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {goals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard {...goal} />
            </Grid>
          ))}
        </Grid>
      )}

      <GoalDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveGoal}
        initialData={editGoal}
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

export default Goals;