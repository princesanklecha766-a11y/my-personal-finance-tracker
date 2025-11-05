
import React, { useState, useEffect } from 'react';
import { getTransactions, saveTransaction } from '../utils/storage';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: 'income', description: '', amount: '' });
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    const userTransactions = getTransactions();
    setTransactions(userTransactions);
    calculateSummary(userTransactions);
  }, []);

  const calculateSummary = (transactions) => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const balance = income - expenses;
    setSummary({ income, expenses, balance });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTransaction(form);
    const userTransactions = getTransactions();
    setTransactions(userTransactions);
    calculateSummary(userTransactions);
    setForm({ type: 'income', description: '', amount: '' });
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="summary">
        <div>
          <h3>Total Income</h3>
          <p>${summary.income.toFixed(2)}</p>
        </div>
        <div>
          <h3>Total Expenses</h3>
          <p>${summary.expenses.toFixed(2)}</p>
        </div>
        <div>
          <h3>Balance</h3>
          <p>${summary.balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="add-transaction">
        <h3>Add New Transaction</h3>
        <form onSubmit={handleSubmit}>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map(t => (
            <li key={t.id} className={t.type}>
              <span>{t.description}</span>
              <span>${parseFloat(t.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
