import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth';
import { login, register } from '../api/auth';

export const useAuthMutation = (fn) => {
  const doLogin = useAuthStore((state) => state.doLogin);
  return useMutation({
    mutationFn: (data) => fn(data),
    onSuccess: async (data) => {
      const { user, token } = data;
      await doLogin(user, token);
    },
  });
};

export const useLogin = () => {
  return useAuthMutation(login);
};

export const useRegister = () => {
  return useAuthMutation(register);
};
