import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

const ChipList = ({ items, key, icon, titleKey, centered }) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: centered ? "center" : "flex-start" },
      ]}
    >
      {items.map((item, idx) => (
        <Chip key={key ?? idx} icon={icon}>
          {titleKey ? item[titleKey] : item}
        </Chip>
      ))}
    </View>
  );
};

export default ChipList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
});
