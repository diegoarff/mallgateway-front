import {
  Button,
  Dialog,
  Portal,
  TextInput,
  HelperText,
  useTheme,
} from 'react-native-paper';
import { useGlobalStore } from '../stores/global';
import { useEffect, useState } from 'react';

const EditableListDialog = ({ visible, onConfirm, onDismiss }) => {
  const itemToEdit = useGlobalStore((state) => state.itemToEdit);
  const [value, setValue] = useState('');
  const theme = useTheme();

  useEffect(() => {
    setValue(itemToEdit?.name || '');
  }, [itemToEdit]);

  const handleConfirm = () => {
    onConfirm({ ...itemToEdit, name: value });
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {itemToEdit?.index !== null ? 'Editar' : 'Añadir'}
        </Dialog.Title>
        <Dialog.Content style={{ marginBottom: 20 }}>
          <TextInput
            mode="outlined"
            label="Nombre"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <HelperText>* requerido</HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} textColor={theme.colors.secondary}>
            Cancelar
          </Button>
          <Button onPress={handleConfirm} disabled={!value}>
            Confirmar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default EditableListDialog;
