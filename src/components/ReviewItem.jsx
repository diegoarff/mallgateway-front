import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Icon, Surface, Text, useTheme } from "react-native-paper";

const ReviewItem = ({ review }) => {
  const [pressed, setPressed] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable onPress={() => setPressed((prev) => !prev)}>
      <Surface mode="flat" elevation={3} style={styles.container}>
        {review.entity_type === "Product" && (
          <Pressable
            onPress={() => router.push(`store/products/${review.entity.id}`)}
          >
            <View style={[styles.row, { gap: 12, marginBottom: 8 }]}>
              <Image
                source={{ uri: review.entity.images[0] }}
                style={styles.productImg}
              />
              <Text variant="titleMedium">{review.entity.name}</Text>
            </View>
          </Pressable>
        )}

        <View style={[styles.row, { gap: 12 }]}>
          <View style={styles.row}>
            {[...Array(5)].map((_, idx) => (
              <Icon
                key={idx}
                source="star"
                size={16}
                color={
                  idx < review.rating
                    ? theme.colors.primary
                    : theme.colors.surfaceDisabled
                }
              />
            ))}
          </View>
          <Text variant="labelMedium" style={{ color: theme.colors.secondary }}>
            {new Date(review.createdAt).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </View>

        <Text variant="bodyMedium" numberOfLines={pressed ? null : 3}>
          {review.message}
        </Text>
      </Surface>
    </Pressable>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImg: {
    height: 48,
    aspectRatio: 1,
    borderRadius: 8,
  },
});
