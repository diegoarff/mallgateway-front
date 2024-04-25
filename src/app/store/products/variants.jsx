import { useEffect } from "react";
import Loader from "../../../components/Loader";
import ErrorScreen from "../../../components/ErrorScreen";
import { Stack } from "expo-router";
import ScreenWrapper from "../../../components/ScreenWrapper";
import EditableList from "../../../components/EditableList";
import { useGlobalStore } from "../../../stores/global";
import {
  useGetProductVariants,
  useProcessProductVariants,
} from "../../../services/hooks/stores";
import { Appbar } from "react-native-paper";
import Header from "../../../components/Header";

const ProductVariants = () => {
  const store = useGlobalStore((state) => state.store);

  const { data, error, status } = useGetProductVariants(store.id);
  const processVariants = useProcessProductVariants();
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
            <ProductVariantsHeader mutation={processVariants} {...props} />
          ),
        }}
      />

      <ScreenWrapper contentContainerStyle={{ justifyContent: "center" }}>
        <EditableList itemsName="variantes" mutation={processVariants} />
      </ScreenWrapper>
    </>
  );
};

export default ProductVariants;

const ProductVariantsHeader = ({ mutation, ...props }) => {
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
        />
      ),
      tooltip: "Guardar cambios",
    },
  ];

  return <Header {...props} actions={headerActions} />;
};
