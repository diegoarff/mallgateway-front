import { Text } from 'react-native-paper';
import {
  useGetStoreCategories,
  useProcessStoreCategories,
} from '../../services/hooks/admin';
import ScreenWrapper from '../../components/ScreenWrapper';
import Loader from '../../components/Loader';
import EditableList from '../../components/EditableList';
import { Stack } from 'expo-router';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useGlobalStore } from '../../stores/global';

const Categories = () => {
  const { data, error, isError, isPending } = useGetStoreCategories();
  const processCategories = useProcessStoreCategories();
  const setListData = useGlobalStore((state) => state.setListData);

  useEffect(() => {
    if (data) {
      setListData(data, true);
    }
  }, [data]);

  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ justifyContent: 'center' }}
    >
      {isPending && <Loader />}
      {isError && <Text>Error: {error.message}</Text>}
      {data && (
        <>
          <CategoriesHeader mutation={processCategories} />
          <EditableList itemsName="categorías" mutation={processCategories} />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Categories;

const CategoriesHeader = ({ mutation }) => {
  const listData = useGlobalStore((state) => state.listData);
  const setListData = useGlobalStore((state) => state.setListData);
  const initialListData = useGlobalStore((state) => state.initialListData);
  const isListDataEqual = useGlobalStore((state) => state.isListDataEqual);

  const headerActions = [
    {
      icon: 'restore',
      disabled: isListDataEqual() || mutation.isPending,
      tooltip: 'Deshacer cambios',
      onPress: () => {
        setListData(initialListData, true);
      },
    },
    {
      icon: 'content-save-outline',
      disabled: isListDataEqual(),
      tooltip: 'Guardar cambios',
      onPress: () => {
        mutation.mutate(listData);
      },
    },
  ];

  return (
    <Stack.Screen
      options={{
        header: ({ ...props }) => {
          return <Header {...props} actions={headerActions} />;
        },
      }}
    />
  );
};
