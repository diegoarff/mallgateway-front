import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";

const SectionHeader = ({ title, icon, onIconPress }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text variant="titleMedium">{title}</Text>
    {icon && (
      <IconButton
        icon={icon}
        mode="contained"
        size={18}
        onPress={onIconPress}
      />
    )}
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
