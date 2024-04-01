import { StyleSheet, View } from "react-native";
import { Divider, useTheme } from "react-native-paper";

const BottomAction = ({ children }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Divider bold />
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
};

export default BottomAction;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    position: "absolute",
    left: 0,
    bottom: 0,
    gap: 12,
    width: "100%",
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
});
