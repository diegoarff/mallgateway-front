import ScreenWrapper from "../../../../components/ScreenWrapper";
import { Text, Avatar, Appbar, IconButton, Button } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import Header from "../../../../components/Header";
import { appSettings } from "../../../../settings";
import { useGetProducts } from "../../../../services/hooks/products";
import { useGetStores } from "../../../../services/hooks/stores";
import { StyleSheet, View } from "react-native";
import { useMemo } from "react";
import StoreList from "../../../../components/StoreList";
import ProductList from "../../../../components/ProductList";
import Loader from "../../../../components/Loader";

const Explore = () => {
  const router = useRouter();

  const {
    data: productData,
    isPending: productIsPending,
    isError: productIsError,
    error: productError,
  } = useGetProducts({});

  const {
    data: storeData,
    isPending: storeIsPending,
    isError: storeIsError,
    error: storeError,
  } = useGetStores({});

  const products = useMemo(() => {
    if (!productData) return [];
    return productData.pages.flatMap((page) => page.results);
  }, [productData]);

  const stores = useMemo(() => {
    if (!storeData) return [];
    return storeData.pages.flatMap((page) => page.results);
  }, [storeData]);

  const redirectProducts = () => {
    router.push("explore/products");
  };

  const redirectStores = () => {
    router.push("explore/stores");
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <ExploreHeader {...props} />,
        }}
      />
      <ScreenWrapper contentContainerStyle={{ gap: 24, paddingBottom: 20 }}>
        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Tiendas
            </Text>
            <IconButton
              icon="arrow-right"
              mode="contained"
              size={18}
              onPress={redirectStores}
            />
          </View>
          {storeIsPending && <Loader />}
          {storeIsError && (
            <Text>Error cargando las tiendas: {storeError.message}</Text>
          )}
          {storeData && <StoreList stores={stores} horizontal />}
        </View>

        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Productos recientes
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
      </ScreenWrapper>
    </>
  );
};

export default Explore;

const ExploreHeader = ({ ...props }) => {
  const router = useRouter();

  const headerActions = [
    {
      component: (
        <Appbar.Action icon="magnify" onPress={() => router.push("search")} />
      ),
      tooltip: "Buscar",
    },
  ];

  return (
    <Header
      left={<Avatar.Image source={{ uri: appSettings.mallLogo }} size={36} />}
      title={
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {appSettings.mallName}
        </Text>
      }
      actions={headerActions}
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
