import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CommentList = ({blog}) => {
    return (
        <CommentSection>
            {blog.comments.map((comment, index) => (
                <CommentItem key={index}>
                    <CommentContent>
                        <CommentText>{comment}</CommentText>
                        <CommentMeta>
                            <TimeStamp>{new Date(comment.timestamp).toLocaleString()}</TimeStamp>
                        </CommentMeta>
                    </CommentContent>
                </CommentItem>
            ))}
        </CommentSection>
    )
}

const CommentSection = styled.div`
    padding: 20px 0;
`

const CommentItem = styled.div`
    padding: 16px;
    margin-bottom: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f3f5;
        transform: translateX(4px);
    }
`

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const CommentText = styled.p`
    margin: 0;
    color: #343a40;
    font-size: 0.95rem;
    line-height: 1.5;
`

const CommentMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const TimeStamp = styled.span`
    color: #868e96;
    font-size: 0.8rem;
`

export default CommentList