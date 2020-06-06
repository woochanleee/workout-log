import axios from 'axios';

const client = axios.create();
client.defaults.baseURL = process.env.SERVER_URL;

export default client;
