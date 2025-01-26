import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import QueryProvider from './context/QueryProvider';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect non-admin users if the route is admin-only
  if (adminOnly && !user.isAdmin) {
    return <div>Access Denied: Admins only</div>;
  }

  return children;
};

const App = () => {
  const { user, logout } = useAuth();

  return (
    <AuthProvider>
      <QueryProvider>
        <Router>
          <header>
            <nav>
              <Link to="/">Home</Link>
              {user?.isAdmin && <Link to="/admin">Admin</Link>}
              {user ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </nav>
          </header>

          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute adminOnly={true}>
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
