import { Appbar, Avatar, FAB, List, Portal } from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Loader from "../../../components/Loader";
import { useGetStores } from "../../../services/hooks/stores";
import { StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useDebouncedSearch } from "../../../hooks/useDebouncedSearch";
import CustomSurface from "../../../components/CustomSurface";
import Header from "../../../components/Header";
import { useGlobalStore } from "../../../stores/global";
import { FlashList } from "@shopify/flash-list";
import ErrorScreen from "../../../components/ErrorScreen";

const Stores = () => {
  const { data, status, error } = useGetStores();
  const result = useDebouncedSearch(data);
  const router = useRouter();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  return (
    <Portal.Host>
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
              renderItem={({ item }) => <StoreItem store={item} />}
              keyExtractor={(item) => item._id}
              estimatedItemSize={50}
            />
          </View>
        </List.Section>

        <Portal>
          <FAB
            icon="plus"
            style={styles.fab}
            label="Registrar"
            onPress={() => router.push("admin/stores/register")}
          />
        </Portal>
      </ScreenWrapper>
    </Portal.Host>
  );
};

export default Stores;

const StoreItem = ({ store }) => {
  return (
    <CustomSurface style={styles.surface}>
      <List.Item
        title={store.name}
        description={store.description}
        left={() => <Avatar.Image source={{ uri: store.logo }} size={48} />}
      />
    </CustomSurface>
  );
};

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
    right: 12,
    bottom: 16,
  },
  surface: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
