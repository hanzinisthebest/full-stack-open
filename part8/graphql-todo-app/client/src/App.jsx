import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import TodosPage from './pages/TodosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import Navbar from './components/Navbar';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);

  // Persist user authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      setUser(userInfo);
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/todos" /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/todos" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/todos" /> : <RegisterPage />}
            />
            <Route
              path="/todos"
              element={
                user ? <TodosPage user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/users"
              element={
                user && user.role === 'admin' ? (
                  <UsersPage />
                ) : (
                  <Navigate to="/todos" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
