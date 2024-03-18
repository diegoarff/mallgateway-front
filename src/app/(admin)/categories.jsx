import { Text } from 'react-native-paper';
import {
  useGetStoreCategories,
  useProcessStoreCategories,
} from '../../services/hooks/admin';
import ScreenWrapper from '../../components/ScreenWrapper';
import Loader from '../../components/Loader';
import EditableList from '../../components/EditableList';

const Categories = () => {
  const { data, error, isError, isPending } = useGetStoreCategories();
  const processCategories = useProcessStoreCategories();

  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ justifyContent: 'center' }}
    >
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
  );
};

export default Categories;
