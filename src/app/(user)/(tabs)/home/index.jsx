import { View, Text } from "react-native";
import { useAuthStore } from "../../../../stores/auth";
import { ROLES } from "../../../../utils/constants";
import { useRouter } from "expo-router";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const shouldRedirect = () => {
    if (user?.role === ROLES.GUEST) {
      return router.replace("explore");
    }
  };

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      onLayout={shouldRedirect}
    >
      <Text>User</Text>
    </View>
  );
};

export default Home;
