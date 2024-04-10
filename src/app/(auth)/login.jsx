import { useAuthStore } from "../../stores/auth";
import { useLogin } from "../../services/hooks/auth";
import FormInput from "../../components/FormInput";
import { Button, Text, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import ScreenWrapper from "../../components/ScreenWrapper";
import { View } from "react-native";
import { Link } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const { control, handleSubmit } = useForm();

  const theme = useTheme();

  const doLogin = useAuthStore((state) => state.doLogin);
  const queryClient = useQueryClient();

  const loginHandler = (data) => {
    queryClient.invalidateQueries();
    login(data);
  };

  const handleLogin = (role) => {
    doLogin({ role }, "token");
  };

  return (
    <ScreenWrapper
      contentContainerStyle={{
        justifyContent: "center",
      }}
    >
      {/* Mall logo */}

      {/* Main text */}
      <View>
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.primary,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Iniciar sesión
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
          }}
        >
          Ingresa tus datos para acceder a tu cuenta
        </Text>
      </View>

      {/* Inputs */}
      <View
        style={{
          marginTop: 48,
          marginBottom: 16,
        }}
      >
        <FormInput
          mode="outlined"
          name="identifier"
          label="Usuario o correo electrónico"
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
          label="Contraseña"
          placeholder="Contraseña"
          control={control}
          rules={{
            required: "Contraseña es requerida",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
          secureTextEntry
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(loginHandler)}
        loading={isPending}
        disabled={isPending}
      >
        Iniciar sesión
      </Button>

      <Text style={{ textAlign: "center", marginTop: 20 }}>
        ¿No tienes cuenta?{" "}
        <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
          <Link href="/register">Regístrate</Link>
        </Text>
      </Text>

      <Button mode="text" onPress={() => handleLogin("guest")}>
        Continuar como invitado
      </Button>
    </ScreenWrapper>
  );
};

export default Login;
