import { ILogin, ISignUp } from '@/interfaces/auth.interfaces';
import api from '@/utils/api';

const signup = async (payload: ISignUp) => {
  const response = await api().post('/auth/sign-up', payload);
  return response.data;
};

const login = async (payload: ILogin) => {
  const response = await api().post('/auth/login', payload);
  return response.data;
};

const authService = {
  signup,
  login
};

export default authService;
