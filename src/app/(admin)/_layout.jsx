import { Stack } from 'expo-router';
import Header from '../../components/Header';

const AdminLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: ({ ...props }) => {
          return <Header {...props} />;
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="categories"
        options={{
          headerTitle: 'Categorías de tiendas',
        }}
      />
      <Stack.Screen
        name="register-store"
        options={{
          headerTitle: 'Registrar tienda',
        }}
      />
      <Stack.Screen
        name="stores"
        options={{
          headerTitle: 'Tiendas',
        }}
      />
      <Stack.Screen
        name="socials"
        options={{
          headerTitle: 'Redes sociales',
        }}
      />
      <Stack.Screen
        name="user-settings"
        options={{
          headerTitle: 'Configuración de usuario',
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
