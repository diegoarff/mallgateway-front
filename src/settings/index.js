import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const appSettings = {
  mallName: "Blue Mall", // Replace with actual mall name
  mallLogo:
    "https://static.vecteezy.com/system/resources/previews/035/898/407/original/3d-alphabet-letter-b-with-blue-color-free-png.png", // Replace with actual logo
  mallLogoLight: "https://via.placeholder.com/150", // Replace with actual logo
  mallLogoDark: "https://via.placeholder.com/150", // Replace with actual logo
  mallFacade: "https://via.placeholder.com/150", // Replace with actual facade

  // COLOR SCHEMES - The following settings are used to generate the theme for the app.
  lightScheme: {
    colors: {
      primary: "rgb(46, 78, 220)",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(222, 225, 255)",
      onPrimaryContainer: "rgb(0, 17, 89)",
      secondary: "rgb(90, 93, 114)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(223, 225, 249)",
      onSecondaryContainer: "rgb(23, 26, 44)",
      tertiary: "rgb(118, 84, 109)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 215, 242)",
      onTertiaryContainer: "rgb(45, 18, 40)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(254, 251, 255)",
      onBackground: "rgb(27, 27, 31)",
      surface: "rgb(254, 251, 255)",
      onSurface: "rgb(27, 27, 31)",
      surfaceVariant: "rgb(227, 225, 236)",
      onSurfaceVariant: "rgb(70, 70, 79)",
      outline: "rgb(118, 118, 128)",
      outlineVariant: "rgb(198, 197, 208)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(48, 48, 52)",
      inverseOnSurface: "rgb(243, 240, 244)",
      inversePrimary: "rgb(186, 195, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(244, 242, 253)",
        level2: "rgb(237, 237, 252)",
        level3: "rgb(231, 232, 251)",
        level4: "rgb(229, 230, 251)",
        level5: "rgb(225, 227, 250)",
      },
      surfaceDisabled: "rgba(27, 27, 31, 0.12)",
      onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
      backdrop: "rgba(47, 48, 56, 0.4)",
    },
  },
  darkScheme: {
    colors: {
      primary: "rgb(186, 195, 255)",
      onPrimary: "rgb(0, 33, 141)",
      primaryContainer: "rgb(0, 49, 196)",
      onPrimaryContainer: "rgb(222, 225, 255)",
      secondary: "rgb(195, 197, 221)",
      onSecondary: "rgb(44, 47, 66)",
      secondaryContainer: "rgb(67, 70, 89)",
      onSecondaryContainer: "rgb(223, 225, 249)",
      tertiary: "rgb(229, 186, 216)",
      onTertiary: "rgb(68, 38, 62)",
      tertiaryContainer: "rgb(93, 60, 85)",
      onTertiaryContainer: "rgb(255, 215, 242)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(27, 27, 31)",
      onBackground: "rgb(228, 225, 230)",
      surface: "rgb(27, 27, 31)",
      onSurface: "rgb(228, 225, 230)",
      surfaceVariant: "rgb(70, 70, 79)",
      onSurfaceVariant: "rgb(198, 197, 208)",
      outline: "rgb(144, 144, 154)",
      outlineVariant: "rgb(70, 70, 79)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(228, 225, 230)",
      inverseOnSurface: "rgb(48, 48, 52)",
      inversePrimary: "rgb(46, 78, 220)",
      elevation: {
        level0: "transparent",
        level1: "rgb(35, 35, 42)",
        level2: "rgb(40, 40, 49)",
        level3: "rgb(45, 46, 56)",
        level4: "rgb(46, 47, 58)",
        level5: "rgb(49, 51, 62)",
      },
      surfaceDisabled: "rgba(228, 225, 230, 0.12)",
      onSurfaceDisabled: "rgba(228, 225, 230, 0.38)",
      backdrop: "rgba(47, 48, 56, 0.4)",
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
