import { storage, STORAGE_KEYS } from './storage';

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

// Category Types
export const CATEGORIES = {
  // Income categories
  SALARY: { id: 'salary', name: 'Salary', type: TRANSACTION_TYPES.INCOME },
  FREELANCE: { id: 'freelance', name: 'Freelance', type: TRANSACTION_TYPES.INCOME },
  INVESTMENTS: { id: 'investments', name: 'Investments', type: TRANSACTION_TYPES.INCOME },
  OTHER_INCOME: { id: 'other_income', name: 'Other Income', type: TRANSACTION_TYPES.INCOME },

  // Expense categories
  HOUSING: { id: 'housing', name: 'Housing', type: TRANSACTION_TYPES.EXPENSE },
  FOOD: { id: 'food', name: 'Food & Dining', type: TRANSACTION_TYPES.EXPENSE },
  TRANSPORTATION: { id: 'transportation', name: 'Transportation', type: TRANSACTION_TYPES.EXPENSE },
  UTILITIES: { id: 'utilities', name: 'Utilities', type: TRANSACTION_TYPES.EXPENSE },
  HEALTHCARE: { id: 'healthcare', name: 'Healthcare', type: TRANSACTION_TYPES.EXPENSE },
  ENTERTAINMENT: { id: 'entertainment', name: 'Entertainment', type: TRANSACTION_TYPES.EXPENSE },
  SHOPPING: { id: 'shopping', name: 'Shopping', type: TRANSACTION_TYPES.EXPENSE },
  OTHER_EXPENSE: { id: 'other_expense', name: 'Other Expense', type: TRANSACTION_TYPES.EXPENSE },
};

// Finance data management functions
export const financeManager = {
  // Transactions
  getTransactions: () => {
    return storage.get(STORAGE_KEYS.TRANSACTIONS) || [];
  },

  addTransaction: (transaction) => {
    const transactions = financeManager.getTransactions();
    const newTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...transaction,
    };
    transactions.push(newTransaction);
    storage.set(STORAGE_KEYS.TRANSACTIONS, transactions);
    return newTransaction;
  },

  updateTransaction: (id, updates) => {
    const transactions = financeManager.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    transactions[index] = { ...transactions[index], ...updates };
    storage.set(STORAGE_KEYS.TRANSACTIONS, transactions);
    return true;
  },

  deleteTransaction: (id) => {
    const transactions = financeManager.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    storage.set(STORAGE_KEYS.TRANSACTIONS, filtered);
    return true;
  },

  // Goals
  getGoals: () => {
    return storage.get(STORAGE_KEYS.GOALS) || [];
  },

  addGoal: (goal) => {
    const goals = financeManager.getGoals();
    const newGoal = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      progress: 0,
      ...goal,
    };
    goals.push(newGoal);
    storage.set(STORAGE_KEYS.GOALS, goals);
    return newGoal;
  },

  updateGoal: (id, updates) => {
    const goals = financeManager.getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index === -1) return false;
    
    goals[index] = { ...goals[index], ...updates };
    storage.set(STORAGE_KEYS.GOALS, goals);
    return true;
  },

  deleteGoal: (id) => {
    const goals = financeManager.getGoals();
    const filtered = goals.filter(g => g.id !== id);
    storage.set(STORAGE_KEYS.GOALS, filtered);
    return true;
  },

  // Budgets
  getBudgets: () => {
    return storage.get(STORAGE_KEYS.BUDGETS) || [];
  },

  calculateBudgetProgress: () => {
    const budgets = financeManager.getBudgets();
    const transactions = financeManager.getTransactions();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return budgets.map(budget => {
      const spent = transactions
        .filter(t => {
          const date = new Date(t.date);
          return t.category === budget.category &&
                 t.type === TRANSACTION_TYPES.EXPENSE &&
                 date.getMonth() === currentMonth &&
                 date.getFullYear() === currentYear;
        })
        .reduce((total, t) => total + t.amount, 0);

      return {
        ...budget,
        spent,
      };
    });
  },

  addBudget: (budget) => {
    const budgets = financeManager.getBudgets();
    const newBudget = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      spent: 0,
      ...budget,
    };
    budgets.push(newBudget);
    storage.set(STORAGE_KEYS.BUDGETS, budgets);
    return newBudget;
  },

  updateBudget: (id, updates) => {
    const budgets = financeManager.getBudgets();
    const index = budgets.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    budgets[index] = { ...budgets[index], ...updates };
    storage.set(STORAGE_KEYS.BUDGETS, budgets);
    return true;
  },

  deleteBudget: (id) => {
    const budgets = financeManager.getBudgets();
    const filtered = budgets.filter(b => b.id !== id);
    storage.set(STORAGE_KEYS.BUDGETS, filtered);
    return true;
  },

  // Summary calculations
  getFinancialSummary: () => {
    const transactions = financeManager.getTransactions();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filter transactions for current month
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Calculate totals
    const summary = monthlyTransactions.reduce((acc, t) => {
      if (t.type === TRANSACTION_TYPES.INCOME) {
        acc.income += t.amount;
      } else if (t.type === 'savings') {
        acc.savings += t.amount;
      } else {
        acc.expenses += t.amount;
      }
      return acc;
    }, { income: 0, expenses: 0, savings: 0 });

    summary.balance = summary.income - summary.expenses;
    if (!summary.savings) {
      summary.savings = summary.income * 0.2; // Assuming 20% savings goal if no savings transactions
    }

    return summary;
  },
};

export default financeManager;