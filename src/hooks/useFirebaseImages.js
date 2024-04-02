import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../settings/firebase";
import { useState } from "react";
import { useGlobalStore } from "../stores/global";

const useFirebaseImages = () => {
  const [loading, setLoading] = useState(false);

  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  const uploadImages = async (images) => {
    setLoading(true);
    const uploadedUrls = [];

    try {
      const imagesToUpload = Array.isArray(images) ? images : [images];

      for (const image of imagesToUpload) {
        const response = await fetch(image);
        const blob = await response.blob();

        const fileName = `${Date.now()}-${image.split("/").pop()}`;
        const fileRef = ref(storage, fileName);
        await uploadBytes(fileRef, blob);

        const downloadUrl = await getDownloadURL(fileRef);

        blob.close();

        uploadedUrls.push(downloadUrl);
      }

      return uploadedUrls;
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (downloadUrl) => {
    const isValidStorageUrl = downloadUrl.startsWith(
      `https://firebasestorage.googleapis.com/`
    );

    if (!isValidStorageUrl) return;

    try {
      const fileRef = ref(storage, downloadUrl);
      await deleteObject(fileRef);
    } catch (error) {
      showSnackbar(error.message);
    }
  };

  return { loading, uploadImages, deleteImage };
};

export default useFirebaseImages;
