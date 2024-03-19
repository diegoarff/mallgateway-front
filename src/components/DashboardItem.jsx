import { Pressable, StyleSheet } from 'react-native';
import { Icon, Surface, Text } from 'react-native-paper';

const DashboardItem = ({ icon, title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Surface mode="flat" style={styles.menuItem}>
        <Icon source={icon} size={28} />
        <Text variant="titleMedium">{title}</Text>
      </Surface>
    </Pressable>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
});
