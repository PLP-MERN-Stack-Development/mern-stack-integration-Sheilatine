import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, deletePost } from '../services/postService';
import { fetchComments, addComment, deleteComment } from '../services/commentService';
import { AuthContext } from '../context/AuthContext';

export default function PostPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=> {
    fetchPost(id).then(res => setPost(res.data)).catch(console.error);
    fetchComments(id).then(res => setComments(res.data)).catch(console.error);
  }, [id]);

  const handleAddComment = async () => {
    try {
      await addComment(id, text);
      const res = await fetchComments(id);
      setComments(res.data);
      setText('');
    } catch(err){ console.error(err) }
  };

  const handleDeletePost = async () => {
    if(!confirm('Delete post?')) return;
    await deletePost(id);
    navigate('/');
  };

  return (
    <div>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>By {post.author?.name}</p>
          {post.image && <img src={`http://localhost:5000${post.image}`} alt="" style={{maxWidth:300}} />}
          <p>{post.body}</p>

          {user && user.id === post.author?._id && (
            <div>
              <button onClick={()=> navigate(`/edit/${post._id}`)}>Edit</button>
              <button onClick={handleDeletePost}>Delete</button>
            </div>
          )}

          <section>
            <h3>Comments</h3>
            {comments.map(c => (
              <div key={c._id}>
                <p><strong>{c.author?.name}</strong> - {c.text}</p>
                {user && user.id === c.author?._id && <button onClick={async ()=> { await deleteComment(c._id); setComments((await fetchComments(id)).data); }}>Delete</button>}
              </div>
            ))}

            {user ? (
              <div>
                <textarea value={text} onChange={e=>setText(e.target.value)} />
                <button onClick={handleAddComment}>Add Comment</button>
              </div>
            ) : <p><em>Login to comment</em></p>}
          </section>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}
