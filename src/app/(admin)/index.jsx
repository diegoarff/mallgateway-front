import { Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../../components/ScreenWrapper';

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
      <Button mode="contained" onPress={() => router.push('(admin)/stores')}>
        Tiendas
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push('(admin)/categories')}
      >
        Categorías de tiendas
      </Button>
      <Button mode="contained" onPress={() => router.push('(admin)/socials')}>
        Redes sociales
      </Button>
      <Button
        mode="contained"
        onPress={() => router.push('(admin)/user-settings')}
      >
        Configuración de usuario
      </Button>
    </ScreenWrapper>
  );
};

export default Index;
