import { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { Rating } from "@kolking/react-native-rating";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";

const FeedbackDialog = ({ visible, onDismiss, mutation }) => {
  const theme = useTheme();
  const { control, handleSubmit, reset, watch } = useForm();
  const [rating, setRating] = useState(1);
  const message = watch("message");

  const disabled = message === "" || mutation.isPending;

  const handleConfirm = (data) => {
    mutation.mutate({ ...data, rating });
    setRating(1);
    reset();
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Dejar reseña</Dialog.Title>
        <Dialog.Content>
          <View style={{ gap: 20, alignItems: "center" }}>
            <Rating
              size={32}
              rating={rating}
              scale={1}
              onChange={setRating}
              spacing={10}
              fillColor={theme.colors.primary}
              baseColor={theme.colors.onSurfaceDisabled}
              touchColor={theme.colors.secondary}
            />

            <FormInput
              mode="outlined"
              name="message"
              label="Mensaje"
              control={control}
              multiline
              rules={{ required: "Mensaje es requerido" }}
              style={{
                backgroundColor: theme.colors.elevation.level3,
                maxHeight: 200,
                width: "100%",
              }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button disabled={disabled} onPress={handleSubmit(handleConfirm)}>
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default FeedbackDialog;
