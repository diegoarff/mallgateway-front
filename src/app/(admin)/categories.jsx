import { Text } from 'react-native-paper';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  useGetStoreCategories,
  useProcessStoreCategories,
} from '../../services/hooks/admin';
import Loader from '../../components/Loader';
import { Stack } from 'expo-router';
import Header from '../../components/Header';
import EditableList from '../../components/EditableList';

const Categories = () => {
  const { data, error, isError, isPending } = useGetStoreCategories();
  const processCategories = useProcessStoreCategories();

  const headerActions = [
    {
      icon: 'content-save-outline',
      disabled: true,
      onPress: () => console.log('save'),
    },
  ];

  return (
    <>
      <ScreenWrapper
        withInsets={false}
        contentContainerStyle={{ justifyContent: 'center' }}
      >
        <Stack.Screen
          options={{
            header: ({ ...props }) => {
              return <Header {...props} actions={headerActions} />;
            },
          }}
        />
        {isPending && <Loader />}
        {isError && <Text>Error: {error.message}</Text>}
        {data && (
          <EditableList
            items={data}
            itemsName="categorías"
            mutation={processCategories}
          />
        )}
      </ScreenWrapper>
    </>
  );
};

export default Categories;
