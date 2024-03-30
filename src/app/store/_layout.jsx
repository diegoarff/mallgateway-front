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

      {/* Info */}
      <Stack.Screen
        name="info/index"
        options={{
          headerTitle: "Información de tienda",
        }}
      />
      <Stack.Screen
        name="info/general"
        options={{
          headerTitle: "Información general",
        }}
      />
      <Stack.Screen
        name="info/schedule"
        options={{
          headerTitle: "Horarios",
        }}
      />
      <Stack.Screen
        name="info/contacts"
        options={{
          headerTitle: "Contactos",
        }}
      />
      <Stack.Screen
        name="info/location"
        options={{
          headerTitle: "Ubicación",
        }}
      />

      {/* Products */}
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
