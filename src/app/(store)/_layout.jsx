import { Stack } from "expo-router";
import Header from "../../components/Header";

const _layout = () => {
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
        name="store"
        options={{
          headerTitle: "Tienda",
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          headerTitle: "Productos",
        }}
      />
      <Stack.Screen
        name="promos"
        options={{
          headerTitle: "Promociones",
        }}
      />
      <Stack.Screen
        name="reviews"
        options={{
          headerTitle: "Reseñas",
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

export default _layout;
