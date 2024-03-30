import {
  Chip,
  Icon,
  IconButton,
  List,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useGlobalStore } from "../../../stores/global";
import { Image, StyleSheet, View } from "react-native";
import { DAYS } from "../../../utils/constants";
import { useRouter } from "expo-router";

const currentDay = new Date().getDay();

const SectionHeader = ({ title, onIconPress }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text variant="titleMedium">{title}</Text>
    <IconButton
      icon="pencil"
      mode="contained"
      size={18}
      onPress={onIconPress}
    />
  </View>
);

const ContactItem = ({ iconSource, title, content }) => {
  const theme = useTheme();
  return (
    <View style={styles.contactItemContainer}>
      <Icon source={iconSource} size={18} color={theme.colors.primary} />
      <View>
        <Text variant="bodyLarge">{title}</Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.secondary }}>
          {content}
        </Text>
      </View>
    </View>
  );
};

const Index = () => {
  const theme = useTheme();
  const router = useRouter();
  const store = useGlobalStore((state) => state.store);

  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={styles.screenWrapper}
    >
      {/* General information */}
      <List.Section>
        <SectionHeader
          title="Información general"
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
            <Text variant="bodyMedium" numberOfLines={2}>
              {store.description}
            </Text>
          </View>

          <View style={styles.categoriesContainer}>
            {store.categories.length > 0 &&
              store.categories.map((category) => (
                <Chip key={category._id} icon="tag">
                  {category.name}
                </Chip>
              ))}
          </View>
        </View>
      </List.Section>

      {/* Schedules */}
      <List.Section>
        <SectionHeader
          title="Horarios"
          onIconPress={() => {
            router.push("store/info/schedule");
          }}
        />

        <View>
          {store.schedule.map((schedule) => (
            <View
              key={schedule._id}
              style={[
                styles.scheduleContainer,
                currentDay === schedule.day && {
                  backgroundColor: theme.colors.elevation.level3,
                },
              ]}
            >
              <Text>{DAYS[schedule.day]}</Text>

              {schedule.active ? (
                <View style={styles.scheduleTimeContainer}>
                  <Text>{schedule.open}</Text>
                  <Text>-</Text>
                  <Text>{schedule.close}</Text>
                </View>
              ) : (
                <Text style={{ color: theme.colors.secondary }}>Cerrado</Text>
              )}
            </View>
          ))}
        </View>
      </List.Section>

      {/* Contacts */}
      <List.Section>
        <SectionHeader
          title="Contactos"
          onIconPress={() => {
            router.push("store/info/contacts");
          }}
        />

        <View style={styles.contactsContainer}>
          {store.phone && (
            <ContactItem
              iconSource="phone"
              title="Teléfono"
              content={store.phone}
            />
          )}
          {store.website && (
            <ContactItem
              iconSource="web"
              title="Sitio web"
              content={store.website}
            />
          )}
          {store.socials.length > 0 &&
            store.socials.map((social) => (
              <ContactItem
                key={social._id}
                iconSource={social.social.icon}
                title={social.social.name}
                content={social.url}
              />
            ))}
        </View>
      </List.Section>

      {/* Location */}
      <List.Section>
        <SectionHeader
          title="Ubicación"
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

          <View style={styles.addressContainer}>
            <Text variant="bodyLarge">Puntos de referencia</Text>
            {store.addresses.map((address) => (
              <Surface
                key={address._id}
                mode="flat"
                elevation={3}
                style={styles.addressSurface}
              >
                <View style={styles.addressInfoContainer}>
                  <Icon
                    source="map-marker"
                    size={18}
                    color={theme.colors.primary}
                  />
                  <Text variant="labelLarge" style={{ fontSize: 15 }}>
                    {address.title}
                  </Text>
                </View>
                <Text variant="bodyMedium">{address.description}</Text>
              </Surface>
            ))}
          </View>
        </View>
      </List.Section>
    </ScreenWrapper>
  );
};

export default Index;

const styles = StyleSheet.create({
  screenWrapper: {
    gap: 12,
    paddingBottom: 12,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  contactItemContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
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
  categoriesContainer: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  scheduleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  scheduleTimeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  contactsContainer: {
    gap: 8,
    paddingHorizontal: 4,
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
  addressSurface: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  addressInfoContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
