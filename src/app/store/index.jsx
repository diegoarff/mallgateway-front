import { Stack, useRouter } from "expo-router";
import DashboardList from "../../components/DashboardList";
import ScreenWrapper from "../../components/ScreenWrapper";
import Loader from "../../components/Loader";
import ErrorScreen from "../../components/ErrorScreen";
import { Appbar, Avatar, List, Text } from "react-native-paper";
import Header from "../../components/Header";
import { appSettings } from "../../settings";
import { useGetOwnedStore } from "../../services/hooks/stores";
import { Image } from "react-native";

const Index = () => {
  const { data, status, error } = useGetOwnedStore();

  const items = [
    {
      icon: "store",
      title: "Información de tienda",
      route: "store/info",
    },
    {
      icon: "shopping",
      title: "Productos",
      route: "store/products",
    },
    {
      icon: "label-percent",
      title: "Promociones",
      route: "store/promos",
    },
    {
      icon: "note-text",
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
      left={
        <Image
          source={{ uri: appSettings.mallLogo }}
          style={{ height: 36, aspectRatio: 1 }}
        />
      }
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
