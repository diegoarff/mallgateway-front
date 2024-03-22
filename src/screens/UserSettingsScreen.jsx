import { Button, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "../stores/auth";
import { useChangePassword } from "../services/hooks/auth";
import { useForm } from "react-hook-form";
import ScreenWrapper from "../components/ScreenWrapper";
import { StyleSheet, View } from "react-native";
import FormInput from "../components/forms/FormInput";
import { useEffect } from "react";

const UserSettingsScreen = () => {
  const doLogout = useAuthStore((state) => state.doLogout);
  const user = useAuthStore((state) => state.user);
  const theme = useTheme();

  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    control: userControl,
    handleSubmit: handleUserSubmit,
    reset: resetUser,
  } = useForm();

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: passwordReset,
    watch,
  } = useForm();

  const watchAllFields = watch();
  const isSomeValueEmpty =
    Object.values(watchAllFields).some((x) => x === undefined || x === "") ||
    Object.keys(watchAllFields).length === 0;

  const passwordSubmitHandler = (data) => {
    changePassword(data);
    passwordReset({
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    });
  };

  useEffect(() => {
    if (user) {
      resetUser({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <ScreenWrapper withInsets={false} contentContainerStyle={styles.screen}>
      {/* Change user settings */}
      <View style={styles.form}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Cambiar opciones de usuario
          </Text>
          <Text>
            Para cambiar los datos de su usuario, ajuste a continuación
          </Text>
        </View>
        <View>
          <FormInput
            mode="outlined"
            name="username"
            label="Usuario"
            placeholder="Usuario"
            control={userControl}
            rules={{
              required: "Contraseña actual es requerida",
            }}
          />
          <FormInput
            mode="outlined"
            name="email"
            label="Email"
            placeholder="Email"
            control={userControl}
            rules={{
              required: "Nueva contraseña es requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              validate: (value) =>
                value !== watchAllFields.oldPassword ||
                "La nueva contraseña debe ser diferente a la actual",
            }}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleUserSubmit(passwordSubmitHandler)}
          loading={isPending}
          disabled={isSomeValueEmpty || isPending}
        >
          Actualizar
        </Button>
      </View>

      {/* Change password */}
      <View style={styles.form}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            Cambiar contraseña
          </Text>
          <Text>
            Para cambiar su contraseña, ingrese sus datos a continuación
          </Text>
        </View>
        <View>
          <FormInput
            mode="outlined"
            name="oldPassword"
            label="Contraseña actual"
            placeholder="Contraseña actual"
            control={passwordControl}
            rules={{
              required: "Contraseña actual es requerida",
            }}
            secureTextEntry
          />
          <FormInput
            mode="outlined"
            name="newPassword"
            label="Nueva contraseña"
            placeholder="Nueva contraseña"
            control={passwordControl}
            rules={{
              required: "Nueva contraseña es requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              validate: (value) =>
                value !== watchAllFields.oldPassword ||
                "La nueva contraseña debe ser diferente a la actual",
            }}
            secureTextEntry
          />
          <FormInput
            mode="outlined"
            name="passwordConfirmation"
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            control={passwordControl}
            rules={{
              required: "Confirmar contraseña es requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
              validate: (value) =>
                value === watchAllFields.newPassword ||
                "Las contraseñas no coinciden",
            }}
            secureTextEntry
          />
        </View>
        <Button
          mode="contained"
          onPress={handlePasswordSubmit(passwordSubmitHandler)}
          loading={isPending}
          disabled={isSomeValueEmpty || isPending}
        >
          Cambiar contraseña
        </Button>
      </View>
      <Button onPress={doLogout} mode="outlined">
        Cerrar sesión
      </Button>
    </ScreenWrapper>
  );
};

export default UserSettingsScreen;

const styles = StyleSheet.create({
  screen: {
    gap: 24,
    justifyContent: "space-between",
    paddingBottom: 32,
  },
  form: {
    gap: 16,
    marginBottom: 16,
  },
  textContainer: {
    gap: 4,
  },
});
