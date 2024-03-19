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

  return (
    <View style={styles.container}>
      {/* List */}
      <List.Section style={styles.section}>
        {/* List header */}
        <List.Subheader>{`${nonDeletedData.length} ${itemsName}`}</List.Subheader>

        {/* Items */}
        {listData.map(
          (item, idx) =>
            !item.deleted && (
              <ListItem
                key={idx}
                item={item}
                index={idx}
                onEdit={toggleDialog}
                onDelete={deleteListItem}
              />
            )
        )}
      </List.Section>

      {/* Extra */}
      <Button
        mode="contained"
        style={styles.button}
        disabled={isListDataEqual() || mutation.isPending}
        loading={mutation.isPending}
        onPress={handleSave}
      >
        Guardar
      </Button>
      <Portal>
        <FAB
          icon="plus"
          label="Añadir"
          style={styles.fab}
          onPress={() => toggleDialog()}
        />
        <EditableListDialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
        />
      </Portal>
    </View>
  );
};

export default EditableList;

const ListItem = ({ item, index, onEdit, onDelete }) => (
  <Surface style={styles.surface} mode="flat" elevation={2}>
    <List.Item
      title={item.name}
      style={styles.item}
      right={() => (
        <>
          <IconButton
            icon="pencil-outline"
            onPress={() => onEdit(item, index)}
          />
          <IconButton
            icon="trash-can-outline"
            onPress={() => onDelete(index)}
            style={{ marginRight: -20 }}
          />
        </>
      )}
    />
  </Surface>
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 92 },
  surface: {
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  section: { gap: 12 },
  item: {
    paddingVertical: -8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 12,
    bottom: 16,
  },
});
