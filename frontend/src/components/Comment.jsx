import CommentForm from './CommentForm';


const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  parentId = null,
  currentUserId,
  postId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === 'editing';
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === 'replying';
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.timestamp) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.author && !timePassed;
  const replyId = parentId !== null ? parentId : comment._id;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };


  const createdAt = formatTimestamp(comment.timestamp);

  return (
<div key={comment._id} style={{ paddingLeft: '1.5rem', paddingTop: '1.5rem', fontSize: '0.875rem',  border: '1px solid #ccc', borderRadius: '5px', marginBottom: '1rem'  }}>
  <div></div>
  <div style={{ marginRight: '0.5rem', fontSize: '1.125rem', fontWeight: '600', color: 'var(--secondary-foreground)' }}>
    <div>
      <p style={{ color: '#718096', fontSize: '0.875rem', fontStyle: 'italic' }}>{createdAt}</p>
    </div>
    {!isEditing && <div className="comment-text">{comment.text}</div>}
    
    <div className="comment-actions">
      {canReply && (
        <div style={{ display: 'flex' }}>
          <button
            style={{ paddingLeft: '0', cursor: 'pointer' }}
            onClick={() =>
              setActiveComment({ id: comment._id, type: 'replying' })
            }
          >
            Reply
          </button>
        </div>
      )}
      {canEdit && (
        <button
          style={{ paddingLeft: '0', cursor: 'pointer' }}
          onClick={() =>
            setActiveComment({ id: comment._id, type: 'editing' })
          }
        >
          Edit
        </button>
      )}
      
    </div>
    {isReplying && (
      <CommentForm
        submitLabel="Reply"
        handleSubmit={(text) => addComment(text, replyId, postId)}
      />
    )}
    {replies.length > 0 && (
      <div className="replies">
        {replies.map((reply) => (
          <Comment
            comment={reply}
            key={reply._id}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
            addComment={addComment}
            parentId={comment._id}
            replies={[]}
            currentUserId={currentUserId}
            postId={postId}
          />
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default Comment;
