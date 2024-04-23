import { Image, StyleSheet, View } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { useGetPromo } from "../services/hooks/promos";
import Loader from "../components/Loader";
import ErrorScreen from "../components/ErrorScreen";
import WithRole from "../components/WithRole";
import { ROLES } from "../utils/constants";
import DescriptionPressable from "../components/DescriptionPressable";
import ProductList from "../components/ProductList";
import StoreItem from "../components/StoreItem";
import ChipList from "../components/ChipList";

const PromoDetailScreen = ({ id }) => {
  const theme = useTheme();

  const { data: promo, status, error } = useGetPromo(id);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <ScreenWrapper
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 20,
      }}
    >
      {promo.image && (
        <Image source={{ uri: promo.image }} style={styles.promoImage} />
      )}

      <View style={styles.titleContainer}>
        <Text
          variant="titleLarge"
          style={{ fontWeight: "bold", flex: 1 }}
          numberOfLines={2}
        >
          {promo.name}
        </Text>

        <View
          style={[
            styles.promoLabel,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <Text
            variant="titleLarge"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >
            {promo.value}
          </Text>
          <Icon
            source="percent-outline"
            size={20}
            color={theme.colors.primary}
          />
        </View>
      </View>

      <View>
        <Text variant="titleMedium">Descripción</Text>
        <DescriptionPressable description={promo.description} />
      </View>

      <WithRole roles={[ROLES.GUEST, ROLES.USER]}>
        <View style={styles.littleGap}>
          <Text variant="titleMedium">Tienda</Text>
          <StoreItem store={promo.store} />
        </View>
      </WithRole>

      {promo.entity_type === "Product" ? (
        <View style={styles.littleGap}>
          <Text variant="titleMedium">Productos en promoción</Text>
          <ProductList products={promo.entities} />
        </View>
      ) : (
        <View style={styles.littleGap}>
          <Text variant="titleMedium">Categorías en promoción</Text>
          <ChipList items={promo.entities} titleKey="name" />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default PromoDetailScreen;

const styles = StyleSheet.create({
  storeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  storeLogo: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },
  promoImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  promoLabel: {
    paddingHorizontal: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  littleGap: {
    gap: 8,
  },
});
