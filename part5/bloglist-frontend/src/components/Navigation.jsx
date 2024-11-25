import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ onLogout }) => {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <ul className="nav-links">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/users" 
            className={location.pathname === '/users' ? 'active' : ''}
          >
            Users
          </Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navigation;
