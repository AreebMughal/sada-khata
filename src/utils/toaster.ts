import { toast } from 'react-hot-toast';

export const showToaster = (message: string, type: 'success' | 'error' | 'loading' = 'success') => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  } else if (type === 'loading') {
    toast.loading(message);
  }
};
