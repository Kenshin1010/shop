import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside
      style={{ width: '200px', padding: '1rem', backgroundColor: '#f4f4f4' }}
    >
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login-fail">Login Fail</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
