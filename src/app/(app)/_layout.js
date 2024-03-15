import { Slot, useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/auth';
import { useEffect } from 'react';

const AppLayout = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case 'admin':
        router.replace('/(app)/(admin)');
        break;
      case 'store':
        router.replace('/(app)/(store)');
        break;
      default:
        router.replace('/(app)/(user)');
        break;
    }
  }, [user]);

  return <Slot />;
};

export default AppLayout;
