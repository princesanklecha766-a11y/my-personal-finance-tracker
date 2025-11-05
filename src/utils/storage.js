// Local storage keys
export const STORAGE_KEYS = {
  USER: 'finance_tracker_user',
  TRANSACTIONS: 'finance_tracker_transactions',
  GOALS: 'finance_tracker_goals',
  BUDGETS: 'finance_tracker_budgets',
};

// Storage utility functions
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Data export/import functions
export const exportData = () => {
  const data = {
    user: storage.get(STORAGE_KEYS.USER),
    transactions: storage.get(STORAGE_KEYS.TRANSACTIONS),
    goals: storage.get(STORAGE_KEYS.GOALS),
    budgets: storage.get(STORAGE_KEYS.BUDGETS),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finance_tracker_backup.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = async (file) => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Validate data structure
    const requiredKeys = ['user', 'transactions', 'goals', 'budgets'];
    if (!requiredKeys.every(key => key in data)) {
      throw new Error('Invalid backup file format');
    }
    
    // Import data
    Object.entries(data).forEach(([key, value]) => {
      storage.set(STORAGE_KEYS[key.toUpperCase()], value);
    });
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};