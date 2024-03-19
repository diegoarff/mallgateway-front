import { useMemo } from "react";
import { useGlobalStore } from "../stores/global";
import { useDebounce } from "./useDebounce";

const DEBOUNCE_TIME = 500;

export const useDebouncedSearch = (data) => {
  const searchQuery = useGlobalStore((state) => state.searchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_TIME);

  const result = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!debouncedSearchQuery) {
      return data;
    }

    return data.filter((store) =>
      store.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [data, debouncedSearchQuery]);

  return result;
};
