import React from 'react';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user, logout } = useAuth();

  // Check if the user is an admin
  if (!user?.isAdmin) {
    return <div>You do not have permission to access this page.</div>;
  }

  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <AdminPanel />
      </main>
    </div>
  );
};

export default Admin;
