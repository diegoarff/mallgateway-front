import { View } from "react-native";
import { Text, Searchbar, useTheme, Appbar, Chip } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import ProductList from "../../../../components/ProductList";
import PromoList from "../../../../components/PromoList";
import Loader from "../../../../components/Loader";
import { useGetProducts } from "../../../../services/hooks/products";
import { useGetPromos } from "../../../../services/hooks/promos";
import { useDebounce } from "../../../../hooks/useDebounce";
import ProductFilters from "../../../../components/filters/ProductFilters";
import PromoFilters from "../../../../components/filters/PromoFilters";

const StoreDetailSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <SearchHeader
              value={searchValue}
              setValue={setSearchValue}
              {...props}
            />
          ),
        }}
      />
      <ScreenWrapper withScrollView={false}>
        <TabsProvider defaultIndex={0}>
          <Tabs>
            <TabScreen label="Productos">
              <Products search={debouncedSearch} />
            </TabScreen>
            <TabScreen label="Promociones">
              <Promos search={debouncedSearch} />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </ScreenWrapper>
    </>
  );
};

export default StoreDetailSearch;

const SearchHeader = ({ value, setValue, navigation }) => {
  const theme = useTheme();
  return (
    <Appbar.Header>
      <Appbar.Content
        title={
          <Searchbar
            placeholder="Busca algo..."
            value={value}
            onChangeText={setValue}
            icon="arrow-left"
            style={{
              backgroundColor: theme.colors.background,
              marginLeft: -12,
            }}
            autoFocus
            autoCorrect={false}
            autoComplete="off"
            placeholderTextColor={theme.colors.outline}
            onIconPress={navigation.goBack}
          />
        }
      />
    </Appbar.Header>
  );
};

const Products = ({ search }) => {
  const { id } = useLocalSearchParams();
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
  } = useGetProducts({ store: id, search, ...filters });

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
    <View>
      <Chip
        icon="tune-variant"
        onPress={() => setFiltersVisible(true)}
        style={{
          marginVertical: 16,
          alignSelf: "flex-start",
        }}
      >
        Filtrar
      </Chip>
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <ProductList
          products={products}
          virtualized
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingBottom: 20 }}
        />
      )}

      <ProductFilters
        visible={filtersVisible}
        onDismiss={() => setFiltersVisible(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </View>
  );
};

const Promos = ({ search }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({});
  const { id } = useLocalSearchParams();

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPromos({ store: id, search, active: true, ...filters });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const promos = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  return (
    <View>
      <Chip
        icon="tune-variant"
        onPress={() => setFiltersVisible(true)}
        style={{
          marginVertical: 16,
          alignSelf: "flex-start",
        }}
      >
        Filtrar
      </Chip>
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <PromoList
          promos={promos}
          virtualized
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingBottom: 20 }}
        />
      )}
      <PromoFilters
        visible={filtersVisible}
        onDismiss={() => setFiltersVisible(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </View>
  );
};
