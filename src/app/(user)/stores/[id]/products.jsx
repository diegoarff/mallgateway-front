import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";
import { useGetProducts } from "../../../../services/hooks/products";
import Loader from "../../../../components/Loader";
import ProductList from "../../../../components/ProductList";
import ScreenWrapper from "../../../../components/ScreenWrapper";

const StoreDetailProducts = () => {
  const { id } = useLocalSearchParams();

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts({ store: id });

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
    <ScreenWrapper withInsets={false} withScrollView={false}>
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
    </ScreenWrapper>
  );
};

export default StoreDetailProducts;
