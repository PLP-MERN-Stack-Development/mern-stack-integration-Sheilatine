import React, { useState, useContext } from 'react';
import { postService } from '../api/api'; // ✅ import from api.js
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Login required</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (file) formData.append('image', file);

      // ✅ Call API through postService (which handles token)
      const newPost = await postService.createPost(formData);

      // ✅ Navigate to the new post after creation
      navigate(`/posts/${newPost._id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
      }}
    >
      <h2>Create Post</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        rows="6"
        required
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
}
