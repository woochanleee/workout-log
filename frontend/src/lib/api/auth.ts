import client from './client';

export const login = ({ username, email, profileImage }) => client.post('/api/auth/login', { username, email, profileImage });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');

export const update = (formData: FormData) => client.patch('/api/auth/user', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const leave = () => client.delete('/api/auth/user');
