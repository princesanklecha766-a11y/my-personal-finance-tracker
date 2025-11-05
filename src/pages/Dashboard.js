import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import Overview from '../components/Overview';
import Transactions from '../components/Transactions';
import Budget from '../components/Budget';
import Goals from '../components/Goals';
import Savings from '../components/Savings';
import Help from '../components/Help';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="goals" element={<Goals />} />
          <Route path="savings" element={<Savings />} />
          <Route path="help" element={<Help />} />
        </Routes>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;