import { Image, StyleSheet, View } from "react-native";
import { useAuthStore } from "../../../../stores/auth";
import { ROLES } from "../../../../utils/constants";
import { useRouter, Stack } from "expo-router";
import { Text, Button, IconButton } from "react-native-paper";
import { appSettings } from "../../../../settings";
import Header from "../../../../components/Header";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { useGetProductsFromFollowed } from "../../../../services/hooks/products";
import { useMemo } from "react";
import Loader from "../../../../components/Loader";
import ProductList from "../../../../components/ProductList";
import { useGetPromosFromFollowed } from "../../../../services/hooks/promos";
import PromoList from "../../../../components/PromoList";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    data: productData,
    isPending: productIsPending,
    isError: productIsError,
    error: productError,
  } = useGetProductsFromFollowed({
    limit: 8,
  });

  const {
    data: promoData,
    isPending: promoIsPending,
    isError: promoIsError,
    error: promoError,
  } = useGetPromosFromFollowed({
    limit: 5,
  });

  const products = useMemo(() => {
    if (!productData) return [];
    return productData.pages.flatMap((page) => page.results);
  }, [productData]);

  const promos = useMemo(() => {
    if (!promoData) return [];
    return promoData.pages.flatMap((page) => page.results);
  }, [promoData]);

  const redirectProducts = () => {
    router.push("home/products-followed");
  };

  const redirectPromos = () => {
    router.push("home/promos-followed");
  };

  const shouldRedirect = () => {
    if (user?.role === ROLES.GUEST) {
      return router.replace("explore");
    }
  };

  return (
    <View style={{ flex: 1 }} onLayout={shouldRedirect}>
      <Stack.Screen
        options={{
          header: (props) => <UserHeader {...props} />,
        }}
      />

      <ScreenWrapper
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 20,
        }}
      >
        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Productos de tiendas que sigues
            </Text>
            <IconButton
              icon="arrow-right"
              mode="contained"
              size={18}
              onPress={redirectProducts}
            />
          </View>
          {productIsPending && <Loader />}
          {productIsError && <Text>{productError.message}</Text>}
          {productData && <ProductList products={products} />}
          {products.length > 0 && (
            <Button mode="contained" onPress={redirectProducts}>
              Ver más
            </Button>
          )}
        </View>

        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Promociones de tiendas que sigues
            </Text>
            <IconButton
              icon="arrow-right"
              mode="contained"
              size={18}
              onPress={redirectPromos}
            />
          </View>
          {promoIsPending && <Loader />}
          {promoIsError && <Text>{promoError.message}</Text>}
          {promoData && <PromoList promos={promos} />}
          {promos.length > 0 && (
            <Button mode="contained" onPress={redirectPromos}>
              Ver más
            </Button>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default Home;

const UserHeader = ({ ...props }) => {
  return (
    <Header
      left={
        <Image
          source={{ uri: appSettings.mallLogo }}
          style={{ height: 36, aspectRatio: 1 }}
        />
      }
      title={
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {appSettings.mallName}
        </Text>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
  },
});
