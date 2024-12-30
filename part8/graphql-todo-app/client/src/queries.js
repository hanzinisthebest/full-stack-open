import { gql } from '@apollo/client';
// GraphQL Queries and Mutations

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

// Register a new user
export const REGISTER_USER = gql`
   mutation Register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    id
    username
    token  
  }
}
`;

// Login a user
export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
    id
    username
    token
    }
  }
`;

// Fetch all users (Admin only)
export const GET_USERS = gql`
  query Users {
    users {
      id
      username
      role
    }
  }
`;


// Get current user
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      username
      role
    }
  }
`;