import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";

const DialogWithScroll = ({ visible, onDismiss, title, actions, children }) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ maxHeight: 0.8 * Dimensions.get("window").height }}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView style={styles.scrollView}>{children}</ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>{actions}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogWithScroll;

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 16,
  },
});
