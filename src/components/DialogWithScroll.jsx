import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Dialog, Portal } from "react-native-paper";

const DialogWithScroll = ({
  visible,
  onDismiss,
  title,
  actions,
  children,
  withScrollview = true,
  maxHeight,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          maxHeight: maxHeight || Dimensions.get("window").height * 0.8,
        }}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea>
          {withScrollview ? (
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View>{children}</View>
          )}
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
