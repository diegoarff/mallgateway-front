import { Stack } from "expo-router";
import Header from "../../../../components/Header";

const UserHomeLayout = () => {
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
        name="products-followed"
        options={{
          headerTitle: "Productos de tiendas que sigues",
        }}
      />
      <Stack.Screen
        name="promos-followed"
        options={{
          headerTitle: "Promociones de tiendas que sigues",
        }}
      />
    </Stack>
  );
};

export default UserHomeLayout;
