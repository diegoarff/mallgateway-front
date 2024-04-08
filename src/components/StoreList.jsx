import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import StoreItem from "./StoreItem";
import Loader from "./Loader";

const EmptyComponent = () => (
  <Text variant="bodyMedium" style={styles.emptyText}>
    No hay tiendas
  </Text>
);

const StoreList = ({
  stores,
  horizontal,
  loadMore,
  isFetchingNextPage,
  style,
}) => {
  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <StoreItem store={item} compact />}
      numColumns={horizontal ? undefined : 2}
      contentContainerStyle={[styles.flatListContentContainer, style]}
      columnWrapperStyle={horizontal ? null : styles.columnWrapper}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      ListEmptyComponent={<EmptyComponent />}
    />
  );
};

export default StoreList;

const styles = StyleSheet.create({
  normalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  flatListContentContainer: {
    gap: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
  },
});
