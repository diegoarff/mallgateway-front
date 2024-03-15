import { View, useColorScheme } from 'react-native';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inApp = segments[0] === '(app)';

    if (!user) {
      // Redirect to the login page if the user is not logged in.
      router.replace('/(auth)/login');
    } else if (!inApp) {
      // Redirect to the app if the user is logged in and the current segment is not in the app.
      router.replace('/(app)');
    }
  }, [user]);

  return <Slot />;
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const queryClient = new QueryClient({
    // Put the best options for perfomance
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });

  const [fontsLoaded, fontError] = useFonts({
    interLight: Inter_300Light,
    interRegular: Inter_400Regular,
    interMedium: Inter_500Medium,
    interSemiBold: Inter_600SemiBold,
    interBold: Inter_700Bold,
    interBlack: Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <MainLayout />
          </View>
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
