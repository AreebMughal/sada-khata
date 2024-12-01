import axios from 'axios';

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
      return response;
    },
    (error) => {
        console.error('Error', error)
      return error.response;
    }
  );

  return apiSet;
};

export default api;
