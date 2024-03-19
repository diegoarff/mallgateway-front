import { Avatar, FAB, List, Portal, Surface, Text } from "react-native-paper";
import ScreenWrapper from "../../components/ScreenWrapper";
import Loader from "../../components/Loader";
import { useGetStores } from "../../services/hooks/stores";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import SearchHeader from "../../components/SearchHeader";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";

const Stores = () => {
  const { data, isPending, isError, error } = useGetStores();
  const result = useDebouncedSearch(data);
  const router = useRouter();

  return (
    <ScreenWrapper withInsets={false}>
      {isPending && <Loader />}
      {isError && <Text>Error: {error}</Text>}
      {data && (
        <>
          <SearchHeader
            placeholder="Buscar tiendas..."
            onFilterButtonPress={() => console.log("filter")}
          />
          <List.Section style={styles.list}>
            <List.Subheader>{result.length} Tiendas</List.Subheader>
            {result.map((store) => (
              <StoreItem key={store.id} store={store} />
            ))}
          </List.Section>
          <Portal>
            <FAB
              icon="plus"
              style={styles.fab}
              label="Registrar"
              onPress={() => router.push("(admin)/register-store")}
            />
          </Portal>
        </>
      )}
    </ScreenWrapper>
  );
};

const StoreItem = ({ store }) => {
  return (
    <Surface style={styles.surface} mode="flat" elevation={2}>
      <List.Item
        title={store.name}
        description={store.description}
        left={() => <Avatar.Image source={{ uri: store.logo }} size={48} />}
      />
    </Surface>
  );
};

export default Stores;

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    right: 12,
    bottom: 16,
  },
  surface: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
