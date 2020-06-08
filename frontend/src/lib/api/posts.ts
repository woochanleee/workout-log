import client from './client';

export const writePost = (formData: FormData) =>
  client.post('/api/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

const foo = 1;
export default foo;
