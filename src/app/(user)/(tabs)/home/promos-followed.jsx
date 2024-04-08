import { Text } from "react-native-paper";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import { useGetPromosFromFollowed } from "../../../../services/hooks/promos";
import { useMemo } from "react";
import Loader from "../../../../components/Loader";
import PromoList from "../../../../components/PromoList";

const UserPromosFollowed = () => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPromosFromFollowed({});

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
    <ScreenWrapper withInsets={false} withScrollView={false}>
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

export default UserPromosFollowed;
