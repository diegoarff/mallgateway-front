import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuthStore } from '../../stores/auth';

const Login = () => {
  const doLogin = useAuthStore((state) => state.doLogin);

  const handleLogin = (role) => {
    doLogin({ username: 'john doe', role }, 'token');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <Pressable style={styles.button} onPress={() => handleLogin('admin')}>
        <Text style={styles.text}>Login as Admin</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleLogin('store')}>
        <Text style={styles.text}>Login as Store</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleLogin('user')}>
        <Text style={styles.text}>Login as User</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    gap: 2,
  },
  text: {
    fontFamily: 'interBold',
  },
  button: {
    backgroundColor: '#ffeeee',
    padding: 10,
    borderRadius: 5,
  },
});
