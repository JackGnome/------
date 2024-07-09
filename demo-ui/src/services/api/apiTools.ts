import axios from 'axios';

export const apiInvoker = axios.create({ baseURL: process.env.DOMAIN });
