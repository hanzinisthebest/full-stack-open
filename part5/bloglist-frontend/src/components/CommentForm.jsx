import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addCommentRedux } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom';
const CommentForm = ({ onCommentAdded }) => {
    const comment = useField('text')
    const dispatch = useDispatch()
    const { id } = useParams();

    const addCommentHandler = (event) => {
        event.preventDefault()
        const commentText = comment.inputProps.value
        
            // First update the UI optimistically
            onCommentAdded(commentText)
            
            // Then dispatch the action to update the backend
             dispatch(addCommentRedux(id, commentText))
            
            comment.reset()
    }

    return (
        <form onSubmit={addCommentHandler}>
            <div>
                comment
                <input {...comment.inputProps} />
            </div>
            <button type="submit">add comment</button>
        </form>
    )
}   

export default CommentForm