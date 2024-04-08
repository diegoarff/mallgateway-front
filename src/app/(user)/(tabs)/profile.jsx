import { View } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { appSettings } from "../../../settings";
import { useAuthStore } from "../../../stores/auth";
import { ROLES } from "../../../utils/constants";
import { Text, Button, Avatar, List } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import {
  useGetFollowedProducts,
  useGetFollowedStores,
} from "../../../services/hooks/users";
import Loader from "../../../components/Loader";
import ProductList from "../../../components/ProductList";
import StoreList from "../../../components/StoreList";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              left={
                <Avatar.Image
                  source={{ uri: appSettings.mallLogo }}
                  size={36}
                />
              }
              title={
                <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                  {appSettings.mallName}
                </Text>
              }
              {...props}
            />
          ),
        }}
      />
      <ScreenWrapper withInsets={false} withScrollView={false}>
        {user?.role === ROLES.USER ? <AuthProfile /> : <GuestProfile />}
      </ScreenWrapper>
    </>
  );
};

export default Profile;

const GuestProfile = () => {
  const doLogout = useAuthStore((state) => state.doLogout);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text variant="bodyLarge">Para ver tu perfil debes iniciar sesión</Text>
      <Button mode="contained" onPress={doLogout}>
        Ir a inicio de sesión
      </Button>
    </View>
  );
};

const AuthProfile = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  return (
    <>
      <View style={{ marginBottom: 8 }}>
        <Text variant="titleMedium">Cuenta</Text>
        <List.Item
          title={user?.username}
          description={user?.email}
          right={() => <List.Icon icon="arrow-right" />}
          contentStyle={{ paddingLeft: 0 }}
          onPress={() => router.push("user-settings")}
        />
      </View>

      <Text variant="titleMedium">Intereses</Text>
      <TabsProvider defaultIndex={0}>
        <Tabs>
          <TabScreen label="Productos">
            <FollowedProducts />
          </TabScreen>
          <TabScreen label="Tiendas">
            <FollowedStores />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </>
  );
};

const FollowedProducts = () => {
  const { data, isPending, isError } = useGetFollowedProducts();

  return (
    <View>
      {isPending && <Loader />}
      {isError && <Text>Error al cargar los productos</Text>}
      {data && (
        <ProductList
          products={data}
          style={{ paddingVertical: 20 }}
          virtualized
        />
      )}
    </View>
  );
};

const FollowedStores = () => {
  const { data, isPending, isError } = useGetFollowedStores();

  return (
    <View>
      {isPending && <Loader />}
      {isError && <Text>Error al cargar las tiendas</Text>}
      {data && <StoreList stores={data} style={{ paddingVertical: 20 }} />}
    </View>
  );
};
