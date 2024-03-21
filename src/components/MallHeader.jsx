import { StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Appbar, Avatar, Text } from "react-native-paper";
import { appSettings } from "../settings";

const MallHeader = ({ from }) => {
  const router = useRouter();

  return (
    <Stack.Screen
      options={{
        header: () => {
          return (
            <Appbar.Header style={styles.header}>
              <Avatar.Image source={{ uri: appSettings.mallLogo }} size={36} />
              <Appbar.Content
                title={
                  <Text variant="titleLarge" style={styles.title}>
                    {appSettings.mallName}
                  </Text>
                }
              />
              <Appbar.Action
                icon="account-circle-outline"
                size={28}
                onPress={() => router.push(`(${from})/user-settings`)}
              />
            </Appbar.Header>
          );
        },
      }}
    />
  );
};

export default MallHeader;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    gap: 12,
  },
  title: {
    fontWeight: "bold",
  },
});
