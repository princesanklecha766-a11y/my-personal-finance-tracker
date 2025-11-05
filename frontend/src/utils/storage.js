
const bcrypt = require('bcryptjs');

const saltRounds = 10;

// User management
export const saveUser = (user) => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }

  const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
  const newUser = { ...user, password: hashedPassword };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'User created successfully' };
};

export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const login = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (user && bcrypt.compareSync(password, user.password)) {
    const sessionKey = Math.random().toString(36).substring(2);
    localStorage.setItem('sessionKey', sessionKey);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, message: 'Login successful' };
  }
  return { success: false, message: 'Invalid email or password' };
};

export const logout = () => {
  localStorage.removeItem('sessionKey');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('sessionKey') !== null;
};

// Transaction management
export const saveTransaction = (transaction) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'User not logged in' };

  let allTransactions = getTransactions(true);
  const newTransaction = {
    ...transaction,
    id: Date.now(),
    user: currentUser.email
  };
  allTransactions.push(newTransaction);
  localStorage.setItem('transactions', JSON.stringify(allTransactions));
  return { success: true, message: 'Transaction saved' };
};

export const getTransactions = (all = false) => {
  const transactions = localStorage.getItem('transactions');
  const allTransactions = transactions ? JSON.parse(transactions) : [];
  if (all) return allTransactions;

  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  return allTransactions.filter(t => t.user === currentUser.email);
};
