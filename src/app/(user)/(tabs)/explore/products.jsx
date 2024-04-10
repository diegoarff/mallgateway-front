import { useMemo } from "react";
import { Text } from "react-native-paper";
import { useGetProducts } from "../../../../services/hooks/products";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Loader from "../../../../components/Loader";
import ProductList from "../../../../components/ProductList";

const ExploreProducts = () => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProducts({});

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
    <ScreenWrapper withScrollView={false}>
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

export default ExploreProducts;
