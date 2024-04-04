import { useInfiniteQuery } from "@tanstack/react-query";
import { getPromos, getPromosFromFollowed } from "../api/promos";

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
