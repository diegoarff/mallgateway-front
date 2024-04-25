import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createStore,
  deleteStore,
  getOwnedStore,
  getProductCategories,
  processProductCategories,
  getProductVariants,
  processProductVariants,
  getSocials,
  getStore,
  getStoreCategories,
  getStores,
  processStoreCategories,
  updateStore,
  getStoreFeedback,
  getStoreProductsFeedback,
  followStore,
  addFeedbackToStore,
} from "../api/stores";
import { useGlobalStore } from "../../stores/global";

export const useGetOwnedStore = () => {
  return useQuery({
    queryKey: ["owned-store"],
    queryFn: getOwnedStore,
  });
};

export const useGetStores = (params) => {
  return useInfiniteQuery({
    queryKey: ["stores", params],
    queryFn: ({ pageParam }) => getStores({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page < lastPage?.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetStore = (storeId) => {
  return useQuery({
    queryKey: ["stores", storeId],
    queryFn: () => getStore(storeId),
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

export const useUpdateStore = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (store) => updateStore(store),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owned-store"] });
      showSnackbar("Tienda actualizada");
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

export const useGetProductCategories = (storeId) => {
  return useQuery({
    queryKey: ["product-categories", storeId],
    queryFn: () => getProductCategories(storeId),
  });
};

export const useProcessProductCategories = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (categories) => processProductCategories(categories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
      showSnackbar("Categorías de productos actualizadas");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useGetProductVariants = (storeId) => {
  return useQuery({
    queryKey: ["product-variants", storeId],
    queryFn: () => getProductVariants(storeId),
  });
};

export const useProcessProductVariants = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (variants) => processProductVariants(variants),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-variants"] });
      showSnackbar("Variantes de productos actualizadas");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useGetSocials = () => {
  return useQuery({
    queryKey: ["socials"],
    queryFn: getSocials,
  });
};

export const useGetStoreFeedback = () => {
  return useQuery({
    queryKey: ["store-feedback"],
    queryFn: getStoreFeedback,
  });
};

export const useGetStoreProductsFeedback = () => {
  return useQuery({
    queryKey: ["store-products-feedback"],
    queryFn: getStoreProductsFeedback,
  });
};

export const useFollowStore = (storeId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: () => followStore(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      queryClient.invalidateQueries({ queryKey: ["products", "followed"] });
      queryClient.invalidateQueries({ queryKey: ["promos", "followed"] });
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useAddFeedbackToStore = (storeId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (feedback) => addFeedbackToStore(storeId, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-feedback"] });
      showSnackbar("Reseña enviada con éxito");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
