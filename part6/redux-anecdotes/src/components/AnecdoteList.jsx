import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const voteAnecdote = () => {
        dispatch(vote({
            id: anecdote.id}));
    };
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteAnecdote}>vote</button>
            </div>
        </div>
    );
};
const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            console.log(state.anecdotes);
            
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