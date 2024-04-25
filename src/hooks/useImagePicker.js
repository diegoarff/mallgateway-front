import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

const useImagePicker = ({
  aspect = undefined,
  allowsEditing = false,
  selectionLimit = 0,
  allowsMultipleSelection = false,
}) => {
  const [images, setImages] = useState([]);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(
        "Disculpe, se necesitan permisos para acceder a la galería para agregar una imagen"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing,
      aspect,
      selectionLimit,
      allowsMultipleSelection,
    });

    if (!result.canceled) {
      setImages((prevImages) =>
        allowsMultipleSelection
          ? [...prevImages, ...result.assets]
          : [result.assets[0]]
      );
    }
  }, [aspect, selectionLimit, allowsEditing, allowsMultipleSelection]);

  return { images, pickImage };
};

export default useImagePicker;
