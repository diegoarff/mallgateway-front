import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const appSettings = {
  mallName: "Galerias Mall", // Replace with actual mall name
  mallLogo: "https://pbs.twimg.com/media/DvckbsyWsAAwOs2.jpg", // Replace with actual logo
  mallLogoLight: "https://via.placeholder.com/150", // Replace with actual logo
  mallLogoDark: "https://via.placeholder.com/150", // Replace with actual logo
  mallFacade: "https://via.placeholder.com/150", // Replace with actual facade

  // COLOR SCHEMES - The following settings are used to generate the theme for the app.
  lightScheme: {
    colors: {
      primary: "rgb(187, 21, 44)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(255, 218, 216)",
      onPrimaryContainer: "rgb(65, 0, 7)",
      secondary: "rgb(119, 86, 85)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(255, 218, 216)",
      onSecondaryContainer: "rgb(44, 21, 21)",
      tertiary: "rgb(116, 90, 47)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 222, 171)",
      onTertiaryContainer: "rgb(40, 25, 0)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(255, 251, 255)",
      onBackground: "rgb(32, 26, 26)",
      surface: "rgb(255, 251, 255)",
      onSurface: "rgb(32, 26, 26)",
      surfaceVariant: "rgb(244, 221, 220)",
      onSurfaceVariant: "rgb(82, 67, 66)",
      outline: "rgb(133, 115, 114)",
      outlineVariant: "rgb(215, 193, 192)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(54, 47, 46)",
      inverseOnSurface: "rgb(251, 238, 237)",
      inversePrimary: "rgb(255, 179, 177)",
      elevation: {
        level0: "transparent",
        level1: "rgb(252, 240, 244)",
        level2: "rgb(250, 233, 238)",
        level3: "rgb(248, 226, 232)",
        level4: "rgb(247, 223, 230)",
        level5: "rgb(246, 219, 226)",
      },
      surfaceDisabled: "rgba(32, 26, 26, 0.12)",
      onSurfaceDisabled: "rgba(32, 26, 26, 0.38)",
      backdrop: "rgba(59, 45, 44, 0.4)",
    },
  },
  darkScheme: {
    colors: {
      primary: "rgb(255, 179, 177)",
      onPrimary: "rgb(104, 0, 17)",
      primaryContainer: "rgb(146, 0, 28)",
      onPrimaryContainer: "rgb(255, 218, 216)",
      secondary: "rgb(230, 189, 187)",
      onSecondary: "rgb(68, 41, 41)",
      secondaryContainer: "rgb(93, 63, 62)",
      onSecondaryContainer: "rgb(255, 218, 216)",
      tertiary: "rgb(228, 193, 141)",
      onTertiary: "rgb(65, 45, 5)",
      tertiaryContainer: "rgb(90, 67, 25)",
      onTertiaryContainer: "rgb(255, 222, 171)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(32, 26, 26)",
      onBackground: "rgb(237, 224, 223)",
      surface: "rgb(32, 26, 26)",
      onSurface: "rgb(237, 224, 223)",
      surfaceVariant: "rgb(82, 67, 66)",
      onSurfaceVariant: "rgb(215, 193, 192)",
      outline: "rgb(160, 140, 139)",
      outlineVariant: "rgb(82, 67, 66)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(237, 224, 223)",
      inverseOnSurface: "rgb(54, 47, 46)",
      inversePrimary: "rgb(187, 21, 44)",
      elevation: {
        level0: "transparent",
        level1: "rgb(43, 34, 34)",
        level2: "rgb(50, 38, 38)",
        level3: "rgb(57, 43, 43)",
        level4: "rgb(59, 44, 44)",
        level5: "rgb(63, 47, 47)",
      },
      surfaceDisabled: "rgba(237, 224, 223, 0.12)",
      onSurfaceDisabled: "rgba(237, 224, 223, 0.38)",
      backdrop: "rgba(59, 45, 45, 0.4)",
    },
  },
};

export const MallLightTheme = {
  ...MD3LightTheme,
  colors: appSettings.lightScheme.colors,
};

export const MallDarkTheme = {
  ...MD3DarkTheme,
  colors: appSettings.darkScheme.colors,
};
