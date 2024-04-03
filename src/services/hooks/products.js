import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProduct, getSimilarProducts } from "../api/products";
import { useGlobalStore } from "../../stores/global";

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
