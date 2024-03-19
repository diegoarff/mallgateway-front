import { useAuthStore } from "../../stores/auth";
import { useLogin } from "../../services/hooks/auth";
import FormInput from "../../components/forms/FormInput";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import ScreenWrapper from "../../components/ScreenWrapper";

const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const { control, handleSubmit } = useForm();

  const doLogin = useAuthStore((state) => state.doLogin);

  const loginHandler = (data) => {
    login(data);
  };

  const handleLogin = (role) => {
    doLogin({ role }, "token");
  };

  return (
    <ScreenWrapper>
      <FormInput
        mode="outlined"
        name="identifier"
        placeholder="Usuario o correo electrónico"
        control={control}
        rules={{
          required: "Usuario o correo electrónico es requerido",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        }}
      />
      <FormInput
        mode="outlined"
        name="password"
        placeholder="Contraseña"
        control={control}
        rules={{
          required: "Contraseña es requerida",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
        }}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={handleSubmit(loginHandler)}
        loading={isPending}
      >
        Iniciar sesión
      </Button>
      <Button mode="text" onPress={() => handleLogin("guest")}>
        Continuar como invitado
      </Button>
      <Button mode="contained" onPress={() => handleLogin("admin")}>
        Login as Admin
      </Button>
      <Button mode="contained" onPress={() => handleLogin("store")}>
        Login as Store
      </Button>
      <Button mode="contained" onPress={() => handleLogin("user")}>
        Login as User
      </Button>
    </ScreenWrapper>
  );
};

export default Login;
