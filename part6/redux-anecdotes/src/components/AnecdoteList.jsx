import { useDispatch, useSelector } from "react-redux";
const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const vote = () => {
        dispatch({ type: 'VOTE', data: { id: anecdote.id } });
    };
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={vote}>vote</button>
            </div>
        </div>
    );
};
const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state);
    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </div>
    );
}


export default AnecdoteList