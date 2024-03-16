import { Portal, Snackbar } from 'react-native-paper';
import { useUiStore } from '../stores/ui';
const Snack = () => {
  const snackbar = useUiStore((state) => state.snackbar);
  const hideSnackbar = useUiStore((state) => state.hideSnackbar);

  return (
    <Portal>
      <Snackbar
        visible={snackbar.visible}
        onDismiss={hideSnackbar}
        onIconPress={hideSnackbar}
      >
        {snackbar.message}
      </Snackbar>
    </Portal>
  );
};

export default Snack;
