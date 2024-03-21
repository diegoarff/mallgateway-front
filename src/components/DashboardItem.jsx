import { Pressable, StyleSheet } from "react-native";
import { Icon, Surface, Text, useTheme } from "react-native-paper";

const DashboardItem = ({ icon, title, onPress }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Surface
        mode="flat"
        style={[styles.menuItem, { backgroundColor: theme.colors.primary }]}
      >
        <Icon source={icon} size={28} color={theme.colors.onPrimary} />
        <Text variant="titleMedium" style={{ color: theme.colors.onPrimary }}>
          {title}
        </Text>
      </Surface>
    </Pressable>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
});
