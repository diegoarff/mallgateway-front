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
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "../../../components/Header";
import { FlashList } from "@shopify/flash-list";
import ErrorScreen from "../../../components/ErrorScreen";
import { useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

const Stores = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetStores({
    search: debouncedSearch,
  });

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

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const stores = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  const renderItem = (store) => {
    return (
      <Pressable onPress={() => router.push(`admin/stores/${store._id}`)}>
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
      </Pressable>
    );
  };

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

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              {...props}
              withSearchbar
              searchValue={searchText}
              onSearchChange={setSearchText}
              searchbarPlaceholder="Buscar tiendas..."
              actions={headerActions}
            />
          ),
        }}
      />

      <ScreenWrapper withInsets={false}>
        <List.Section style={styles.list}>
          <View style={{ flex: 1, minHeight: 200 }}>
            <FlashList
              data={stores}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item._id}
              estimatedItemSize={50}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
              showsVerticalScrollIndicator={false}
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
