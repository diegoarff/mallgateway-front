import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const InfoText = ({ info, style = {} }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      <Icon
        source="information-outline"
        size={28}
        color={theme.colors.outline}
      />
      <Text style={[styles.text, { color: theme.colors.outline }]}>{info}</Text>
    </View>
  );
};

export default InfoText;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  text: {
    paddingLeft: 4,
  },
});
