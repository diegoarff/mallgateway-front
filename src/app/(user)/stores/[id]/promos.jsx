import { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";
import { useGetPromos } from "../../../../services/hooks/promos";
import Loader from "../../../../components/Loader";
import PromoList from "../../../../components/PromoList";
import ScreenWrapper from "../../../../components/ScreenWrapper";

const StoreDetailPromos = () => {
  const { id } = useLocalSearchParams();

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPromos({ store: id, active: true });

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
    <ScreenWrapper withScrollView={false}>
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
    </ScreenWrapper>
  );
};

export default StoreDetailPromos;
