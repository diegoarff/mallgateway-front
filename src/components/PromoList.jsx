import { Text } from "react-native-paper";
import PromoItem from "./PromoItem";
import { FlatList, StyleSheet, View } from "react-native";
import Loader from "./Loader";

const EmptyComponent = () => (
  <Text variant="bodyMedium" style={styles.emptyText}>
    No hay promociones
  </Text>
);

const PromoList = ({
  promos,
  virtualized = false,
  loadMore,
  isFetchingNextPage,
  style,
}) => {
  return (
    <>
      {virtualized ? (
        <FlatList
          data={promos}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PromoItem promo={item} />}
          contentContainerStyle={[styles.container, style]}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent />}
        />
      ) : (
        <>
          {promos?.length > 0 ? (
            <View style={[styles.container, style]}>
              {promos?.map((promo) => (
                <PromoItem key={promo.name} promo={promo} />
              ))}
            </View>
          ) : (
            <EmptyComponent />
          )}
        </>
      )}
    </>
  );
};

export default PromoList;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  emptyText: {
    textAlign: "center",
  },
});
