import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import WithRole from "./WithRole";
import { ROLES } from "../utils/constants";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/auth";

const ProductItem = ({ product }) => {
  const theme = useTheme();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasPromo = product.promo && product.promo.value > 0;

  const handleRedirect = () => {
    if (user.role === ROLES.STORE) {
      router.push(`store/products/${product._id}`);
    } else if (user.role === ROLES.USER || user.role === ROLES.GUEST) {
      router.push(`user/products/${product._id}`);
    }
  };

  return (
    <Pressable onPress={handleRedirect}>
      <View style={styles.container}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <Text
          variant="titleMedium"
          numberOfLines={1}
          style={styles.productName}
        >
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          <Text
            variant="bodyLarge"
            style={{
              color: hasPromo ? theme.colors.primary : theme.colors.onSurface,
            }}
          >
            $
            {hasPromo
              ? product.price - product.price * (product.promo.value / 100)
              : product.price}
          </Text>
          {hasPromo && (
            <Text
              variant="titleMedium"
              style={{
                textDecorationLine: "line-through",
                color: theme.colors.onSurfaceDisabled,
              }}
            >
              ${product.price}
            </Text>
          )}
        </View>

        {hasPromo && (
          <View
            style={[
              styles.promoLabel,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
              {product.promo.value}
            </Text>
            <Icon
              source="percent-outline"
              size={14}
              color={theme.colors.primary}
            />
          </View>
        )}

        <WithRole roles={[ROLES.USER]}>
          <IconButton
            mode="contained"
            icon={product.interest ? "heart" : "heart-outline"}
            iconColor="#ffffff"
            containerColor={
              product.interest ? theme.colors.primary : "rgba(0, 0, 0, 0.1)"
            }
            size={20}
            onPress={() => {}}
            style={styles.likeButton}
          />
        </WithRole>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2 - 20,
    position: "relative",
  },
  productName: {
    marginTop: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
  promoLabel: {
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 10,
  },
  likeButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  priceContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
