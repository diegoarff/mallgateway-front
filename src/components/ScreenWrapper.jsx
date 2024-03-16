import { ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ScreenWrapper = ({
  children,
  withScrollView = true,
  style,
  contentContainerStyle,
  ...rest
}) => {
  const theme = useTheme();
  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingLeft: 12,
      paddingRight: 12,
    },
  ];
  return (
    <>
      {withScrollView ? (
        <ScrollView
          {...rest}
          contentContainerStyle={contentContainerStyle}
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
    </>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
