import client from './client';

export const writeComment = (id, text) => client.post(`/api/posts/${id}/comments`, {
  text,
});

export const writeRecomment = (id, commentId, text) => client.post(`/api/posts/${id}/comments/${commentId}/recomments`, {
  text,
});

export const listComments = (id) => client.get(`/api/posts/${id}/comments`);

export const updateComment = (id, commentId, text) => client.patch(`/api/posts/${id}/comments/${commentId}`, { text });

export const updateRecomment = (id, commentId, recommentId, text) => client.patch(`/api/posts/${id}/comments/${commentId}/recomments/${recommentId}`, { text });

export const deleteComment = (id, commentId) => client.delete(`/api/posts/${id}/comments/${commentId}`);

export const deleteRecomment = (id, commentId, recommentId) => client.delete(`/api/posts/${id}/comments/${commentId}/recomments/${recommentId}`);
