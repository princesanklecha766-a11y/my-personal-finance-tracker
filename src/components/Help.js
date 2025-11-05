import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Link,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

const HelpSection = ({ title, children }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
);

const Help = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Help & Documentation
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HelpIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h5">
                Getting Started
              </Typography>
            </Box>
            <Typography paragraph>
              Welcome to your Personal Finance Tracker! This guide will help you understand
              how to use all the features effectively to manage your finances.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <HelpSection title="Transactions">
            <Typography paragraph>
              The Transactions section helps you track your income and expenses:
            </Typography>
            <ul>
              <li>Add new transactions with the "Add Transaction" button</li>
              <li>Categorize transactions as income or expense</li>
              <li>View your transaction history</li>
              <li>Edit or delete existing transactions</li>
            </ul>
          </HelpSection>

          <HelpSection title="Budget">
            <Typography paragraph>
              Create and manage your budgets:
            </Typography>
            <ul>
              <li>Set monthly budgets for different categories</li>
              <li>Track spending against your budget</li>
              <li>Get alerts when you're close to your budget limit</li>
              <li>View budget progress with visual indicators</li>
            </ul>
          </HelpSection>

          <HelpSection title="Goals">
            <Typography paragraph>
              Set and track your financial goals:
            </Typography>
            <ul>
              <li>Create specific, measurable financial goals</li>
              <li>Track progress towards your goals</li>
              <li>Set target dates and amounts</li>
              <li>View goal completion predictions</li>
            </ul>
          </HelpSection>

          <HelpSection title="Savings">
            <Typography paragraph>
              Monitor and plan your savings:
            </Typography>
            <ul>
              <li>Track your total savings</li>
              <li>Use the savings calculator to plan future savings</li>
              <li>Set up savings categories</li>
              <li>View savings growth projections</li>
            </ul>
          </HelpSection>

          <HelpSection title="Data Management">
            <Typography paragraph>
              Your data is stored locally in your browser:
            </Typography>
            <ul>
              <li>All data is saved automatically</li>
              <li>Export your data for backup</li>
              <li>Import previously exported data</li>
              <li>Your data remains private and secure</li>
            </ul>
          </HelpSection>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Need More Help?
            </Typography>
            <Typography paragraph>
              If you need additional assistance or want to learn more about personal finance,
              check out these resources:
            </Typography>
            <ul>
              <li>
                <Link href="https://www.investopedia.com" target="_blank" rel="noopener">
                  Investopedia - Financial Education
                </Link>
              </li>
              <li>
                <Link href="https://www.nerdwallet.com" target="_blank" rel="noopener">
                  NerdWallet - Personal Finance Articles
                </Link>
              </li>
              <li>
                <Link href="https://www.reddit.com/r/personalfinance" target="_blank" rel="noopener">
                  r/personalfinance - Community Discussion
                </Link>
              </li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Help;