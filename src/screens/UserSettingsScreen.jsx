import { Button, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "../stores/auth";
import { useChangePassword } from "../services/hooks/auth";
import { useForm } from "react-hook-form";
import ScreenWrapper from "../components/ScreenWrapper";
import { StyleSheet, View } from "react-native";
import FormInput from "../components/forms/FormInput";

const UserSettingsScreen = () => {
  const doLogout = useAuthStore((state) => state.doLogout);
  const theme = useTheme();

  const { mutate: changePassword, isPending } = useChangePassword();

  const { control, handleSubmit, watch, reset } = useForm();
  const watchAllFields = watch();
  const isSomeValueEmpty =
    Object.values(watchAllFields).some((x) => x === undefined || x === "") ||
    Object.keys(watchAllFields).length === 0;

  const passwordSubmitHandler = (data) => {
    changePassword(data);
    reset({
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    });
  };

  return (
    <ScreenWrapper withInsets={false} contentContainerStyle={styles.screen}>
      <View style={styles.passwordForm}>
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
            control={control}
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
            control={control}
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
            control={control}
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
          onPress={handleSubmit(passwordSubmitHandler)}
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
  passwordForm: {
    gap: 16,
  },
  textContainer: {
    gap: 4,
  },
});
