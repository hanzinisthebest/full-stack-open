import React from 'react';
import TodoList from '../components/TodoList';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        <h1>Welcome, {user?.username || 'User'}!</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <h2>Your Todos</h2>
        <TodoList />
      </main>
    </div>
  );
};

export default Home;
