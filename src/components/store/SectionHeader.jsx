import { StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import WithRole from "../WithRole";
import { ROLES } from "../../utils/constants";

const SectionHeader = ({ title, icon, onIconPress }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text variant="titleMedium">{title}</Text>
    <WithRole roles={[ROLES.STORE]}>
      {icon && (
        <IconButton
          icon={icon}
          mode="contained"
          size={18}
          onPress={onIconPress}
        />
      )}
    </WithRole>
  </View>
);

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
