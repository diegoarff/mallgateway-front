import { useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import PromoDetailScreen from "../../../../screens/PromoDetailScreen";
import Header from "../../../../components/Header";
import { Appbar, Button, Dialog, Portal, Text } from "react-native-paper";
import { useDeletePromo } from "../../../../services/hooks/promos";

const StorePromoDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { mutate: deletePromo, isPending } = useDeletePromo(id);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleDeletePromo = () => {
    deletePromo();
    router.back();
  };

  const headerActions = [
    {
      component: (
        <Appbar.Action
          icon="pencil-outline"
          disabled={isPending}
          onPress={() => router.push(`/store/promos/${id}/edit`)}
        />
      ),
      tooltip: "Editar promo",
    },
    {
      component: (
        <Appbar.Action
          icon="trash-can-outline"
          disabled={isPending}
          onPress={() => setDeleteDialogVisible(true)}
        />
      ),
      tooltip: "Eliminar promo",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header {...props} actions={headerActions} />,
        }}
      />

      <PromoDetailScreen id={id} />

      {/* Delete promo dialog */}
      <Portal>
        <Dialog
          visible={deleteDialogVisible}
          onDismiss={() => setDeleteDialogVisible(false)}
        >
          <Dialog.Title>Eliminar promoción</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Está seguro que desea eliminar esta promoción?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialogVisible(false)}>
              Cancelar
            </Button>
            <Button onPress={handleDeletePromo}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default StorePromoDetail;
