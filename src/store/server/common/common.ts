import axios from 'axios';

import { AppConfig } from '@/utils/AppConfig';

const ApiClient = axios.create({
  baseURL: AppConfig.base_url,
});

ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const updatedConfig = { ...config };
      updatedConfig.headers.Authorization = `Bearer ${token}`;
      return updatedConfig;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ApiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default ApiClient;
