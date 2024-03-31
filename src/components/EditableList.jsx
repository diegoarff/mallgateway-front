import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  FAB,
  IconButton,
  List,
  Portal,
  Surface,
} from "react-native-paper";
import EditableListDialog from "./EditableListDialog";
import { useGlobalStore } from "../stores/global";
import { FlashList } from "@shopify/flash-list";

// TODO: Handle state here
const EditableList = ({ itemsName, mutation }) => {
  const [showDialog, setShowDialog] = useState(false);

  const listData = useGlobalStore((state) => state.listData);
  const isListDataEqual = useGlobalStore((state) => state.isListDataEqual);
  const deleteListItem = useGlobalStore((state) => state.deleteListItem);
  const setEditItem = useGlobalStore((state) => state.setEditItem);

  const nonDeletedData = useMemo(
    () => listData.filter((item) => !item.deleted),
    [listData]
  );

  const toggleDialog = (item = null, index = null) => {
    setShowDialog((prev) => !prev);
    setEditItem({ ...item, index });
  };

  const handleSave = () => {
    mutation.mutate(listData);
  };

  const renderItem = (item, index) => (
    <Surface mode="flat" elevation={2} style={styles.listItemSurface}>
      <List.Item
        title={item.name}
        style={styles.listItem}
        right={() => (
          <View style={styles.iconContainer}>
            <IconButton
              icon="pencil-outline"
              onPress={() => toggleDialog(item, index)}
            />
            <IconButton
              icon="trash-can-outline"
              onPress={() => deleteListItem(index)}
              style={styles.deleteIcon}
            />
          </View>
        )}
      />
    </Surface>
  );

  return (
    <View style={styles.container}>
      <List.Section style={styles.section}>
        <List.Subheader>{`${nonDeletedData.length} ${itemsName}`}</List.Subheader>
        <View style={styles.listContainer}>
          <FlashList
            data={listData}
            renderItem={({ item, index }) =>
              !item.deleted && renderItem(item, index)
            }
            estimatedItemSize={20}
          />
        </View>
      </List.Section>
      <Button
        mode="contained"
        style={styles.saveButton}
        disabled={isListDataEqual() || mutation.isPending}
        loading={mutation.isPending}
        onPress={handleSave}
      >
        Guardar
      </Button>
      <Portal.Host>
        <Portal>
          <FAB
            icon="plus"
            label="Añadir"
            style={styles.addButton}
            onPress={() => toggleDialog()}
          />
        </Portal>
      </Portal.Host>
      <EditableListDialog
        visible={showDialog}
        onDismiss={() => setShowDialog(false)}
      />
    </View>
  );
};

export default EditableList;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 92 },
  section: { gap: 12 },
  listItemSurface: {
    marginBottom: 12,
    borderRadius: 12,
  },
  listItem: {
    paddingVertical: -8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    marginTop: 12,
  },
  addButton: {
    position: "absolute",
    right: 0,
    bottom: 16,
  },
  listContainer: {
    flex: 1,
    minHeight: 3,
  },
  deleteIcon: {
    marginRight: -20,
  },
});
