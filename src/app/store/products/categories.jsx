import ScreenWrapper from "../../../components/ScreenWrapper";
import { Appbar } from "react-native-paper";
import { useGlobalStore } from "../../../stores/global";
import {
  useGetProductCategories,
  useProcessProductCategories,
} from "../../../services/hooks/stores";
import { useEffect } from "react";
import Loader from "../../../components/Loader";
import ErrorScreen from "../../../components/ErrorScreen";
import EditableList from "../../../components/EditableList";
import Header from "../../../components/Header";
import { Stack } from "expo-router";

const ProductCategories = () => {
  const store = useGlobalStore((state) => state.store);

  const { data, error, status } = useGetProductCategories(store.id);
  const processCategories = useProcessProductCategories();
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
            <ProductCategoriesHeader mutation={processCategories} {...props} />
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

export default ProductCategories;

const ProductCategoriesHeader = ({ mutation, ...props }) => {
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
