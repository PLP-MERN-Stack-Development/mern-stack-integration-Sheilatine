import React, { useEffect, useState, useContext } from "react";
import { postService } from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        console.log("Fetched posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts.");
      }
    };
    fetchAllPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog</h1>

      {/* 🔐 Auth UI */}
      {!user ? (
        <div style={{ marginBottom: "1rem" }}>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      ) : (
        <div style={{ marginBottom: "1rem" }}>
          <p>Welcome, {user.name}!</p>
          <Link to="/create">Create Post</Link>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📰 Posts section */}
      {posts.length === 0 ? (
        <p>No posts available yet.</p>
      ) : (
        posts.map((p) => (
          <article key={p._id} style={{ marginBottom: "20px" }}>
            <h2>
              <Link to={`/posts/${p._id}`}>{p.title}</Link>
            </h2>
            <p>
              By {p.author?.name || "Unknown"} —{" "}
              {new Date(p.createdAt).toLocaleString()}
            </p>
            {p.imageUrl && (
              <img
                src={`http://localhost:5000${p.imageUrl}`}
                alt=""
                style={{ maxWidth: "200px" }}
              />
            )}
            <p>{p.body?.slice(0, 200)}...</p>
          </article>
        ))
      )}
    </div>
  );
}
