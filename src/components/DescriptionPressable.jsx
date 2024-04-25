import { Pressable } from "react-native";
import { useState } from "react";
import { Text, Button } from "react-native-paper";
import DialogWithScroll from "./DialogWithScroll";

const DescriptionPressable = ({ description }) => {
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setDescriptionOpen((prev) => !prev)}>
        <Text variant="bodyMedium" numberOfLines={3}>
          {description}
        </Text>
      </Pressable>

      <DialogWithScroll
        title="Descripción"
        visible={descriptionOpen}
        onDismiss={() => setDescriptionOpen(false)}
        actions={
          <Button onPress={() => setDescriptionOpen(false)}>Cerrar</Button>
        }
      >
        <Text variant="bodyMedium">{description}</Text>
      </DialogWithScroll>
    </>
  );
};

export default DescriptionPressable;
