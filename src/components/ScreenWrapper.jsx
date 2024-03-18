import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal, useTheme } from 'react-native-paper';

const ScreenWrapper = ({
  children,
  withScrollView = true,
  withInsets = true,
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
  ];
  return (
    <Portal.Host>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
          keyboardShouldPersistTaps="always"
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          style={[containerStyle, style]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[containerStyle, style]}>{children}</View>
      )}
    </Portal.Host>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
