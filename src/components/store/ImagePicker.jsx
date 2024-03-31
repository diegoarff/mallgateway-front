import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

const ImagePicker = ({ image, setImage, aspect, buttonLabel }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { aspectRatio: aspect.join("/") }]}
      />
      <Button
        icon="pencil"
        mode="contained"
        size={18}
        onPress={() => {}}
        style={styles.editButton}
      >
        {buttonLabel || "Editar"}
      </Button>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 20,
  },
});
