import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getPromos,
  getPromo,
  getPromosFromFollowed,
  handlePromoActive,
  createPromo,
  updatePromo,
  deletePromo,
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

export const useGetPromo = (promoId) => {
  return useQuery({
    queryKey: ["promos", promoId],
    queryFn: () => getPromo(promoId),
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
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useCreatePromo = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (promo) => createPromo(promo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showSnackbar("Promo creada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useUpdatePromo = (promoId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (promo) => updatePromo(promoId, promo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showSnackbar("Promo actualizada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};

export const useDeletePromo = (promoId) => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: () => deletePromo(promoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      showSnackbar("Promo eliminada");
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
