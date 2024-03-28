import { ActivityIndicator } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";

const Loader = () => {
  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator animating size="large" />
    </ScreenWrapper>
  );
};

export default Loader;
