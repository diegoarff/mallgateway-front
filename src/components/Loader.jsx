import { ActivityIndicator } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";

const Loader = ({ containerStyle = {} }) => {
  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      style={containerStyle}
    >
      <ActivityIndicator animating size="large" />
    </ScreenWrapper>
  );
};

export default Loader;
