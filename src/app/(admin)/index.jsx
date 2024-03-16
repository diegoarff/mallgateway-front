import { View, Text } from 'react-native';
import { useAuthStore } from '../../stores/auth';

const Index = () => {
  const doLogout = useAuthStore((state) => state.doLogout);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text>Admin</Text>
      <Text onPress={doLogout}>Logout</Text>
    </View>
  );
};

export default Index;
