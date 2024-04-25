import { Text } from "react-native-paper";
import ProductItem from "./ProductItem";
import { FlatList, StyleSheet, View } from "react-native";
import Loader from "./Loader";

const EmptyComponent = () => (
  <Text variant="bodyMedium" style={styles.emptyText}>
    No hay productos
  </Text>
);

const ProductList = ({
  products,
  virtualized = false,
  loadMore,
  isFetchingNextPage,
  style,
}) => {
  return (
    <>
      {virtualized ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ProductItem product={item} />}
          numColumns={2}
          contentContainerStyle={[styles.flatListContentContainer, style]}
          columnWrapperStyle={styles.columnWrapper}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent />}
        />
      ) : (
        <>
          {products?.length > 0 ? (
            <View style={[styles.normalContainer, style]}>
              {products?.map((product) => (
                <ProductItem key={product.name} product={product} />
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

export default ProductList;

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
