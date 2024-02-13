fetch('http://localhost:6969/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Other headers as needed
  },
  body: JSON.stringify({
    username: 'rikiphukon',
    password: 'nasasspacex',
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    const {accessToken} = data;
    console.log('Token:', accessToken);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
