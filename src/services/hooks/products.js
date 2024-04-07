import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteProduct,
  getProduct,
  getProducts,
  getProductsFromFollowed,
  getSimilarProducts,
  createProduct,
  updateProduct,
} from "../api/products";
import { useGlobalStore } from "../../stores/global";

export const useGetProducts = (params) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam }),
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

export const useGetProductsFromFollowed = (params) => {
  return useInfiniteQuery({
    queryKey: ["products", "followed", params],
    queryFn: ({ pageParam }) =>
      getProductsFromFollowed({ ...params, page: pageParam }),
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

export const useGetProduct = (productId) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });
};

export const useGetSimilarProducts = (productId) => {
  return useQuery({
    queryKey: ["products", productId, "similar"],
    queryFn: () => getSimilarProducts(productId),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["store-products-feedback"],
      });
      showSnackbar("Producto eliminado con éxito");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["store-products-feedback"],
      });
      showSnackbar("Producto creado con éxito");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useUpdateProduct = (productId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (product) => updateProduct(productId, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showSnackbar("Producto actualizado con éxito");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
