import React, { useState } from 'react';
import { Button, TextField, Typography, } from '@mui/material';
import Post from './Posts';
import SearchBar from './SearchBar';

function PostsApp({user}) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewPostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleNewPostSubmit = () => {
    setPosts([...posts, { id: posts.length + 1, text: newPost, comments: [] }]);
    setNewPost('');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.text.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div style={{ padding: 20 }}>
     <Typography variant='h5' sx={{marginBottom:'30px', marginTop:'30px'}}>Search Your Post</Typography>
      <SearchBar searchTerm={searchTerm}  onSearchChange={handleSearchChange}  />
      <Typography variant="h5" gutterBottom sx={{marginTop:'10px', marginBottom:'10px'}}>
        New Post
      </Typography>
      <TextField
        value={newPost}
        onChange={handleNewPostChange}
        placeholder="Enter your Post here..."
        style={{ width: '100%', marginBottom: 10 }}
      />
      <Button variant="contained" color="primary" sx={{marginLeft:'195vh'}} onClick={handleNewPostSubmit}>
        Add Post
      </Button>
      {filteredPosts.map(post => (
        <Post key={post.id} post={post} user={user}/>
      ))}
    </div>
  );
}

export default PostsApp;
