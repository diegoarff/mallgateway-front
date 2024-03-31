import { View, useColorScheme } from "react-native";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useCallback, useEffect, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "@react-navigation/native";
import { ROLES } from "../utils/constants";
import Snack from "../components/Snack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MallLightTheme, MallDarkTheme } from "../settings";
import { es, registerTranslation } from "react-native-paper-dates";

registerTranslation("es", es);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const segments = useSegments();

  const roleRoutes = useMemo(() => {
    return {
      [ROLES.ADMIN]: "admin",
      [ROLES.STORE]: "store",
      [ROLES.USER]: "",
      [ROLES.GUEST]: "",
    };
  }, []);

  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not logged in.
      return router.replace("(auth)/login");
    }

    const correspondingRoute = roleRoutes[user.role];

    // If the user isn't on their corresponding route, redirect them to it.
    if (segments[0] !== correspondingRoute) {
      router.replace(`/${correspondingRoute}`);
    }
  }, [user]);

  return (
    <>
      <Slot />
      <Snack />
    </>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MallDarkTheme : MallLightTheme;

  SystemUI.setBackgroundColorAsync(theme.colors.background);

  const queryClient = new QueryClient();

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
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider value={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <MainLayout />
              </View>
            </GestureHandlerRootView>
          </ThemeProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
