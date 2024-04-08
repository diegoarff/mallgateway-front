import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import Header from "../../../../components/Header";
import ProductDetailScreen from "../../../../screens/ProductDetailScreen";
import { useDeleteProduct } from "../../../../services/hooks/products";

const StoreProductDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { mutate: deleteProduct, isPending } = useDeleteProduct(id);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleDeleteProduct = () => {
    deleteProduct();
    router.back();
  };

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="pencil-outline"
          disabled={isPending}
          onPress={() => router.push(`/store/products/${id}/edit`)}
        />
      ),
      tooltip: "Editar producto",
    },
    {
      component: (
        <Appbar.Action
          icon="trash-can-outline"
          disabled={isPending}
          onPress={() => setDeleteDialogVisible(true)}
        />
      ),
      tooltip: "Eliminar producto",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} actions={headerActions} />,
        }}
      />

      <ProductDetailScreen id={id} />

      {/* Delete product dialog */}
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Eliminar producto</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Está seguro que desea eliminar este producto?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>
              Cancelar
            </Button>
            <Button onPress={handleDeleteProduct}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default StoreProductDetail;
