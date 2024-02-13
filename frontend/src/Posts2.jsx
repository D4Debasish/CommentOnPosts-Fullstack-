import { useMemo, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './LoginForm';
import { useCookie } from './provider/cookieContext';
import CommentContent from './components/CommentContent';

function Posts() {
  const { cookie } = useCookie();
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  
  var tokenString = cookie['accessToken'];
  var decoded;
  if (tokenString) {
    decoded = jwtDecode(tokenString);
    console.log('Decoded token: ', decoded);
  } else {
    console.error('Access token is missing or not a string');
  }
  console.log('new coook: ', cookie['accessToken']);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.content.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:6969/post/getAllPosts', {
        headers: {
          Authorization: `Bearer ${cookie['accessToken']}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const postsData = await response.json();
      const sortedpost = postsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setItems(sortedpost);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const value = e.target.item.value.trim();
    if (value === '') return;

    try {
      const response = await fetch('http://localhost:6969/post/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie['accessToken']}`,
        },
        body: JSON.stringify({
          content: value,
          author: decoded.UserInfo.userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to post item');
      }

      // After successfully posting, fetch posts again to update the list
      await fetchPosts();

      e.target.item.value = '';
    } catch (error) {
      console.error('Error posting item:', error);
    }
  }

  return (
    <>
      {!cookie ? (
        <LoginForm />
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={fetchPosts}
          >
            GET POSTS
          </button>
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="search">Search:</label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <form onSubmit={onSubmit} style={{ marginTop: '10px' }}>
            <label htmlFor="newItem">New Item:</label>
            <input
              id="newItem"
              name="item"
              type="text"
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </form>
          <h3>Items:</h3>
          <div>
            {filteredItems.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '10px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>User ID:</span>{' '}
                {item.author}
                <br />
                <span style={{ fontWeight: 'bold' }}>Post:</span> {item.content}
                {/* Assuming CommentContent is another component */}
                <CommentContent
                  postId={item._id}
                  currentUserId={decoded.UserInfo.userId}
                  comments={item.comments}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;