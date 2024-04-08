import { Dimensions, StyleSheet, View, Image } from "react-native";
import { Button, Text, Surface } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFollowStore } from "../services/hooks/stores";

const StoreItem = ({ store, compact }) => {
  const router = useRouter();
  const { mutate: followStore, isPending } = useFollowStore(store.id);

  return (
    <Surface style={[styles.surface, compact && styles.surfaceCompact]}>
      <View style={[styles.view, compact && styles.viewCompact]}>
        <Image source={{ uri: store.logo }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text variant="titleMedium" numberOfLines={1}>
            {store.name}
          </Text>

          {!compact && (
            <Text variant="bodyMedium" numberOfLines={3}>
              {store.description}
            </Text>
          )}
        </View>
      </View>
      <Button
        mode="contained"
        loading={isPending}
        disabled={isPending}
        onPress={() => {
          if (store.interest !== undefined) {
            followStore();
          } else {
            router.push(`stores/${store.id}`);
          }
        }}
      >
        {store.interest !== undefined
          ? store.interest
            ? "Dejar de seguir"
            : "Seguir"
          : "Visitar la tienda"}
      </Button>
    </Surface>
  );
};

export default StoreItem;

const styles = StyleSheet.create({
  surface: {
    mode: "flat",
    elevation: 3,
    gap: 16,
    padding: 16,
    borderRadius: 18,
    width: "100%",
  },
  surfaceCompact: {
    width: Dimensions.get("window").width / 2 - 20,
  },
  view: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  viewCompact: {
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: 88,
    aspectRatio: 1,
    borderRadius: 12,
  },
  imageCompact: {
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
