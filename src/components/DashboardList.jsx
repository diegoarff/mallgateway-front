import { Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Icon, Surface, Text, useTheme } from "react-native-paper";

const DashboardList = ({ items }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View>
      <Text variant="titleLarge" style={styles.text}>
        Panel de administración
      </Text>

      <View style={styles.itemsContainer}>
        {items.map((item, idx) => (
          <Pressable key={idx} onPress={() => router.push(item.route)}>
            <Surface
              mode="flat"
              style={[
                styles.menuItem,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
            >
              <Icon source={item.icon} size={28} color={theme.colors.primary} />
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {item.title}
              </Text>
            </Surface>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default DashboardList;

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    marginBottom: 28,
  },
  itemsContainer: {
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
});
