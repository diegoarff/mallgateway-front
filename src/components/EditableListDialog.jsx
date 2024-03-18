import {
  Button,
  Dialog,
  Portal,
  TextInput,
  HelperText,
  useTheme,
} from 'react-native-paper';
import { useEffect, useState } from 'react';

const EditableListDialog = ({ visible, editItem, onConfirm, onDismiss }) => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(editItem?.name || '');
  }, [editItem]);

  const handleConfirm = () => {
    onConfirm({ ...editItem, name: value });
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>
          {editItem?.index !== null ? 'Editar' : 'Añadir'}
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
