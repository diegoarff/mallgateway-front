import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getPromos,
  getPromosFromFollowed,
  handlePromoActive,
} from "../api/promos";
import { useGlobalStore } from "../../stores/global";

export const useGetPromos = (params) => {
  return useInfiniteQuery({
    queryKey: ["promos", params],
    queryFn: ({ pageParam }) => getPromos({ ...params, page: pageParam }),
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

export const useGetPromosFromFollowed = (params) => {
  return useInfiniteQuery({
    queryKey: ["promos", "followed", params],
    queryFn: ({ pageParam }) =>
      getPromosFromFollowed({ ...params, page: pageParam }),
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

export const useHandlePromoActive = (promoId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: () => handlePromoActive(promoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      showSnackbar("Promo actualizada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
