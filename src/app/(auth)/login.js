import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../stores/auth';

const Login = () => {
  const doLogin = useAuthStore((state) => state.doLogin);

  const handleLogin = (role) => {
    doLogin({ username: 'john doe', role }, 'token');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin('admin')}
      >
        <Text style={styles.text}>Login as Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin('store')}
      >
        <Text style={styles.text}>Login as Store</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin('user')}
      >
        <Text style={styles.text}>Login as User</Text>
      </TouchableOpacity>
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});
