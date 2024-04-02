import { Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import useImagePicker from "../../hooks/useImagePicker";
import { useEffect } from "react";

const ImagePicker = ({ image, setImage, aspect, buttonLabel }) => {
  const { images, pickImage } = useImagePicker({
    aspect,
    allowsEditing: true,
  });

  useEffect(() => {
    if (images.length) {
      setImage(images[0].uri);
    }
  }, [images]);

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
        onPress={pickImage}
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
