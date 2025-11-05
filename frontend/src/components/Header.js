
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getCurrentUser } from '../utils/storage';

const Header = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUser(getCurrentUser());
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header>
      <h1>Personal Finance Tracker</h1>
      <nav>
        <ul>
          {authenticated && user ? (
            <>
              <li><span>Welcome, {user.email}</span></li>
              <li><Link to="/">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
