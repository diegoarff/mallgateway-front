import { Stack } from "expo-router";
import Header from "../../../components/Header";

const AdminStoresLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        header: ({ ...props }) => {
          return <Header {...props} />;
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Tiendas" }} />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: "Información de tienda" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Registrar tienda" }}
      />
    </Stack>
  );
};

export default AdminStoresLayout;
