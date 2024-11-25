import { useSelector } from 'react-redux'


const CommentList = ({blog}) => {
    // const blogs = useSelector(state => state.blogs)
    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}
export default CommentList