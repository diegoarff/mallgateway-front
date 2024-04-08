import { Stack } from "expo-router";
import Header from "../../../../components/Header";

const UserExploreLayout = () => {
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
          headerTitle: "Tiendas",
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          headerTitle: "Productos recientes",
        }}
      />
    </Stack>
  );
};

export default UserExploreLayout;
