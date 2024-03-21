import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import DashboardItem from "../components/DashboardItem";
import { Appbar, Avatar, Text } from "react-native-paper";
import { appSettings } from "../settings";

// Used for the admin and store dashboards (index pages)
const DashboardScreen = ({ from, items }) => {
  const router = useRouter();

  // Custom header fot this screen
  const renderHeader = () => {
    return (
      <Stack.Screen
        options={{
          header: () => {
            return (
              <Appbar.Header style={styles.header}>
                <Avatar.Image
                  source={{ uri: appSettings.mallLogo }}
                  size={36}
                />
                <Appbar.Content
                  title={
                    <Text variant="titleLarge" style={styles.title}>
                      {appSettings.mallName}
                    </Text>
                  }
                />
                <Appbar.Action
                  icon="account-circle-outline"
                  size={28}
                  onPress={() => router.push(`(${from})/user-settings`)}
                />
              </Appbar.Header>
            );
          },
        }}
      />
    );
  };

  return (
    <ScreenWrapper
      contentContainerStyle={{
        gap: 12,
      }}
    >
      {renderHeader()}

      <Text variant="titleLarge" style={styles.text}>
        Panel de administración
      </Text>

      {items.map((item, idx) => (
        <DashboardItem
          key={idx}
          icon={item.icon}
          title={item.title}
          onPress={() => router.push(item.route)}
        />
      ))}
    </ScreenWrapper>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    gap: 12,
  },
  title: {
    fontWeight: "bold",
  },
  text: { marginVertical: 12 },
});
