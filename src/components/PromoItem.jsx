import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Chip, Surface, Switch, Text } from "react-native-paper";
import { useAuthStore } from "../stores/auth";
import { ROLES } from "../utils/constants";
import { useHandlePromoActive } from "../services/hooks/promos";
import WithRole from "./WithRole";

const PromoItem = ({ promo }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [active, setActive] = useState(promo.active);

  const { mutate: handlePromoActive, isPending } = useHandlePromoActive(
    promo._id
  );

  const [pressed, setPressed] = useState(false);

  const handleRedirect = () => {
    if (user.role === ROLES.STORE) {
      router.push(`store/promos/${promo._id}`);
    } else if (user.role === ROLES.USER || user.role === ROLES.GUEST) {
      router.push(`promos/${promo._id}`);
    }
  };

  const handleSwitch = () => {
    setActive((prev) => !prev);
    handlePromoActive();
  };

  const isForProducts = promo.entity_type === "Product";

  return (
    <Pressable onPress={handleRedirect}>
      <Surface mode="flat" elevation={2} style={styles.container}>
        <View style={styles.itemHeader}>
          <Text variant="titleMedium" numberOfLines={3} style={styles.title}>
            {promo.name}
          </Text>

          <WithRole roles={[ROLES.STORE]}>
            <Switch
              value={active}
              onValueChange={handleSwitch}
              disabled={isPending}
            />
          </WithRole>
        </View>

        {promo.description && (
          <Pressable onPress={() => setPressed((prev) => !prev)}>
            <Text variant="bodyMedium" numberOfLines={pressed ? null : 3}>
              {promo.description}
            </Text>
          </Pressable>
        )}

        <View style={styles.chipContainer}>
          <Chip icon="percent">{promo.value}</Chip>
          <Chip icon={isForProducts ? "shopping" : "tag-multiple"}>
            {isForProducts ? "Productos" : "Categorías"}
          </Chip>
        </View>

        {promo.image && (
          <Image source={{ uri: promo.image }} style={styles.image} />
        )}
      </Surface>
    </Pressable>
  );
};

export default PromoItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -12,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
});
