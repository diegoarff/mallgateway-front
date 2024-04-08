import { useRouter } from "expo-router";
import { View, Pressable, Image, ScrollView, StyleSheet } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "../stores/auth";
import {
  useGetProduct,
  useGetSimilarProducts,
} from "../services/hooks/products";
import Loader from "../components/Loader";
import ErrorScreen from "../components/ErrorScreen";
import WithRole from "../components/WithRole";
import { ROLES } from "../utils/constants";
import DescriptionPressable from "../components/DescriptionPressable";
import ProductList from "../components/ProductList";
import StoreItem from "../components/StoreItem";
import ChipList from "../components/ChipList";
import ScreenWrapper from "../components/ScreenWrapper";

const AVAILABILITY = {
  available: "Disponible",
  lowstock: "Bajo stock",
  unavailable: "Agotado",
};

const ProductDetailScreen = ({ id }) => {
  const router = useRouter();
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  const { data: product, status, error } = useGetProduct(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  const hasPromo = product.promo && product.promo.value > 0;

  const handlePromoRedirect = () => {
    if (user.role === "store") {
      router.push(`store/promos/${product.promo._id}`);
    } else if (user.role === "user") {
      router.push(`promos/${product.promo._id}`);
    }
  };

  const styles = getStyles(theme);

  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ paddingBottom: 20, gap: 16 }}
    >
      {/* Images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.littleGap}
        style={styles.imageScrollView}
      >
        {product.images.map((image, idx) => (
          <Image key={idx} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.littleGap}>
        {/* Product Info */}
        <Text variant="titleLarge" numberOfLines={2} style={styles.productName}>
          {product.name}
        </Text>

        {/* Price */}
        <View style={styles.rowContainer}>
          <Text
            variant="titleMedium"
            style={[
              styles.price,
              {
                color: hasPromo ? theme.colors.primary : theme.colors.onSurface,
              },
            ]}
          >
            $
            {hasPromo
              ? product.price - product.price * (product.promo.value / 100)
              : product.price}
          </Text>
          {hasPromo && (
            <Pressable
              onPress={handlePromoRedirect}
              style={styles.rowContainer}
            >
              <Text variant="titleMedium" style={styles.promoPrice}>
                ${product.price}
              </Text>

              <View style={styles.promoTag}>
                <Text variant="labelLarge" style={styles.promoText}>
                  {product.promo.value}
                </Text>
                <Icon
                  source="percent-outline"
                  size={14}
                  color={theme.colors.primary}
                />
              </View>
            </Pressable>
          )}

          <View style={styles.availabilityTag}>
            <Text variant="labelMedium" style={styles.availabilityText}>
              {AVAILABILITY[product.availability]}
            </Text>
          </View>
        </View>
      </View>

      {/* Variants */}
      {product.variants.length > 0 && (
        <View style={styles.littleGap}>
          {product.variants.map((variant) => (
            <View key={variant._id} style={styles.littleGap}>
              <Text variant="titleMedium">{variant.variant.name}</Text>
              <ChipList items={variant.values} />
            </View>
          ))}
        </View>
      )}

      {/* Description */}
      <View style={styles.littleGap}>
        <Text variant="titleMedium">Descripción</Text>
        <DescriptionPressable description={product.description} />
      </View>

      {/* Categories */}
      {product.categories.length > 0 && (
        <View style={styles.littleGap}>
          <Text variant="titleMedium">Categorías</Text>
          <ChipList items={product.categories} titleKey="name" icon="tag" />
        </View>
      )}

      <WithRole roles={[ROLES.GUEST, ROLES.USER]}>
        <View style={styles.littleGap}>
          <Text variant="titleMedium">Tienda</Text>
          <StoreItem store={product.store} />
        </View>

        <View style={styles.littleGap}>
          <Text variant="titleMedium">Productos similares</Text>
          <SimilarProducts productId={product._id} />
        </View>
      </WithRole>
    </ScreenWrapper>
  );
};

export default ProductDetailScreen;

const SimilarProducts = ({ productId }) => {
  const {
    data: similar,
    isError,
    isPending,
    error,
  } = useGetSimilarProducts(productId);

  return (
    <View style={{ gap: 16 }}>
      {isPending && <Loader />}
      {isError && (
        <Text>Error obteniendo los productos similares: {error.message}</Text>
      )}

      <ProductList products={similar} />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    imageScrollView: { maxHeight: 360, minHeight: 360 },
    image: { aspectRatio: 1, borderRadius: 32 },
    productName: { fontWeight: "bold" },
    rowContainer: { flexDirection: "row", gap: 8, alignItems: "center" },
    price: { fontSize: 18 },
    promoPrice: {
      textDecorationLine: "line-through",
      color: theme.colors.onSurfaceDisabled,
      fontSize: 18,
    },
    promoTag: {
      paddingHorizontal: 8,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
    },
    promoText: { color: theme.colors.primary },
    availabilityTag: {
      paddingHorizontal: 8,
      paddingVertical: 2.2,
      backgroundColor: theme.colors.surfaceDisabled,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
    },
    availabilityText: { color: theme.colors.onSurfaceVariant },
    littleGap: {
      gap: 8,
    },
  });
