import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStoreCategories, processStoreCategories } from '../api/admin';
import { useGlobalStore } from '../../stores/global';

export const useGetStoreCategories = () => {
  return useQuery({
    queryKey: ['store-categories'],
    queryFn: getStoreCategories,
  });
};

export const useProcessStoreCategories = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useGlobalStore((state) => state.showSnackbar);

  return useMutation({
    mutationFn: (categories) => processStoreCategories(categories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-categories'] });
    },
    onError: (error) => {
      showSnackbar(error);
    },
  });
};
