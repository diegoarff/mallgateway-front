import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../settings/firebase";
import { useState } from "react";
import { useGlobalStore } from "../stores/global";

const isValidStorageUrl = (url) =>
  url.startsWith(`https://firebasestorage.googleapis.com/`);

const useFirebaseImages = () => {
  const [loading, setLoading] = useState(false);

  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  const uploadImages = async (images) => {
    setLoading(true);
    const uploadedUrls = [];

    try {
      const imagesToUpload = Array.isArray(images) ? images : [images];

      for (const image of imagesToUpload) {
        if (isValidStorageUrl(image)) {
          uploadedUrls.push(image);
          continue;
        }

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

  const deleteImages = async (downloadUrls) => {
    const urlsToDelete = Array.isArray(downloadUrls)
      ? downloadUrls
      : [downloadUrls];

    try {
      setLoading(true);
      for (const url of urlsToDelete) {
        if (!isValidStorageUrl(url)) continue;

        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
      }
    } catch (error) {
      showSnackbar(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, uploadImages, deleteImages };
};

export default useFirebaseImages;
