import { useQuery } from "@tanstack/react-query";
import { getStores } from "../api/stores";

export const useGetStores = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });
};
