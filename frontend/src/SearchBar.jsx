import React from 'react';
import { TextField } from '@mui/material';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={onSearchChange}
      style={{ marginBottom: 20 }}
    />
  );
}

export default SearchBar;
