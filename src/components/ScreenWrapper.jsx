import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

const ScreenWrapper = ({
  children,
  withScrollView = true,
  withInsets = false,
  withBottomAction = false,
  style,
  contentContainerStyle,
  ...rest
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingTop: withInsets ? insets.top : 0,
      paddingLeft: 12 + insets.left,
      paddingRight: 12 + insets.right,
      paddingBottom: withInsets ? insets.bottom : 0,
    },
    style,
  ];

  const contentStyle = [
    { flexGrow: 1 },
    withBottomAction && { paddingBottom: 80 },
    contentContainerStyle,
  ];

  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={containerStyle}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
