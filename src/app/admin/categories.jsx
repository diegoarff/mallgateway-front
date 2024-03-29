import { Appbar } from "react-native-paper";
import {
  useGetStoreCategories,
  useProcessStoreCategories,
} from "../../services/hooks/stores";
import ScreenWrapper from "../../components/ScreenWrapper";
import Loader from "../../components/Loader";
import EditableList from "../../components/EditableList";
import { Stack } from "expo-router";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useGlobalStore } from "../../stores/global";
import ErrorScreen from "../../components/ErrorScreen";

const Categories = () => {
  const { data, error, status } = useGetStoreCategories();
  const processCategories = useProcessStoreCategories();
  const initializeListData = useGlobalStore(
    (state) => state.initializeListData
  );

  useEffect(() => {
    if (data) {
      initializeListData(data);
    }
  }, [data]);

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            // Defined below
            <CategoriesHeader mutation={processCategories} {...props} />
          ),
        }}
      />

      <ScreenWrapper
        withInsets={false}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <EditableList itemsName="categorías" mutation={processCategories} />
      </ScreenWrapper>
    </>
  );
};

export default Categories;

const CategoriesHeader = ({ mutation, ...props }) => {
  const listData = useGlobalStore((state) => state.listData);
  const undoListChanges = useGlobalStore((state) => state.undoListChanges);
  const isListDataEqual = useGlobalStore((state) => state.isListDataEqual);

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="restore"
          disabled={isListDataEqual() || mutation.isPending}
          onPress={undoListChanges}
          tooltip="Deshacer cambios"
        />
      ),
      tooltip: "Deshacer cambios",
    },
    {
      component: (
        <Appbar.Action
          icon="content-save-outline"
          disabled={isListDataEqual() || mutation.isPending}
          onPress={() => {
            mutation.mutate(listData);
          }}
          tooltip="Guardar cambios"
        />
      ),
      tooltip: "Guardar cambios",
    },
  ];

  return <Header {...props} actions={headerActions} />;
};
