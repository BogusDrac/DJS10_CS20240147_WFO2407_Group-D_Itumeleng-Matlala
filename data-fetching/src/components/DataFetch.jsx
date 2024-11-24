import React, { useState, useEffect } from 'react';

function DataFetch() {
  // State to store posts or error
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch posts
    const fetchPosts = async () => {
      try {
        // Simulating potential error by using incorrect URL (optional)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        // Catch and store error in state
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Render loading state
  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div style={{ color: 'red' }}>
        Error fetching posts: {error}
      </div>
    );
  }

  // Render posts
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.slice(0, 10).map(post => (
        <div key={post.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default DataFetch