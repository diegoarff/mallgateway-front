import { View } from "react-native";
import { useRegister } from "../../services/hooks/auth";
import { useForm } from "react-hook-form";
import { Text, Button, useTheme } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import FormInput from "../../components/forms/FormInput";
import { Link } from "expo-router";

const Register = () => {
  const { mutate: register, isPending } = useRegister();
  const { control, handleSubmit } = useForm();

  const theme = useTheme();

  const registerHandler = (data) => {
    register(data);
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
          Registro
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
          }}
        >
          Crea una cuenta para empezar a usar la aplicación
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
          name="username"
          label="Usuario"
          placeholder="Usuario"
          control={control}
          rules={{
            required: "Usuario es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          }}
        />
        <FormInput
          mode="outlined"
          name="email"
          label="Correo"
          placeholder="Correo"
          control={control}
          rules={{
            required: "Correo es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Correo inválido",
            },
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
        onPress={handleSubmit(registerHandler)}
        loading={isPending}
      >
        Registrarse
      </Button>

      <Text style={{ textAlign: "center", marginTop: 20 }}>
        ¿Ya tienes una cuenta?{" "}
        <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
          <Link href="/login">Inicia sesión</Link>
        </Text>
      </Text>

      {/* <Button mode="text" onPress={() => handleLogin("guest")}>
        Continuar como invitado
      </Button> */}
    </ScreenWrapper>
  );
};

export default Register;
