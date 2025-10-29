import api from './api';

export const fetchPosts = () => api.get('/posts');
export const fetchPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post('/posts', data, { headers: {'Content-Type': 'multipart/form-data'}});
export const updatePost = (id, data) => api.put(`/posts/${id}`, data, { headers: {'Content-Type': 'multipart/form-data'}});
export const deletePost = (id) => api.delete(`/posts/${id}`);
