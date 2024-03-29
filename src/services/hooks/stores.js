import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStore,
  deleteStore,
  getStoreCategories,
  getStores,
  processStoreCategories,
} from "../api/stores";
import { useGlobalStore } from "../../stores/global";

export const useGetStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (store) => createStore(store),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      showSnackbar("Tienda creada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (storeId) => deleteStore(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      showSnackbar("Tienda eliminada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useGetStoreCategories = () => {
  return useQuery({
    queryKey: ["store-categories"],
    queryFn: getStoreCategories,
  });
};

export const useProcessStoreCategories = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (categories) => processStoreCategories(categories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-categories"] });
      showSnackbar("Categorías actualizadas");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
