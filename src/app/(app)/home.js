import { View, Text } from 'react-native';
import { useAuthStore } from '../../stores/auth';

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontFamily: 'interBlack', fontSize: 30 }}>
        {JSON.stringify(user)}
      </Text>
    </View>
  );
};

export default Home;
