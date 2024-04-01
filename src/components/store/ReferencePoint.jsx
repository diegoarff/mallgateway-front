import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Icon,
  IconButton,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import DialogWithScroll from "../DialogWithScroll";

const ReferencePoint = ({
  reference,
  onPress,
  deleteIcon = false,
  onDeleteIconPress,
}) => {
  const theme = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <Surface mode="flat" elevation={3} style={styles.referenceSurface}>
        <List.Item
          title={
            <View style={styles.referenceInfoContainer}>
              <Icon
                source="map-marker"
                size={18}
                color={theme.colors.primary}
              />
              <Text variant="labelLarge" style={{ fontSize: 15 }}>
                {reference.title}
              </Text>
            </View>
          }
          description={reference.description}
          descriptionNumberOfLines={3}
          onPress={() =>
            onPress ? onPress(reference) : setDialogVisible(true)
          }
          right={(props) =>
            deleteIcon ? (
              <IconButton
                icon="trash-can-outline"
                onPress={onDeleteIconPress}
                {...props}
              />
            ) : null
          }
        />
      </Surface>

      <DialogWithScroll
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        title="Punto de referencia"
        actions={
          <Button onPress={() => setDialogVisible(false)}>Cerrar</Button>
        }
      >
        <Text variant="labelLarge" style={styles.dialogContentTitle}>
          {reference.title}
        </Text>
        <Text variant="bodyMedium">{reference.description}</Text>
      </DialogWithScroll>
    </>
  );
};

export default ReferencePoint;

const styles = StyleSheet.create({
  referenceSurface: {
    borderRadius: 8,
  },
  referenceInfoContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dialogScrollArea: {
    paddingVertical: 16,
  },
  dialogContentTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
});
