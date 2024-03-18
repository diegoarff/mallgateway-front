import {
  Appbar,
  Avatar,
  Icon,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Pressable, StyleSheet } from 'react-native';
import { appSettings } from '../../settings';
import { useAuthStore } from '../../stores/auth';

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper
      contentContainerStyle={{
        gap: 12,
      }}
    >
      <AdminHeader />
      <Text variant="titleLarge" style={styles.text}>
        Panel de administración
      </Text>

      <MenuItem
        icon="store"
        title="Tiendas"
        onPress={() => router.push('(admin)/stores')}
      />
      <MenuItem
        icon="label-outline"
        title="Categorías de tiendas"
        onPress={() => router.push('(admin)/categories')}
      />
      <MenuItem
        icon="key-variant"
        title="Configuración de usuario"
        onPress={() => router.push('(admin)/user-settings')}
      />
    </ScreenWrapper>
  );
};

const AdminHeader = () => {
  const theme = useTheme();
  const doLogout = useAuthStore((state) => state.doLogout);
  return (
    <Stack.Screen
      options={{
        header: () => {
          return (
            <Appbar.Header style={styles.header}>
              <Avatar.Image source={{ uri: appSettings.mallLogo }} size={40} />
              <Appbar.Content title={appSettings.mallName} />
              <Appbar.Action
                icon="logout"
                color={theme.colors.error}
                onPress={doLogout}
              />
            </Appbar.Header>
          );
        },
      }}
    />
  );
};

const MenuItem = ({ icon, title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Surface mode="flat" style={styles.menuItem}>
        <Icon source={icon} size={28} />
        <Text variant="titleMedium">{title}</Text>
      </Surface>
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    gap: 12,
  },
  text: { marginBottom: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
});
