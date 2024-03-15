import { View, Text } from 'react-native';
import { useAuthStore } from '../../stores/auth';
import { useEffect } from 'react';

const Login = () => {
  const doLogin = useAuthStore((state) => state.doLogin);

  useEffect(() => {
    setTimeout(() => {
      doLogin({ name: 'John Doe' }, 'token');
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'interBold' }}>Login</Text>
    </View>
  );
};

export default Login;
