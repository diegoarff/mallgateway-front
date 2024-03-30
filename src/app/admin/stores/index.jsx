import {
  Appbar,
  Button,
  Dialog,
  FAB,
  IconButton,
  List,
  Portal,
  Surface,
  Text,
} from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Loader from "../../../components/Loader";
import { useDeleteStore, useGetStores } from "../../../services/hooks/stores";
import { Image, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import Header from "../../../components/Header";
import { useGlobalStore } from "../../../stores/global";
import { FlashList } from "@shopify/flash-list";
import ErrorScreen from "../../../components/ErrorScreen";
import { useState } from "react";

const Stores = () => {
  const router = useRouter();

  const { data, status, error } = useGetStores();
  const result = useDebouncedSearch(data);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [storeIdToDelete, setStoreIdToDelete] = useState(null);
  const { mutate: deleteStore, isPending } = useDeleteStore();

  const hideDialog = () => {
    setDialogVisible(false);
    setStoreIdToDelete(null);
  };

  const showDialog = (storeId) => {
    setStoreIdToDelete(storeId);
    setDialogVisible(true);
  };

  const renderItem = (store) => {
    return (
      <Surface
        mode="flat"
        elevation={2}
        style={{ marginBottom: 12, borderRadius: 12 }}
      >
        <List.Item
          title={<Text variant="bodyLarge">{store.name}</Text>}
          description={store.description}
          left={(props) => (
            <Image
              source={{ uri: store.logo }}
              style={[props.style, styles.storeImage]}
            />
          )}
          right={(props) => (
            <IconButton
              icon="trash-can-outline"
              {...props}
              disabled={isPending}
              onPress={() => showDialog(store._id)}
            />
          )}
        />
      </Surface>
    );
  };

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <>
      <Stack.Screen
        options={{
          // Defined below
          header: (props) => <StoresHeader {...props} />,
        }}
      />

      <ScreenWrapper withInsets={false}>
        <List.Section style={styles.list}>
          <List.Subheader>{result.length} Tiendas</List.Subheader>
          <View style={{ flex: 1, minHeight: 200 }}>
            <FlashList
              data={result}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item._id}
              estimatedItemSize={50}
            />
          </View>
        </List.Section>

        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={hideDialog}
            dismissable={!isPending}
          >
            <Dialog.Icon icon="alert" />
            <Dialog.Title style={{ textAlign: "center" }}>
              Eliminar tienda
            </Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                ¿Estás seguro de que quieres eliminar esta tienda?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button
                disabled={isPending}
                onPress={() => {
                  deleteStore(storeIdToDelete);
                  hideDialog();
                }}
              >
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal.Host>
          <Portal>
            <FAB
              icon="plus"
              style={styles.fab}
              label="Registrar"
              onPress={() => router.push("admin/stores/register")}
            />
          </Portal>
        </Portal.Host>
      </ScreenWrapper>
    </>
  );
};

export default Stores;

const StoresHeader = ({ ...props }) => {
  const searchQuery = useGlobalStore((state) => state.searchQuery);
  const setSearchQuery = useGlobalStore((state) => state.setSearchQuery);

  const headerActions = [
    {
      tooltip: "Filtrar",
      component: (
        <Appbar.Action
          icon="filter-variant"
          size={28}
          onPress={() => console.log("filter")}
        />
      ),
    },
  ];

  return (
    <Header
      {...props}
      withSearchbar
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchbarPlaceholder="Buscar tiendas..."
      actions={headerActions}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 68,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 16,
  },
  storeImage: {
    width: 72,
    aspectRatio: 1,
    borderRadius: 12,
  },
});
