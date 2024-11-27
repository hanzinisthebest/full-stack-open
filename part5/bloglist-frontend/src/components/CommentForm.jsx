import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addCommentRedux } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  max-width: 500px;
  margin: 1rem 0;
`

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`

const SubmitButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`

const CommentForm = ({ onCommentAdded }) => {
    const comment = useField('text')
    const dispatch = useDispatch()
    const { id } = useParams()

    const addCommentHandler = (event) => {
        event.preventDefault()
        const commentText = comment.inputProps.value
        
        if (!commentText.trim()) return
        
        onCommentAdded(commentText)
        dispatch(addCommentRedux(id, commentText))
        comment.reset()
    }

    return (
        <StyledForm onSubmit={addCommentHandler}>
            <StyledInput 
                {...comment.inputProps} 
                placeholder="Write a comment..."
                aria-label="Comment input"
            />
            <SubmitButton type="submit">
                Comment
            </SubmitButton>
        </StyledForm>
    )
}   

export default CommentForm