import { FlatList, StyleSheet, View } from "react-native";
import { Button, Divider, FAB, Icon, Text, useTheme } from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import Header from "../../../components/Header";
import { useGetProducts } from "../../../services/hooks/products";
import { useGlobalStore } from "../../../stores/global";
import ProductItem from "../../../components/ProductItem";
import Loader from "../../../components/Loader";
import { useDebounce } from "../../../hooks/useDebounce";

const StoreProducts = () => {
  const router = useRouter();
  const theme = useTheme();
  const store = useGlobalStore((state) => state.store);

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts({
    search: debouncedSearch,
    store: store.id,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const products = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              {...props}
              withSearchbar
              searchValue={searchText}
              onSearchChange={setSearchText}
              searchbarPlaceholder="Buscar productos"
            />
          ),
        }}
      />

      <ScreenWrapper withInsets={false} withScrollView={false}>
        <View style={styles.buttonsContainer}>
          <Button
            icon={() => (
              <Icon
                source="tag-multiple"
                size={24}
                color={theme.colors.primary}
              />
            )}
            mode="contained-tonal"
            onPress={() => router.push("store/products/categories")}
          >
            Categorías
          </Button>
          <Button
            icon={() => (
              <Icon source="tag-text" size={20} color={theme.colors.primary} />
            )}
            mode="contained-tonal"
            onPress={() => router.push("store/products/variants")}
          >
            Variantes
          </Button>
          <Divider style={styles.divider} bold />
        </View>

        {isPending && <Loader />}
        {isError && <Text>{error.message}</Text>}
        {data && (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductItem product={item} />}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
            columnWrapperStyle={styles.columnWrapper}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
            showsVerticalScrollIndicator={false}
          />
        )}

        <FAB
          icon="plus"
          label="Añadir"
          style={styles.fab}
          onPress={() => router.push("store/products/new")}
        />
      </ScreenWrapper>
    </>
  );
};

export default StoreProducts;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 10,
    position: "relative",
  },
  divider: {
    position: "absolute",
    left: -16,
    right: -16,
    bottom: 0,
  },
  flatListContentContainer: {
    paddingTop: 16,
    paddingBottom: 80,
    gap: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    right: 12,
    bottom: 16,
  },
});
