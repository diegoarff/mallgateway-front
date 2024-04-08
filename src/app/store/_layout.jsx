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
        name="products/index"
        options={{
          headerTitle: "Productos",
        }}
      />
      <Stack.Screen
        name="products/categories"
        options={{
          headerTitle: "Categorías de productos",
        }}
      />
      <Stack.Screen
        name="products/variants"
        options={{
          headerTitle: "Variantes de productos",
        }}
      />
      <Stack.Screen
        name="products/new"
        options={{
          headerTitle: "Nuevo producto",
        }}
      />
      <Stack.Screen
        name="products/[id]/index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="products/[id]/edit"
        options={{
          headerTitle: "Editar producto",
        }}
      />

      {/* Promos */}
      <Stack.Screen
        name="promos/index"
        options={{
          headerTitle: "Promociones",
        }}
      />
      <Stack.Screen
        name="promos/new"
        options={{
          headerTitle: "Nueva promoción",
        }}
      />
      <Stack.Screen
        name="promos/[id]/index"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="promos/[id]/edit"
        options={{
          headerTitle: "Editar promoción",
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
