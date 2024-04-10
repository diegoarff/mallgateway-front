import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { List, Text } from "react-native-paper";
import SectionHeader from "../components/store/SectionHeader";
import { Image, StyleSheet, View } from "react-native";
import ScheduleList from "../components/store/ScheduleList";
import ContactList from "../components/store/ContactList";
import ReferencePoint from "../components/store/ReferencePoint";
import ChipList from "../components/ChipList";

const StoreInfoScreen = ({ store }) => {
  const router = useRouter();

  return (
    <ScreenWrapper contentContainerStyle={styles.screenWrapper}>
      {/* General information */}
      <List.Section>
        <SectionHeader
          title="Información general"
          icon="pencil"
          onIconPress={() => {
            router.push("store/info/general");
          }}
        />

        <View style={styles.generalInfoContainer}>
          <Image source={{ uri: store.logo }} style={styles.storeLogo} />

          <View style={styles.storeNameContainer}>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold" }}
              numberOfLines={1}
            >
              {store.name}
            </Text>
            {store.description && (
              <Text variant="bodyMedium" numberOfLines={2}>
                {store.description}
              </Text>
            )}
          </View>

          {store.categories.length > 0 && (
            <ChipList
              items={store.categories}
              icon="tag"
              titleKey="name"
              centered
            />
          )}
        </View>
      </List.Section>

      {/* Schedule */}
      <List.Section>
        <SectionHeader
          title="Horarios"
          icon="pencil"
          onIconPress={() => {
            router.push("store/info/schedule");
          }}
        />

        <ScheduleList store={store} />
      </List.Section>

      {/* Contacts */}
      {(store.phone || store.website || store.socials.length > 0) && (
        <List.Section>
          <SectionHeader
            title="Contactos"
            icon="pencil"
            onIconPress={() => {
              router.push("store/info/contacts");
            }}
          />

          <ContactList store={store} />
        </List.Section>
      )}

      {/* Location */}
      <List.Section>
        <SectionHeader
          title="Ubicación"
          icon="pencil"
          onIconPress={() => {
            router.push("store/info/location");
          }}
        />

        <View style={styles.locationContainer}>
          <View style={styles.facadeContainer}>
            <Text variant="bodyLarge">Fachada</Text>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: store.facade }}
                style={styles.facadeImage}
              />
            </View>
          </View>

          {store.addresses.length > 0 && (
            <View style={styles.addressContainer}>
              <Text variant="bodyLarge">Puntos de referencia</Text>
              {store.addresses.map((address) => (
                <ReferencePoint key={address._id} reference={address} />
              ))}
            </View>
          )}
        </View>
      </List.Section>
    </ScreenWrapper>
  );
};

export default StoreInfoScreen;

const styles = StyleSheet.create({
  screenWrapper: {
    gap: 12,
    paddingBottom: 12,
  },
  generalInfoContainer: {
    alignItems: "center",
    gap: 18,
  },
  storeLogo: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 20,
  },
  storeNameContainer: {
    alignItems: "center",
    gap: 2,
  },
  locationContainer: {
    gap: 20,
  },
  facadeContainer: {
    gap: 12,
  },
  facadeImage: {
    width: "95%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  addressContainer: {
    gap: 12,
  },
});
