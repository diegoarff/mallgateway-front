import { Button, Text } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";
import { useAuthStore } from "../stores/auth";

const ErrorScreen = ({ error }) => {
  const doLogout = useAuthStore((state) => state.doLogout);
  return (
    <ScreenWrapper
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text>{error.message}</Text>
      <Button onPress={doLogout}>Cerrar sesión</Button>
    </ScreenWrapper>
  );
};

export default ErrorScreen;
