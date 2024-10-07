import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const voteTheAnecdote = () => {
        dispatch(voteAnecdote(anecdote.id));
        dispatch(setNotificationWithTimeout(`you voted '${anecdote.content}'`, 5));
    };
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteTheAnecdote}>vote</button>
            </div>
        </div>
    );
};
const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    });
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </div>
    );
}


export default AnecdoteList