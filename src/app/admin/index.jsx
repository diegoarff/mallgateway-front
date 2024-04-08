import { Stack, useRouter } from "expo-router";
import DashboardList from "../../components/DashboardList";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { Appbar, Avatar, Text } from "react-native-paper";
import { appSettings } from "../../settings";

const Index = () => {
  const items = [
    {
      icon: "store-outline",
      title: "Tiendas",
      route: "admin/stores",
    },
    {
      icon: "label-outline",
      title: "Categorías de tiendas",
      route: "admin/categories",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <AdminHeader {...props} />,
        }}
      />
      <ScreenWrapper>
        <DashboardList items={items} />
      </ScreenWrapper>
    </>
  );
};

export default Index;

const AdminHeader = ({ ...props }) => {
  const router = useRouter();

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="account-circle-outline"
          onPress={() => router.push("admin/user-settings")}
        />
      ),
      tooltip: "Configuración de usuario",
    },
  ];

  return (
    <Header
      left={<Avatar.Image source={{ uri: appSettings.mallLogo }} size={36} />}
      title={
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {appSettings.mallName}
        </Text>
      }
      actions={headerActions}
      {...props}
    />
  );
};
