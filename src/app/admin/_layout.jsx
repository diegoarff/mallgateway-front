import { Stack } from "expo-router";
import Header from "../../components/Header";

const AdminLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        header: ({ ...props }) => {
          return <Header {...props} />;
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="stores"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          headerTitle: "Categorías de tiendas",
        }}
      />

      <Stack.Screen
        name="user-settings"
        options={{
          headerTitle: "Configuración de usuario",
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
