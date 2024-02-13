import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

function NameForm({ onNameSubmit }) {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onNameSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '30px' }}>
        Please enter your name:
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={handleChange}
        style={{ marginBottom: 20, width: '70%' }}
      />
      <Button variant="contained" color="primary" type="submit" style={{ width: '90px' }}>
        Submit
      </Button>
    </form>
  );
}

export default NameForm;