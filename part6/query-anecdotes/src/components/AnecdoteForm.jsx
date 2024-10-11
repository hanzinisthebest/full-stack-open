import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNotificationDispatch } from "../store/NotificationContext"
const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: (content) => axios.post('http://localhost:3001/anecdotes', { content, votes: 0 }).then(res => res.data),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    } 
})
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
        notificationDispatch({
            type: 'ERROR_NOTIFICATION',
            payload: {
                message: 'too short anecdote, must have length 5 or more'
            }
        })
        return
    }
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate(content)

    notificationDispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
            message: `a new anecdote ${content} created`,
        }
    })

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
