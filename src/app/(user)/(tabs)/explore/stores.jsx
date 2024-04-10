import { useMemo } from "react";
import { Text } from "react-native-paper";
import { useGetStores } from "../../../../services/hooks/stores";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import StoreList from "../../../../components/StoreList";
import Loader from "../../../../components/Loader";

const ExploreStores = () => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetStores({});

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
    <ScreenWrapper withScrollView={false}>
      {isPending && <Loader />}
      {isError && <Text>{error.message}</Text>}
      {data && (
        <StoreList
          stores={stores}
          loadMore={loadMore}
          isFetchingNextPage={isFetchingNextPage}
          style={{ paddingBottom: 20 }}
        />
      )}
    </ScreenWrapper>
  );
};

export default ExploreStores;
