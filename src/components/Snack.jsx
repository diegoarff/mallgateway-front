import { Portal, Snackbar } from "react-native-paper";
import { useGlobalStore } from "../stores/global";
const Snack = () => {
  const snackbar = useGlobalStore((state) => state.snackbar);
  const hideSnackbar = useGlobalStore((state) => state.hideSnackbar);

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
