import qs from 'querystring';
import client from './client';

export const writePost = (formData: FormData) => client.post('/api/posts', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const readPost = (id) => client.get(`/api/posts/${id}`);

export const listPosts = ({
  page, username, useremail, tag,
}) => {
  const querystring = qs.stringify({
    page, username, useremail, tag,
  });
  return client.get(`/api/posts?${querystring}`);
};

export const updatePost = (formData: FormData, id: number) => client.patch(`/api/posts/${id}`, formData,
  { headers: { 'Content-Type': 'multipart/form-data' } });

export const removePost = (id) => client.delete(`/api/posts/${id}`);
const foo = 1;
export default foo;
