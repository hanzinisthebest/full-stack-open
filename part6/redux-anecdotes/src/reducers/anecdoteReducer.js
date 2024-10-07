import { createSlice } from '@reduxjs/toolkit'
import anecdotsService from '../services/anecdots'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload
    },
    // vote: (state, action) => {
    //   const id = action.payload.id
    //   const anecdote = state.find(a => a.id === id)
    //   const voted = {...anecdote, votes: anecdote.votes + 1}
    //   return state.map(a => a.id === id ? voted : a)
    // },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    }
  }
})

// const anecdoteReducer = (state = initialState, action) => {
//   if (action.type === 'VOTE') {
//     const id = action.data.id
//     const anecdote = state.find(a => a.id === id)
//     const voted = {...anecdote, votes: anecdote.votes + 1}
//     return state.map(a => a.id === id ? voted : a)
//   }
//   if (action.type === 'NEW_ANECDOTE') {
//     return [...state, action.data]
//   }

//   return state
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: {
//       id: getId(),
//       content,
//       votes: 0
//     }
//   }
// }



// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     data: {
//       id
//     }
//   }
// }

export const {  appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotsService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  
  return async dispatch => {
    const newAnecdote = await anecdotsService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdotsService.vote(id)
    const anecdotes = await anecdotsService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


export default anecdoteSlice.reducer