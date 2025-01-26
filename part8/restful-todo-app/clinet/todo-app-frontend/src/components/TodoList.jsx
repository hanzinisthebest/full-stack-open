import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, toggleTodo } from '../api/todos';
import { query } from 'express';

const TodoList = () => {
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos, isLoading } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos});


  // Mutation for toggling todo
  const toggleTodoMutation = useMutation(toggleTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos']});
    },
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(todos);
  

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <button onClick={() => toggleTodoMutation.mutate(todo.id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
