import { Text } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";

const ErrorScreen = ({ error }) => {
  return (
    <ScreenWrapper
      withInsets={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text>{error.message}</Text>
    </ScreenWrapper>
  );
};

export default ErrorScreen;
