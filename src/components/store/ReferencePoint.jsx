import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  Icon,
  IconButton,
  List,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

const ReferencePoint = ({
  reference,
  onItemPress,
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
            onItemPress ? onItemPress(reference) : setDialogVisible(true)
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

      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
          style={{ maxHeight: 0.8 * Dimensions.get("window").height }}
        >
          <Dialog.Title>Punto de referencia</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={styles.dialogScrollArea}>
              <Text variant="labelLarge" style={styles.dialogContentTitle}>
                {reference.title}
              </Text>
              <Text variant="bodyMedium">{reference.description}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cerrar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
