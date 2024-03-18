import { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  FAB,
  IconButton,
  List,
  Portal,
  Surface,
} from 'react-native-paper';
import EditableListDialog from './EditableListDialog';

const EditableList = ({ items, itemsName, mutation }) => {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const nonDeletedData = useMemo(
    () => data.filter((item) => !item.deleted),
    [data]
  );

  const areEqual = useMemo(() => {
    return JSON.stringify(data) === JSON.stringify(items);
  }, [data, items]);

  const getList = useCallback(() => {
    setData(JSON.parse(JSON.stringify(items)));
  }, [items]);

  useEffect(() => {
    // Reset data when items refetch
    getList();
  }, [getList]);

  const toggleDialog = (item = null, index = null) => {
    setShowDialog((prev) => !prev);
    setEditItem({ ...item, index });
  };

  const onConfirm = (item) => {
    setData((prevData) => {
      const newData = [...prevData];
      if (item.index !== null) {
        newData[item.index] = item;
      } else {
        newData.push(item);
      }
      return newData;
    });
  };

  const handleDelete = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].deleted = true;
      return newData;
    });
  };

  const handleSave = () => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      {/* List */}
      <List.Section style={styles.section}>
        {/* List header text */}
        <View style={styles.subheader}>
          <List.Subheader>{`${nonDeletedData.length} ${itemsName}`}</List.Subheader>
          <Button disabled={areEqual} onPress={getList}>
            Cancelar edición
          </Button>
        </View>

        {/* Items */}
        {data.map(
          (item, idx) =>
            !item.deleted && (
              <ListItem
                key={idx}
                item={item}
                index={idx}
                onEdit={toggleDialog}
                onDelete={handleDelete}
              />
            )
        )}
      </List.Section>

      {/* Extra */}
      <Button
        mode="contained"
        style={styles.button}
        disabled={areEqual || mutation.isPending}
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
      </Portal>
      <EditableListDialog
        visible={showDialog}
        editItem={editItem}
        onConfirm={onConfirm}
        onDismiss={() => setShowDialog(false)}
      />
    </View>
  );
};

export default EditableList;

const ListItem = ({ item, index, onEdit, onDelete }) => (
  <Surface style={styles.surface} mode="flat">
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
  subheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    right: 12,
    bottom: 16,
  },
});
