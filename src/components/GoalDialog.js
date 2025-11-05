import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const GOAL_TYPES = {
  SAVINGS: 'savings',
  DEBT_PAYMENT: 'debt_payment',
  INVESTMENT: 'investment',
  PURCHASE: 'purchase',
  OTHER: 'other',
};

const GoalDialog = ({ open, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    type: GOAL_TYPES.SAVINGS,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? 'Edit Goal' : 'Add New Goal'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Goal Title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="targetAmount"
                label="Target Amount"
                type="number"
                fullWidth
                value={formData.targetAmount}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="currentAmount"
                label="Current Amount"
                type="number"
                fullWidth
                value={formData.currentAmount}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Goal Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Goal Type"
                >
                  <MenuItem value={GOAL_TYPES.SAVINGS}>Savings</MenuItem>
                  <MenuItem value={GOAL_TYPES.DEBT_PAYMENT}>Debt Payment</MenuItem>
                  <MenuItem value={GOAL_TYPES.INVESTMENT}>Investment</MenuItem>
                  <MenuItem value={GOAL_TYPES.PURCHASE}>Purchase</MenuItem>
                  <MenuItem value={GOAL_TYPES.OTHER}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="deadline"
                label="Target Date"
                type="date"
                fullWidth
                value={formData.deadline}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Save Changes' : 'Add Goal'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GoalDialog;