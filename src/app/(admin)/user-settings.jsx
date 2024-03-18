import { useAuthStore } from '../../stores/auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import { Button } from 'react-native-paper';

const UserSettings = () => {
  const doLogout = useAuthStore((state) => state.doLogout);

  return (
    <ScreenWrapper>
      <Button onPress={doLogout}>Cerrar sesión</Button>
    </ScreenWrapper>
  );
};

export default UserSettings;
