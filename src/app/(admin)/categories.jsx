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
  const initializeListData = useGlobalStore(
    (state) => state.initializeListData
  );

  useEffect(() => {
    if (data) {
      initializeListData(data);
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
  const undoListChanges = useGlobalStore((state) => state.undoListChanges);
  const isListDataEqual = useGlobalStore((state) => state.isListDataEqual);

  const headerActions = [
    {
      icon: 'restore',
      disabled: isListDataEqual() || mutation.isPending,
      tooltip: 'Deshacer cambios',
      onPress: undoListChanges,
    },
    {
      icon: 'content-save-outline',
      disabled: isListDataEqual() || mutation.isPending,
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
