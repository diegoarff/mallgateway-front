import {
  Button,
  Dialog,
  Portal,
  TextInput,
  HelperText,
  useTheme,
} from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { useGlobalStore } from "../stores/global";

const EditableListDialog = ({ visible, onDismiss }) => {
  const theme = useTheme();

  const editItem = useGlobalStore((state) => state.editItem);
  const editListItem = useGlobalStore((state) => state.editListItem);
  const addListItem = useGlobalStore((state) => state.addListItem);

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(editItem?.name || "");
  }, [editItem]);

  const handleConfirm = useCallback(() => {
    const newItem = { ...editItem, name: value };
    if (editItem.index !== null) {
      editListItem(newItem);
    } else {
      addListItem(newItem);
    }
    onDismiss();
  }, [editItem, editListItem, addListItem, value]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {editItem?.index !== null ? "Editar" : "Añadir"}
        </Dialog.Title>
        <Dialog.Content style={{ marginBottom: 20 }}>
          <TextInput
            mode="outlined"
            label="Nombre"
            defaultValue={value}
            onChangeText={setValue}
            autoComplete="off"
            autoCorrect={false}
            autoFocus
            error={!value}
            style={{ backgroundColor: theme.colors.elevation.level3 }}
          />
          <HelperText type={!value && "error"}>* requerido</HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={handleConfirm} disabled={!value}>
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EditableListDialog;
