import { Redirect } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const Index = () => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Redirect href="home" />
    </View>
  );
};

export default Index;
