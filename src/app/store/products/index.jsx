import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useRouter } from "expo-router";

const StoreProducts = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <ScreenWrapper withInsets={false}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Button
            icon={() => (
              <Icon
                source="tag-multiple"
                size={24}
                color={theme.colors.primary}
              />
            )}
            mode="contained-tonal"
            onPress={() => router.push("store/products/categories")}
            style={styles.button}
            contentStyle={styles.buttonContentStyle}
          >
            Categorías
          </Button>
          <Button
            icon={() => (
              <Icon source="tag-text" size={20} color={theme.colors.primary} />
            )}
            mode="contained-tonal"
            onPress={() => router.push("store/products/variants")}
            style={styles.button}
            contentStyle={styles.buttonContentStyle}
          >
            Variantes
          </Button>
        </View>
        <View>
          <Text>StoreProducts</Text>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default StoreProducts;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    flexGrow: 1,
  },
  buttonContentStyle: {
    paddingVertical: 8,
  },
});
