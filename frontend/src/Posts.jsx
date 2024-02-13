import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';

function Post({ post,user }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  const [isCommenting, setIsCommenting] = useState(false);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewCommentSubmit = () => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setIsCommenting(false);
    setNewComment('');
  };
  const addcomment =()=>{
    setIsCommenting(true)
  }

  return (
    <Card sx={{backgroundColor:'#F6F7F8', marginBottom:'20px', marginTop:'30px'}}>
      <CardContent>
      <Typography variant="h5" >{user}</Typography>
        <Typography variant="h6" sx={{backgroundColor:'#EEF3F7'}}>{post.text}</Typography>
        <div className="comm" style={{display:'flex', gap:'20px'}} ><Typography variant="body1" style={{ marginTop: 10 }}>
         xyz commented -
      </Typography>
      {comments.map((comment, index) => (
        <Typography key={index} variant="body2" sx={{ marginTop: 1.5 }}>
           {comment}
        </Typography>
      ))}</div>

        {!isCommenting ? (
          <Button variant="outlined" onClick={addcomment} sx={{ marginTop: 4 }}>
            Add Comment
          </Button>
        ) : (
          <div>
            <TextField
              label="New Comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={handleNewCommentChange}
              style={{ marginTop: 10 }}
            />
            <Button variant="contained" onClick={handleNewCommentSubmit} style={{ marginTop: 10 }}>
              Submit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Post;