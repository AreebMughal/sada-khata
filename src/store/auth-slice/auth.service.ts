import api from '@/utils/api';

const signup = async (payload: any) => {
  const response = await api().post('/auth/sign-up', payload);
  return response;
};

const authService = {
  signup
};

export default authService;
