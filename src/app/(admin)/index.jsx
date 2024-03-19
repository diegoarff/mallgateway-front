import { Appbar, Avatar, Text } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StyleSheet } from "react-native";
import { appSettings } from "../../settings";
import DashboardItem from "../../components/DashboardItem";

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper
      contentContainerStyle={{
        gap: 12,
      }}
    >
      <AdminHeader />
      <Text variant="titleLarge" style={styles.text}>
        Panel de administración
      </Text>

      <DashboardItem
        icon="store"
        title="Tiendas"
        onPress={() => router.push("(admin)/stores")}
      />
      <DashboardItem
        icon="label-outline"
        title="Categorías de tiendas"
        onPress={() => router.push("(admin)/categories")}
      />
    </ScreenWrapper>
  );
};

const AdminHeader = () => {
  const router = useRouter();
  return (
    <Stack.Screen
      options={{
        header: () => {
          return (
            <Appbar.Header style={styles.header}>
              <Avatar.Image source={{ uri: appSettings.mallLogo }} size={40} />
              <Appbar.Content title={appSettings.mallName} />
              <Appbar.Action
                icon="account-circle-outline"
                size={28}
                onPress={() => router.push("(admin)/user-settings")}
              />
            </Appbar.Header>
          );
        },
      }}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    gap: 12,
  },
  text: { marginVertical: 12 },
});
