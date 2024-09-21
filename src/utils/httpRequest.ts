import axios, { AxiosInstance } from 'axios';

const httpRequest: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export default httpRequest;
