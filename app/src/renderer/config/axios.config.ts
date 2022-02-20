import { default as defaultAxios } from 'axios';

export const axios = defaultAxios.create({
  baseURL: 'http://localhost:5000',
});
