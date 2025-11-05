import bcrypt from 'bcryptjs';
import { storage, STORAGE_KEYS } from './storage';

const SALT_ROUNDS = 10;

// Authentication utility functions
export const auth = {
  // Register a new user
  register: async (email, password) => {
    try {
      const users = storage.get(STORAGE_KEYS.USER) || [];
      
      // Check if user already exists
      if (users.some(user => user.email === email)) {
        throw new Error('User already exists');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };
      
      // Save user
      users.push(newUser);
      storage.set(STORAGE_KEYS.USER, users);
      
      // Return user data (excluding password)
      const { password: _, ...userData } = newUser;
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const users = storage.get(STORAGE_KEYS.USER) || [];
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
      
      // Update last login
      user.lastLogin = new Date().toISOString();
      storage.set(STORAGE_KEYS.USER, users);
      
      // Return user data (excluding password)
      const { password: _, ...userData } = user;
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const users = storage.get(STORAGE_KEYS.USER);
    return users && users.length > 0;
  },

  // Logout user
  logout: () => {
    try {
      // Clear only user-specific data
      storage.remove(STORAGE_KEYS.USER);
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }
};