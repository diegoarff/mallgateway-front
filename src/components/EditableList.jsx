import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, FAB, IconButton, List, Surface } from 'react-native-paper';
import EditableListDialog from './EditableListDialog';
import { useGlobalStore } from '../stores/global';

const EditableList = ({ items, itemsName, mutation }) => {
  const [data, setData] = useState([]);
  const setItemToEdit = useGlobalStore((state) => state.setItemToEdit);
  const [showDialog, setShowDialog] = useState(false);

  const nonDeletedData = useMemo(
    () => data.filter((item) => !item.deleted),
    [data]
  );

  const areEqual = useMemo(() => {
    return JSON.stringify(data) === JSON.stringify(items);
  }, [data, items]);

  useEffect(() => {
    // Reset data when items refetch
    setData(JSON.parse(JSON.stringify(items)));
  }, [items]);

  const toggleDialog = (item = null, index = null) => {
    setShowDialog((prev) => !prev);
    setItemToEdit(item, index);
  };

  const onConfirm = (item) => {
    const newData = [...data];
    if (item.index !== null) {
      newData[item.index] = item;
    } else {
      newData.push(item);
    }
    setData(newData);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData[index].deleted = true;
    setData(newData);
  };

  const handleSave = () => {
    mutation.mutate(data);
  };

  return (
    <>
      <List.Section style={styles.section}>
        <View style={styles.subheader}>
          <List.Subheader>{`${nonDeletedData.length} ${itemsName}`}</List.Subheader>
          <Button
            disabled={areEqual}
            onPress={() => {
              setData(JSON.parse(JSON.stringify(items)));
            }}
          >
            Valores por defecto
          </Button>
        </View>
        {data.map(
          (item, idx) =>
            !item.deleted && (
              <Surface key={idx} style={styles.surface} mode="flat">
                <List.Item
                  title={item.name}
                  style={styles.item}
                  right={() => (
                    <>
                      <IconButton
                        icon="pencil-outline"
                        onPress={() => toggleDialog(item, idx)}
                      />
                      <IconButton
                        icon="trash-can-outline"
                        onPress={() => handleDelete(idx)}
                        style={{ marginRight: -20 }}
                      />
                    </>
                  )}
                />
              </Surface>
            )
        )}
      </List.Section>
      <Button
        mode="contained"
        style={styles.button}
        disabled={areEqual || mutation.isPending}
        loading={mutation.isPending}
        onPress={handleSave}
      >
        Guardar
      </Button>
      <FAB
        icon="plus"
        label="Añadir"
        mode="flat"
        style={styles.fab}
        onPress={() => toggleDialog()}
      />
      <EditableListDialog
        visible={showDialog}
        onConfirm={onConfirm}
        onDismiss={() => setShowDialog(false)}
      />
    </>
  );
};

export default EditableList;

const styles = StyleSheet.create({
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
    right: 0,
    bottom: 16,
  },
});
