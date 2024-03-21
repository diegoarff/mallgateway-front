import { StyleSheet, View } from "react-native";
import DashboardItem from "./DashboardItem";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

const DashboardList = ({ items }) => {
  const router = useRouter();
  return (
    <View>
      <Text variant="titleLarge" style={styles.text}>
        Panel de administración
      </Text>

      <View style={styles.itemsContainer}>
        {items.map((item, idx) => (
          <DashboardItem
            key={idx}
            icon={item.icon}
            title={item.title}
            onPress={() => router.push(item.route)}
          />
        ))}
      </View>
    </View>
  );
};

export default DashboardList;

const styles = StyleSheet.create({
  text: { marginTop: 16, marginBottom: 28 },
  itemsContainer: {
    gap: 12,
  },
});
