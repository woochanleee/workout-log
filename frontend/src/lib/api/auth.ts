import client from './client';

export const login = ({ username, email, profileImage }) => client.post('/api/auth/login', { username, email, profileImage });

export const check = () => client.get('/api/auth/check');
