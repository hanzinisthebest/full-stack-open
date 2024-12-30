import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../queries';

function TodosPage({ user }) {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo({
        variables: { title: newTodo },
        refetchQueries: [{ query: GET_TODOS }],
      });
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (id, completed) => {
    await updateTodo({
      variables: { id, completed: !completed },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleTodo(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosPage;
