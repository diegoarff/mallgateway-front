import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Pressable, Image, ScrollView } from "react-native";
import {
  Button,
  Chip,
  Icon,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { useAuthStore } from "../stores/auth";
import {
  useGetProduct,
  useGetSimilarProducts,
} from "../services/hooks/products";
import Loader from "../components/Loader";
import ErrorScreen from "../components/ErrorScreen";
import DialogWithScroll from "../components/DialogWithScroll";
import ProductItem from "../components/ProductItem";

const AVAILABILITY = {
  available: "Disponible",
  lowstock: "Bajo stock",
  unavailable: "Agotado",
};

// TODO: Improve styling
const ProductDetailScreen = ({ fromUser }) => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  const { data: product, status, error } = useGetProduct(id);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  const hasPromo = product.promo && product.promo.value > 0;

  const handlePromoRedirect = () => {
    if (user.role === "store") {
      router.push(`store/promos/${product.promo._id}`);
    } else if (user.role === "user") {
      router.push(`user/promos/${product.promo._id}`);
    }
  };

  return (
    <>
      {/* Images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        style={{ maxHeight: 360, minHeight: 360, marginBottom: 16 }}
      >
        {product.images.map((image, idx) => (
          <Image
            key={idx}
            source={{ uri: image }}
            style={{ aspectRatio: 1, borderRadius: 32 }}
          />
        ))}
      </ScrollView>

      <View style={{ gap: 6, marginBottom: 12 }}>
        {/* Product Info */}
        <Text
          variant="titleLarge"
          numberOfLines={2}
          style={{ fontWeight: "bold" }}
        >
          {product.name}
        </Text>

        {/* Price */}
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Text
            variant="titleMedium"
            style={{
              color: hasPromo ? theme.colors.primary : theme.colors.onSurface,
              fontSize: 18,
            }}
          >
            $
            {hasPromo
              ? product.price * (product.promo.value / 100)
              : product.price}
          </Text>
          {hasPromo && (
            <Pressable
              onPress={handlePromoRedirect}
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Text
                variant="titleMedium"
                style={{
                  textDecorationLine: "line-through",
                  color: theme.colors.onSurfaceDisabled,
                  fontSize: 18,
                }}
              >
                ${product.price}
              </Text>

              <View
                style={{
                  paddingHorizontal: 8,
                  backgroundColor: theme.colors.primaryContainer,
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.primary }}
                >
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

          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 2.2,
              backgroundColor: theme.colors.surfaceDisabled,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {AVAILABILITY[product.availability]}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 14 }}>
        {/* Variants */}
        {product.variants.length > 0 && (
          <>
            {product.variants.map((variant) => (
              <View key={variant._id} style={{ gap: 8 }}>
                <Text variant="titleMedium">{variant.variant.name}</Text>

                <View
                  style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}
                >
                  {variant.values.map((value, idx) => (
                    <Chip key={idx}>{value}</Chip>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}

        {/* Description */}
        <Pressable
          onPress={() => setDescriptionOpen(!descriptionOpen)}
          style={{ gap: 4 }}
        >
          <Text variant="titleMedium">Descripción</Text>
          <Text variant="bodyMedium" numberOfLines={3}>
            {product.description}
          </Text>
        </Pressable>

        {/* Categories */}
        <View style={{ gap: 8 }}>
          <Text variant="titleMedium">Categorías</Text>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {product.categories.map((category, idx) => (
              <Chip key={idx}>{category.name}</Chip>
            ))}
          </View>
        </View>

        {fromUser && (
          <>
            <Pressable style={{ gap: 8 }}>
              <Text variant="titleMedium">Tienda</Text>
              <Surface
                mode="flat"
                elevation={3}
                style={{
                  gap: 16,
                  padding: 16,
                  borderRadius: 18,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <Image
                    source={{ uri: product.store.logo }}
                    style={{ height: 88, aspectRatio: 1, borderRadius: 12 }}
                  />
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text variant="titleMedium" numberOfLines={1}>
                      {product.store.name}
                    </Text>
                    <Text variant="bodyMedium" numberOfLines={3}>
                      {product.store.description}
                    </Text>
                  </View>
                </View>
                <Button
                  mode="contained"
                  onPress={() => router.push(`user/stores/${product.store.id}`)}
                >
                  Visitar la tienda
                </Button>
              </Surface>
            </Pressable>

            <SimilarProducts productId={product._id} />
          </>
        )}
      </View>

      {/* Description dialog */}
      <DialogWithScroll
        title="Descripción"
        visible={descriptionOpen}
        onDismiss={() => setDescriptionOpen(false)}
        actions={
          <Button onPress={() => setDescriptionOpen(false)}>Cerrar</Button>
        }
      >
        <Text variant="bodyMedium">{product.description}</Text>
      </DialogWithScroll>
    </>
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
      <Text variant="titleMedium">Productos similares</Text>

      {isPending && <Loader />}
      {isError && (
        <Text>Error obteniendo los productos similares: {error.message}</Text>
      )}

      {similar?.length > 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          {similar?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </View>
      ) : (
        <Text>No hay productos similares</Text>
      )}
    </View>
  );
};
