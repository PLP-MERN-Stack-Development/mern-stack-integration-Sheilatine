import api from './api';
export const fetchComments = (postId) => api.get(`/comments/post/${postId}`);
export const addComment = (postId, text) => api.post(`/comments/${postId}`, { text });
export const deleteComment = (id) => api.delete(`/comments/${id}`);
