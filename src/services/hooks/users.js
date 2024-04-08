import { useQuery } from "@tanstack/react-query";
import { getUserFollowedProducts, getUserFollowedStores } from "../api/users";

export const useGetFollowedProducts = () => {
  return useQuery({
    queryKey: ["products", "interested"],
    queryFn: () => getUserFollowedProducts(),
  });
};

export const useGetFollowedStores = () => {
  return useQuery({
    queryKey: ["stores", "interested"],
    queryFn: () => getUserFollowedStores(),
  });
};
