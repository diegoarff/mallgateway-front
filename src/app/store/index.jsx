import { Stack, useRouter } from "expo-router";
import DashboardList from "../../components/DashboardList";
import ScreenWrapper from "../../components/ScreenWrapper";
import Loader from "../../components/Loader";
import ErrorScreen from "../../components/ErrorScreen";
import { Appbar, Avatar, List, Text } from "react-native-paper";
import Header from "../../components/Header";
import { appSettings } from "../../settings";
import { useGetOwnedStore } from "../../services/hooks/stores";

const Index = () => {
  const { data, status, error } = useGetOwnedStore();

  const items = [
    {
      icon: "store-outline",
      title: "Información de tienda",
      route: "store/info",
    },
    {
      icon: "shopping-outline",
      title: "Productos",
      route: "store/products",
    },
    {
      icon: "label-percent-outline",
      title: "Promociones",
      route: "store/promos",
    },
    {
      icon: "note-text-outline",
      title: "Reseñas",
      route: "store/reviews",
    },
  ];

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <StoreHeader {...props} />,
        }}
      />
      <ScreenWrapper>
        <List.Item
          title={data.name}
          description={data.description}
          left={() => <Avatar.Image source={{ uri: data.logo }} />}
        />
        <DashboardList items={items} />
      </ScreenWrapper>
    </>
  );
};

export default Index;

const StoreHeader = ({ ...props }) => {
  const router = useRouter();

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="account-circle-outline"
          onPress={() => router.push("store/user-settings")}
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
      style={{ paddingLeft: 16, gap: 12 }}
      {...props}
    />
  );
};
