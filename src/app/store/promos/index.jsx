import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { FAB, Appbar } from "react-native-paper";
import { useGetPromos } from "../../../services/hooks/promos";
import { useGlobalStore } from "../../../stores/global";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Loader from "../../../components/Loader";
import PromoItem from "../../../components/PromoItem";
import { useDebounce } from "../../../hooks/useDebounce";
import PromoFilters from "../../../components/filters/PromoFilters";

const StorePromos = () => {
  const router = useRouter();
  const store = useGlobalStore((state) => state.store);

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({});

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPromos({
    search: debouncedSearch,
    store: store.id,
    ...filters,
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const promos = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  const headerActions = [
    {
      tooltip: "Filtrar",
      component: (
        <Appbar.Action
          icon="filter-variant"
          size={28}
          onPress={() => setFiltersVisible(true)}
        />
      ),
    },
  ];

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
              actions={headerActions}
            />
          ),
        }}
      />

      <ScreenWrapper withScrollView={false}>
        {isPending && <Loader />}
        {isError && <Text>{error.message}</Text>}
        {data && (
          <FlatList
            data={promos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <PromoItem promo={item} />}
            contentContainerStyle={styles.flatListContentContainer}
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
          onPress={() => router.push("store/promos/new")}
        />
        <PromoFilters
          visible={filtersVisible}
          onDismiss={() => setFiltersVisible(false)}
          setFilters={setFilters}
          withActive
        />
      </ScreenWrapper>
    </>
  );
};

export default StorePromos;

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingTop: 12,
    paddingBottom: 80,
    gap: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
