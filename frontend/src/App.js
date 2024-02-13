import React, { useState } from 'react';
import { Typography } from '@mui/material';
import NameForm from './NameForm';
import PostsApp from './PostsApp';
import Posts2 from './Posts2';
import { CookieProvider } from './provider/cookieContext';

function App() {
  const [userName, setUserName] = useState('');

  const handleNameSubmit = (name) => {
    setUserName(name);
  };

  return (
    <CookieProvider>
      {' '}
      <div>
        {/* {userName ? (
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome, {userName}!
          </Typography>
          <PostsApp user={userName}/>
        </div>
      ) : (
        <NameForm onNameSubmit={handleNameSubmit} />
      )} */}
        <Posts2 />
      </div>
    </CookieProvider>
  );
}

export default App;
