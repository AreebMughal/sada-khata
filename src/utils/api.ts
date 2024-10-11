import axios from 'axios';
import { showToaster } from './toaster';

const api = (headers: any = null) => {
  let header = headers;
  //   const accessToken = getAccessToken();
  const accessToken = null;

  if (!header) {
    header = { Accept: 'application/json', 'Content-Type': 'application/json' };
  }

  const apiSet = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL,
    headers: accessToken ? { ...header, Authorization: `Bearer ${accessToken}` } : header
  });

  apiSet.interceptors.response.use(
    async (response: any) => {
      if (
        response.config.method === 'post' ||
        response.config.method === 'patch' ||
        response.config.method === 'delete'
      ) {
        showToaster(response.data?.message);
      }
      return response;
    },
    error => {
      let { message } = error.response.data;

      if (!message) {
        message =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      }

      if (Array.isArray(message)) {
        message.forEach(element => {
          showToaster(element, 'error');
        });
      } else {
        showToaster(message, 'error');
      }

      return error.response;
    }
  );

  return apiSet;
};

export default api;
