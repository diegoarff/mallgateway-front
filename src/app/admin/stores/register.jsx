import ScreenWrapper from "../../../components/ScreenWrapper";
import { useForm } from "react-hook-form";
import { useCreateStore } from "../../../services/hooks/admin";
import FormInput from "../../../components/forms/FormInput";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import InfoText from "../../../components/InfoText";

const StoresRegister = () => {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate: createStore, isPending, isSuccess } = useCreateStore();

  const onSubmit = (data) => {
    createStore(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

  return (
    <ScreenWrapper withInsets={false}>
      <FormInput
        mode="outlined"
        name="name"
        label="Nombre"
        placeholder="Nombre de la tienda"
        control={control}
        rules={{
          required: "Nombre de la tienda es requerido",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        }}
      />
      <FormInput
        mode="outlined"
        name="username"
        label="Usuario"
        placeholder="Usuario de la tienda"
        control={control}
        rules={{
          required: "Usuario es requerido",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        }}
      />
      <FormInput
        mode="outlined"
        name="email"
        placeholder="Correo electrónico de la tienda"
        label="Correo electrónico"
        control={control}
        rules={{
          required: "Correo electrónico es requerido",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Correo electrónico inválido",
          },
        }}
      />
      <FormInput
        mode="outlined"
        name="password"
        placeholder="Contraseña de la tienda"
        control={control}
        rules={{
          required: "Contraseña es requerida",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
        }}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
        disabled={isPending}
        style={styles.button}
      >
        Registrar
      </Button>
      <InfoText info="Una vez creada, solo la tienda podrá editar su información" />
    </ScreenWrapper>
  );
};

export default StoresRegister;

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    marginBottom: 28,
  },
});
