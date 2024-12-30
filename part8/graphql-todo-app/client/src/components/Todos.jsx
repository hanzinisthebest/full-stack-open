import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../queries';

const Todos = () => {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [newTodo, setNewTodo] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = async () => {
    await addTodo({ variables: { title: newTodo } });
    setNewTodo('');
  };

  const handleToggleComplete = async (id, completed) => {
    await updateTodo({ variables: { id, completed: !completed } });
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo({ variables: { id } });
  };

  return (
    <div>
      <h1>Todos</h1>
      <input
        type="text"
        placeholder="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => handleToggleComplete(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
