import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth';
import { useUiStore } from '../../stores/ui';
import { login, register } from '../api/auth';

export const useAuthMutation = (fn) => {
  const doLogin = useAuthStore((state) => state.doLogin);
  const showSnackbar = useUiStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (data) => fn(data),
    onSuccess: (data) => {
      const { user, token } = data;
      doLogin(user, token);
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useLogin = () => {
  return useAuthMutation(login);
};

export const useRegister = () => {
  return useAuthMutation(register);
};
