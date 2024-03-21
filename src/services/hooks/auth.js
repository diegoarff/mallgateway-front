import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth";
import { useGlobalStore } from "../../stores/global";
import { login, register, changePassword } from "../api/auth";

export const useAuthMutation = (fn) => {
  const doLogin = useAuthStore((state) => state.doLogin);
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

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

export const useChangePassword = () => {
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: () => {
      showSnackbar("Contraseña cambiada con éxito");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
