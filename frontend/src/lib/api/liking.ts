import client from './client';

export const like = (id) => client.post(`/api/posts/${id}/like`);

export const notLike = (id) => client.delete(`/api/posts/${id}/like`);
