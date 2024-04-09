import { Text, Searchbar, useTheme, Appbar } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Stack } from "expo-router";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";
import { useMemo, useState } from "react";
import ProductList from "../../components/ProductList";
import StoreList from "../../components/StoreList";
import PromoList from "../../components/PromoList";
import Loader from "../../components/Loader";
import { useGetProducts } from "../../services/hooks/products";
import { useGetPromos } from "../../services/hooks/promos";
import { useGetStores } from "../../services/hooks/stores";
import { View } from "react-native";
import { useDebounce } from "../../hooks/useDebounce";

// TODO: Add filters
const Search = () => {
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
      <ScreenWrapper withInsets={false} withScrollView={false}>
        {debouncedSearch && (
          <TabsProvider defaultIndex={0}>
            <Tabs>
              <TabScreen label="Productos">
                <Products search={debouncedSearch} />
              </TabScreen>
              <TabScreen label="Promociones">
                <Promos search={debouncedSearch} />
              </TabScreen>
              <TabScreen label="Tiendas">
                <Stores search={debouncedSearch} />
              </TabScreen>
            </Tabs>
          </TabsProvider>
        )}
      </ScreenWrapper>
    </>
  );
};

export default Search;

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
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts({ search });

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
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <ProductList
          products={products}
          virtualized
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingVertical: 20 }}
        />
      )}
    </View>
  );
};

const Promos = ({ search }) => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPromos({ search, active: true });

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
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <PromoList
          promos={promos}
          virtualized
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingVertical: 20 }}
        />
      )}
    </View>
  );
};

const Stores = ({ search }) => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetStores({ search });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const stores = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  return (
    <View>
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <StoreList
          stores={stores}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingVertical: 20 }}
        />
      )}
    </View>
  );
};
