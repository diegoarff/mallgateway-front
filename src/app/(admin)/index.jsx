import { Icon, Surface, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Pressable, StyleSheet } from 'react-native';

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper
      contentContainerStyle={{
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    borderRadius: 12,
  },
});
