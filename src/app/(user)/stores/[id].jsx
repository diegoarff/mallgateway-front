import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Loader from "../../../components/Loader";
import ErrorScreen from "../../../components/ErrorScreen";
import {
  Text,
  Appbar,
  Button,
  IconButton,
  Surface,
  Icon,
  useTheme,
} from "react-native-paper";
import {
  useAddFeedbackToStore,
  useFollowStore,
  useGetStore,
} from "../../../services/hooks/stores";
import Header from "../../../components/Header";
import ChipList from "../../../components/ChipList";
import WithRole from "../../../components/WithRole";
import FeedbackDialog from "../../../components/FeedbackDialog";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ROLES } from "../../../utils/constants";
import ProductList from "../../../components/ProductList";
import PromoList from "../../../components/PromoList";
import DialogWithScroll from "../../../components/DialogWithScroll";
import ContactList from "../../../components/store/ContactList";
import { useGetProducts } from "../../../services/hooks/products";
import { useGetPromos } from "../../../services/hooks/promos";
import ReferencePoint from "../../../components/store/ReferencePoint";
import ScheduleList from "../../../components/store/ScheduleList";

const currentDay = new Date().getDay();
const currentTime = new Date().toLocaleTimeString("en-US", {
  timeZone: "America/Caracas",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const getOpenCloseMessage = (store) => {
  let openCloseMessage = "";

  if (store.open) {
    openCloseMessage = `, cierra a las ${store.schedule[currentDay].close}`;
  } else {
    if (currentTime > store.schedule[currentDay].close) {
      openCloseMessage = `, abre mañana a las ${store.schedule[(currentDay + 1) % 7].open}`;
    } else {
      openCloseMessage = `, abre hoy a las ${store.schedule[currentDay].open}`;
    }
  }

  return openCloseMessage;
};

const StoreDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();

  const { data: store, status, error } = useGetStore(id);
  const { mutate: followStore, isPending } = useFollowStore(id);
  const addFeedbackToStore = useAddFeedbackToStore(id);

  const [visible, setVisible] = useState({});
  const getVisible = (name) => !!visible[name];
  const toggleDialog = (name) => {
    setVisible({ ...visible, [name]: !visible[name] });
  };

  const {
    data: productData,
    isPending: productIsPending,
    isError: productIsError,
    error: productError,
  } = useGetProducts({
    store: id,
    limit: 8,
  });

  const {
    data: promoData,
    isPending: promoIsPending,
    isError: promoIsError,
    error: promoError,
  } = useGetPromos({
    store: id,
    active: true,
    limit: 5,
  });

  const products = useMemo(() => {
    if (!productData) return [];
    return productData.pages.flatMap((page) => page.results);
  }, [productData]);

  const promos = useMemo(() => {
    if (!promoData) return [];
    return promoData.pages.flatMap((page) => page.results);
  }, [promoData]);

  const redirectProducts = () => {
    router.push("home/products-followed");
  };

  const redirectPromos = () => {
    router.push("home/promos-followed");
  };

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorScreen error={error} />;

  const headerActions = [
    {
      component: (
        <Appbar.Action icon="magnify" onPress={() => router.push("search")} />
      ),
      tooltip: "Buscar",
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          header: (props) => <Header actions={headerActions} {...props} />,
        }}
      />

      <ScreenWrapper
        withInsets={false}
        contentContainerStyle={[styles.gap, { paddingBottom: 20 }]}
      >
        {/* Basic info */}
        <View style={styles.center}>
          <Image source={{ uri: store.logo }} style={styles.storeLogo} />
          <View style={[styles.center, { gap: 4 }]}>
            <Text
              variant="titleMedium"
              numberOfLines={1}
              style={styles.storeName}
            >
              {store.name}
            </Text>
            {store.description && (
              <Text variant="bodyMedium">{store.description}</Text>
            )}
          </View>
          <ChipList items={store.categories} titleKey="name" icon="tag" />
          <Text variant="bodyMedium">
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.primary, fontWeight: "bold" }}
            >
              {store.open ? "Abierta" : "Cerrada"}
            </Text>
            {getOpenCloseMessage(store)}
          </Text>
        </View>

        {/* Store actions */}
        <WithRole roles={[ROLES.USER]}>
          <View style={styles.row}>
            <Button
              mode={store.interest ? "outlined" : "contained"}
              disabled={isPending}
              loading={isPending}
              onPress={followStore}
              style={{ flex: 1 }}
            >
              {store.interest ? "Dejar de seguir" : "Seguir"}
            </Button>
            <IconButton
              mode="contained"
              icon="flag-variant-outline"
              size={24}
              onPress={() => toggleDialog("feedback")}
            />
          </View>
        </WithRole>

        {/* Info buttons */}
        <View style={styles.row}>
          <InfoButton
            icon="phone"
            title="Contactos"
            onPress={() => toggleDialog("contacts")}
          />
          <InfoButton
            icon="clock"
            title="Horario"
            onPress={() => toggleDialog("schedule")}
          />
          <InfoButton
            icon="map-marker"
            title="Ubicación"
            onPress={() => toggleDialog("location")}
          />
        </View>

        {/* Products */}
        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Productos
            </Text>
            <IconButton
              icon="arrow-right"
              mode="contained"
              size={18}
              onPress={redirectProducts}
            />
          </View>
          {productIsPending && <Loader />}
          {productIsError && <ErrorScreen error={productError} />}
          {productData && <ProductList products={products} />}
          <Button mode="contained" onPress={redirectProducts}>
            Ver más
          </Button>
        </View>

        {/* Promos */}
        <View style={styles.gap}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Promociones
            </Text>
            <IconButton
              icon="arrow-right"
              mode="contained"
              size={18}
              onPress={redirectPromos}
            />
          </View>
          {promoIsPending && <Loader />}
          {promoIsError && <ErrorScreen error={promoError} />}
          {promoData && <PromoList promos={promos} />}
          <Button mode="contained" onPress={redirectPromos}>
            Ver más
          </Button>
        </View>
      </ScreenWrapper>

      {/* Feedback dialog */}
      <FeedbackDialog
        visible={getVisible("feedback")}
        onDismiss={() => toggleDialog("feedback")}
        mutation={addFeedbackToStore}
      />

      {/* Contacts Dialog */}
      <DialogWithScroll
        visible={getVisible("contacts")}
        onDismiss={() => toggleDialog("contacts")}
        title="Contactos"
      >
        <ContactList store={store} />
      </DialogWithScroll>

      {/* Location Dialog */}
      <DialogWithScroll
        visible={getVisible("location")}
        onDismiss={() => toggleDialog("location")}
        title="Ubicación"
      >
        <Image
          source={{ uri: store.facade }}
          style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 20 }}
        />
        {store.addresses.map((address) => (
          <ReferencePoint key={address._id} reference={address} />
        ))}
        {store.addresses.map((address) => (
          <ReferencePoint key={address._id} reference={address} />
        ))}
      </DialogWithScroll>

      {/* Schedule Dialog */}
      <DialogWithScroll
        visible={getVisible("schedule")}
        onDismiss={() => toggleDialog("schedule")}
        title="Horario"
      >
        <ScheduleList store={store} />
      </DialogWithScroll>
    </>
  );
};

export default StoreDetail;

const InfoButton = ({ icon, onPress, title }) => {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <Surface
        mode="flat"
        elevation={3}
        style={{ padding: 12, borderRadius: 12, alignItems: "center", gap: 8 }}
      >
        <Icon source={icon} size={24} color={theme.colors.primary} />
        <Text
          variant="labelLarge"
          style={{ color: theme.colors.onSecondaryContainer }}
        >
          {title}
        </Text>
      </Surface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gap: {
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  center: {
    alignItems: "center",
    gap: 12,
  },
  storeLogo: {
    height: 140,
    aspectRatio: 1,
    borderRadius: 20,
  },
  storeName: {
    fontSize: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
  },
});
