import { StyleSheet, View } from "react-native";
import { Icon, useTheme, Text } from "react-native-paper";

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

const Contacts = ({ store }) => {
  return (
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
  );
};

export default Contacts;

const styles = StyleSheet.create({
  contactItemContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  contactsContainer: {
    gap: 8,
    paddingHorizontal: 4,
  },
});
