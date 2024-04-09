import { Stack } from "expo-router";
import Header from "../../components/Header";

const UserLayout = () => {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        header: ({ ...props }) => {
          return <Header {...props} />;
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search" />
      <Stack.Screen name="products/[id]" />
      <Stack.Screen name="promos/[id]" />
      <Stack.Screen name="stores/[id]/index" />
      <Stack.Screen name="stores/[id]/products" />
      <Stack.Screen name="stores/[id]/promos" />
      <Stack.Screen name="stores/[id]/search" />
      <Stack.Screen name="user-settings" options={{ headerTitle: "Cuenta" }} />
    </Stack>
  );
};

export default UserLayout;
